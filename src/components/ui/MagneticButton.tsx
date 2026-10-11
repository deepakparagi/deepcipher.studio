'use client';

import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
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
    color: '#FFFFFF',
    padding: '16px 36px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    borderWidth: '1px',
    borderStyle: 'solid',
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
  const [isHovered, setIsHovered] = useState(false);
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
    setIsHovered(false);
    x.set(0);
    y.set(0);
    resetCursor();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
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
    borderWidth: '1px',
    borderStyle: 'solid',
    ...style,
  };

  const content = (
    <motion.div
      ref={ref}
      style={{
        ...combinedStyle,
        backgroundColor:
          isHovered
            ? variant === 'outline' ? '#2C3480' : '#4B5DF5'
            : variant === 'outline' ? 'rgba(255, 255, 255, 0.06)' : 'var(--ink)',
        borderColor:
          isHovered
            ? '#4B5DF5'
            : 'rgba(255, 255, 255, 0.3)',
        boxShadow:
          isHovered
            ? '0 0 35px rgba(75, 93, 245, 0.65), 0 8px 24px rgba(0, 0, 0, 0.7)'
            : '0 4px 16px rgba(0, 0, 0, 0.4)',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
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
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a href={href} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return <div onClick={onClick}>{content}</div>;
}
