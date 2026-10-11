'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

/* ========================================
   DEEPCIPHER — Homepage Hero Section
   Cinematic architectural composition matching
   the reference visual with editorial typography.
   ======================================== */

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE_CUBIC },
  });

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay, ease: EASE_CUBIC },
  });

  return (
    <section
      className="hero-home-section relative w-full flex-1 min-h-0 overflow-hidden flex flex-col justify-between"
      style={{
        backgroundColor: '#0A0A0A',
        backgroundImage: "url('/images/HERO%20SECTION.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style jsx>{`
        .hero-home-section {
          background-position: 36% center;
        }
        @media (min-width: 768px) {
          .hero-home-section {
            background-position: right center;
          }
        }
      `}</style>

      {/* ── Left-to-right gradient scrim ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(10, 10, 10, 0.94) 0%, rgba(10, 10, 10, 0.82) 36%, rgba(10, 10, 10, 0.42) 65%, rgba(10, 10, 10, 0.08) 85%, transparent 100%)',
        }}
      />

      {/* ── Mobile vertical vignette for maximum contrast ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 10, 10, 0.75) 0%, rgba(10, 10, 10, 0.3) 30%, rgba(10, 10, 10, 0.2) 60%, rgba(10, 10, 10, 0.85) 100%)',
        }}
      />

      {/* ── Subtle bottom vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.7) 100%)',
        }}
      />

      {/* ── Foreground Content Container ── */}
      <div
        className="relative z-10 w-full h-full flex-1 flex flex-col justify-between"
        style={{
          paddingLeft: 'clamp(24px, 7.5vw, 116px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
          paddingTop: 'clamp(20px, 3.5vh, 42px)',
          paddingBottom: 'clamp(24px, 4vh, 40px)',
        }}
      >
        {/* ── 1. Single Main Hero Content Wrapper (Shared Left Axis) ── */}
        <div
          className="my-auto flex flex-col items-start w-full"
          style={{
            maxWidth: 'min(92vw, 540px)',
          }}
        >
          {/* Top: Brand Eyebrow on shared left axis */}
          <motion.div
            {...fadeIn(0.1)}
            className="flex items-center gap-3 select-none shrink-0"
            style={{ marginBottom: 'clamp(14px, 2.5vh, 24px)' }}
          >
            <span
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(10px, 0.8vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(255, 255, 255, 0.72)',
                textTransform: 'uppercase',
              }}
            >
              DEEPCIPHER
            </span>
            <span
              style={{
                width: '24px',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                display: 'inline-block',
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Headline Block with Dedicated Accent Line */}
          <motion.div
            {...fadeUp(0.25)}
            className="relative w-full"
            style={{ marginBottom: 'clamp(14px, 2.5vh, 20px)' }}
          >
            {/* Cobalt Accent Line: 2px wide, cobalt blue, aligned with headline top, height matches 2-line headline */}
            <div
              style={{
                position: 'absolute',
                left: '-14px',
                top: '3px',
                bottom: '3px',
                width: '2px',
                backgroundColor: '#3049E8',
                borderRadius: '1px',
                boxShadow: '0 0 12px rgba(48, 73, 232, 0.45)',
              }}
              aria-hidden="true"
            />

            {/* Headline Text: Editorial serif with balanced proportions */}
            <h1
              className="m-0 text-left select-none"
              style={{
                fontFamily: "var(--font-editorial), var(--font-serif, 'Cormorant Garamond'), Georgia, serif",
                fontSize: 'clamp(2.35rem, 5.2vw, 4.8rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                fontWeight: 500,
              }}
            >
              {/* Line 1: Ideas into (warm white) */}
              <span className="block text-[#F5F0E8]">
                Ideas{' '}
                <span
                  style={{
                    fontFamily: "var(--font-citadel, 'Citadel Script'), cursive",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '1.16em',
                    marginLeft: '0.08em',
                    display: 'inline-block',
                    lineHeight: 1,
                    color: '#F5F0E8',
                  }}
                >
                  into
                </span>
              </span>

              {/* Line 2: Real Products (cobalt blue) */}
              <span
                className="block whitespace-nowrap"
                style={{
                  color: '#3049E8',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  marginTop: '0.04em',
                  textShadow: '0 0 32px rgba(48, 73, 232, 0.35)',
                }}
              >
                Real Products
              </span>
            </h1>
          </motion.div>

          {/* Supporting Description: Aligned to headline text left edge */}
          <motion.p
            {...fadeUp(0.4)}
            className="m-0 text-left"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: 'clamp(11px, 0.85vw, 12px)',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#B8BEC9',
              lineHeight: 1.6,
              maxWidth: 'min(86vw, 440px)',
              textTransform: 'uppercase',
              marginBottom: 'clamp(20px, 3vh, 26px)',
            }}
          >
            WE BUILD WEBSITES, AI SOLUTIONS &amp;<br />
            AUTOMATIONS THAT CREATE REAL IMPACT.
          </motion.p>

          {/* CTA Buttons: Aligned to description left edge */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-wrap items-center"
            style={{ gap: 'clamp(16px, 2.5vw, 28px)' }}
          >
            {/* Primary Pill Button: LET'S BUILD */}
            <Link
              href="/contact"
              onMouseEnter={() => setIsHoveredPrimary(true)}
              onMouseLeave={() => setIsHoveredPrimary(false)}
              className="group inline-flex items-center justify-center gap-2.5 transition-all duration-300"
              style={{
                height: 'clamp(44px, 5.2vh, 50px)',
                backgroundColor: isHoveredPrimary ? '#3854FF' : '#3049E8',
                color: '#FFFFFF',
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(10.5px, 0.8vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0 clamp(20px, 2vw, 28px)',
                borderRadius: '9999px',
                boxShadow: isHoveredPrimary
                  ? '0 0 24px rgba(56, 84, 255, 0.6), 0 4px 14px rgba(0, 0, 0, 0.4)'
                  : '0 4px 18px rgba(48, 73, 232, 0.4)',
                transform: isHoveredPrimary ? 'translateY(-1px)' : 'none',
              }}
            >
              <span>LET&apos;S BUILD</span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontSize: '13px', lineHeight: 1 }}
              >
                &rarr;
              </span>
            </Link>

            {/* Secondary Link: VIEW WORK */}
            <Link
              href="/work"
              className="group inline-flex items-center transition-all duration-300"
              style={{
                height: 'clamp(44px, 5.2vh, 50px)',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(10.5px, 0.8vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderBottomColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.4)';
              }}
            >
              <span>VIEW WORK</span>
            </Link>
          </motion.div>
        </div>

        {/* ── 2. Bottom Services List: 24-40px above bottom, vertical divider, aligned ── */}
        <motion.div
          {...fadeIn(0.7)}
          className="select-none flex items-stretch shrink-0"
          style={{ gap: '16px' }}
        >
          {/* Vertical Accent Line matching list height */}
          <div
            style={{
              width: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              borderRadius: '1px',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <ul
            className="list-none m-0 p-0 flex flex-col"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: 'rgba(255, 255, 255, 0.48)',
              textTransform: 'uppercase',
              lineHeight: 1.5,
              gap: '2px',
            }}
          >
            <li>WEBSITES</li>
            <li>AI AUTOMATION</li>
            <li>AGENTIC AI</li>
            <li>PRODUCTS</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
