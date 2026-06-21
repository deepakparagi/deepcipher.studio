'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================
   Cinematic Premium Loading Screen
   ======================================== */

// Total duration of the cinematic loader
const TOTAL_DURATION = 4000;

const milestones = [
  'DISCOVER',
  'STRATEGISE',
  'DESIGN',
  'BUILD'
];

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [activeMilestone, setActiveMilestone] = useState(0);

  const finish = useCallback(() => {
    setPhase(4);
    // Unmount safely after the exit transition completes
    setTimeout(onFinished, 1200);
  }, [onFinished]);

  useEffect(() => {
    // Phase sequence timeline
    const p1 = setTimeout(() => setPhase(1), 400);   // Start drawing diamond
    const p2 = setTimeout(() => setPhase(2), 1200);  // Diamond drawing, milestones cycling
    const p3 = setTimeout(() => setPhase(3), 3200);  // Final glow + text
    const p4 = setTimeout(finish, TOTAL_DURATION);   // Launch sequence

    // Milestone ticker during Phase 1 & 2
    const ticker = setInterval(() => {
      setActiveMilestone(prev => {
        if (prev < milestones.length - 1) return prev + 1;
        return prev;
      });
    }, (2000) / milestones.length);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      clearInterval(ticker);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {phase !== 4 && (
        <motion.div
          key="loader-container"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#000000' }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1, // Slight push-in effect on exit
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Cinematic cinematic ease out
        >
          {/* Ambient background grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Central Framework Container */}
          <div className="relative flex items-center justify-center w-64 h-64 mb-12">
            
            {/* The Gold Point (Phase 01) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: phase === 0 ? 1 : 0, 
                opacity: phase === 0 ? 1 : 0 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-2 h-2 rounded-full bg-[#D4AF6A]"
              style={{
                boxShadow: '0 0 20px 2px rgba(212, 175, 106, 0.4)'
              }}
            />

            {/* The Diamond Framework (Phases 02-03) */}
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              className="absolute overflow-visible"
            >
              {/* Inner Crosshair Lines */}
              <motion.line
                x1="50" y1="0" x2="50" y2="100"
                stroke="rgba(212, 175, 106, 0.15)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: phase >= 1 ? 1 : 0,
                  opacity: phase >= 1 ? 1 : 0 
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line
                x1="0" y1="50" x2="100" y2="50"
                stroke="rgba(212, 175, 106, 0.15)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: phase >= 1 ? 1 : 0,
                  opacity: phase >= 1 ? 1 : 0 
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />

              {/* Main Diamond Stroke */}
              <motion.path
                d="M 50 2 L 98 50 L 50 98 L 2 50 Z"
                fill="none"
                stroke="#D4AF6A"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: phase >= 1 ? 1 : 0,
                  opacity: phase >= 1 ? 1 : 0,
                  scale: phase === 3 ? 1.05 : 1 // Expand slightly on completion
                }}
                transition={{ 
                  pathLength: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
                  opacity: { duration: 0.5, delay: 0.3 },
                  scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                }}
                style={{ transformOrigin: "center" }}
              />
            </svg>

            {/* Final Glow / Portal (Phase 03-04) */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: phase >= 3 ? 2 : 0,
                opacity: phase >= 3 ? 1 : 0
              }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(212, 175, 106, 0.15) 0%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
          </div>

          {/* Typography Sequence */}
          <div className="relative h-12 flex items-center justify-center w-full max-w-sm text-center">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.span
                  key="system-init"
                  initial={{ opacity: 0, letterSpacing: '0.2em' }}
                  animate={{ opacity: 1, letterSpacing: '0.4em' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6 }}
                  className="absolute text-[10px] md:text-[11px] text-[#F5F5F5]/60 font-mono uppercase"
                >
                  SYSTEM INITIALIZING
                </motion.span>
              )}

              {(phase === 1 || phase === 2) && (
                <motion.span
                  key={`milestone-${activeMilestone}`}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                  className="absolute text-[12px] md:text-[14px] text-[#D4AF6A] font-mono tracking-[0.3em] uppercase"
                >
                  {milestones[activeMilestone]}
                </motion.span>
              )}

              {phase === 3 && (
                <motion.h2
                  key="final-text"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-xl md:text-2xl text-[#F5F5F5] font-display italic tracking-widest whitespace-nowrap"
                  style={{ fontWeight: 300 }}
                >
                  ARCHITECTING DIGITAL AUTHORITY
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
