'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';
import MagneticButton from '../ui/MagneticButton';

/* ========================================
   Footer — Elite 2026 Redesign
   ======================================== */

const footerNav = {
  STUDIO: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/about#team' },
    { label: 'Milestones', href: '/about#awards' },
  ],
  WORK: [
    { label: 'Case Studies', href: '/work' },
    { label: 'Process', href: '/process' },
    { label: 'Services', href: '/services' },
    { label: 'Archive', href: '/work' },
  ],
  CONTACT: [
    { label: 'Start a Project', href: '/start-a-project' },
    { label: 'Book a Call', href: '/contact' },
    { label: 'deepcipherstudio@gmail.com', href: 'mailto:deepcipherstudio@gmail.com' },
  ],
};

const socialLinks = ['IG', 'TW', 'LI', 'BE'];

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const footerRef = useRef<HTMLElement>(null);
  
  // Mouse spotlight values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

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
      className="footer-container overflow-hidden" 
      style={{ 
        backgroundColor: 'var(--surface-dark)', 
        color: 'var(--white)', 
        position: 'relative', 
        zIndex: 40 
      }}
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Zone 1: Email Reveal Band */}
      <section className="footer-zone-1">
        <div className="email-reveal-wrap">
          <div className="email-hairline" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,149,106,0.35), transparent)' }} />
          <motion.a
            href="mailto:deepcipherstudio@gmail.com"
            className="email-link"
            onMouseEnter={() => setCursor('hover', 'HELLO')}
            onMouseLeave={resetCursor}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            deepcipherstudio@gmail.com
          </motion.a>
          <div className="email-hairline" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,149,106,0.35), transparent)' }} />
        </div>
      </section>

      {/* Zone 2: Main Footer Grid — Editorial Redesign */}
      <section className="footer-zone-2">
        <div className="footer-main-grid">
          {/* Left Column (45%) */}
          <div className="footer-left-col">
            <div className="footer-brand-lockup">
              <h3 className="footer-wordmark">DEEPCIPHER</h3>
              <p className="footer-brand-tagline">Web Design & Brand Identity Studio</p>
            </div>

            <motion.h2 
              className="footer-hero-headline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Let’s build something <span className="italic" style={{ color: 'var(--accent-warm)' }}>extraordinary.</span>
            </motion.h2>

            <div className="footer-cta-wrap">
              <MagneticButton variant="filled" href="/start-a-project" cursorLabel="START">
                START A PROJECT →
              </MagneticButton>
            </div>

            <div className="footer-social-row">
              {(['IG', 'TW', 'LI', 'BE'] as const).map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="footer-social-item"
                  onMouseEnter={() => setCursor('hover', s)}
                  onMouseLeave={resetCursor}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column (55%) — Asymmetric Grid */}
          <div className="footer-right-col">
            {Object.entries(footerNav).map(([heading, links], colIndex) => (
              <div key={heading} className={`footer-nav-col ${colIndex === 1 ? 'mt-8 md:mt-16' : ''}`}>
                <h4 className="footer-nav-heading">[ {heading} ]</h4>
                <ul className="footer-nav-list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onMouseEnter={() => setCursor('link')}
                        onMouseLeave={resetCursor}
                        className="footer-nav-link nav-link-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone 3: Full-Width Wordmark Statement */}
      <section className="footer-zone-3">
        <div className="watermark-container">
          <div className="watermark-text-wrap">
            <motion.h1
              className="footer-watermark"
              onMouseEnter={() => setCursor('hover', 'DEEPCIPHER')}
              onMouseLeave={resetCursor}
              whileHover={{ letterSpacing: '0.45em', color: 'rgba(255,255,255,0.4)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              DEEPCIPHER
            </motion.h1>
          </div>
        </div>
        {/* Amber hairline */}
        <div className="footer-wordmark-rule" />
      </section>

      {/* Zone 4: Copyright Bar */}
      <section className="footer-zone-4">
        <div className="footer-bottom-bar">
          <div className="bottom-item bottom-left">
            INDIA · USA · BERLIN · LONDON · REMOTE
          </div>
          <div className="bottom-item bottom-center">
            © 2026 DEEPCIPHER STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="bottom-item bottom-right">
            WEBSITES BUILT WITH <span style={{ color: 'var(--accent-warm)' }}>OBSESSION.</span>
          </div>
        </div>
      </section>

    </footer>
  );
}
