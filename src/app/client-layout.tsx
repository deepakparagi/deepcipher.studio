'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CursorProvider } from '@/components/ui/CursorProvider';
import LenisProvider from '@/components/layout/LenisProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const GrainOverlay = dynamic(() => import('@/components/layout/GrainOverlay'), { ssr: false });
const WebsiteLoader = dynamic(() => import('@/components/ui/WebsiteLoader'), { ssr: false });
const RouteLoadingIndicator = dynamic(() => import('@/components/layout/RouteLoadingIndicator'), { ssr: false });

/* ========================================
   Client Layout — wraps providers + chrome
   ======================================== */

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pageOffset = useMemo(() => '0px', []);

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
            <WebsiteLoader onFinished={() => setLoading(false)} />
          </AnimatePresence>
        )}
        
        <CustomCursor />
        <GrainOverlay />
        <RouteLoadingIndicator />
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
