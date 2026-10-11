'use client';

import { Component, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import HomeMarquee from '@/components/sections/HomeMarquee';
import { motion } from 'framer-motion';

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false, loading: () => null });
const SelectedProjects = dynamic(() => import('@/components/sections/SelectedProjects'), { loading: () => null });
const TestimonialsGrid = dynamic(() => import('@/components/sections/TestimonialsGrid'), { loading: () => null });
const ServicesV2 = dynamic(() => import('@/components/sections/ServicesV2'), { loading: () => null });

const CTAv2 = dynamic(() => import('@/components/sections/CTAv2'), { ssr: false, loading: () => null });

/* ========================================
   Error Boundary — prevents blank page
   if a section (e.g. Three.js Hero) crashes
   ======================================== */

interface EBProps { children: ReactNode; fallback?: ReactNode }
interface EBState { hasError: boolean }

class SectionErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error('[DEEPCIPHER] Section crashed:', error.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/* ========================================
   Home Client Orchestrator
   ======================================== */



/* Hero fallback if WebGL/Three.js crashes */
function HeroFallback() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(120px, 15vh, 160px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px)',
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 5.2vw, 5.4rem)',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          color: '#fff',
          margin: 0,
        }}
      >
        <span style={{ color: '#F5F0E8' }}>Ideas <span className="font-citadel italic" style={{ color: '#F5F0E8' }}>into</span></span>
        <span style={{ display: 'block', color: '#3049E8' }}>Real Products</span>
      </h1>
      <p
        style={{
          fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.65)',
          maxWidth: '430px',
          lineHeight: 1.65,
          marginTop: '24px',
          textTransform: 'uppercase',
        }}
      >
        WE BUILD WEBSITES, AI SOLUTIONS &amp;<br />
        AUTOMATIONS THAT CREATE REAL IMPACT.
      </p>
    </section>
  );
}

export default function HomeClient() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hero + Marquee combined view — fits 100% in a single screen window */}
      <div
        className="hero-marquee-wrapper relative w-full overflow-hidden flex flex-col justify-between"
        style={{
          height: 'calc(100dvh - 72px)',
          minHeight: '480px',
        }}
      >
        <SectionErrorBoundary fallback={<HeroFallback />}>
          <Hero />
        </SectionErrorBoundary>
        <HomeMarquee />
      </div>
      <SectionErrorBoundary>
        <SelectedProjects />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <TestimonialsGrid />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ServicesV2 />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <CTAv2 />
      </SectionErrorBoundary>
    </motion.main>
  );
}

