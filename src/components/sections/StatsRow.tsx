'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

/* ========================================
   Count-Up Hook
   ======================================== */

function useCountUp(target: number, duration: number, animate: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const increment = target / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration, animate]);

  return animate ? count : 0;
}

/* ========================================
   Stats Data
   ======================================== */

interface StatData {
  val: number;
  label: string;
  suffix: string;
  description: string;
}

const stats: StatData[] = [
  { val: 20, label: 'WEBSITES LAUNCHED', suffix: '+', description: 'Custom builds shipped' },
  { val: 10, label: 'PROJECTS PER YEAR', suffix: '', description: 'Maximum capacity' },
  { val: 24, label: 'RESPONSE TIME', suffix: 'hr', description: 'Average turnaround' },
  { val: 95, label: 'PERFORMANCE SCORE', suffix: '+', description: 'Lighthouse target' },
];

/* ========================================
   Stat Card — Glassmorphism with 3D tilt
   ======================================== */

function StatCard({ stat, index, animate }: { stat: StatData; index: number; animate: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const count = useCountUp(stat.val, 1.8, animate);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          padding: 'clamp(32px, 4vw, 48px)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle, rgba(184,149,106,${0.08 + index * 0.02}) 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(30px)',
          }}
        />

        {/* Corner bracket */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '16px',
            height: '16px',
            borderTop: '1px solid rgba(184,149,106,0.25)',
            borderRight: '1px solid rgba(184,149,106,0.25)',
          }}
        />

        {/* Number */}
        <div className="relative z-10">
          <span
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(56px, 7vw, 88px)',
              lineHeight: 1,
              color: '#fff',
              display: 'block',
            }}
          >
            {count}{stat.suffix}
          </span>
        </div>

        {/* Label + description */}
        <div className="relative z-10" style={{ marginTop: '24px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#B8956A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
            }}
          >
            {stat.label}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.35)',
              marginTop: '6px',
              display: 'block',
            }}
          >
            {stat.description}
          </span>
        </div>

        {/* Bottom accent line */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, transparent, #B8956A, transparent)',
            transformOrigin: 'center',
          }}
          initial={{ scaleX: 0 }}
          animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

/* ========================================
   Section — Stats with 3D Cards
   ======================================== */

export default function StatsRow() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0C0C0C',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Floating 3D orbs — background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 200, x: '10%', y: '20%', delay: 0, opacity: 0.04 },
          { size: 300, x: '80%', y: '60%', delay: 2, opacity: 0.03 },
          { size: 160, x: '50%', y: '80%', delay: 4, opacity: 0.05 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
            style={{
              position: 'absolute',
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(184,149,106,${orb.opacity}) 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
        ))}

        {/* Geometric grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#B8956A',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            [ IN NUMBERS ]
          </motion.span>

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
              fontSize: 'clamp(48px, 5.5vw, 80px)',
              lineHeight: 0.9,
              color: '#fff',
            }}
          >
            Results that<br />speak louder
          </motion.h2>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '260px',
            textAlign: 'right',
          }}
        >
          Every number represents a business we helped transform.
        </motion.span>
      </div>

      {/* Stats Grid — 3D tilt cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: 'clamp(12px, 2vw, 20px)' }}
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, margin: '0px' }}
      >
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} animate={hasEntered} />
        ))}
      </motion.div>
    </section>
  );
}
