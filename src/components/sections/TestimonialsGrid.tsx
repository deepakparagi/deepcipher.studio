'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';

/* ========================================
   Client Testimonials Data
   ======================================== */

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  initials: string;
}

const testimonials: TestimonialData[] = [
  {
    quote:
      "DEEPCIPHER didn't just build us a website — they built a digital experience that genuinely captures the luxury feel of our properties. The attention to detail in every animation and micro-interaction is unmatched. Our enquiries increased dramatically within the first month.",
    name: 'Shingri Developers',
    role: 'Real Estate Firm',
    company: 'Hubli, India',
    metric: '3x',
    metricLabel: 'ENQUIRY GROWTH',
    initials: 'SD',
  },
  {
    quote:
      "We have over 120k followers on Instagram, but we needed a real digital home. DEEPCIPHER built us an incredible platform to showcase Gadag's heritage and our promotional content. It’s made it incredibly easy for brands to reach out for collaborations, massively boosting our reputation.",
    name: 'Gadag Info Community',
    role: '120K+ Follower Platform',
    company: 'Gadag, India',
    metric: '120K+',
    metricLabel: 'COMMUNITY FOLLOWERS',
    initials: 'GI',
  },
  {
    quote:
      "We wanted a digital presence that matched the premium, high-performance feel of our physical gym. DEEPCIPHER delivered a platform that is a true AI fitness hub. The sleek design and integrated AI tools have completely transformed how our clients train and interact with us online.",
    name: "Khan's Fitness",
    role: 'Premium Fitness Center',
    company: 'Gadag-Betageri, India',
    metric: '2.5x',
    metricLabel: 'DIGITAL ENGAGEMENT',
    initials: 'KF',
  },
  {
    quote:
      "The website Deepak crafted for our institution carries the same dignity and heritage that our campus represents. Parents, students, and faculty all praise how professional and elegant it feels. It truly set a new standard for educational institution websites in the region.",
    name: 'Chikkatti Group of Institutions',
    role: 'Educational Institution',
    company: 'Gadag, India',
    metric: '100%',
    metricLabel: 'UPTIME ACHIEVED',
    initials: 'CI',
  },
  {
    quote:
      "DEEPCIPHER brought our dining venue into the digital dimension with jaw-dropping 3D interactive design and effortless mobile navigation. Our guests constantly compliment the sleek aesthetic. Table reservations and digital menu visits surged by over 4x within the very first week.",
    name: 'Brown Sugar Fusion Cafe',
    role: 'Luxury Fusion Dining',
    company: 'Gadag-Betageri, India',
    metric: '4x',
    metricLabel: 'RESERVATIONS & ENGAGEMENT',
    initials: 'BS',
  },
];

/* ========================================
   Testimonial Card — 3D Perspective Tilt
   ======================================== */

function TestimonialCard({ t, index }: { t: TestimonialData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-full flex flex-col"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        height: '100%',
      }}
    >
      <div
        className="relative overflow-hidden flex flex-col justify-between h-full w-full rounded-none"
        style={{
          padding: 'clamp(18px, 1.8vw, 24px)',
          height: '100%',
          background: isHovered
            ? 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(48, 73, 232, 0.1) 50%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.008) 100%)',
          border: '1px solid',
          borderColor: isHovered ? 'rgba(56, 84, 255, 0.45)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          transition: 'background 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.6), 0 0 20px rgba(48, 73, 232, 0.15)' : 'none',
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-30%',
            left: '-20%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(56, 84, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Sharp corner brackets */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '10px',
            height: '10px',
            borderTop: '1.5px solid rgba(56, 84, 255, 0.45)',
            borderLeft: '1.5px solid rgba(56, 84, 255, 0.45)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '10px',
            height: '10px',
            borderBottom: '1.5px solid rgba(56, 84, 255, 0.45)',
            borderRight: '1.5px solid rgba(56, 84, 255, 0.45)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top — metric highlight */}
        <div className="relative z-10 shrink-0">
          {/* Metric badge */}
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <span
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(26px, 2.2vw, 32px)',
                color: '#3854FF',
                textShadow: '0 0 20px rgba(56, 84, 255, 0.35)',
                lineHeight: 1,
              }}
            >
              {t.metric}
            </span>
            <span
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: '8px',
                color: 'rgba(255,255,255,0.48)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textAlign: 'right',
              }}
            >
              {t.metricLabel}
            </span>
          </div>

          {/* Thin separator */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, rgba(56, 84, 255, 0.4), transparent)',
              marginBottom: '12px',
            }}
          />
        </div>

        {/* Middle — Quote */}
        <div className="relative z-10 flex-1 flex flex-col justify-start">
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontWeight: 400,
              fontSize: '12.5px',
              color: 'rgba(245, 240, 232, 0.82)',
              lineHeight: 1.55,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Bottom — attribution pinned to baseline */}
        <div
          className="relative z-10 shrink-0 mt-4 pt-3.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar initials with sharp corners */}
            <div
              className="flex items-center justify-center shrink-0 rounded-none"
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid rgba(56, 84, 255, 0.4)',
                backgroundColor: 'rgba(48, 73, 232, 0.15)',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                {t.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="block m-0 truncate"
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {t.name}
              </span>
              <div
                className="mt-0.5"
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: '8.5px',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.3,
                }}
              >
                <span>{t.role}</span>
                <span className="mx-1 text-white/20">·</span>
                <span style={{ color: '#3854FF', fontWeight: 600 }}>{t.company}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================
   Section — Client Testimonials
   ======================================== */

export default function TestimonialsGrid() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0C0C0C',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(100px, 12vw, 160px)',
      }}
    >
      {/* Floating decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(44, 52, 128,0.04) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(44, 52, 128,0.03) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8 sm:mb-12" style={{ maxWidth: '1400px', margin: '0 auto clamp(28px, 4vw, 48px)' }}>
        <span
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: '10px',
            color: 'rgba(245, 240, 232, 0.45)',
            letterSpacing: '0.22em',
            display: 'block',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span style={{ color: '#3854FF', marginRight: '6px' }}>—</span> CLIENT RESULTS
        </span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
          <motion.h2
            className="m-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F5F0E8',
            }}
          >
            What Our<br />
            <span className="font-citadel italic" style={{ color: '#3854FF', textShadow: '0 0 30px rgba(56, 84, 255, 0.4)' }}>Clients Say.</span>
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: 'clamp(12px, 0.9vw, 13.5px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.48)',
              maxWidth: '320px',
              textAlign: 'left',
              lineHeight: 1.55,
            }}
          >
            Measured by impact, validated by trust. Every project speaks for itself.
          </motion.span>
        </div>
      </div>

      {/* 3D Testimonial Cards */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch"
        style={{ gap: 'clamp(12px, 1.2vw, 18px)', maxWidth: '1750px', margin: '0 auto' }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
