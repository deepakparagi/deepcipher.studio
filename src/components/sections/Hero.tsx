'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import CountUp from 'react-countup';

const STATS = [
  { value: 20, suffix: '+', label: 'WEBSITES LAUNCHED' },
  { value: 15, suffix: '+', label: 'PROJECTS PER YEAR' },
  { value: 24, suffix: 'hr', label: 'RESPONSE TIME' },
  { value: 95, suffix: '+', label: 'LIGHTHOUSE SCORE' },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .cta-ghost::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 0;
          height: 1px;
          background: #B8956A;
          transition: width 0.3s ease;
        }
        .cta-ghost:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-headline { font-size: clamp(48px, 12vw, 72px) !important; line-height: 0.95 !important; }
          .hero-cta-group { gap: 16px !important; }
        }
      `}} />

      {/* SECTION A — HEADLINE BLOCK */}
      <section
        className="w-full relative overflow-hidden flex flex-col justify-center"
        style={{
          minHeight: '100svh',
          background: '#0D0D0D',
          padding: '80px clamp(24px, 6vw, 96px) 0',
        }}
      >
        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%22")',
            opacity: 0.03,
            zIndex: 0
          }}
        />

        {/* Faint Radial Gradient Glow */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            background: 'radial-gradient(ellipse 80% 60% at 0% 50%, rgba(184,149,106,0.04) 0%, transparent 70%)',
            zIndex: 0
          }}
        />

        {/* TOP LABEL */}
        <div 
          className="absolute flex items-center z-10"
          style={{ 
            top: 'clamp(80px, 10vh, 120px)',
            left: 'clamp(24px, 6vw, 96px)',
            gap: '14px' 
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#B8956A' }} />
          <span 
            className="md:text-[9px] text-[8px]"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: 300,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(184,149,106,0.7)'
            }}
          >
            Premium Web Design Studio — Karnataka, India
          </span>
        </div>

        <div className="relative z-10 w-full max-w-[1200px]">
          {/* HEADLINE */}
          <h1 
            className="hero-headline flex flex-col text-left m-0"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: 'clamp(72px, 11vw, 160px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            <div className="overflow-hidden">
              <motion.span 
                className="block"
                style={{ color: '#F5F0E8' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                Where Vision
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                className="block"
                style={{ color: '#B8956A' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                Meets
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                className="block"
                style={{ color: '#F5F0E8' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              >
                Execution<span style={{ fontSize: '0.85em', color: '#B8956A' }}>.</span>
              </motion.span>
            </div>
          </h1>

          {/* BODY TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="md:text-[16px] text-[14px]"
            style={{
              maxWidth: '420px',
              marginTop: '40px',
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(245,240,232,0.5)',
            }}
          >
            Most businesses have the vision. Few have the digital presence to match it. We build websites and brand identities that convert, endure, and are impossible to ignore.
          </motion.p>

          {/* CTA ROW */}
          <motion.div 
            className="hero-cta-group flex md:flex-row flex-col items-start md:items-center w-full"
            style={{ marginTop: '48px', gap: '40px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <Link href="/contact" passHref legacyBehavior>
              <a 
                className="group relative inline-flex items-center justify-center text-center w-full md:w-auto"
                style={{
                  background: '#B8956A',
                  color: '#0D0D0D',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '15px 32px',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(184,149,106,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(184,149,106,0.1)'; }}
              >
                Start Your Project &rarr;
              </a>
            </Link>
            <Link href="/work" passHref legacyBehavior>
              <a 
                className="cta-ghost group relative inline-flex items-center text-left md:text-center w-full md:w-auto overflow-hidden"
                style={{
                  background: 'transparent',
                  color: 'rgba(245,240,232,0.5)',
                  border: 'none',
                  padding: '15px 0',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.5)'; }}
              >
                View Our Work &rarr;
              </a>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE ELEMENT (EST + STAT) */}
        <motion.div 
          className="hidden md:flex flex-col items-end absolute z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            right: 'clamp(48px, 6vw, 96px)',
            top: '50%',
            transform: 'translateY(-50%)',
            gap: '40px'
          }}
        >
          {/* Element 1: EST Label */}
          <div 
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(245,240,232,0.2)',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}
          >
            Deepcipher Studio &middot; EST. 2024
          </div>

          {/* Element 2: Simple Stat Preview */}
          <div className="text-right">
            <div 
              style={{
                fontFamily: 'var(--font-display), serif',
                fontStyle: 'italic',
                fontSize: '48px',
                color: 'rgba(245,240,232,0.08)',
                lineHeight: 1
              }}
            >
              95+
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,232,0.15)',
                marginTop: '4px'
              }}
            >
              LIGHTHOUSE
            </div>
          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <div 
          className="absolute md:flex hidden items-center z-10"
          style={{
            bottom: '32px',
            left: 'clamp(24px, 6vw, 96px)',
            gap: '10px'
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              fontWeight: 300,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.3)'
            }}
          >
            Scroll
          </span>
          <div 
            className="rounded-full"
            style={{
              width: '5px',
              height: '5px',
              background: '#B8956A',
              animation: 'heroPulse 2s ease-in-out infinite'
            }}
          />
        </div>
      </section>

      {/* SECTION B — STATS BAR */}
      <section 
        ref={statsRef}
        className="w-full grid grid-cols-2 md:grid-cols-4"
        style={{
          background: '#F8F6F3',
          borderTop: '1px solid #E0E0E0'
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className={`flex flex-col justify-center border-[#E0E0E0] ${i % 2 === 0 ? 'border-r' : ''} ${i !== 3 ? 'md:border-r' : 'md:border-r-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            style={{
              padding: 'clamp(28px, 4vw, 44px) clamp(20px, 4vw, 56px)',
            }}
          >
            <div 
              style={{
                fontFamily: 'var(--font-display), serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(44px, 5.5vw, 72px)',
                color: '#1A1A1A',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {isStatsInView ? (
                <CountUp end={stat.value} duration={2.5} separator="," />
              ) : "0"}
              {stat.suffix}
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#7A7A7A',
                marginTop: '10px'
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}
