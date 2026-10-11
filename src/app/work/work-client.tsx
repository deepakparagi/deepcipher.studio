'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { projects, categories, type Category, type Project } from '@/lib/projects';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import NeuralBackground from '@/components/ui/flow-field-background';
import AnimatedText from '@/components/ui/AnimatedText';
import Image from 'next/image';
import EditorialPageHero from '@/components/layout/EditorialPageHero';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursor, resetCursor } = useCursor();

  const techString = project.techStack ? project.techStack.slice(0, 2).join(' · ') : '';
  const metadataLeft = techString ? `CLIENT // ${project.client.toUpperCase()} · ${techString.toUpperCase()}` : `CLIENT // ${project.client.toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col"
    >
      <Link 
        href={`/work/${project.slug}`} 
        className="group relative block w-full aspect-[16/10] overflow-hidden bg-[#0A0A0A]"
        style={{ cursor: 'none' }}
        onMouseEnter={() => setCursor('hover', 'VIEW')}
        onMouseLeave={resetCursor}
      >
        {/* Background Image */}
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
            priority={index < 4}
            style={{ zIndex: 0 }}
          />
        )}

        {/* Hover Outline */}
        <div className="absolute inset-0 z-[60] pointer-events-none transition-all duration-300 outline outline-1 outline-transparent group-hover:outline-[rgba(44, 52, 128,0.3)]" />

        {/* Category Badge */}
        <div 
          className="absolute top-[14px] right-[14px] z-[20] shadow-md"
          style={{
            background: 'rgba(10, 10, 10, 0.85)',
            border: '1px solid rgba(44, 52, 128, 0.35)',
            color: '#F5F0E8',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            padding: '5px 12px',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)'
          }}
        >
          {project.category}
        </div>

        {/* Minimal Centered Text Overlay */}
        <div 
          className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none transition-all duration-300"
        >
          {/* Ambient center scrim for guaranteed legibility across any render */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-black/25 group-hover:bg-black/50" 
          />
          
          <div className="relative z-10 text-center flex flex-col items-center justify-center px-4">
            <div
              className="px-5 py-2.5 transition-all duration-300 group-hover:border-[rgba(44, 52, 128,0.6)]"
              style={{
                background: 'rgba(10, 10, 10, 0.72)',
                border: '1px solid rgba(245, 240, 232, 0.12)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <h3 
                className="block transition-colors duration-300 uppercase font-medium"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#F5F0E8',
                  lineHeight: 1.4,
                  letterSpacing: '0.22em',
                }}
              >
                {project.title}
              </h3>
            </div>

            {/* View Case Study prompt on hover */}
            <span 
              className="mt-3 text-[10px] tracking-[0.18em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                color: '#2C3480',
                fontWeight: 500,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              VIEW CASE STUDY &rarr;
            </span>
          </div>
        </div>
      </Link>

      {/* Metadata Strip BELOW Card */}
      <div 
        className="flex justify-between items-center border-t border-[rgba(245,240,232,0.06)]"
        style={{
          background: '#0D0D0D',
          padding: '12px 18px',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.12em'
        }}
      >
        <span className="uppercase text-[#A39E93]">
          <span className="text-[#2C3480] font-medium">CLIENT //</span> {project.client.toUpperCase()} {techString ? `· ${techString.toUpperCase()}` : ''}
        </span>
        <span className="text-[#F5F0E8] font-medium">{project.year}</span>
      </div>
    </motion.div>
  );
}

export default function WorkClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.main
      ref={containerRef}
      className="min-h-screen pb-0 text-[#F5F0E8] selection:bg-[#2C3480]/20"
      style={{ backgroundColor: '#0A0A0A' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      {/* ── 1. HERO SECTION ── */}
      <EditorialPageHero
        eyebrow="SELECTED WORK"
        title="Crafted for ambition, built to "
        italicWord="endure."
        description="Selected digital experiences engineered for lasting market authority."
        backgroundImage="/images/work%20page%20hero.png"
      />

      {/* Sticky Category Filter */}
      <div
        className="sticky z-50 flex items-center justify-center w-full"
        style={{
          top: '56px',
          height: '52px',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(245, 240, 232, 0.08)',
          borderTop: '1px solid rgba(245, 240, 232, 0.08)',
        }}
      >
        <div 
          className="flex flex-nowrap overflow-x-auto items-center justify-start md:justify-center gap-6 md:gap-8 w-full max-w-[1800px] px-4 md:px-12 scrollbar-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="relative cursor-pointer select-none uppercase whitespace-nowrap shrink-0 transition-colors duration-200 py-2"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.15em',
                  color: isActive ? '#2C3480' : 'rgba(245, 240, 232, 0.55)',
                  borderBottom: isActive ? '2px solid #2C3480' : '2px solid transparent',
                }}
                onMouseOver={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = '#F5F0E8';
                }}
                onMouseOut={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(245, 240, 232, 0.55)';
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <section className="py-16 md:py-36">
        <div className="mx-auto max-w-[1800px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="border border-[rgba(245,240,232,0.08)] bg-[#0C0C0C] py-48 text-center">
              <span className="text-[11px] uppercase italic tracking-[0.4em] text-[#6B6560]">
                No projects found in this category.
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 flex flex-col items-center justify-center border-t border-[rgba(245,240,232,0.08)] px-6 py-36 text-center md:py-48">
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/contact"
            onMouseEnter={() => setCursor('hover', 'INIT')}
            onMouseLeave={resetCursor}
            className="group relative inline-block text-[clamp(40px,5vw,80px)] transition-colors duration-500"
          >
            <span className="upright text-[#F5F0E8] group-hover:text-[#2C3480] transition-colors duration-300">Start a </span>
            <span className="italic text-[#2C3480] group-hover:text-[#F5F0E8] transition-colors duration-300">project.</span>
            <div className="absolute bottom-1 left-0 right-0 h-px origin-right scale-x-100 bg-[#2C3480] transition-transform duration-700 group-hover:scale-x-0" />
            <div className="absolute bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-[#F5F0E8] transition-transform duration-700 delay-100 group-hover:scale-x-100" />
          </Link>
          <span
            className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#6B6560]"
            style={{ fontFamily: 'var(--font-body), sans-serif' }}
          >
            deepcipherstudio@gmail.com
          </span>
        </div>
      </section>
    </motion.main>
  );
}
