'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCursor } from '../ui/CursorProvider';
import SectionLabel from '../ui/SectionLabel';
import MagneticButton from '../ui/MagneticButton';
import { projects } from '@/lib/projects';
import type { Project } from '@/lib/projects';

/* ========================================
   Animation Variants
   ======================================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ========================================
   ProjectRow — Single editorial list item
   ======================================== */

interface ProjectRowProps {
  project: Project;
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  const { setCursor, resetCursor } = useCursor();
  const formattedIndex = String(index + 1).padStart(2, '0');

  /* Build category string from project.category + tags */
  const categoryDisplay = project.category;

  return (
    <motion.div variants={rowVariants}>
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        onMouseEnter={() => setCursor('link', 'VIEW')}
        onMouseLeave={resetCursor}
      >
        <div
          className="relative flex items-center justify-between gap-8 w-full"
          style={{
            padding: 'clamp(28px, 4vw, 48px) 0',
          }}
        >
          {/* Accent bar — appears on hover */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent-warm)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            aria-hidden="true"
          />

          {/* Left side — Index + Title */}
          <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
            {/* Superscript index */}
            <span
              className="flex-shrink-0 font-mono text-[var(--accent-warm)] transition-opacity duration-300"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 300,
                letterSpacing: '0.05em',
                lineHeight: 1,
                position: 'relative',
                top: '-0.6em',
              }}
            >
              {formattedIndex}
            </span>

            {/* Project title */}
            <h3
              className="m-0 uppercase transition-transform duration-500 group-hover:translate-x-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(28px, 4.5vw, 56px)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Right side — Category tags */}
          <span
            className="hidden md:block flex-shrink-0 text-right transition-colors duration-400 group-hover:text-[var(--accent-warm)]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-tertiary)',
              whiteSpace: 'nowrap',
            }}
          >
            {categoryDisplay}
          </span>
        </div>

        {/* Hairline separator */}
        <div
          className="w-full transition-colors duration-500 group-hover:border-[var(--accent-warm)]/30"
          style={{
            height: '1px',
            background: 'var(--border)',
          }}
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

/* ========================================
   SelectedProjects — Editorial list section
   ======================================== */

export default function SelectedProjects() {
  return (
    <section
      className="relative w-full"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Section label with accent line */}
      <div className="flex items-center gap-4 mb-16 md:mb-20">
        <div
          className="w-8 h-[1px] flex-shrink-0"
          style={{ backgroundColor: 'var(--accent-warm)' }}
          aria-hidden="true"
        />
        <SectionLabel className="text-[var(--ink-tertiary)]">
          SELECTED PROJECTS
        </SectionLabel>
      </div>

      {/* Project rows — staggered reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Top hairline */}
        <div
          className="w-full"
          style={{
            height: '1px',
            background: 'var(--border)',
          }}
          aria-hidden="true"
        />

        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </motion.div>

      {/* CTA — View all work */}
      <div className="mt-12 md:mt-16 flex justify-center">
        <MagneticButton variant="outline" href="/work" cursorLabel="WORK">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] px-8 py-4 block"
            style={{ color: 'var(--ink)' }}
          >
            Projects
          </span>
        </MagneticButton>
      </div>
    </section>
  );
}
