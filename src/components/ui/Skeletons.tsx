'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function SkeletonPulse({
  className = '',
  style = {},
  'aria-hidden': ariaHidden = true,
}: {
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden={ariaHidden}
      className={`relative overflow-hidden bg-[rgba(245,240,232,0.03)] border border-[rgba(245,240,232,0.05)] ${className}`}
      style={style}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.04)] to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: shouldReduceMotion ? 0 : 2,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Skeleton placeholder for Project Cards in /work and SelectedProjects.
 * Exactly matches aspect-[16/10] and typography spacing to prevent layout shifts.
 */
export function ProjectCardSkeleton() {
  return (
    <div 
      className="w-full flex flex-col"
      role="status"
      aria-label="Loading project preview"
    >
      <div className="relative w-full aspect-[16/10] bg-[#0A0A0A] border border-[rgba(245,240,232,0.06)] overflow-hidden flex items-center justify-center p-6">
        <SkeletonPulse className="absolute inset-0 w-full h-full" />
        
        {/* Category badge placeholder */}
        <div className="absolute top-[14px] right-[14px] w-20 h-5 bg-[#0C0C0E] border border-[rgba(245,240,232,0.08)]" />

        {/* Center editorial plate */}
        <div className="relative z-10 w-44 h-9 bg-[#0C0C0E]/90 border border-[rgba(245,240,232,0.1)] flex items-center justify-center px-4">
          <SkeletonPulse className="w-28 h-2.5" />
        </div>
      </div>

      {/* Metadata footer placeholders */}
      <div className="mt-3 flex justify-between items-center px-1">
        <SkeletonPulse className="w-32 h-3" />
        <SkeletonPulse className="w-16 h-3" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Hero section to ensure zero CLS on home boot.
 */
export function HeroSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading hero presentation"
      className="relative w-full flex-1 min-h-[520px] h-[100dvh] bg-[#0A0A0A] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <SkeletonPulse className="absolute inset-0 w-full h-full opacity-20" />
      
      {/* Brand pill placeholder */}
      <div className="relative z-10 w-36 h-6 rounded-full bg-[#111115] border border-[rgba(245,240,232,0.08)] mb-8" />

      {/* Headline placeholder */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-[680px]">
        <SkeletonPulse className="w-4/5 h-12 md:h-16" />
        <SkeletonPulse className="w-3/5 h-12 md:h-16" />
      </div>

      {/* Description placeholder */}
      <div className="relative z-10 mt-6 w-full max-w-[420px] flex flex-col items-center gap-2">
        <SkeletonPulse className="w-full h-3" />
        <SkeletonPulse className="w-3/4 h-3" />
      </div>

      {/* Button placeholder */}
      <div className="relative z-10 mt-8 w-44 h-11 bg-[#12131A] border border-[rgba(245,240,232,0.08)]" />
    </section>
  );
}

/**
 * Generic section skeleton for progressive reveal.
 */
export function SectionSkeleton({ 
  height = '500px', 
  title = 'Loading section content' 
}: { 
  height?: string; 
  title?: string;
}) {
  return (
    <section
      role="status"
      aria-label={title}
      className="w-full bg-[#0A0A0A] border-t border-[rgba(245,240,232,0.06)] px-6 py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: height }}
    >
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          <SkeletonPulse className="w-36 h-4" />
          <SkeletonPulse className="w-24 h-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
          <div className="h-64 bg-[#0D0D11] border border-[rgba(245,240,232,0.04)] p-4 flex flex-col justify-end">
            <SkeletonPulse className="w-3/4 h-4 mb-2" />
            <SkeletonPulse className="w-1/2 h-3" />
          </div>
          <div className="h-64 bg-[#0D0D11] border border-[rgba(245,240,232,0.04)] p-4 flex flex-col justify-end">
            <SkeletonPulse className="w-3/4 h-4 mb-2" />
            <SkeletonPulse className="w-1/2 h-3" />
          </div>
          <div className="h-64 bg-[#0D0D11] border border-[rgba(245,240,232,0.04)] p-4 flex flex-col justify-end">
            <SkeletonPulse className="w-3/4 h-4 mb-2" />
            <SkeletonPulse className="w-1/2 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Wrapper component for State 3: Progressive Content Reveal.
 * Applies subtle opacity transitions and restrained directional movement
 * without jarring snaps or delays.
 */
export function ProgressiveReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
