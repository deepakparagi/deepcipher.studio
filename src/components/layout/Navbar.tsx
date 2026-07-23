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
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(10, 10, 10, 0.4)',
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)',
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="w-full h-full flex items-center justify-between mx-auto relative px-0 md:px-8">
            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center justify-start w-[80px] h-[30px] md:w-[110px] md:h-[36px]"
              style={{ pointerEvents: 'all', zIndex: 9999, position: 'relative', transform: 'translateY(-2px)' }}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
            >
              <Image
                src="/deepcipher_logo.png?v=2"
                alt="DeepCipher Logo"
                fill
                sizes="(max-width: 768px) 80px, 110px"
                priority
                className="object-contain object-left"
                style={{ transform: 'translate3d(0,0,0)' }}
              />
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
                        color: isActive ? '#C9A46A' : '#F6F2ED',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        cursor: 'none',
                        pointerEvents: 'all',
                        position: 'relative'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = '#C9A46A';
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
                className="hidden md:flex items-center justify-center transition-colors duration-300 hover:bg-white hover:text-black"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  backgroundColor: '#C9A46A',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  cursor: 'none',
                  pointerEvents: 'all',
                  position: 'relative'
                }}
              >
                BOOK STRATEGY CALL
              </Link>
            )}

            {/* Hamburger (Mobile) */}
            {!isCaseStudy && (
              <button
                className="flex md:hidden flex-col justify-center items-end gap-[6px] w-10 h-10 group focus:outline-none touch-manipulation relative z-[9999] pointer-events-auto"
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
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
              <span className="font-display font-black text-[30vw] uppercase tracking-tighter italic">MENU</span>
            </div>

            <div className="flex flex-col gap-8 relative z-10 items-center">
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
                      className="font-display font-light italic tracking-tighter uppercase inline-block"
                      style={{
                        fontSize: 'clamp(36px, 8vw, 48px)',
                        color: isActive 
                          ? '#B8956A' 
                          : isHovered 
                            ? '#F5F0E8' 
                            : 'rgba(245, 240, 232, 0.4)',
                        textDecoration: 'none',
                        transition: 'color 0.4s ease',
                        cursor: 'none',
                        pointerEvents: 'all',
                        zIndex: 9999,
                        position: 'relative'
                      }}
                    >
                      {link.label}.
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-12 left-12 flex flex-col gap-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: '#6B6560',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Ready to start?
              </span>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#F5F0E8',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderBottom: '0.5px solid rgba(245,240,232,0.1)',
                  paddingBottom: '4px',
                  pointerEvents: 'all',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                START A PROJECT →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);
