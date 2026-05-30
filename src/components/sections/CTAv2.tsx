'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';

/* ========================================
   Section 11 — Final CTA (Premium Redesign)
   ======================================== */

export default function CTAv2() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the spotlight
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.5 });

  // Handle mouse move over the section
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }, [mouseX, mouseY]);

  // Initialize mouse to center on mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center cursor-crosshair pb-12"
      style={{ 
        backgroundColor: '#050505',
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 15vh, 200px)',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
      }}
    >
      {/* ── Spotlight / Flashlight Background Effect ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle 600px at var(--x) var(--y), rgba(184,149,106,0.12), transparent 80%)',
          // @ts-ignore
          '--x': useTransform(smoothX, x => `${x}px`),
          '--y': useTransform(smoothY, y => `${y}px`),
        }}
      />

      {/* ── Grid Noise Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* ── Top Label ── */}
      <div className="relative z-10 w-full max-w-[1400px] flex justify-center mb-16">
        <SectionLabel className="text-[rgba(255,255,255,0.3)] tracking-[0.3em] uppercase">
          [ The Next Chapter ]
        </SectionLabel>
      </div>

      {/* ── Massive Kinetic Typography ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1400px] w-full">
        <motion.h2 
          className="m-0 flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#ffffff',
          }}
        >
          {/* Top Line */}
          <span 
            className="block text-transparent bg-clip-text"
            style={{ 
              fontSize: 'clamp(60px, 10vw, 150px)',
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.6) 100%)',
              letterSpacing: '-0.02em',
              marginBottom: '10px'
            }}
          >
            Let's build
          </span>
          
          {/* Middle Line - Italicized and Gold */}
          <span 
            className="block italic relative"
            style={{ 
              fontSize: 'clamp(70px, 12vw, 190px)',
              color: '#B8956A',
              letterSpacing: '-0.03em',
              textShadow: '0 20px 60px rgba(184,149,106,0.3)',
              paddingBottom: '20px' // Extra padding for descenders
            }}
          >
            the unforgettable.
          </span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          className="m-0 mt-32 max-w-xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.8,
          }}
        >
          We partner with ambitious brands to design digital experiences that command attention, shift perceptions, and drive measurable revenue. Only 8 slots available per year.
        </motion.p>
      </div>

      {/* ── Giant Magnetic CTA Button (Refined Design) ── */}
      <motion.div 
        className="relative z-20 mt-28"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Link 
          href="/start-a-project"
          className="group relative flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: 'clamp(140px, 16vw, 200px)',
            height: 'clamp(140px, 16vw, 200px)',
            textDecoration: 'none',
          }}
        >
          {/* Base Ring - Dark Glassmorphism */}
          <div 
            className="absolute inset-0 rounded-full border border-[rgba(184,149,106,0.4)] bg-[rgba(184,149,106,0.03)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[rgba(184,149,106,0.15)] group-hover:border-[rgba(184,149,106,0.8)]"
          />

          {/* Hover Scaling Glow */}
          <div 
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(184,149,106,0.4)_0%,transparent_70%)] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          />

          {/* Button Text */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
            <span 
              className="group-hover:text-[#FFFFFF] transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'clamp(10px, 1vw, 13px)',
                color: '#B8956A',
                fontWeight: 500,
                letterSpacing: '0.2em',
                lineHeight: 1.5,
                textAlign: 'center',
              }}
            >
              START<br/>PROJECT
            </span>
          </div>
        </Link>
      </motion.div>

      {/* ── Footer Contact Links ── */}
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] flex flex-col md:flex-row items-center md:items-start justify-between mt-32 gap-8 border-t border-[rgba(255,255,255,0.05)] pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Left: General Inquiries */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.5 }}>
            General Inquiries
          </span>
          <a 
            href="mailto:hello@deepcipher.studio"
            className="nav-link-underline"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '13px', color: '#fff', textDecoration: 'none', lineHeight: 1.5, letterSpacing: '0.05em' }}
          >
            hello@deepcipher.studio
          </a>
        </div>

        {/* Center: Core Value */}
        <div className="flex flex-col items-center gap-3">
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.5 }}>
            No retainers. No lock-ins.
          </span>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '13px', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.5 }}>
            Just exceptional work.
          </span>
        </div>

        {/* Right: Location */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.5 }}>
            Location
          </span>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '13px', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.5 }}>
            GLOBAL / REMOTE
          </span>
        </div>
      </motion.div>

    </section>
  );
}
