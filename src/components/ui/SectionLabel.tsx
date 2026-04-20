'use client';

import { motion } from 'framer-motion';

/* ========================================
   SectionLabel — DM Mono section marker
   ======================================== */

interface SectionLabelProps {
  children: string;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({
  children,
  light = false,
  className = '',
}: SectionLabelProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 300,
        fontSize: '10px',
        lineHeight: 1,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: light ? 'rgba(255,255,255,0.4)' : 'var(--ink-ghost)',
      }}
    >
      {children}
    </motion.div>
  );
}
