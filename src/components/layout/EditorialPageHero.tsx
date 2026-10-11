'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

/* ==========================================================
   EditorialPageHero — Cinematic Centered Hero for Inner Pages
   Matches the signature contact hero style: centered typography,
   dreamy 40% blur background, blue cursive accent, and scroll cue.
   ========================================================== */

interface EditorialPageHeroProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description: string;
  backgroundImage: string;
  children?: ReactNode;
}

const EASE_CUBIC = [0.22, 1, 0.36, 1] as const;

export default function EditorialPageHero({
  eyebrow,
  title,
  italicWord,
  description,
  backgroundImage,
  children,
}: EditorialPageHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full px-6 overflow-hidden flex flex-col justify-between items-center text-center"
      style={{
        height: '100dvh',
        minHeight: '520px',
        borderBottom: '0.5px solid rgba(245, 240, 232, 0.06)',
        backgroundColor: '#0A0A0A',
        paddingTop: 'clamp(56px, 8vh, 80px)',
        paddingBottom: 'clamp(20px, 4vh, 40px)',
      }}
    >
      {/* ── Background image layer with 40% dreamy blur effect ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(11px) saturate(108%)',
          transform: 'scale(1.08)',
        }}
      />

      {/* ── Dark overlay to ensure text contrast ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.82) 100%)',
          backgroundColor: 'rgba(10, 10, 10, 0.45)',
        }}
      />

      {/* Top spacer for balanced vertical centering */}
      <div aria-hidden="true" className="w-full h-2 shrink-0 pointer-events-none" />

      {/* ── Center Content Block ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE_CUBIC }}
        className="relative z-10 flex flex-col items-center max-w-[1000px] my-auto px-4"
      >
        {/* Eyebrow Label */}
        <span
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#E0DCD6',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'inline-block',
          }}
        >
          <span style={{ color: '#3854FF', marginRight: '6px' }}>—</span> {eyebrow}
        </span>

        {/* Main H1 */}
        <h1
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: 'clamp(34px, 5.6vw, 86px)',
            color: '#F5F0E8',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            margin: 0,
            marginBottom: '16px',
            userSelect: 'none',
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          <span className="font-bold text-[#F5F0E8]">{title}</span>
          {italicWord && (
            <span
              className="font-citadel italic font-normal inline-block ml-1 sm:ml-2.5"
              style={{
                fontFamily: "var(--font-citadel, 'Citadel Script'), cursive",
                color: '#3854FF',
                textShadow: '0 0 40px rgba(56, 84, 255, 0.7), 0 2px 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              {italicWord}
            </span>
          )}
        </h1>

        {/* Tagline / Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            color: '#F5F0E8',
            fontWeight: 400,
            letterSpacing: '0.04em',
            maxWidth: '560px',
            margin: '8px auto 0',
            lineHeight: '1.6',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          {description}
        </p>

        {children && <div className="mt-6 w-full flex justify-center">{children}</div>}
      </motion.div>

      {/* ── Scroll Indicator — docked cleanly at bottom of viewport ── */}
      <div className="relative flex flex-col items-center gap-2 z-20 select-none shrink-0">
        <span
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: '9px',
            color: '#E0DCD6',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: '32px', width: '1px', background: '#3854FF' }}
        />
      </div>
    </section>
  );
}
