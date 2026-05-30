'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useCursor } from './CursorProvider';

/* ========================================
   CustomCursor — Context-aware cursor
   Starts off-screen at (-100,-100) and only
   becomes visible after the first real mouse
   movement. Prevents ghost dot at (0,0).
   ======================================== */

export default function CustomCursor() {
  const { cursor } = useCursor();
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  // Ghost dots (Comet tail)
  const ghost1X = useSpring(cursorX, { stiffness: 120, damping: 24 });
  const ghost1Y = useSpring(cursorY, { stiffness: 120, damping: 24 });
  const ghost2X = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const ghost2Y = useSpring(cursorY, { stiffness: 80, damping: 20 });
  const ghost3X = useSpring(cursorX, { stiffness: 45, damping: 16 });
  const ghost3Y = useSpring(cursorY, { stiffness: 45, damping: 16 });

  const ringX = useSpring(cursorX, { stiffness: 80, damping: 16 });
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 16 });

  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, visible]);

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const isHover = cursor.type === 'hover';
  const isLink = cursor.type === 'link';

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
      {/* Dot */}
      <motion.div
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-warm)',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHover || isLink ? 0 : 1,
          opacity: isHover || isLink ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Ghost Dots (Tail) */}
      {[
        { x: ghost1X, y: ghost1Y, opacity: 0.3 },
        { x: ghost2X, y: ghost2Y, opacity: 0.15 },
        { x: ghost3X, y: ghost3Y, opacity: 0.05 }
      ].map((ghost, i) => (
        <motion.div
          key={i}
          className="custom-cursor hidden md:block"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: ghost.x,
            y: ghost.y,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'var(--accent-warm)',
            pointerEvents: 'none',
            zIndex: 9998 - i,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHover || isLink ? 0 : 1,
            opacity: isHover || isLink ? 0 : ghost.opacity,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}

      {/* Ring / Hover circle */}
      <motion.div
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          pointerEvents: 'none',
          zIndex: 9998,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: isHover ? 72 : isLink ? 32 : 0,
          height: isHover ? 72 : isLink ? 32 : 0,
          borderRadius: '50%',
          backgroundColor: isHover
            ? 'var(--accent-warm)'
            : 'rgba(0,0,0,0)',
          border: isLink
            ? '1.5px solid var(--accent-warm)'
            : 'none',
          opacity: isHover || isLink ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 22,
        }}
      >
        {isHover && cursor.label && (
          <motion.span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: '#0A0A0A',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {cursor.label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
