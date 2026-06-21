'use client';

import { Component, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import HomeMarquee from '@/components/sections/HomeMarquee';
import { motion } from 'framer-motion';

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false, loading: () => null });
const SelectedProjects = dynamic(() => import('@/components/sections/SelectedProjects'), { loading: () => null });
const TestimonialsGrid = dynamic(() => import('@/components/sections/TestimonialsGrid'), { loading: () => null });
const ServicesV2 = dynamic(() => import('@/components/sections/ServicesV2'), { loading: () => null });
const ProcessTeaser = dynamic(() => import('@/components/sections/ProcessTeaser'), { ssr: false, loading: () => null });
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
        justifyContent: 'flex-end',
        padding: 'clamp(120px, 15vh, 160px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px)',
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display), serif",
          color: '#fff',
          margin: 0,
          lineHeight: 0.9,
        }}
      >
        <span className="upright" style={{ display: 'block', fontSize: 'clamp(60px, 9vw, 130px)' }}>WHERE VISION</span>
        <span className="italic" style={{ display: 'block', marginLeft: 'clamp(48px, 6vw, 120px)', color: '#B8956A', fontSize: 'clamp(60px, 9vw, 130px)' }}>MEETS</span>
        <span className="upright" style={{ display: 'block', fontSize: 'clamp(60px, 9vw, 130px)' }}>EXECUTION<span style={{ color: '#B8956A' }}>.</span></span>
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '520px',
          lineHeight: 1.85,
          marginTop: '48px',
        }}
      >
        Most businesses have the vision. Few have the digital presence to match it.
        We close that gap — with custom websites and brand identities engineered to
        convert, built to endure, and impossible to ignore.
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
      <SectionErrorBoundary fallback={<HeroFallback />}>
        <Hero />
      </SectionErrorBoundary>
      <HomeMarquee />
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
        <ProcessTeaser />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <CTAv2 />
      </SectionErrorBoundary>
    </motion.main>
  );
}

