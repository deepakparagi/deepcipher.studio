'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * RouteLoadingIndicator — Premium top-edge progress bar for route transitions.
 * - Prevents flickering by only displaying if route transition takes > 150ms
 * - Enters slow-loading state after 3000ms with subtle warning tint
 * - Automatically dismisses and resets when route change completes
 * - Fully accessible and compliant with prefers-reduced-motion
 */
export default function RouteLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const [isLoading, setIsLoading] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear pending timers and dismiss indicator when pathname or searchParams change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    setIsLoading(false);
    setIsSlow(false);
  }, [pathname, searchParams]);

  // Intercept in-app link clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external links, hash anchors, same-page links, new-tab clicks, modifier keys
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        target.target === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      // Start anti-flicker delay (150ms)
      if (timerRef.current) clearTimeout(timerRef.current);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);

      timerRef.current = setTimeout(() => {
        setIsLoading(true);

        // Slow loading threshold (3000ms)
        slowTimerRef.current = setTimeout(() => {
          setIsSlow(true);
        }, 3000);
      }, 150);
    };

    document.addEventListener('click', handleLinkClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          role="progressbar"
          aria-label={isSlow ? 'Page transition taking longer than usual' : 'Navigating to page'}
          aria-live="polite"
          aria-valuemin={0}
          aria-valuemax={100}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[100000] pointer-events-none h-[2px] bg-transparent"
        >
          <motion.div
            className="h-full"
            style={{
              background: isSlow
                ? 'linear-gradient(90deg, #D4A373, #E09F3E)'
                : 'linear-gradient(90deg, transparent, #354BFF, #6879FF)',
              width: '40%',
            }}
            animate={{
              x: ['-100%', '300%'],
            }}
            transition={{
              repeat: Infinity,
              duration: shouldReduceMotion ? 0 : 1.2,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
