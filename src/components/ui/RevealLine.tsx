'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

/* ========================================
   RevealLine — Single line slide up
   ======================================== */

interface RevealLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealLine({
  children,
  className = '',
  delay = 0,
}: RevealLineProps) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        className={className}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
