'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode } from 'react';

/* ========================================
   AccordionItem — FAQ section component
   ======================================== */

interface AccordionItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        cursor: 'pointer',
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: '17px',
            color: 'var(--ink)',
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '24px',
            color: 'var(--ink-tertiary)',
            flexShrink: 0,
            marginLeft: '16px',
          }}
        >
          +
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                paddingTop: '12px',
                paddingBottom: '4px',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '15px',
                color: 'var(--ink-tertiary)',
                lineHeight: 1.85,
                maxWidth: '672px',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
