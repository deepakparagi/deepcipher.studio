'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ==========================================================
   DEEPCIPHER — High-Luxury Editorial Preloader
   Features:
   - Cryptographic cipher orbit with circular progress
   - Luminous DC brand monogram with ambient cobalt bloom
   - Precision numeric counter (00% -> 100%)
   - Dynamic studio phase ticker
   - Architectural HUD coordinate frame with corner reticles
   - Split-aperture shutter curtain exit reveal
   ========================================================== */

const PHASES = [
  { threshold: 24, label: '01 // CALIBRATING SYSTEM CORE' },
  { threshold: 54, label: '02 // ARCHITECTING DIGITAL IDENTITY' },
  { threshold: 84, label: '03 // TRANSLATING IDEAS INTO REALITY' },
  { threshold: 100, label: '04 // DEEPCIPHER READY' },
];

const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const activePhase = useMemo(() => {
    return PHASES.find((p) => progress <= p.threshold) || PHASES[PHASES.length - 1];
  }, [progress]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('dc_visited', 'true');
    } catch {}
    setIsComplete(true);
    // Trigger split curtain reveal
    setTimeout(() => {
      setCurtainOpen(true);
    }, 150);
    // Unmount from client layout
    setTimeout(() => {
      onFinished();
    }, 900);
  }, [onFinished]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('dc_visited') === 'true') {
        onFinished();
        return;
      }
    } catch {}

    // Non-linear realistic progress sequence (~1.7s total)
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(finish, 200);
      } else {
        setProgress(current);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [finish, onFinished]);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="deepcipher-loader"
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* ── TOP SHUTTER CURTAIN ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 z-10 bg-[#070707] border-b border-white/[0.06] flex flex-col justify-end"
        initial={{ y: '0%' }}
        animate={{ y: curtainOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.75, ease: EASE_CINEMATIC }}
      >
        {/* Subtle horizontal grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* ── BOTTOM SHUTTER CURTAIN ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 z-10 bg-[#070707] border-t border-white/[0.06] flex flex-col justify-start"
        initial={{ y: '0%' }}
        animate={{ y: curtainOpen ? '100%' : '0%' }}
        transition={{ duration: 0.75, ease: EASE_CINEMATIC }}
      >
        {/* Subtle horizontal grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* ── LUMINOUS SEAM LIGHT LINE (Separates on open) ── */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #3854FF 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(56, 84, 255, 0.8)',
        }}
        initial={{ opacity: 0.6, scaleX: 0 }}
        animate={{
          opacity: curtainOpen ? 0 : isComplete ? 1 : 0.6,
          scaleX: curtainOpen ? 2 : progress > 5 ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* ── MAIN CONTENT CONTAINER (Fades gently right before shutter opens) ── */}
      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-center justify-between p-6 sm:p-10 pointer-events-none"
        animate={{ opacity: curtainOpen ? 0 : 1, scale: curtainOpen ? 0.98 : 1 }}
        transition={{ duration: 0.35, ease: 'easeIn' }}
      >
        {/* ── TOP HUD HEADER ── */}
        <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] text-white/40 font-mono uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3854FF] animate-pulse" />
            <span className="text-[#F5F0E8] font-medium">DEEPCIPHER // STUDIO</span>
          </div>
          <div className="hidden sm:inline-block tracking-[0.3em] text-white/30">
            SYSTEM 2.06 · 2026
          </div>
          <div className="tracking-[0.2em]">
            [ <span className="text-[#3854FF]">LIVE</span> ]
          </div>
        </div>

        {/* ── CORNER ARCHITECTURAL RETICLES ── */}
        <div className="absolute top-8 left-8 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">+</div>
        <div className="absolute top-8 right-8 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">+</div>
        <div className="absolute bottom-8 left-8 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">+</div>
        <div className="absolute bottom-8 right-8 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">+</div>

        {/* ── CENTERPIECE: DC MONOGRAM + CIPHER ORBIT + COUNTER ── */}
        <div className="relative flex flex-col items-center justify-center my-auto">
          {/* Ambient Blue Halo Bloom */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-700"
            style={{
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(56, 84, 255, 0.22) 0%, rgba(44, 52, 128, 0.05) 50%, transparent 75%)',
              filter: 'blur(32px)',
              transform: `scale(${1 + progress * 0.003})`,
            }}
          />

          {/* Cipher Orbit SVG Ring */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 160 160"
            >
              {/* Outer faint dashed track */}
              <circle
                cx="80"
                cy="80"
                r={radius + 8}
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />

              {/* Base background ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
              />

              {/* Dynamic progress ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="url(#cipher-gradient)"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 60ms cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'drop-shadow(0 0 6px rgba(56, 84, 255, 0.8))',
                }}
              />

              <defs>
                <linearGradient id="cipher-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2C3480" />
                  <stop offset="60%" stopColor="#3854FF" />
                  <stop offset="100%" stopColor="#94A8FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Slow Rotating Chrono Ticks */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="absolute top-0 w-1 h-1 rounded-full bg-white/30" />
                <span className="absolute bottom-0 w-1 h-1 rounded-full bg-white/30" />
                <span className="absolute left-0 w-1 h-1 rounded-full bg-white/30" />
                <span className="absolute right-0 w-1 h-1 rounded-full bg-white/30" />
              </div>
            </motion.div>

            {/* Central DC Monogram Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-center justify-center select-none"
            >
              <Image
                src="/deepcipher_logo.png"
                alt="DeepCipher"
                width={56}
                height={38}
                priority
                className="object-contain filter drop-shadow-[0_0_12px_rgba(56,84,255,0.4)]"
                style={{ width: 'auto', height: '34px' }}
              />
            </motion.div>
          </div>

          {/* Large Tabular Counter Display */}
          <div className="mt-8 flex items-baseline justify-center select-none">
            <span
              className="font-mono font-medium text-4xl sm:text-5xl text-[#F5F0E8] tracking-tight tabular-nums"
              style={{
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 24px rgba(245, 240, 232, 0.2)',
              }}
            >
              {progress.toString().padStart(2, '0')}
            </span>
            <span className="font-mono text-xs sm:text-sm text-[#3854FF] font-semibold ml-1.5 tracking-widest">
              %
            </span>
          </div>

          {/* Minimal Kinetic Progress Line */}
          <div className="w-56 sm:w-64 h-[2px] bg-white/[0.08] rounded-full overflow-hidden mt-4 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2C3480] via-[#3854FF] to-[#94A8FF]"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(56, 84, 255, 0.9)',
                transition: 'width 60ms linear',
              }}
            />
          </div>

          {/* Editorial Phase Ticker */}
          <div className="h-6 flex items-center justify-center mt-5">
            <AnimatePresence mode="wait">
              <motion.span
                key={activePhase.label}
                initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-white/60 uppercase whitespace-nowrap text-center"
              >
                {activePhase.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM HUD FOOTER ── */}
        <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.22em] text-white/40 font-mono uppercase">
          <div className="truncate max-w-[200px] sm:max-w-none text-white/50">
            WEB DESIGN · BRAND IDENTITY · AI
          </div>
          <div className="hidden sm:inline-block tracking-[0.25em]">
            BANGALORE / GLOBAL
          </div>
          <div className="text-white/30 font-mono tracking-widest">
            {progress < 100 ? 'INITIALIZING...' : 'COMPLETE'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
