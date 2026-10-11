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
        className="relative overflow-hidden flex flex-col justify-between h-full w-full rounded-2xl"
        style={{
          padding: 'clamp(24px, 2.5vw, 36px)',
          minHeight: '520px',
          height: '100%',
          background: isHovered
            ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(44, 52, 128,0.12) 50%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid',
          borderColor: isHovered ? 'rgba(75, 93, 245, 0.4)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          transition: 'background 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-30%',
            left: '-20%',
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(75, 93, 245, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Corner brackets */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '14px',
            height: '14px',
            borderTop: '1px solid rgba(75, 93, 245, 0.4)',
            borderLeft: '1px solid rgba(75, 93, 245, 0.4)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '14px',
            height: '14px',
            borderBottom: '1px solid rgba(75, 93, 245, 0.4)',
            borderRight: '1px solid rgba(75, 93, 245, 0.4)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top — metric highlight */}
        <div className="relative z-10 shrink-0">
          {/* Metric badge */}
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <span
              style={{
                fontFamily: 'var(--font-helvetica), sans-serif',
                fontWeight: 700,
                fontStyle: 'normal',
                letterSpacing: '-0.03em',
                fontSize: '36px',
                color: '#4B5DF5',
                textShadow: '0 0 24px rgba(75, 93, 245, 0.4)',
                lineHeight: 1,
              }}
            >
              {t.metric}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.14em',
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
              background: 'linear-gradient(to right, rgba(75, 93, 245, 0.4), transparent)',
              marginBottom: '20px',
            }}
          />
        </div>

        {/* Middle — Quote */}
        <div className="relative z-10 flex-1 flex flex-col justify-start my-2">
          <p
            className="m-0"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '13.5px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Bottom — attribution pinned to baseline */}
        <div className="relative z-10 shrink-0 mt-auto pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            {/* Avatar initials */}
            <div
              className="flex items-center justify-center shrink-0 rounded-md"
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid rgba(75, 93, 245, 0.4)',
                backgroundColor: 'rgba(44, 52, 128, 0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                {t.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="block m-0"
                style={{
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {t.name}
              </span>
              <div
                className="mt-1"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '8.5px',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.35,
                }}
              >
                <span>{t.role}</span>
                <span className="mx-1 text-white/20">·</span>
                <span style={{ color: '#4B5DF5', fontWeight: 600 }}>{t.company}</span>
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
      <div className="relative z-10 mb-16" style={{ maxWidth: '1400px', margin: '0 auto 64px' }}>
        <span
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            color: '#6B6560',
            letterSpacing: '0.3em',
            display: 'block',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#2C3480', marginRight: '4px' }}>—</span> CLIENT RESULTS
        </span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.h2
            className="m-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-helvetica), sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#F5F0E8',
            }}
          >
            What Our<br />
            <span className="font-citadel italic" style={{ color: '#4B5DF5', textShadow: '0 0 30px rgba(75, 93, 245, 0.4)' }}>Clients Say.</span>
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '280px',
              textAlign: 'right',
              lineHeight: 1.6,
            }}
          >
            Measured by impact, validated by trust. Every project speaks for itself.
          </motion.span>
        </div>
      </div>

      {/* 3D Testimonial Cards */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch"
        style={{ gap: 'clamp(14px, 1.5vw, 20px)', maxWidth: '1750px', margin: '0 auto' }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
