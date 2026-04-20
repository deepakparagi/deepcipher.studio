'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';

/* ========================================
   Process Phase Data
   ======================================== */

interface ProcessPhase {
  no: string;
  name: string;
  tagline: string;
  desc: string;
  deliverables: string[];
}

const phases: ProcessPhase[] = [
  {
    no: '01',
    name: 'Discover',
    tagline: 'Understand everything.',
    desc: 'We immerse ourselves in your business, audience, and competitive landscape before touching a single pixel.',
    deliverables: ['Market Analysis', 'User Research', 'Brand Audit'],
  },
  {
    no: '02',
    name: 'Strategise',
    tagline: 'Architect the journey.',
    desc: 'Every page, every scroll, every click is mapped to a conversion goal. Nothing is accidental.',
    deliverables: ['Site Architecture', 'Content Strategy', 'Conversion Map'],
  },
  {
    no: '03',
    name: 'Design',
    tagline: 'Obsess over every detail.',
    desc: 'Pixel-perfect interfaces that don\'t just look beautiful — they guide visitors toward action.',
    deliverables: ['UI Design', 'Motion System', 'Design System'],
  },
  {
    no: '04',
    name: 'Build & Launch',
    tagline: 'Ship with precision.',
    desc: 'Flawless engineering, rigorous QA, performance optimization, and seamless deployment.',
    deliverables: ['Development', 'QA Testing', 'Launch Support'],
  },
];

/* ========================================
   Phase Card — Individual step card
   ======================================== */

function PhaseCard({
  phase,
  index,
  isActive,
  onActivate,
}: {
  phase: ProcessPhase;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  /* Staggered vertical offset for visual rhythm */
  const verticalOffset = index % 2 === 0 ? 0 : 60;

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col cursor-pointer"
      style={{
        marginTop: `${verticalOffset}px`,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Phase number — oversized ghost */}
      <div className="relative" style={{ marginBottom: '32px' }}>
        <span
          className="select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: 'clamp(72px, 6vw, 100px)',
            lineHeight: 0.85,
            color: isActive ? 'rgba(184,149,106,0.12)' : 'rgba(255,255,255,0.03)',
            transition: 'color 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {phase.no}
        </span>

        {/* Accent dot */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '0',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#B8956A',
          }}
          animate={{
            scale: isActive ? 1 : 0.5,
            opacity: isActive ? 1 : 0.3,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Content card */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          padding: 'clamp(32px, 3vw, 48px)',
          minHeight: '360px',
          background: isActive
            ? 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(184,149,106,0.04) 40%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid',
          borderColor: isActive
            ? 'rgba(184,149,106,0.15)'
            : 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Glow orb on hover */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-30%',
            right: '-20%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(184,149,106,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Corner bracket — top left */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '16px',
            height: '16px',
            borderTop: '1px solid',
            borderLeft: '1px solid',
            borderColor: isActive
              ? 'rgba(184,149,106,0.3)'
              : 'rgba(255,255,255,0.06)',
            transition: 'border-color 0.4s ease',
          }}
        />
        {/* Corner bracket — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            width: '16px',
            height: '16px',
            borderBottom: '1px solid',
            borderRight: '1px solid',
            borderColor: isActive
              ? 'rgba(184,149,106,0.3)'
              : 'rgba(255,255,255,0.06)',
            transition: 'border-color 0.4s ease',
          }}
        />

        {/* Phase name */}
        <h3
          className="m-0 relative z-10"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 3vw, 40px)',
            lineHeight: 1,
            color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.4s ease',
          }}
        >
          {phase.name}
        </h3>

        {/* Tagline */}
        <span
          className="relative z-10"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: isActive ? '#B8956A' : 'rgba(255,255,255,0.2)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '12px',
            transition: 'color 0.4s ease',
          }}
        >
          {phase.tagline}
        </span>

        {/* Divider */}
        <div
          className="relative z-10"
          style={{
            width: '100%',
            height: '1px',
            background: isActive
              ? 'linear-gradient(to right, rgba(184,149,106,0.2), transparent)'
              : 'rgba(255,255,255,0.04)',
            marginTop: '24px',
            marginBottom: '24px',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Description */}
        <p
          className="m-0 relative z-10"
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: isActive
              ? 'rgba(255,255,255,0.55)'
              : 'rgba(255,255,255,0.2)',
            lineHeight: 1.85,
            transition: 'color 0.4s ease',
          }}
        >
          {phase.desc}
        </p>

        {/* Deliverables — bottom */}
        <div
          className="relative z-10 flex flex-wrap gap-2 mt-auto"
          style={{ paddingTop: '32px' }}
        >
          {phase.deliverables.map((d, di) => (
            <span
              key={di}
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive
                  ? 'rgba(184,149,106,0.7)'
                  : 'rgba(255,255,255,0.15)',
                padding: '6px 12px',
                border: '1px solid',
                borderColor: isActive
                  ? 'rgba(184,149,106,0.15)'
                  : 'rgba(255,255,255,0.04)',
                transition: 'all 0.4s ease',
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================
   Animated Progress Line
   ======================================== */

function ProgressLine({ activePhase }: { activePhase: number }) {
  const progress = useSpring((activePhase + 1) / phases.length, {
    stiffness: 80,
    damping: 25,
  });

  useEffect(() => {
    progress.set((activePhase + 1) / phases.length);
  }, [activePhase, progress]);

  const width = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div
      className="relative w-full"
      style={{ height: '1px', marginBottom: '80px' }}
    >
      {/* Track */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      />
      {/* Active fill */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width,
          background:
            'linear-gradient(to right, #B8956A, rgba(184,149,106,0.3))',
        }}
      />
      {/* Phase markers */}
      {phases.map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${((i + 1) / phases.length) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor:
              i <= activePhase ? '#B8956A' : 'rgba(255,255,255,0.08)',
            transition: 'background-color 0.4s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ========================================
   Section — Process Teaser (Redesigned)
   ======================================== */

export default function ProcessTeaser() {
  const [activePhase, setActivePhase] = useState(0);

  /* Auto-cycle when not hovering */
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    timeoutRef.current = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 3500);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isHovering]);

  const handleActivate = useCallback((i: number) => {
    setActivePhase(i);
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        padding:
          'clamp(100px, 12vw, 180px) clamp(24px, 5vw, 80px) clamp(120px, 14vw, 200px)',
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.012) 1px, transparent 0)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Ambient glow — top right ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '5%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(184,149,106,0.035) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Ambient glow — bottom left ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(184,149,106,0.025) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* ── Section header ── */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end"
          style={{ marginBottom: 'clamp(64px, 6vw, 100px)' }}
        >
          <div className="flex flex-col">
            <SectionLabel className="text-[rgba(255,255,255,0.25)] mb-6">
              [ HOW WE WORK ]
            </SectionLabel>

            <motion.h2
              className="m-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(48px, 5.5vw, 88px)',
                lineHeight: 0.9,
                color: '#fff',
              }}
            >
              Four phases.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>
                Zero guesswork.
              </span>
            </motion.h2>
          </div>

          <motion.p
            className="m-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.3)',
              maxWidth: '280px',
              lineHeight: 1.8,
              textAlign: 'right',
              marginTop: '24px',
            }}
          >
            Every project follows the same obsessive process. No shortcuts.
            No surprises. Just results.
          </motion.p>
        </div>

        {/* ── Progress line ── */}
        <ProgressLine activePhase={activePhase} />

        {/* ── Phase cards grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(16px, 2vw, 24px)' }}
        >
          {phases.map((phase, i) => (
            <PhaseCard
              key={i}
              phase={phase}
              index={i}
              isActive={activePhase === i}
              onActivate={handleActivate}
            />
          ))}
        </div>

        {/* ── CTA row ── */}
        <motion.div
          className="flex items-center justify-between"
          style={{
            marginTop: 'clamp(64px, 6vw, 100px)',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <Link
            href="/process"
            className="group inline-flex items-center gap-3"
            style={{
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#B8956A',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                transition: 'opacity 0.3s ease',
              }}
            >
              See our full process
            </span>
            <motion.span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '14px',
                color: '#B8956A',
                display: 'inline-block',
              }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              →
            </motion.span>
          </Link>

          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: 'rgba(255,255,255,0.12)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            4 Phases · 8-12 Weeks · 1 Goal
          </span>
        </motion.div>
      </div>
    </section>
  );
}
