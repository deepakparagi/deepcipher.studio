'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';
import MagneticButton from '../ui/MagneticButton';

/* ==========================================================
   v8: THE ELITE CLOSURE — FOOTER
   Architecture: Massive Asymmetric Layout, Technical HUD Grids, 1px Precision.
   Theme: Onyx & Warm Gold.
   ========================================================== */

const footerNav = {
  MANIFEST: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'About', href: '/about' },
  ],
  CONNECTED: [
    { label: 'Start a Project', href: '/start-a-project' },
    { label: 'View Pricing', href: '/contact' },
    { label: 'Contact', href: 'mailto:deepcipherstudio@gmail.com' },
  ],
  NODES: [
    { label: 'Instagram', href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

function FooterNavLink({ href, label, index }: { href: string; label: string; index: number }) {
  const { setCursor, resetCursor } = useCursor();
  return (
    <li>
      <Link
        href={href}
        onMouseEnter={() => setCursor('link')}
        onMouseLeave={resetCursor}
        className="footer-nav-link group flex items-center gap-3 py-1.5"
      >
        <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          {String(index).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-white/10 select-none">/</span>
        <span className="relative overflow-hidden inline-block">
          <span className="inline-block font-display font-light italic text-[18px] text-white/45 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1">
            {label}
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const footerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer 
      ref={footerRef}
      className="footer-container relative bg-[#0A0A0A] text-white overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {/* 01. THE ATMOSPHERIC SPOTLIGHT */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle, rgba(184,149,106,0.065) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── ZONE 1: THE EMAIL REVEAL ────────────────── */}
      <section className="footer-zone-1 relative z-10">
        <div className="email-reveal-wrap">
          <div className="email-hairline" />
          <motion.a 
            href="mailto:deepcipherstudio@gmail.com"
            onMouseEnter={() => setCursor('hover', 'EMAIL')}
            onMouseLeave={resetCursor}
            className="email-link"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            DEEPCIPHERSTUDIO@GMAIL.COM
          </motion.a>
          <div className="email-hairline" />
        </div>
      </section>

      {/* ── ZONE 2: THE MAIN GRID ─────────────────── */}
      <section className="footer-zone-2 relative z-10">
        <div className="footer-main-grid">
          
          {/* Left Column: Brand Statement */}
          <div className="footer-left-col flex flex-col items-start">
            <h3 className="footer-wordmark flex items-center gap-2">
              DEEPCIPHER <span className="text-[var(--accent-warm)]">·</span> STUDIO
            </h3>
            <p className="footer-brand-tagline" style={{ marginBottom: '16px' }}>Web Design &amp; Brand Identity Studio</p>
            
            <h4 className="footer-hero-headline leading-tight" style={{ marginTop: '0px', marginBottom: '24px' }}>
              Architecting digital authority for ambitious brands globally.
            </h4>
            
            <div className="footer-cta-wrap">
              <MagneticButton variant="outline" href="/start-a-project" className="px-12 py-6 border border-white/10 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all">
                Initialize_Mission &rarr;
              </MagneticButton>
            </div>
            
            {/* Social Icons row (flat links display horizontally with 24px gap, 32px below the tagline/CTA) */}
            <div className="flex items-center gap-[24px] mt-[32px] select-none flex-wrap">
              <a 
                href="https://www.instagram.com/deepcipher.ai/" 
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative font-mono text-[10px] tracking-[0.15em] text-[#6B6560] hover:text-[#B8956A] transition-colors duration-500 uppercase pb-1"
              >
                INSTAGRAM ↗
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </a>

              <a 
                href="https://linkedin.com/in/deepakparagi" 
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative font-mono text-[10px] tracking-[0.15em] text-[#6B6560] hover:text-[#B8956A] transition-colors duration-500 uppercase pb-1"
              >
                LINKEDIN ↗
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </a>

              <a 
                href="https://behance.net/deepakparagi" 
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative font-mono text-[10px] tracking-[0.15em] text-[#6B6560] hover:text-[#B8956A] transition-colors duration-500 uppercase pb-1"
              >
                BEHANCE ↗
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </a>
            </div>
          </div>

          {/* Right Column: 3-column subgrid */}
          <div className="footer-right-col">
            
            {/* Nav: MANIFEST */}
            <div className="flex flex-col gap-6">
              <span className="footer-nav-heading font-mono text-[9px] text-[var(--accent-warm)] tracking-[0.3em] uppercase opacity-75">
                // NAVIGATION
              </span>
              <ul className="footer-nav-list flex flex-col gap-3">
                {footerNav.MANIFEST.map((link, idx) => (
                  <FooterNavLink 
                    key={link.label} 
                    href={link.href} 
                    label={link.label} 
                    index={idx + 1} 
                  />
                ))}
              </ul>
            </div>

            {/* Nav: CONNECTED */}
            <div className="flex flex-col gap-6">
              <span className="footer-nav-heading font-mono text-[9px] text-[var(--accent-warm)] tracking-[0.3em] uppercase opacity-75">
                // START A PROJECT
              </span>
              <ul className="footer-nav-list flex flex-col gap-3">
                {footerNav.CONNECTED.map((link, idx) => (
                  <FooterNavLink 
                    key={link.label} 
                    href={link.href} 
                    label={link.label} 
                    index={idx + 5} 
                  />
                ))}
              </ul>
            </div>

            {/* Technical HUD Metrics Column */}
            <div className="flex flex-col gap-6 font-mono">
              <span className="footer-nav-heading text-[9px] text-[var(--accent-warm)] tracking-[0.3em] uppercase opacity-75">
                // STUDIO INFO
              </span>
              
              <div className="flex flex-col gap-4 text-[10px] tracking-[0.15em]">
                <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                  <span className="text-white/20 text-[8px]">// LOCATION</span>
                  <span className="text-white/60 font-medium">INDIA — GLOBAL</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
                  <span className="text-white/20 text-[8px]">// CONTACT</span>
                  <a href="mailto:deepcipherstudio@gmail.com" className="text-[var(--accent-warm)] hover:text-white transition-colors duration-300 block mb-1">
                    deepcipherstudio@gmail.com
                  </a>
                  <a href="tel:+918197174493" className="text-white/60 hover:text-[var(--accent-warm)] transition-colors duration-300 block">
                    +91 8197174493
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#B8956A] text-[8px]">// AVAILABILITY</span>
                  <span className="text-[#B8956A] font-medium text-[10px]">Open for projects — 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ZONE 3: BOLD WORDMARK STATEMENT ──── */}
      <section className="footer-zone-3 relative z-10">
        <div className="watermark-container">
          <div className="watermark-text-wrap">
            <motion.h1 
              whileHover={{ letterSpacing: '0.45em' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="footer-watermark pointer-events-auto cursor-none select-none"
              onMouseEnter={() => setCursor('hover', 'TERMINAL')}
              onMouseLeave={resetCursor}
            >
              DEEPCIPHER
            </motion.h1>
          </div>
        </div>
        <div className="footer-wordmark-rule" />
      </section>

      {/* ── ZONE 4: BOTTOM BAR ────────────────── */}
      <section className="footer-zone-4 relative z-10">
        <div className="footer-bottom-bar">
          <div 
            className="bottom-item bottom-left" 
            style={{ 
              fontSize: '10px', 
              color: '#6B6560', 
              letterSpacing: '0.15em', 
              textTransform: 'none',
              fontFamily: 'var(--font-mono), monospace'
            }}
          >
            © 2026 DEEPCIPHER STUDIO
          </div>
          <div 
            className="bottom-item bottom-center" 
            style={{ 
              fontSize: '10px', 
              color: '#6B6560', 
              letterSpacing: '0.15em',
              textTransform: 'none',
              fontFamily: 'var(--font-mono), monospace',
            }}
          >
            WEB DESIGN & BRAND IDENTITY
          </div>
          <div 
            className="bottom-item bottom-right" 
            style={{ 
              fontSize: '10px', 
              color: '#6B6560', 
              letterSpacing: '0.15em',
              textTransform: 'none',
              fontFamily: 'var(--font-mono), monospace'
            }}
          >
            BUILT WITH <span style={{ color: '#B8956A' }}>OBSESSIVE PRECISION.</span>
          </div>
        </div>
      </section>

    </footer>
  );
}
