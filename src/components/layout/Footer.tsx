'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';
import MagneticButton from '../ui/MagneticButton';

/* =========================================================
   FOOTER — Clean editorial closure
   ========================================================= */

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const footerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer 
      ref={footerRef}
      className="footer-container relative bg-[#0A0A0A] text-white overflow-hidden z-40 px-8 md:px-20 lg:px-28 xl:px-36 pt-32 md:pt-48"
    >
      {/* Atmospheric Spotlight */}
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

      {/* ── ZONE 1: EMAIL REVEAL ── */}
      <section className="footer-zone-1 relative z-10" style={{ paddingTop: '24px', paddingBottom: '80px', borderTop: 'none' }}>
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

      {/* ── ZONE 2: MAIN GRID ── */}
      <section className="footer-zone-2 relative z-10 w-full flex justify-center" style={{ paddingTop: '40px', paddingBottom: '0px', borderTop: 'none' }}>
        <div className="mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 xl:gap-12">
          
          {/* LEFT SIDE (5 columns) */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-5">
            <div className="mb-4 relative" style={{ width: 180, height: 60 }}>
              <img 
                src="/deepcipher_logo.png" 
                alt="DeepCipher Studio Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>
            <p className="footer-brand-tagline mb-10 text-white/60 font-light text-[14px]">
              Web Design &amp; Brand Identity Studio
            </p>
            
            <h4 className="footer-hero-headline leading-[1.1] mb-10 max-w-[420px]" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontWeight: 300 }}>
              Architecting digital authority <br/> for ambitious brands globally.
            </h4>
            
            <div className="footer-cta-wrap mb-16">
              <MagneticButton variant="outline" href="/contact" className="px-10 py-5 border border-white/10 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-[#B8956A] hover:border-[#B8956A] hover:text-[#0A0A0A] transition-all duration-500">
                START A PROJECT &rarr;
              </MagneticButton>
            </div>
            
            {/* Social links */}
            <div className="flex flex-row items-center gap-6 mt-auto">
              {[
                { label: 'INSTAGRAM ↗', href: 'https://www.instagram.com/deepcipher.ai/' },
                { label: 'LINKEDIN ↗', href: 'https://www.linkedin.com/in/deepak-paragi-501140261/' },
                { label: 'BEHANCE ↗', href: 'https://www.behance.net/' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="social-link-item group relative uppercase"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.15em',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#B8956A'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#6B6560'}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: COL 1 (2 columns) */}
          <div className="flex flex-col lg:col-span-2">
            <span 
              className="footer-nav-heading uppercase mb-10"
              style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.15em', display: 'block' }}
            >
              // NAVIGATION
            </span>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Services', href: '/services' },
                { label: 'Process', href: '/process' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="footer-nav-link"
                  style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: '14px', fontWeight: 300, color: '#9A9590', lineHeight: 1.4, transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#B8956A'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#9A9590'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: COL 2 (2 columns) */}
          <div className="flex flex-col lg:col-span-2">
            <span 
              className="footer-nav-heading uppercase mb-10"
              style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.15em', display: 'block' }}
            >
              // START A PROJECT
            </span>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Start a Project', href: '/contact' },
                { label: 'View Pricing', href: '/contact' },
                { label: 'Get in Touch', href: 'mailto:deepcipherstudio@gmail.com' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="footer-nav-link"
                  style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: '14px', fontWeight: 300, color: '#9A9590', lineHeight: 1.4, transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#B8956A'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#9A9590'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: COL 3 (3 columns) */}
          <div className="flex flex-col lg:col-span-3">
            <span 
              className="footer-nav-heading uppercase mb-10"
              style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.15em', display: 'block' }}
            >
              // STUDIO INFO
            </span>
            
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                <span className="text-white/20 text-[9px] font-mono tracking-[0.15em]">LOCATION</span>
                <span className="text-white/80 text-[12px] font-medium font-mono tracking-[0.1em]">KARNATAKA, INDIA</span>
              </div>

              <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                <span className="text-white/20 text-[9px] font-mono tracking-[0.15em]">EMAIL</span>
                <a href="mailto:deepcipherstudio@gmail.com" className="text-[var(--accent-warm)] text-[12px] font-mono tracking-[0.1em] hover:text-white transition-colors duration-300 block">
                  deepcipherstudio@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[#B8956A]/60 text-[9px] font-mono tracking-[0.15em]">AVAILABILITY</span>
                <span className="text-[#B8956A] font-medium text-[12px] font-mono tracking-[0.1em]">Open for projects — 2026</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ZONE 3: WATERMARK ── */}
      <section 
        className="footer-zone-3 relative z-10"
        style={{
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          paddingTop: '40px',
          marginTop: '40px',
        }}
      >
        <div className="watermark-container">
          <div className="watermark-text-wrap">
            <motion.h1 
              whileHover={{ letterSpacing: '0.3em' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="footer-watermark pointer-events-auto cursor-none select-none"
              onMouseEnter={() => setCursor('hover', 'TERMINAL')}
              onMouseLeave={resetCursor}
            >
              DEEPCIPHER
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── ZONE 4: BOTTOM BAR ── */}
      <section 
        className="footer-zone-4 relative z-10"
        style={{
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          paddingTop: '20px',
          marginTop: '40px',
          paddingBottom: '32px'
        }}
      >
        <div className="footer-bottom-bar flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div 
            className="bottom-left"
            style={{ 
              fontSize: '9px', 
              color: '#6B6560', 
              letterSpacing: '0.1em', 
              textTransform: 'none',
              fontFamily: 'var(--font-mono), monospace'
            }} 
          >
            © 2026 DEEPCIPHER STUDIO
          </div>
          <div 
            className="bottom-center"
            style={{ 
              fontSize: '9px', 
              color: '#6B6560', 
              letterSpacing: '0.1em',
              textTransform: 'none',
              fontFamily: 'var(--font-mono), monospace',
            }} 
          >
            WEB DESIGN & BRAND IDENTITY
          </div>
          <div 
            className="bottom-right"
            style={{ 
              fontSize: '9px', 
              color: '#6B6560', 
              letterSpacing: '0.1em',
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
