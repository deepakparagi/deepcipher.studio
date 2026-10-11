'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

/* ==========================================================
   EditorialPageHero — Minimal Cinematic Hero for Inner Pages
   Pairs high-contrast dark negative-space typography with 
   DeepCipher's 3D architectural render backgrounds.
   ========================================================== */

interface EditorialPageHeroProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description: string;
  backgroundImage: string;
  children?: ReactNode;
}

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

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
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{
        height: 'calc(100dvh - 72px)',
        minHeight: '520px',
        maxHeight: '960px',
        borderBottom: '0.5px solid rgba(245, 240, 232, 0.06)',
        backgroundColor: '#0A0A0A',
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
      {/* ── Localized Left Gradient Scrim (preserves right-side 3D artwork) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.62) 36%, rgba(10, 10, 10, 0.22) 65%, transparent 100%)',
        }}
      />

      {/* ── Subtle bottom vignette to blend seamlessly into content below ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.85) 100%)',
        }}
      />

      {/* ── Foreground Content ── */}
      <div
        className="relative z-10 w-full h-full flex-1 flex flex-col justify-between"
        style={{
          paddingLeft: 'clamp(24px, 7.5vw, 112px)',
          paddingRight: 'clamp(24px, 5vw, 64px)',
          paddingTop: 'clamp(24px, 4vh, 48px)',
          paddingBottom: 'clamp(20px, 3vh, 36px)',
        }}
      >
        {/* Top spacer */}
        <div aria-hidden="true" className="w-full h-2 shrink-0 pointer-events-none" />

        {/* ── Main Text Block (Left-Third Column) ── */}
        <div
          className="my-auto flex flex-col"
          style={{
            maxWidth: 'min(92vw, 580px)',
          }}
        >
          {/* Eyebrow Label */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_CUBIC }}
            className="flex items-center gap-2.5 select-none mb-4 sm:mb-5"
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#4B5DF5',
                display: 'inline-block',
                boxShadow: '0 0 10px rgba(75, 93, 245, 0.85)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(10px, 0.85vw, 12px)',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#C8CEDA',
                textTransform: 'uppercase',
                lineHeight: 1.4,
              }}
            >
              {eyebrow}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_CUBIC }}
            className="m-0 text-left select-none"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: 'clamp(42px, 5.8vw, 84px)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#F5F0E8',
              marginBottom: '18px',
              textShadow: '0 4px 28px rgba(0,0,0,0.6)',
            }}
          >
            <span className="font-bold">{title}</span>
            {italicWord && (
              <span
                className="font-citadel italic font-normal ml-2 sm:ml-3"
                style={{
                  fontFamily: "var(--font-citadel, 'Citadel Script'), 'Citadel Script', cursive",
                  color: '#4B5DF5',
                  textShadow: '0 0 35px rgba(75, 93, 245, 0.65)',
                }}
              >
                {italicWord}
              </span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_CUBIC }}
            className="m-0 text-left"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(245, 240, 232, 0.65)',
              maxWidth: '520px',
              letterSpacing: '0.01em',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
            }}
          >
            {description}
          </motion.p>

          {children && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_CUBIC }}
              className="mt-6"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* ── Bottom Bar / Scroll Cue ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 select-none text-[9px] font-mono tracking-[0.25em] text-[#C8CEDA]/40 uppercase shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4B5DF5]/60" />
          <span>DEEPCIPHER STUDIO // 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
