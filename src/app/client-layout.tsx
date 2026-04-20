'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';
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

/* ========================================
   Client Layout — wraps providers + chrome
   ======================================== */

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Protect against GC layout leakage from pinned timelines
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname]);

  return (
    <CursorProvider>
      <LenisProvider>
        <AnimatePresence>
          {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
        </AnimatePresence>
        
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        {/* Cinematic Page Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              paddingTop: (pathname === '/' || (pathname.startsWith('/work/') && pathname !== '/work')) ? '0px' : '68px',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="page-wrapper flex-grow"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </LenisProvider>
    </CursorProvider>
  );
}
