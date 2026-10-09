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
      {/* SECTION A — HEADLINE BLOCK */}
      <section
        className="w-full relative flex flex-col justify-center overflow-hidden"
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          {/* TOP LABEL */}
          <div 
            className="flex items-center"
            style={{ marginBottom: '48px', gap: '14px' }}
          >
            <span style={{ width: '20px', height: '1px', background: '#B8956A' }} />
            <span 
              className="md:text-[10px] text-[9px]"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontWeight: 300,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#B8956A'
              }}
            >
              Premium Web Design Studio — Karnataka, India
            </span>
          </div>

          {/* HEADLINE */}
          <h1 
            className="flex flex-col text-left m-0"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 11vw, 108px)',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
            }}
          >
            <div className="overflow-hidden">
              <motion.span 
                className="block"
                style={{ color: '#F5F0E8' }}
                initial={{ y: 60, opacity: 0 }}
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
                initial={{ y: 60, opacity: 0 }}
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
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              >
                Execution.
              </motion.span>
            </div>
          </h1>

          {/* BODY TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="md:text-[17px] text-[14px] md:max-w-[440px] max-w-full"
            style={{
              marginTop: '36px',
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(245,240,232,0.55)',
            }}
          >
            Most businesses have the vision. Few have the digital presence to match it. We build websites and brand identities that convert, endure, and are impossible to ignore.
          </motion.p>

          {/* CTA ROW */}
          <motion.div 
            className="flex md:flex-row flex-col items-start md:items-center w-full"
            style={{ marginTop: '44px', gap: '20px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <Link href="/contact" passHref legacyBehavior>
              <a 
                className="group relative inline-flex items-center justify-center text-center w-full md:w-auto"
                style={{
                  background: '#B8956A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#C4A47A'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#B8956A'; e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              >
                Start Your Project &rarr;
              </a>
            </Link>
            <Link href="/work" passHref legacyBehavior>
              <a 
                className="group relative inline-flex items-center justify-center text-center w-full md:w-auto"
                style={{
                  background: 'transparent',
                  color: 'rgba(245,240,232,0.6)',
                  border: '1px solid rgba(245,240,232,0.2)',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; e.currentTarget.style.borderColor = 'rgba(245,240,232,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.6)'; e.currentTarget.style.borderColor = 'rgba(245,240,232,0.2)'; }}
              >
                View Our Work &rarr;
              </a>
            </Link>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <div 
          className="absolute md:flex hidden items-center"
          style={{
            bottom: '36px',
            left: 'clamp(24px, 6vw, 96px)',
            gap: '12px'
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
              width: '6px',
              height: '6px',
              background: '#B8956A',
              animation: 'heroPulse 2s ease-in-out infinite'
            }}
          />
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes heroPulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.7); }
            }
          `}} />
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
