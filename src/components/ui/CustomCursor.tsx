'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorProvider';

/* =========================================================
   PREMIUM CUSTOM CURSOR
   Sleek magnetic interactions, gold accents, no blend mode glitches.
   ========================================================= */

function CustomCursor() {
  const { cursor } = useCursor();
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Buttery smooth spring physics for the cursor
  const springX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      rafRef.current = null;
      if (!visible) setVisible(true);
    });
  }, [cursorX, cursorY, visible]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    
    // Hide entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const isTouchDevice = mounted && typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (!mounted || isTouchDevice) return null;

  const isHover = cursor.type === 'hover';
  const isLink = cursor.type === 'link';

  // Dynamic configuration based on state
  let size = 8; // Tiny, precise gold dot by default
  let bg = '#B8956A';
  let border = '0px solid #B8956A';
  let mixBlendMode: any = 'normal';

  if (isHover) {
    // Large solid gold circle for explicit hover states (like "EMAIL")
    size = 80;
    bg = '#B8956A';
    border = '0px solid transparent';
  } else if (isLink) {
    // Elegant crisp ring that expands out from the dot
    size = 40;
    bg = 'transparent';
    border = '1px solid rgba(184, 149, 106, 0.8)';
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        border: border,
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: mixBlendMode,
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: bg,
        border: border,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: '#0A0A0A', // Dark text on solid gold
          textTransform: 'uppercase',
          opacity: isHover && cursor.label ? 1 : 0,
          whiteSpace: 'nowrap',
          transition: 'opacity 0.2s ease',
        }}
      >
        {cursor.label}
      </span>
    </motion.div>
  );
}

export default memo(CustomCursor);
