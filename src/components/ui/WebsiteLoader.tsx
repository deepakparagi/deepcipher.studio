'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* ==========================================================
   DEEPCIPHER — Minimal, Premium Website Loader
   Concept: Quiet Precision
   Visual Language:
   - Solid near-black canvas (#08090D) matching dark luxury aesthetic
   - Monogram emblem entrance with 8px upward translation
   - Subtle architectural accent line
   - Editorial DEEPCIPHER wordmark reveal
   - Whisper-thin 1.5px progress indicator with electric-blue (#354BFF) fill
   - Restrained uppercase status label: INITIALIZING EXPERIENCE
   - Silky opacity & 10px upward fade reveal into homepage
   - Total perceived duration: ~750-1100ms
   - Zero clutter, zero fake percentages, zero lag
   ========================================================== */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export interface WebsiteLoaderProps {
  onFinished: () => void;
}

export default function WebsiteLoader({ onFinished }: WebsiteLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem('dc_visited', 'true');
    } catch {}
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    // Session check: skip immediately if already visited in this session
    try {
      if (sessionStorage.getItem('dc_visited') === 'true') {
        handleFinish();
        return;
      }
    } catch {}

    // Lock body scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let minTimerDone = false;
    let pageReady = false;

    // Check DOM readiness
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      pageReady = true;
    } else if (typeof window !== 'undefined') {
      const onWindowLoad = () => {
        pageReady = true;
        if (minTimerDone) {
          triggerExit();
        }
      };
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    // Minimum breathing pacing for animation (~780ms)
    const minTimer = setTimeout(() => {
      minTimerDone = true;
      if (pageReady) {
        triggerExit();
      }
    }, 780);

    // Maximum safety timeout: guarantee dismissal within 1250ms even if external resources stall
    const maxSafetyTimer = setTimeout(() => {
      triggerExit();
    }, 1250);

    let cleanupTimer: NodeJS.Timeout | null = null;

    function triggerExit() {
      clearTimeout(minTimer);
      clearTimeout(maxSafetyTimer);
      setExiting(true);

      cleanupTimer = setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        handleFinish();
      }, 420);
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxSafetyTimer);
      if (cleanupTimer) clearTimeout(cleanupTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleFinish]);

  return (
    <motion.div
      id="deepcipher-loader"
      role="status"
      aria-label="Loading DeepCipher Studio"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none pointer-events-auto h-[100dvh]"
      style={{
        backgroundColor: '#08090D',
      }}
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: exiting ? 0 : 1,
        y: exiting && !shouldReduceMotion ? -10 : 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.4,
        ease: EASE_PREMIUM,
      }}
    >
      <div className="flex flex-col items-center justify-center px-6">
        {/* Monogram / Emblem Logo */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="relative mb-3 flex items-center justify-center"
        >
          <Image
            src="/images/deepcipher logo final.png"
            alt="DEEPCIPHER"
            width={52}
            height={34}
            priority
            className="object-contain"
            style={{
              width: '46px',
              height: 'auto',
            }}
          />
        </motion.div>

        {/* Editorial Accent Line — Draws subtly beneath monogram */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#354BFF]/40 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 44, opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
            ease: EASE_PREMIUM,
          }}
          style={{ marginBottom: '10px' }}
          aria-hidden="true"
        />

        {/* Wordmark Reveal */}
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.16, ease: EASE_PREMIUM }}
          className="text-[13px] sm:text-[14px] font-bold text-[#F1EEE8] tracking-[0.24em] uppercase"
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            lineHeight: 1,
          }}
        >
          DEEPCIPHER
        </motion.span>

        {/* Precision Progress Track */}
        <div
          className="relative mt-5 overflow-hidden rounded-full"
          style={{
            width: '120px',
            height: '1.5px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          }}
          aria-hidden="true"
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: '#354BFF',
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.76,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        {/* Restrained Uppercase Status Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mt-3.5 text-[9px] font-mono uppercase tracking-[0.22em] text-[#F1EEE8]/60 text-center"
        >
          INITIALIZING EXPERIENCE
        </motion.span>
      </div>
    </motion.div>
  );
}
