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
      "Working with Deepak felt less like hiring a developer and more like gaining a creative partner. He understood the cultural significance of the project and translated it into a digital platform that the entire community takes pride in. The bilingual experience is seamless.",
    name: 'Gadag Info Community',
    role: '115K+ Follower Platform',
    company: 'Karnataka, India',
    metric: '115K+',
    metricLabel: 'ACTIVE USERS',
    initials: 'GI',
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative overflow-hidden flex flex-col justify-between"
        style={{
          padding: 'clamp(32px, 4vw, 48px)',
          minHeight: '420px',
          background: isHovered
            ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(184,149,106,0.06) 50%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid',
          borderColor: isHovered ? 'rgba(184,149,106,0.2)' : 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          transition: 'background 0.5s ease, border-color 0.4s ease',
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-40%',
            left: '-20%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(184,149,106,0.08) 0%, transparent 70%)',
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
            borderTop: '1px solid rgba(184,149,106,0.2)',
            borderLeft: '1px solid rgba(184,149,106,0.2)',
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
            borderBottom: '1px solid rgba(184,149,106,0.2)',
            borderRight: '1px solid rgba(184,149,106,0.2)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top — metric highlight + quote */}
        <div className="relative z-10">
          {/* Metric badge */}
          <div className="flex items-center gap-3 mb-6">
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: '36px',
                color: '#B8956A',
                lineHeight: 1,
              }}
            >
              {t.metric}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
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
              background: 'linear-gradient(to right, rgba(184,149,106,0.2), transparent)',
              marginBottom: '24px',
            }}
          />

          {/* Quote */}
          <p
            className="m-0"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.85,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Bottom — attribution */}
        <div className="relative z-10" style={{ marginTop: '32px' }}>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              marginBottom: '20px',
            }}
          />
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-4">
              {/* Avatar initials */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '0.5px solid rgba(184,149,106,0.25)',
                  backgroundColor: 'rgba(184,149,106,0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#B8956A',
                  }}
                >
                  {t.initials}
                </span>
              </div>
              <div>
                <span
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: '17px',
                    color: '#F5F0E8',
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  {t.name}
                </span>
                <span
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t.role}
                </span>
              </div>
            </div>
            <span
              className="m-0"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px',
                color: '#B8956A',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {t.company}
            </span>
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
            background: 'radial-gradient(circle, rgba(184,149,106,0.04) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(184,149,106,0.03) 0%, transparent 70%)',
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
          <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> CLIENT RESULTS
        </span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.h2
            className="m-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 5vw, 80px)',
              lineHeight: 0.95,
              color: '#F5F0E8',
            }}
          >
            What Our<br />
            <span style={{ color: '#B8956A' }}>Clients Say.</span>
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
              color: 'rgba(255,255,255,0.3)',
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
        className="relative z-10 grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 'clamp(12px, 2vw, 20px)', maxWidth: '1400px', margin: '0 auto' }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
