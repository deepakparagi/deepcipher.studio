'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorProvider';

/* ========================================
   MagneticButton — Magnetic hover effect
   4 variants: filled, outline, ghost, dark
   ======================================== */

interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'filled' | 'outline' | 'ghost' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
  cursorLabel?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const variantStyles: Record<string, React.CSSProperties> = {
  filled: {
    backgroundColor: 'var(--ink)',
    color: '#fff',
    padding: '16px 36px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    border: 'none',
  },
  outline: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'var(--ink)',
    padding: '16px 36px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    border: '1px solid var(--border-strong)',
  },
  ghost: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'var(--ink-tertiary)',
    padding: '8px 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    border: 'none',
  },
  dark: {
    backgroundColor: '#fff',
    color: 'var(--ink)',
    padding: '16px 36px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    border: 'none',
  },
};

export default function MagneticButton({
  children,
  variant = 'filled',
  href,
  onClick,
  className = '',
  cursorLabel = 'VIEW',
  fullWidth = false,
  style = {},
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  const innerX = useSpring(x, { stiffness: 120, damping: 14 });
  const innerY = useSpring(y, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    resetCursor();
  };

  const handleMouseEnter = () => {
    setCursor('hover', cursorLabel);
  };

  const combinedStyle = {
    ...variantStyles[variant],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative' as const,
    textDecoration: 'none',
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  const content = (
    <motion.div
      ref={ref}
      style={{
        ...combinedStyle,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.97 }}
      className={`btn-interaction ${className}`}
    >
      <motion.span
        style={{
          x: innerX,
          y: innerY,
          display: 'inline-block',
          transform: 'scale(0.55)',
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  return <div onClick={onClick}>{content}</div>;
}
