import { LoadingProgress } from './types';

/**
 * Tracks real page lifecycle events and critical assets.
 * Emits genuine, measurable progress ratios or indeterminate signals.
 * Never fabricates percentages or runs synthetic intervals.
 */
export interface AssetTrackingOptions {
  criticalImages?: string[];
  signal?: AbortSignal;
  onProgress?: (progress: LoadingProgress) => void;
  onSlow?: () => void;
  slowThresholdMs?: number;
}

export function trackInitialPageLifecycle({
  criticalImages = ['/images/deepcipher logo final.png'],
  signal,
  onProgress,
  onSlow,
  slowThresholdMs = 3000,
}: AssetTrackingOptions): Promise<{ success: boolean; errors: string[] }> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    const errors: string[] = [];
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) {
      resolve({ success: true, errors: [] });
      return;
    }

    // 1 unit for DOM readiness, 1 unit for Fonts, N units for critical images
    const totalUnits = 2 + criticalImages.length;
    let completedUnits = 0;

    const emitProgress = (stage: string) => {
      if (signal?.aborted) return;
      const ratio = totalUnits > 0 ? Math.min(completedUnits / totalUnits, 1) : null;
      onProgress?.({
        total: totalUnits,
        completed: completedUnits,
        ratio,
        currentStage: stage,
      });
    };

    // Emit initial progress
    emitProgress('Initializing application context');

    // Slow timer trigger
    const slowTimer = setTimeout(() => {
      if (!signal?.aborted && completedUnits < totalUnits) {
        onSlow?.();
      }
    }, slowThresholdMs);

    const checkComplete = () => {
      completedUnits++;
      if (completedUnits >= totalUnits) {
        clearTimeout(slowTimer);
        emitProgress('All critical resources loaded');
        resolve({ success: errors.length === 0, errors });
      } else {
        emitProgress(`Loading resources (${completedUnits}/${totalUnits})`);
      }
    };

    // 1. Font readiness
    if ('fonts' in document) {
      document.fonts.ready
        .then(() => {
          checkComplete();
        })
        .catch((err) => {
          errors.push(`Fonts load warning: ${err?.message || 'unknown'}`);
          checkComplete();
        });
    } else {
      checkComplete();
    }

    // 2. DOM / Document readiness
    if (document.readyState === 'complete') {
      checkComplete();
    } else {
      const handleDOMLoad = () => {
        window.removeEventListener('load', handleDOMLoad);
        checkComplete();
      };
      window.addEventListener('load', handleDOMLoad, { once: true });
    }

    // 3. Critical images pre-resolution
    if (criticalImages.length === 0) {
      // no images to wait for
    } else {
      criticalImages.forEach((src) => {
        const img = new window.Image();
        img.onload = () => {
          checkComplete();
        };
        img.onerror = () => {
          errors.push(`Failed to preload asset: ${src}`);
          // Count as completed so loader doesn't get stuck, but record error
          checkComplete();
        };
        img.src = src;
      });
    }

    // Signal abort cleanup
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(slowTimer);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });
}
