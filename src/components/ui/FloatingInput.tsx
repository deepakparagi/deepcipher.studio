'use client';

import { useState, type InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({ label, value, onFocus, onBlur, ...props }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = String(value).length > 0;

  return (
    <div className="relative mb-10 w-full group">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 16,
          scale: isFocused || hasValue ? 0.8 : 1,
          color: isFocused ? 'var(--accent-warm)' : 'var(--ink-ghost)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: 0,
          fontFamily: 'var(--font-mono), monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '11px',
          pointerEvents: 'none',
          transformOrigin: 'left top',
        }}
      >
        {label}
      </motion.label>
      <input
        {...props}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          fontFamily: 'var(--font-body), sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'var(--ink)',
          outline: 'none',
        }}
      />
      {/* Gold underline reveal */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--accent-warm)',
          transformOrigin: 'left',
          zIndex: 1,
        }}
      />
    </div>
  );
}

export function FloatingTextarea({ label, value, onFocus, onBlur, ...props }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = String(value).length > 0;

  return (
    <div className="relative mb-10 w-full group">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 16,
          scale: isFocused || hasValue ? 0.8 : 1,
          color: isFocused ? 'var(--accent-warm)' : 'var(--ink-ghost)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: 0,
          fontFamily: 'var(--font-mono), monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '11px',
          pointerEvents: 'none',
          transformOrigin: 'left top',
        }}
      >
        {label}
      </motion.label>
      <textarea
        {...props}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          fontFamily: 'var(--font-body), sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'var(--ink)',
          outline: 'none',
          resize: 'none',
          minHeight: '120px',
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--accent-warm)',
          transformOrigin: 'left',
          zIndex: 1,
        }}
      />
    </div>
  );
}
