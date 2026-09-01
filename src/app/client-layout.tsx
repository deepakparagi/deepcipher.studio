'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { CursorProvider } from '@/components/ui/CursorProvider';
import LenisProvider from '@/components/layout/LenisProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const GrainOverlay = dynamic(() => import('@/components/layout/GrainOverlay'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false });

function RouteLoader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display text-[42px] leading-none text-[#F5F0E8]">
              DC
            </div>
            <div className="h-px w-36 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-full origin-left bg-[#B8956A]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span
              className="text-[9px] uppercase tracking-[0.34em] text-[#B8956A]/70"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 300 }}
            >
              Loading
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ========================================
   Client Layout — wraps providers + chrome
   ======================================== */

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pageOffset = useMemo(
    () =>
      pathname === '/' ||
      pathname.startsWith('/work') ||
      pathname === '/services' ||
      pathname === '/process' ||
      pathname === '/about' ||
      pathname === '/contact'
        ? '0px'
        : '68px',
    [pathname]
  );

  useEffect(() => {
    setMounted(true);
    try {
      if (!sessionStorage.getItem('dc_visited')) {
        setLoading(true);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  // Protect against GC layout leakage from pinned timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    return () => window.clearTimeout(refreshTimer);
  }, [pathname]);

  return (
    <CursorProvider>
      <LenisProvider>
        {mounted && loading && (
          <AnimatePresence>
            <LoadingScreen onFinished={() => setLoading(false)} />
          </AnimatePresence>
        )}
        
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        {/* Page Transitions (Optimized for 120Hz) */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            paddingTop: pageOffset,
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translate3d(0,0,0)',
            willChange: 'opacity',
          }}
          className="page-wrapper flex-grow"
        >
          {children}
        </motion.div>
        <Footer />
      </LenisProvider>
    </CursorProvider>
  );
}
