'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================
   Premium Loading Screen
   — Cinematic diamond trace + counter
   ======================================== */

const LOADING_DURATION = 2600; // ms

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'init' | 'counting' | 'reveal' | 'exit'>('init');

  const finish = useCallback(() => {
    setPhase('exit');
    setTimeout(onFinished, 600);
  }, [onFinished]);

  useEffect(() => {
    // Phase 1: Init delay
    const initTimer = setTimeout(() => setPhase('counting'), 300);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'counting') return;

    const interval = 30;
    const increment = 100 / (LOADING_DURATION / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const revealTimer = setTimeout(() => setPhase('reveal'), LOADING_DURATION);
    const finishTimer = setTimeout(finish, LOADING_DURATION + 800);

    return () => {
      clearInterval(timer);
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, [phase, finish]);

  const displayProgress = Math.floor(progress);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#050505' }}
      >
        {/* Ambient background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Warm spotlight pulse */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Scanning horizontal line */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent 0%, rgba(184,149,106,0.15) 50%, transparent 100%)',
          }}
        />

        {/* Main content */}
        <div className="relative flex flex-col items-center gap-8">

          {/* Diamond SVG with progress trace */}
          <div className="relative" style={{ width: '140px', height: '140px' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              {/* Outer diamond - ghost */}
              <motion.path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {/* Progress trace - gold */}
              <motion.path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                stroke="#B8956A"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.1 }}
              />

              {/* Internal cross lines */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.3" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.3" />
                <line x1="27.5" y1="27.5" x2="72.5" y2="72.5" stroke="white" strokeWidth="0.2" />
                <line x1="72.5" y1="27.5" x2="27.5" y2="72.5" stroke="white" strokeWidth="0.2" />
              </motion.g>

              {/* Glint sweep */}
              <motion.path
                d="M50 5 L95 50 L50 95"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.2, 0],
                  pathOffset: [0, 0.5, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: 'easeInOut',
                }}
              />
            </svg>

            {/* Center glow core */}
            <motion.div
              animate={{
                scale: [0.6, 1, 0.6],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(184,149,106,0.5) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-baseline gap-1"
          >
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '48px',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '80px',
                textAlign: 'right',
              }}
            >
              {displayProgress}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: 'rgba(184,149,106,0.6)',
                letterSpacing: '0.1em',
              }}
            >
              %
            </span>
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: '200px',
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: '#B8956A',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Brand name reveal */}
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {phase === 'reveal' || progress >= 100 ? (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-0"
                >
                  {Array.from('DEEPCIPHER').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        delay: i * 0.06,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontSize: '18px',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        color: '#F5F0E8',
                        letterSpacing: '0.4em',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.span
                  key="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase',
                  }}
                >
                  INITIALIZING
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || progress >= 100 ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === 'reveal' || progress >= 100 ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="origin-center"
              style={{
                height: '1px',
                width: '160px',
                background: 'linear-gradient(to right, transparent, rgba(184,149,106,0.4), transparent)',
                marginBottom: '12px',
              }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'reveal' || progress >= 100 ? 0.3 : 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                display: 'block',
                textAlign: 'center',
              }}
            >
              WEB DESIGN & BRAND IDENTITY
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom status indicators */}
        <div
          className="absolute flex gap-12 pointer-events-none"
          style={{ bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '8px',
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '0.3em',
            }}
          >
            SYS_INIT_0x{displayProgress.toString(16).toUpperCase().padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '8px',
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '0.3em',
            }}
          >
            RENDER_PHASE_{Math.min(Math.floor(progress / 25), 4)}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
