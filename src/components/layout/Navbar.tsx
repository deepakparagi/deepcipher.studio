'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '../ui/MagneticButton';
import { useCursor } from '../ui/CursorProvider';

/* ==========================================================
   NAVBAR — Dark Glassmorphism
   Consistent across all pages (dark + light backgrounds).
   ========================================================== */

const navLinks = [
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

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 100, damping: 30 }
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isCaseStudy = pathname.startsWith('/work/') && pathname !== '/work';

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '56px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backdropFilter: 'blur(20px) saturate(180%)',
        }}
        animate={{
          y: hidden ? '-100%' : '0%',
          backgroundColor: 'rgba(10, 10, 10, 0.65)',
          borderBottom: '0.5px solid rgba(245, 240, 232, 0.08)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center"
          style={{ width: 40, height: 40 }}
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
        >
          <Image
            src="/dc-logo-big.png"
            alt="DeepCipher Logo"
            fill
            sizes="40px"
            priority
            className="object-contain"
            style={{ filter: 'brightness(10)' }}
          />
        </Link>

        {/* Desktop Links */}
        {!isCaseStudy && (
          <div className="hidden lg:flex items-center" style={{ gap: '36px' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: isActive ? '#B8956A' : '#F5F0E8',
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                    background: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'none',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#B8956A';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F5F0E8';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right side: EST. 2024 or Back to Archive */}
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
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0E8'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245, 240, 232, 0.5)'; }}
          >
            ← BACK TO ARCHIVE
          </Link>
        ) : (
          <div className="hidden lg:flex items-center" style={{ gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: '#6B6560',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              EST. 2024
            </span>
          </div>
        )}

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

        {/* Hamburger (Mobile) */}
        {!isCaseStudy && (
          <button
            className="flex lg:hidden flex-col justify-center gap-1.5 w-8 h-8 group focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
              style={{ width: '100%', height: '1px', background: '#F5F0E8' }}
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              style={{ width: '100%', height: '1px', background: '#F5F0E8' }}
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }}
              style={{ width: '100%', height: '1px', background: '#F5F0E8' }}
            />
          </button>
        )}
      </motion.nav>

      {/* MOBILE PORTAL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[99] bg-[#0A0A0A] flex flex-col justify-center px-12 md:px-20"
          >
            {/* Background Decoration */}
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
              <span className="font-display font-black text-[30vw] uppercase tracking-tighter italic">MENU</span>
            </div>

            <div className="flex flex-col gap-10 relative z-10">
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
                        fontSize: 'clamp(40px, 10vw, 80px)',
                        color: isActive 
                          ? '#B8956A' 
                          : isHovered 
                            ? '#F5F0E8' 
                            : 'rgba(245, 240, 232, 0.4)',
                        textDecoration: 'none',
                        transition: 'color 0.4s ease',
                        cursor: 'none',
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
                href="/start-a-project"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#F5F0E8',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderBottom: '0.5px solid rgba(245,240,232,0.1)',
                  paddingBottom: '4px',
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
