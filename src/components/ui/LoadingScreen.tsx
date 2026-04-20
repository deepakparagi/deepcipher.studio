'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["AUTHENTIC", "CRAFTED", "PRECISION", "FUTURES", "DEEPCIPHER"];

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds total sequence
    const interval = 30; 
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const brandTimeout = setTimeout(() => setShowBrand(true), 1500);
    
    const finishTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onFinished, 1000); // Hold final state for 1s
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(brandTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinished]);

  // SVG Drawing variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2, 
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const internalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.2, 
      scale: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 0%, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-radial-at-center from-[#B8956A]/10 to-transparent" 
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative flex flex-col items-center">
        
        {/* The Prismatic SVG */}
        <div className="relative w-64 h-64 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
            {/* Outer Diamond */}
            <motion.path
              d="M50 5 L95 50 L50 95 L5 50 Z"
              stroke="white"
              strokeWidth="0.5"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            
            {/* Inner Progress Tracing */}
            <motion.path
              d="M50 5 L95 50 L50 95 L5 50 Z"
              stroke="#B8956A"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{ filter: 'drop-shadow(0 0 8px #B8956A)' }}
            />

            {/* Internal Structural Lines */}
            <motion.g variants={internalVariants} initial="hidden" animate="visible">
              <path d="M50 5 L50 95" stroke="white" strokeWidth="0.2" />
              <path d="M5 50 L95 50" stroke="white" strokeWidth="0.2" />
              <path d="M27.5 27.5 L72.5 72.5" stroke="white" strokeWidth="0.2" />
              <path d="M72.5 27.5 L27.5 72.5" stroke="white" strokeWidth="0.2" />
            </motion.g>

            {/* Glint Animation */}
            <motion.path
              d="M50 5 L95 50"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 0.3, 0],
                pathOffset: [0, 0.7, 1],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 1,
                ease: "easeInOut" 
              }}
            />
          </svg>

          {/* Glowing Center Core */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: progress / 100, opacity: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#B8956A] blur-2xl"
          />
        </div>

        {/* Branding & Text Reveal */}
        <div className="relative h-12 flex flex-col items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!showBrand ? (
              <motion.div
                key="words"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                exit={{ y: -20, opacity: 0 }}
                className="font-mono text-[10px] tracking-[0.6em] text-white/50 uppercase"
              >
                {words[Math.floor((progress / 100) * (words.length - 1))]}
              </motion.div>
            ) : (
              <motion.div
                key="brand"
                initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="font-display italic font-light text-[24px] tracking-[0.4em] text-white">
                  {Array.from("DEEPCIPHER").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.5, duration: 0.8 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-[#B8956A] to-transparent mt-2"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Binary/Status Indicators - Subtle Detail */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 font-mono text-[8px] text-white/10 tracking-[0.3em]">
          <span>CORE_INIT_0X{Math.floor(progress).toString(16).toUpperCase()}</span>
          <span>STBL_PHASE_0{Math.floor(progress / 25)}</span>
        </div>
      </div>

    </motion.div>
  );
}
