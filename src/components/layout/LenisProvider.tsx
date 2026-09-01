'use client';

import { useEffect, useRef, type ReactNode, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';

/* ========================================
   LenisProvider — Smooth Scroll
   Synced with GSAP ScrollTrigger & Framer Motion
   ======================================== */

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);

  useEffect(() => {
    let lenisInstance: InstanceType<typeof import('lenis').default> | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let gsapObj: any = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule;
        gsapObj = gsap;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');

        gsap.registerPlugin(ScrollTrigger);

        // 120Hz Optimized Lenis Configuration
        lenisInstance = new Lenis({
          duration: 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          syncTouch: false,
        });

        lenisRef.current = lenisInstance;

        // Sync with GSAP ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        tickerCallback = (time: number) => {
          lenisInstance?.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.refresh();
      } catch (e) {
        console.warn('Lenis or GSAP failed to initialize:', e);
      }
    };

    initLenis();

    return () => {
      if (gsapObj && tickerCallback) {
        gsapObj.ticker.remove(tickerCallback);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
