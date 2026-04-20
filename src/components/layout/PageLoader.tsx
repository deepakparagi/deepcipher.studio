'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================
   PageLoader — Cinematic 8-phase loader
   ======================================== */

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Check if we've already seen the loader this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('dc_seen')) {
      setIsVisible(false);
      return;
    }

    // Set overflow hidden on mount (client only)
    document.body.style.overflow = 'hidden';

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 200),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1400),
      setTimeout(() => setPhase(6), 2000),
      setTimeout(() => setPhase(7), 2400),
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('dc_seen', '1');
        document.body.style.overflow = '';
      }, 3200),
    ];

    return () => {
      timers.forEach(clearTimeout);
      // Ensure overflow is restored if component unmounts unexpectedly
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: '#0C0C0C',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Phase 1: Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '30%',
              right: '30%',
              height: '1px',
              backgroundColor: 'rgba(184,149,106,0.3)',
              transformOrigin: 'center',
            }}
          />

          {/* Phase 2: DC Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              scale: phase >= 6 ? [1, 1.04, 1] : phase >= 2 ? 1 : 0.88,
              filter: phase >= 2 ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={
              phase >= 6 
                ? { duration: 1, ease: 'easeInOut' }
                : { type: 'spring', stiffness: 160, damping: 18 }
            }
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(72px, 10vw, 120px)',
              color: '#fff',
              zIndex: 2,
            }}
          >
            DC
          </motion.div>

          {/* Phase 3: DEEPCIPHER wordmark */}
          <motion.div
            style={{
              display: 'flex',
              gap: '4px',
              marginTop: '20px',
              zIndex: 2,
            }}
          >
            {'DEEPCIPHER'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 6, opacity: 0 }}
                animate={{
                  y: phase >= 3 ? 0 : 6,
                  opacity: phase >= 3 ? 1 : 0,
                }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontWeight: 300,
                  fontSize: 'clamp(10px, 1.3vw, 14px)',
                  color: '#B8956A',
                  letterSpacing: '0.4em',
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Phase 4: Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '12px',
              zIndex: 2,
            }}
          >
            Web Design & Brand Identity Studio
          </motion.div>

          {/* Phase 5: Counter + Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '32px',
              right: '32px',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <CounterText active={phase >= 5} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 5 ? 0.4 : 0 }}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  color: '#fff',
                }}
              >
                MMXXIV
              </motion.span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 5 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, #B8956A, transparent)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>

          {/* Orbiting particles */}
          {phase >= 2 && [0, 1, 2, 3].map((i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2,
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80px',
                height: '80px',
                marginTop: '-40px',
                marginLeft: '-40px',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(184,149,106,0.5)',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  marginLeft: '-2px',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Counter sub-component */
function CounterText({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 12);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        color: '#fff',
        opacity: 0.6,
      }}
    >
      {String(count).padStart(3, '0')}
    </span>
  );
}
