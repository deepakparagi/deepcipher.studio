'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '../ui/MagneticButton';
import { useCursor } from '../ui/CursorProvider';

/* ==========================================================
   v7: THE ELITE CHROME — NAVBAR
   Static global navigation evolved for Onyx & Gold.
   Architecture: Depth-Glassmorphism, Kinetic Portal Menu.
   ========================================================== */

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
      setScrolled(currentScrollY > 60);
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

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 h-20 z-50 px-6 md:px-12 flex items-center justify-between border-b border-transparent transition-all duration-700"
        animate={{
          y: hidden ? '-100%' : '0%',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.6)' : 'rgba(0,0,0,0)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          borderColor: scrolled ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="relative w-12 h-12 flex items-center group"
          onMouseEnter={() => setCursor('link')} 
          onMouseLeave={resetCursor}
        >
          <Image 
            src="/dc-logo-big.png" 
            alt="DeepCipher Logo" 
            fill
            sizes="48px"
            priority
            className="object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className={`font-mono text-[9px] tracking-[0.4em] uppercase transition-all duration-700 ${isActive ? 'text-white' : 'text-white/30 hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action HUD */}
        <div className="hidden lg:flex items-center gap-8">
           <div className="w-[1px] h-8 bg-white/5" />
           <MagneticButton variant="ghost" href="/start-a-project" className="text-[10px] font-mono tracking-[0.4em] uppercase">
             SYS_INIT →
           </MagneticButton>
        </div>

        {/* Global Progress */}
        <motion.div
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: 'var(--accent-warm)', transformOrigin: 'left', scaleX }}
          className="opacity-20"
        />

        {/* Hamburger */}
        <button
          className="flex lg:hidden flex-col justify-center gap-1.5 w-8 h-8 group focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }} className="w-full h-px bg-white group-hover:bg-[var(--accent-warm)] transition-colors" />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-full h-px bg-white group-hover:bg-[var(--accent-warm)] transition-colors" />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }} className="w-full h-px bg-white group-hover:bg-[var(--accent-warm)] transition-colors" />
        </button>
      </motion.nav>

      {/* MOBILE PORTAL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[49] bg-[#0A0A0A] flex flex-col justify-center px-12 md:px-20"
          >
             {/* Background Decoration */}
             <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
                <span className="font-display font-black text-[30vw] uppercase tracking-tighter italic">MENU</span>
             </div>

             <div className="flex flex-col gap-10 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display font-light italic text-[clamp(44px,12vw,100px)] text-white/40 hover:text-white transition-colors duration-700 tracking-tighter uppercase inline-block"
                    >
                      {link.label}.
                    </Link>
                  </motion.div>
                ))}
             </div>

             <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase">Ready to initialize?</span>
                <Link href="/start-a-project" onClick={() => setMobileOpen(false)} className="font-mono text-[11px] text-white tracking-[0.4em] uppercase border-b border-white/5 pb-1 select-none">SYSM_START_MISSION →</Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
