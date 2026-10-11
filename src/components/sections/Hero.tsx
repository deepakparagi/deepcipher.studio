'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

/* ==========================================================
   DEEPCIPHER — Premium Hero Section
   Centered luxury composition with 20% dreamy blurred backdrop,
   refined typography, and micro-interactions.
   ========================================================== */

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
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
      className="hero-home-section relative w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* ── 1. Crisp Background Image Layer (No Blur) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: "url('/images/HERO%20SECTION.png')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* ── 2. Atmospheric Vignettes for Text Contrast ── */}
      {/* Dark radial vignette for centered contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10, 10, 12, 0.45) 0%, rgba(10, 10, 12, 0.8) 100%)',
        }}
      />

      {/* Top and bottom subtle fade vignettes */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 10, 12, 0.45) 0%, transparent 24%, transparent 76%, rgba(10, 10, 12, 0.75) 100%)',
        }}
      />

      {/* ── 3. Main Hero Content Wrapper (Neatly Centered) ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-[680px] mx-auto my-auto px-5 sm:px-6"
        style={{
          paddingTop: 'clamp(20px, 3vh, 38px)',
          paddingBottom: 'clamp(28px, 4vh, 46px)',
        }}
      >
        {/* Top: Brand Eyebrow on centered axis */}
        <motion.div
          {...fadeIn(0.1)}
          className="flex items-center justify-center gap-3 select-none shrink-0"
          style={{ marginBottom: 'clamp(14px, 2.4vh, 22px)' }}
        >
          <span
            style={{
              width: '26px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.28)',
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: 'clamp(10px, 0.8vw, 11px)',
              fontWeight: 600,
              letterSpacing: '0.24em',
              color: 'rgba(255, 255, 255, 0.78)',
              textTransform: 'uppercase',
            }}
          >
            DEEPCIPHER
          </span>
          <span
            style={{
              width: '26px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.28)',
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Headline Block: Neatly Centered */}
        <motion.div
          {...fadeUp(0.25)}
          className="relative w-full flex flex-col items-center justify-center"
          style={{ marginBottom: 'clamp(14px, 2.4vh, 22px)' }}
        >
          <h1
            className="m-0 text-center select-none"
            style={{
              fontFamily:
                "var(--font-editorial), var(--font-serif, 'Cormorant Garamond'), Georgia, serif",
              fontSize: 'clamp(2.4rem, 5.2vw, 4.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 500,
            }}
          >
            {/* Line 1: Ideas into (warm ivory) */}
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

            {/* Line 2: Real Products (electric cobalt blue with dreamy glow) */}
            <span
              className="block whitespace-nowrap"
              style={{
                color: '#3049E8',
                fontWeight: 500,
                letterSpacing: '-0.015em',
                marginTop: '0.04em',
                textShadow: '0 0 34px rgba(48, 73, 232, 0.45)',
              }}
            >
              Real Products
            </span>
          </h1>
        </motion.div>

        {/* Supporting Description: Centered */}
        <motion.p
          {...fadeUp(0.4)}
          className="m-0 text-center"
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: 'clamp(11px, 0.85vw, 12px)',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: '#B8BEC9',
            lineHeight: 1.62,
            maxWidth: 'min(90vw, 460px)',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vh, 28px)',
          }}
        >
          WE BUILD WEBSITES, AI SOLUTIONS &amp;<br />
          AUTOMATIONS THAT CREATE REAL IMPACT.
        </motion.p>

        {/* CTA Buttons: Neatly Centered */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap items-center justify-center"
          style={{ gap: 'clamp(16px, 2.5vw, 26px)' }}
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
              padding: '0 clamp(22px, 2.2vw, 30px)',
              borderRadius: '9999px',
              boxShadow: isHoveredPrimary
                ? '0 0 28px rgba(56, 84, 255, 0.65), 0 4px 14px rgba(0, 0, 0, 0.4)'
                : '0 4px 18px rgba(48, 73, 232, 0.45)',
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
            }}
          >
            <span
              className="transition-all duration-300 group-hover:text-white"
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.45)',
                paddingBottom: '3px',
              }}
            >
              VIEW WORK
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
