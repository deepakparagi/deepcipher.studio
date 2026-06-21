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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    let gsapRef: typeof import('gsap').default | null = null;

    const initLenis = async () => {
      try {
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
        gsap.ticker.lagSmoothing(0);

        /* ── Delayed refresh to ensure correct measurements ── */
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      } catch (e) {
        console.warn('Lenis or GSAP failed to initialize:', e);
      }
    };

    if (isMobile) return;

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isMobile]);

  useAnimationFrame((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
  });

  return <>{children}</>;
}
