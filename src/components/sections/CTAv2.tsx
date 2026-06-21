'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import AnimatedText from '../ui/AnimatedText';

/* ========================================
   Section 11 — Final CTA (Elite Redesign)
   ======================================== */

// Custom Magnetic Wrap Component for the elite button
function MagneticWrap({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Extra smooth spring for elite feel
  const smoothX = useSpring(x, { stiffness: 100, damping: 15, mass: 0.1 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull (20% of distance)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`relative z-20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function CTAv2() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden flex flex-col items-center justify-between"
      style={{ 
        backgroundColor: '#000000',
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 15vh, 200px)',
        paddingBottom: '40px',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
      }}
    >
      {/* ── Elite Aura Background ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle 800px at var(--x) var(--y), rgba(184,149,106,0.08), transparent 80%)',
          // @ts-ignore
          '--x': useTransform(smoothX, x => `${x}px`),
          '--y': useTransform(smoothY, y => `${y}px`),
        }}
      />
      
      {/* ── High-End Film Grain Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px'
        }}
      />
      
      {/* ── Vignette Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #000000 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[1400px] flex-1">
        {/* ── Top Label ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 mb-20"
        >
          <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-[rgba(184,149,106,0.5)] to-transparent" />
          <SectionLabel className="text-[#6B6560] tracking-[0.4em] uppercase text-[10px]">
            [ The Next Chapter ]
          </SectionLabel>
        </motion.div>

        {/* ── Elite Typography Section ── */}
        <div className="relative z-10 flex flex-col items-center text-center w-full mb-16">
          <div className="m-0 flex flex-col items-center justify-center w-full relative">
            {/* Top Line */}
            <AnimatedText
              splitBy="word"
              as="span"
              className="block tracking-tighter"
              style={{ 
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontSize: 'clamp(50px, 12vw, 180px)',
                color: '#FFFFFF',
                lineHeight: 0.9,
                textShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            >
              Let's build
            </AnimatedText>
            
            {/* Vignette effect removed from here, added at the section level below instead of the sharp rectangle */}

            {/* Middle Line - Gold Italic */}
            <AnimatedText
              splitBy="word"
              as="span"
              className="block italic relative z-10"
              style={{ 
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontSize: 'clamp(54px, 13vw, 200px)',
                color: '#B8956A',
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                marginTop: '-0.1em', // Tighter leading
                textShadow: '0 20px 80px rgba(184,149,106,0.2), 0 0 40px rgba(184,149,106,0.1)',
                paddingBottom: '20px' // Descender safe space
              }}
            >
              the unforgettable.
            </AnimatedText>
          </div>

          {/* Supporting Text */}
          <motion.p
            className="m-0 mt-16 max-w-[600px] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              fontWeight: 300,
              color: '#8A847F',
              lineHeight: 1.8,
            }}>
              We partner with ambitious brands to design digital experiences that command attention, shift perceptions, and drive measurable revenue.
            </span>
            <span className="block mt-4 text-[#B8956A]" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Only 8 slots available per year.
            </span>
          </motion.p>
        </div>

        {/* ── Magnetic Rotating CTA ── */}
        <motion.div 
          className="relative z-20 mt-12 flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticWrap>
            <Link 
              href="/contact"
              className="group relative flex items-center justify-center w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full text-decoration-none"
            >
              {/* Spinning SVG Text */}
              <motion.div 
                className="absolute inset-[-20px] z-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#B8956A] opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <path id="textPath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                  <text fill="currentColor" fontSize="12" letterSpacing="4" style={{ fontFamily: 'var(--font-mono)' }}>
                    <textPath href="#textPath" startOffset="0%" textLength="471" lengthAdjust="spacingAndGlyphs">
                      START A PROJECT • START A PROJECT • START A PROJECT • 
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Inner Dark Circle */}
              <div className="absolute inset-[15px] rounded-full bg-[#050505] border border-[rgba(184,149,106,0.2)] group-hover:border-[rgba(184,149,106,0.8)] group-hover:bg-[rgba(184,149,106,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center z-10 overflow-hidden shadow-[0_0_30px_rgba(184,149,106,0)] group-hover:shadow-[0_0_40px_rgba(184,149,106,0.15)]">
                 
                 {/* Internal Hover Glow */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,149,106,0.4)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />

                 <span className="relative z-20 text-[#F5F0E8] group-hover:text-[#FFFFFF] transition-colors duration-500" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.2em' }}>
                   BEGIN
                 </span>
              </div>
            </Link>
          </MagneticWrap>
        </motion.div>
      </div>

      {/* ── Elite Architectural Footer Row ── */}
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* Animated Top Border */}
        <motion.div 
          className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent"
          initial={{ width: "0%", left: "50%" }}
          whileInView={{ width: "100%", left: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Left: General Inquiries */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
            General Inquiries
          </div>
          <a 
            href="mailto:hello@deepcipher.studio"
            className="relative inline-block"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', color: '#F5F0E8', textDecoration: 'none', letterSpacing: '0.05em' }}
          >
            hello@deepcipher.studio
            {/* Elite underline hover effect */}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8956A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
          </a>
        </div>

        {/* Center: Core Value */}
        <div className="flex flex-col items-center text-center">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '0.2em' }}>
            No retainers. No lock-ins.
          </div>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', color: '#F5F0E8', letterSpacing: '0.05em', textTransform: 'uppercase', paddingLeft: '0.05em' }}>
            Just exceptional work.
          </div>
        </div>

        {/* Right: Location */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', marginRight: '-0.2em' }}>
            Location
          </div>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', color: '#F5F0E8', letterSpacing: '0.05em', textTransform: 'uppercase', marginRight: '-0.05em' }}>
            GLOBAL / REMOTE
          </div>
        </div>
      </motion.div>

    </section>
  );
}
