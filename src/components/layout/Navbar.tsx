'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCursor } from '../ui/CursorProvider';

/* ==========================================================
   NAVBAR — Dark Glassmorphism
   Consistent across all pages (dark + light backgrounds).
   ========================================================== */

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'WORK', href: '/work' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PROCESS', href: '/process' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: { 
    opacity: 0, 
    x: -40,
    transition: { duration: 0.4, ease: 'easeIn' as const }
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  },
  exit: { 
    opacity: 0, 
    x: -20, 
    transition: { duration: 0.4, ease: 'easeIn' as const } 
  }
};

function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const stateRef = useRef({ lastScrollY: 0, scrolled: false, hidden: false, raf: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 100, damping: 30 }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (stateRef.current.raf) return;
      stateRef.current.raf = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const nextScrolled = currentScrollY > 50;
        const nextHidden = currentScrollY > stateRef.current.lastScrollY && currentScrollY > 400;

        if (nextScrolled !== stateRef.current.scrolled) {
          stateRef.current.scrolled = nextScrolled;
          setScrolled(nextScrolled);
        }

        if (nextHidden !== stateRef.current.hidden) {
          stateRef.current.hidden = nextHidden;
          setHidden(nextHidden);
        }

        stateRef.current.lastScrollY = currentScrollY;
        stateRef.current.raf = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stateRef.current.raf) window.cancelAnimationFrame(stateRef.current.raf);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleMobileOpen = useCallback(() => {
    setMobileOpen((value) => !value);
  }, []);

  const isCaseStudy = pathname.startsWith('/work/') && pathname !== '/work';

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        animate={{
          y: hidden ? '-100%' : '0%',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >


        {/* ── Glassmorphism Navbar ── */}
        <nav
          style={{
            width: '100%',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(10, 10, 10, 0.4)',
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)',
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            className="w-full h-full flex items-center justify-between relative px-4 sm:px-6 md:px-8 lg:px-10"
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center justify-start gap-3.5 group select-none"
              style={{ pointerEvents: 'all', zIndex: 9999 }}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
            >
              <Image
                src="/deepcipher_logo.png"
                alt="DeepCipher Official Logo"
                width={42}
                height={28}
                priority
                className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                style={{ transform: 'translate3d(0,0,0)', width: 'auto', height: '28px' }}
              />
              <span
                className="hidden md:inline-flex items-center tracking-[0.14em] text-[#F5F0E8] font-bold"
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  lineHeight: 1,
                }}
              >
                DEEPCIPHER
              </span>
            </Link>

            {/* Desktop Links */}
            {!isCaseStudy && (
              <div 
                className="hidden md:flex items-center" 
                style={{ 
                  gap: '32px',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setCursor('link')}
                      onMouseLeave={resetCursor}
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontWeight: 500,
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: isActive ? '#2C3480' : '#F6F2ED',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        cursor: 'none',
                        pointerEvents: 'all',
                        position: 'relative'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = '#2C3480';
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F6F2ED';
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Right side CTA */}
            {isCaseStudy ? (
              <Link
                href="/work"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 240, 232, 0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  cursor: 'none',
                  pointerEvents: 'all',
                  position: 'relative'
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0E8'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245, 240, 232, 0.5)'; }}
              >
                ← BACK TO WORK
              </Link>
            ) : (
              <Link
                href="/contact"
                className="hidden md:flex items-center justify-center transition-all duration-300 hover:bg-[#2C3480] hover:text-[#0A0A0A]"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  backgroundColor: 'rgba(44, 52, 128, 0.12)',
                  border: '1px solid rgba(44, 52, 128, 0.45)',
                  backdropFilter: 'blur(10px)',
                  padding: '0 20px',
                  height: '38px',
                  textDecoration: 'none',
                  cursor: 'none',
                  pointerEvents: 'all',
                  position: 'relative'
                }}
              >
                BOOK A STRATEGY CALL
              </Link>
            )}

            {/* Hamburger (Mobile) */}
            {!isCaseStudy && (
              <button
                className="flex md:hidden flex-col justify-center items-end gap-[6px] w-12 h-12 group focus:outline-none touch-manipulation relative z-[9999] pointer-events-auto"
                onClick={toggleMobileOpen}
                aria-label="Toggle Menu"
              >
                <motion.span
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                  style={{ width: '24px', height: '1.5px', background: '#F5F0E8', opacity: 0.9, transformOrigin: 'center' }}
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  style={{ width: '24px', height: '1.5px', background: '#F5F0E8', opacity: 0.9 }}
                />
                <motion.span
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                  style={{ width: '24px', height: '1.5px', background: '#F5F0E8', opacity: 0.9, transformOrigin: 'center' }}
                />
              </button>
            )}
          </div>

        {/* Progress bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'var(--accent-warm)',
            transformOrigin: 'left',
            scaleX,
            opacity: 0.15,
          }}
        />

      </nav>
      </motion.header>

      {/* MOBILE PORTAL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[200] flex flex-col justify-center items-center"
            style={{
              background: 'rgba(10,10,10,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Brand Header — top left */}
            <div className="absolute top-5 left-6 z-20 flex items-center gap-3">
              <Image
                src="/deepcipher_logo.png"
                alt="DeepCipher"
                width={42}
                height={28}
                className="object-contain"
                style={{ width: 'auto', height: '28px' }}
              />
              <span style={{ fontFamily: 'var(--font-helvetica), sans-serif', fontSize: '15px', letterSpacing: '0.12em', color: '#F5F0E8', fontWeight: 700 }}>
                DEEPCIPHER
              </span>
            </div>

            {/* Close button — top right */}
            <button
              onClick={toggleMobileOpen}
              className="absolute top-4 right-5 z-20 flex items-center justify-center"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                color: '#F5F0E8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '48px',
                height: '48px',
              }}
              aria-label="Close menu"
            >
              ×
            </button>

            {/* Background Decoration */}
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] flex items-center justify-center pointer-events-none select-none">
              <span
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontWeight: 900,
                  fontSize: '26vw',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  color: '#FFFFFF',
                }}
              >
                MENU
              </span>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8 relative z-10 items-center">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredIndex === i;
                
                return (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="uppercase inline-block transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(32px, 7.5vw, 44px)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.15,
                        color: isActive 
                          ? '#3854FF' 
                          : isHovered 
                            ? '#FFFFFF' 
                            : 'rgba(245, 240, 232, 0.45)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        pointerEvents: 'all',
                        zIndex: 9999,
                        position: 'relative',
                        textShadow: isActive ? '0 0 24px rgba(56, 84, 255, 0.4)' : 'none',
                      }}
                    >
                      {link.label}.
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-10 left-8 sm:left-12 flex flex-col gap-3">
              <span
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: '10px',
                  color: 'rgba(245, 240, 232, 0.45)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Ready to start?
              </span>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#F5F0E8',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(245,240,232,0.2)',
                  paddingBottom: '3px',
                  pointerEvents: 'all',
                  zIndex: 9999,
                  position: 'relative',
                  textDecoration: 'none',
                }}
              >
                <span>START A PROJECT</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);
