/**
 * DEEPCIPHER Loading System — State Definitions & Lifecycles
 * Conforms to strict 7-state specifications:
 * 1. Initial Reveal (App initialization & brand mark)
 * 2. Content Loading (Assets/data loading with real progress or indeterminate)
 * 3. Progressive Content Reveal (Section-level skeleton to content transitions)
 * 4. Ready (Smooth exit, interactive, accessible unmount)
 * 5. Slow Loading (> 3s threshold, calm messaging, no restart)
 * 6. Recoverable Error (Asset/request failure, retry capability, no stack traces)
 * 7. Empty State (Zero-data state, distinct from error)
 */

export type LoadingState =
  | 'initial-reveal'
  | 'content-loading'
  | 'progressive-reveal'
  | 'ready'
  | 'slow-loading'
  | 'error'
  | 'empty';

export interface LoadingProgress {
  /** Total units tracked (e.g. assets, fonts, bytes, items) */
  total: number;
  /** Units completed */
  completed: number;
  /** Ratio 0.0 to 1.0 if measurable; null if indeterminate */
  ratio: number | null;
  /** Label describing current step if available */
  currentStage?: string;
}

export interface ResourceLoaderOptions {
  /** Delay in ms before showing loading indicator to prevent visual flicker on fast networks (default: 180ms) */
  flickerThresholdMs?: number;
  /** Threshold in ms after which 'slow-loading' state is activated (default: 3000ms) */
  slowThresholdMs?: number;
  /** Maximum timeout in ms before triggering recoverable error (default: 12000ms) */
  timeoutMs?: number;
  /** Message to display during slow loading */
  slowMessage?: string;
  /** Initial progress if known */
  initialProgress?: LoadingProgress;
}

export interface ResourceState<T = unknown> {
  state: LoadingState;
  data: T | null;
  error: Error | string | null;
  progress: LoadingProgress;
  isSlow: boolean;
  canRetry: boolean;
  retry: () => void;
  reset: () => void;
}
