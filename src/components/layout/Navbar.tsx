'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '../ui/MagneticButton';
import { useCursor } from '../ui/CursorProvider';

/* ========================================
   Navbar — Fixed, scroll-aware, responsive
   ======================================== */

const navLinks = [
  { label: 'WORK', href: '/work' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PROCESS', href: '/process' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
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
      setScrolled(currentScrollY > 80);
      
      // Hide on scroll down, show on scroll up
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
  const isActuallyDark = pathname === '/' || isCaseStudy;

  const navColors = {
    bgScrolled: isActuallyDark ? 'rgba(10,10,10,0.92)' : 'rgba(248,247,244,0.92)',
    bgIdle: 'rgba(0,0,0,0)',
    textActive: isActuallyDark ? 'var(--white)' : 'var(--ink)',
    textIdle: isActuallyDark ? 'rgba(255,255,255,0.6)' : 'var(--ink-tertiary)',
    logoInvert: isActuallyDark ? 1 : 0,
    border: isActuallyDark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,10,0.06)',
    hamburger: isActuallyDark ? 'var(--white)' : 'var(--ink)',
  };

  return (
    <>
      <motion.nav
        className="px-4 md:px-6 lg:px-8"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        animate={{
          y: hidden ? '-100%' : '0%',
          backgroundColor: scrolled ? navColors.bgScrolled : navColors.bgIdle,
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          borderBottom: scrolled
            ? `1px solid ${navColors.border}`
            : '1px solid rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center" 
          style={{ position: 'relative', width: '60px', height: '60px' }} 
          onMouseEnter={() => setCursor('link')} 
          onMouseLeave={resetCursor}
        >
          <Image 
            src="/dc-logo-big.png" 
            alt="DeepCipher Logo" 
            fill
            sizes="60px"
            priority
            style={{ 
              objectFit: 'contain', 
              objectPosition: 'left center',
              filter: isActuallyDark ? 'none' : 'invert(1) hue-rotate(180deg) contrast(1.2)',
              transition: 'filter 0.5s ease'
            }} 
          />
        </Link>

        {/* Center nav — desktop */}
        <div
          style={{
            gap: 'min(32px, 2.5vw)',
            alignItems: 'center',
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className={`${isActive ? 'nav-link-active' : ''} nav-link-underline`}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: isActive ? navColors.textActive : navColors.textIdle,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease',
                  borderBottom: isActive ? '1px solid var(--accent-warm)' : '1px solid transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right — CTA (desktop) */}
        <div className="hidden lg:block">
          {pathname !== '/start-a-project' && (
            <MagneticButton variant="outline" href="/start-a-project" cursorLabel="START">
              START A PROJECT
            </MagneticButton>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="flex lg:hidden flex-col justify-between"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '28px',
            height: '20px',
            position: 'relative',
          }}
        >
          <motion.span
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 9 : 0,
            }}
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: navColors.hamburger,
              display: 'block',
              transformOrigin: 'center',
            }}
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: navColors.hamburger,
              display: 'block',
            }}
          />
          <motion.span
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? -9 : 0,
            }}
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: navColors.hamburger,
              display: 'block',
              transformOrigin: 'center',
            }}
          />
        </button>

        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            backgroundColor: 'var(--accent-warm)',
            transformOrigin: 'left',
            scaleX,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 49,
              backgroundColor: 'var(--off-white)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '16px',
            }}
            className="px-6 md:px-10 lg:px-20"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                  className="text-5xl sm:text-7xl nav-link-underline"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ marginTop: '32px' }}
            >
              <MagneticButton variant="filled" href="/start-a-project">
                START A PROJECT
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

