'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LoadingState, LoadingProgress } from '@/lib/loading/types';
import Image from 'next/image';

interface LoadingStateViewProps {
  state: LoadingState;
  progress?: LoadingProgress;
  errorMessage?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onRetry?: () => void;
  onEmptyAction?: () => void;
  inline?: boolean;
  className?: string;
}

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export default function LoadingStateView({
  state,
  progress,
  errorMessage,
  emptyTitle = 'No Results Found',
  emptyDescription = 'There are no items available matching the current selection.',
  emptyActionLabel,
  onRetry,
  onEmptyAction,
  inline = false,
  className = '',
}: LoadingStateViewProps) {
  const shouldReduceMotion = useReducedMotion();

  // If state is ready or progressive-reveal, component does not block
  if (state === 'ready' || state === 'progressive-reveal') {
    return null;
  }

  const containerClasses = inline
    ? `w-full py-16 px-6 flex flex-col items-center justify-center text-center ${className}`
    : `fixed inset-0 z-[99990] flex flex-col items-center justify-center select-none h-[100dvh] bg-[#08090D] ${className}`;

  // STATE 6: RECOVERABLE ERROR
  if (state === 'error') {
    return (
      <motion.div
        role="alert"
        aria-live="assertive"
        className={containerClasses}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
      >
        <div className="max-w-[440px] px-6 py-8 flex flex-col items-center text-center border border-[rgba(245,240,232,0.1)] bg-[#0C0C0E]/90 backdrop-blur-md">
          <div className="w-10 h-10 mb-4 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#F1EEE8]/60 mb-2">
            TRANSMISSION INTERRUPTION
          </span>

          <h3 className="text-[14px] font-medium text-[#F1EEE8] mb-2 tracking-wide">
            Unable to Complete Operation
          </h3>

          <p className="text-[12px] text-[#A09D96] leading-relaxed mb-6">
            {errorMessage || 'A required resource could not be reached. You may retry the transmission safely.'}
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#F1EEE8] bg-[#354BFF] hover:bg-[#2538E0] transition-colors duration-200 border border-[#354BFF]/50 focus:outline-none focus:ring-2 focus:ring-[#354BFF]/50 cursor-pointer"
            >
              RETRY REQUEST
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // STATE 7: EMPTY / NO CONTENT STATE
  if (state === 'empty') {
    return (
      <motion.div
        role="status"
        aria-label="No content available"
        className={containerClasses}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
      >
        <div className="max-w-[480px] px-8 py-12 flex flex-col items-center text-center border border-[rgba(245,240,232,0.08)] bg-[#0C0C0E]/60 backdrop-blur-sm">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#354BFF]/60 to-transparent mb-6" aria-hidden="true" />
          
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#354BFF] mb-2">
            CATALOGUE STATUS // 00
          </span>

          <h3 className="text-[15px] font-medium text-[#F1EEE8] mb-2 tracking-wide uppercase">
            {emptyTitle}
          </h3>

          <p className="text-[12px] text-[#8A8780] leading-relaxed mb-6 font-light max-w-[360px]">
            {emptyDescription}
          </p>

          {onEmptyAction && emptyActionLabel && (
            <button
              type="button"
              onClick={onEmptyAction}
              className="px-5 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#F1EEE8]/80 hover:text-[#F1EEE8] border border-[rgba(245,240,232,0.15)] hover:border-[#354BFF]/50 bg-black/40 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#354BFF]"
            >
              {emptyActionLabel}
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // STATES 1, 2, 5: INITIAL REVEAL, CONTENT LOADING, SLOW LOADING
  const isMeasurable = progress && progress.ratio !== null && progress.ratio !== undefined;
  const progressRatio = isMeasurable ? Math.min(Math.max(progress.ratio!, 0), 1) : null;
  const isSlow = state === 'slow-loading';

  return (
    <motion.div
      role="status"
      aria-label={isSlow ? 'Loading is taking longer than expected' : 'Loading content'}
      aria-live="polite"
      aria-busy="true"
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
    >
      <div className="flex flex-col items-center justify-center px-6">
        {/* Brand Mark Emblem */}
        <div className="relative mb-3 flex items-center justify-center">
          <Image
            src="/images/deepcipher logo final.png"
            alt="DEEPCIPHER"
            width={46}
            height={30}
            priority
            className="object-contain"
            style={{ width: '42px', height: 'auto' }}
          />
        </div>

        {/* Accent Line */}
        <div 
          className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#354BFF]/50 to-transparent mb-2.5" 
          aria-hidden="true" 
        />

        {/* Wordmark */}
        <span
          className="text-[13px] font-bold text-[#F1EEE8] tracking-[0.24em] uppercase"
          style={{ fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif" }}
        >
          DEEPCIPHER
        </span>

        {/* Progress Track */}
        <div
          className="relative mt-5 overflow-hidden rounded-full"
          style={{
            width: '128px',
            height: '1.5px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          }}
          aria-hidden="true"
        >
          {isMeasurable ? (
            /* Measurable Real Progress */
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: isSlow ? '#D4A373' : '#354BFF',
                width: '100%',
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progressRatio ?? 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          ) : (
            /* Restrained Indeterminate Animation — No fake percentages */
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: isSlow ? '#D4A373' : '#354BFF',
                width: '35%',
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

        {/* Status / Lifecycle Label */}
        <div className="mt-3.5 flex flex-col items-center">
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#F1EEE8]/60 text-center">
            {state === 'initial-reveal' && 'INITIALIZING'}
            {state === 'content-loading' && (progress?.currentStage || 'STREAMING RESOURCES')}
            {isSlow && 'TAKING A LITTLE LONGER THAN USUAL…'}
          </span>

          {/* Measurable ratio display (only when strictly measurable, never fabricated) */}
          {isMeasurable && !isSlow && (
            <span className="mt-1 text-[8.5px] font-mono text-[#F1EEE8]/40 tracking-wider">
              {Math.round(progressRatio! * 100)}%
            </span>
          )}

          {/* Slow Loading Calm Reassurance */}
          {isSlow && (
            <span className="mt-1 text-[9px] font-mono text-[#A09D96]/60 tracking-wider max-w-[280px] text-center">
              Finalizing connection. Please hold.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
