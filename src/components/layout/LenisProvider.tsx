'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* ========================================
   LenisProvider — Smooth Scroll
   Synced with GSAP ScrollTrigger
   ======================================== */

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);

  useEffect(() => {
    let tickerCb: ((time: number) => void) | null = null;
    let gsapRef: typeof import('gsap').default | null = null;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule;
      gsapRef = gsap as typeof import('gsap').default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      const lenisInstance = new Lenis({
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
      });

      lenisRef.current = lenisInstance;

      /* ── Critical: sync Lenis scroll events to ScrollTrigger ── */
      lenisInstance.on('scroll', ScrollTrigger.update);

      /* ── RAF loop: drive Lenis from GSAP ticker ── */
      tickerCb = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      /* ── Delayed refresh to ensure correct measurements ── */
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (gsapRef && tickerCb) {
        gsapRef.ticker.remove(tickerCb);
      }
    };
  }, []);

  return <>{children}</>;
}
