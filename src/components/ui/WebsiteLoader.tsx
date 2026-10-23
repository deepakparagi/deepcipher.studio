'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { LoadingState, LoadingProgress } from '@/lib/loading/types';
import { trackInitialPageLifecycle } from '@/lib/loading/resource-tracker';

/* ==========================================================
   DEEPCIPHER — State-Driven Premium Website Loader
   Strict 7-State Lifecycle Architecture:
   - State 1 (Initial Reveal): Controlled monogram & wordmark reveal
   - State 2 (Content Loading): Real progress ratio if measurable, or calm indeterminate
   - State 4 (Ready): Seamless, brief exit fade without abrupt cut
   - State 5 (Slow Loading): 3000ms threshold calm message without restarting
   - State 6 (Recoverable Error): Restrained error status with retry action
   - Anti-flicker threshold (180ms) avoids flashes for instantaneous cached visits
   - Strict accessibility: aria semantics, focusable retry, reduced motion
   ========================================================== */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export interface WebsiteLoaderProps {
  onFinished: () => void;
  slowThresholdMs?: number;
  flickerThresholdMs?: number;
  criticalImages?: string[];
}

export default function WebsiteLoader({
  onFinished,
  slowThresholdMs = 3000,
  flickerThresholdMs = 180,
  criticalImages = ['/images/deepcipher logo final.png'],
}: WebsiteLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [loaderState, setLoaderState] = useState<LoadingState>('initial-reveal');
  const [progress, setProgress] = useState<LoadingProgress>({
    total: 2 + criticalImages.length,
    completed: 0,
    ratio: null,
    currentStage: 'Initializing application context',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const finishedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountTimeRef = useRef<number>(Date.now());
  const retryBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem('dc_visited', 'true');
    } catch {}
    onFinished();
  }, [onFinished]);

  const triggerExit = useCallback(() => {
    setLoaderState('ready');
    setExiting(true);

    const exitDuration = shouldReduceMotion ? 150 : 380;
    const exitTimer = setTimeout(() => {
      document.body.style.overflow = '';
      handleFinish();
    }, exitDuration);

    return () => clearTimeout(exitTimer);
  }, [handleFinish, shouldReduceMotion]);

  const startTracking = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setErrorMessage(null);
    setLoaderState('initial-reveal');

    // Anti-flicker delay before showing heavy overlay
    const flickerTimer = setTimeout(() => {
      setShowUI(true);
      setLoaderState((prev) => (prev === 'initial-reveal' ? 'content-loading' : prev));
    }, flickerThresholdMs);

    trackInitialPageLifecycle({
      criticalImages,
      signal: controller.signal,
      slowThresholdMs,
      onProgress: (p) => {
        setProgress(p);
      },
      onSlow: () => {
        setLoaderState('slow-loading');
      },
    })
      .then((result) => {
        clearTimeout(flickerTimer);
        const elapsedTime = Date.now() - mountTimeRef.current;

        // If load completed extremely quickly (sub-flicker), exit seamlessly
        if (elapsedTime < flickerThresholdMs) {
          handleFinish();
          return;
        }

        if (result.success) {
          triggerExit();
        } else {
          // Non-fatal asset warning: still allow site entry gracefully
          triggerExit();
        }
      })
      .catch((err) => {
        clearTimeout(flickerTimer);
        if (err?.name === 'AbortError') return;

        setErrorMessage('One or more essential resources could not be loaded.');
        setLoaderState('error');
        setShowUI(true);
        // Focus the retry button for keyboard accessibility
        setTimeout(() => retryBtnRef.current?.focus(), 50);
      });

    return () => {
      clearTimeout(flickerTimer);
      controller.abort();
    };
  }, [criticalImages, flickerThresholdMs, slowThresholdMs, triggerExit, handleFinish]);

  useEffect(() => {
    // Quick session check
    try {
      if (sessionStorage.getItem('dc_visited') === 'true') {
        handleFinish();
        return;
      }
    } catch {}

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const cleanup = startTracking();

    return () => {
      cleanup();
      document.body.style.overflow = originalOverflow;
    };
  }, [handleFinish, startTracking]);

  // Don't render until anti-flicker threshold confirms page isn't instantaneous
  if (!showUI && !exiting && loaderState !== 'error') {
    return null;
  }

  const isMeasurable = progress.ratio !== null && progress.ratio !== undefined;
  const isSlow = loaderState === 'slow-loading';
  const isError = loaderState === 'error';

  return (
    <motion.div
      id="deepcipher-loader"
      role={isError ? 'alert' : 'status'}
      aria-label={
        isError
          ? 'Error loading DeepCipher Studio'
          : isSlow
          ? 'DeepCipher Studio loading is taking longer than usual'
          : 'Loading DeepCipher Studio'
      }
      aria-live={isError ? 'assertive' : 'polite'}
      aria-busy={!exiting && !isError}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none h-[100dvh] ${
        exiting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      style={{
        backgroundColor: '#08090D',
      }}
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: exiting ? 0 : 1,
        y: exiting && !shouldReduceMotion ? -8 : 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.38,
        ease: EASE_PREMIUM,
      }}
    >
      <div className="flex flex-col items-center justify-center px-6">
        {/* Brand Emblem Logo */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          className="relative mb-3 flex items-center justify-center"
        >
          <Image
            src="/images/deepcipher logo final.png"
            alt="DEEPCIPHER"
            width={52}
            height={34}
            priority
            className="object-contain"
            style={{ width: '44px', height: 'auto' }}
          />
        </motion.div>

        {/* Editorial Accent Line */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#354BFF]/40 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 44, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE_PREMIUM }}
          style={{ marginBottom: '10px' }}
          aria-hidden="true"
        />

        {/* Editorial Wordmark */}
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE_PREMIUM }}
          className="text-[13px] sm:text-[14px] font-bold text-[#F1EEE8] tracking-[0.24em] uppercase"
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            lineHeight: 1,
          }}
        >
          DEEPCIPHER
        </motion.span>

        {/* STATE 6: RECOVERABLE ERROR UI */}
        {isError ? (
          <div className="mt-6 flex flex-col items-center text-center max-w-[320px]">
            <p className="text-[11px] text-[#A09D96] mb-4 leading-relaxed font-mono">
              {errorMessage || 'Unable to establish connection with studio assets.'}
            </p>
            <button
              ref={retryBtnRef}
              type="button"
              onClick={() => startTracking()}
              className="px-5 py-2 text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#F1EEE8] bg-[#354BFF] hover:bg-[#2538E0] transition-colors duration-200 border border-[#354BFF]/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#354BFF]"
            >
              RETRY CONNECTION
            </button>
          </div>
        ) : (
          /* STATES 1, 2, 5: NORMAL / SLOW PROGRESS TRACK */
          <>
            <div
              className="relative mt-5 overflow-hidden rounded-full"
              style={{
                width: '124px',
                height: '1.5px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              aria-hidden="true"
            >
              {isMeasurable ? (
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: isSlow ? '#D4A373' : '#354BFF',
                    width: '100%',
                    originX: 0,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress.ratio ?? 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              ) : (
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: isSlow ? '#D4A373' : '#354BFF',
                    width: '32%',
                  }}
                  animate={{
                    x: ['-100%', '350%'],
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>

            {/* Lifecycle Status Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="mt-3.5 flex flex-col items-center"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#F1EEE8]/60 text-center">
                {loaderState === 'initial-reveal' && 'INITIALIZING ARCHITECTURE'}
                {loaderState === 'content-loading' && (progress.currentStage || 'STREAMING ASSETS')}
                {isSlow && 'TAKING A LITTLE LONGER THAN USUAL…'}
              </span>

              {/* Measurable percentage (Strictly real measurements only) */}
              {isMeasurable && !isSlow && (
                <span className="mt-1 text-[8.5px] font-mono text-[#F1EEE8]/40 tracking-wider">
                  {Math.round(progress.ratio! * 100)}%
                </span>
              )}

              {/* Slow Loading Subtitle */}
              {isSlow && (
                <span className="mt-1 text-[8.5px] font-mono text-[#A09D96]/60 tracking-wider text-center max-w-[260px]">
                  Preserving session integrity. Continuing…
                </span>
              )}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
