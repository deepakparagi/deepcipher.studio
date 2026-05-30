'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects, categories, Category, Project } from '@/lib/projects';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';

/* ==========================================================
   ELITE WORK ARCHIVE — AWWWARDS STANDARDS
   Theme: Quiet Luxury, Precise Asymmetry, Obsidian & Warm Gold.
   ========================================================== */

function getInitials(title: string) {
  // Extract initials, ignoring sub-branding inside parentheses
  const cleanTitle = title.replace(/\([^)]*\)/g, '').trim();
  const words = cleanTitle.split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * CustomProjectImage — Graceful Image Fallback to Typographic luxury
 */
function CustomProjectImage({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center relative overflow-hidden select-none"
        style={{
          background: 'linear-gradient(135deg, #0e0e0e 0%, #151515 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <span 
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(48px, 6vw, 84px)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#B8956A',
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
          <span 
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '8px',
              color: 'rgba(245, 240, 232, 0.2)',
              letterSpacing: '0.25em',
            }}
          >
            GRID_NODE_FALLBACK
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-w-768px) 100vw, 50vw"
      className="object-contain w-full h-full transition-transform duration-[400ms] [transition-timing-function:ease] group-hover:scale-[1.04]"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

/**
 * Dynamic Masonry Card Component
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursor, resetCursor } = useCursor();
  const initials = getInitials(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-[16/10] group overflow-hidden bg-[#F5F0E8] transition-all duration-[400ms] ease-out"
      style={{
        outline: '1px solid transparent',
      }}
      whileHover={{
        outline: '1px solid rgba(184,149,106,0.4)',
      }}
      onMouseEnter={() => setCursor('hover', 'VIEW')}
      onMouseLeave={resetCursor}
    >
      <Link href={`/work/${project.slug}`} className="block w-full h-full relative">
        {/* Full SVG (bleeds edge-to-edge inside 16/10 container) */}
        <CustomProjectImage src={project.image} alt={project.title} initials={initials} />
        
        {/* Subtle Hover Dark Overlay (rgba(0,0,0,0.25)) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-[400ms] ease-out z-10 pointer-events-none" />

        {/* Category Badge top-right corner overlaid inside card */}
        <div className="absolute top-[16px] right-[16px] z-20">
          <span 
            className="text-[#0A0A0A] bg-[#B8956A] uppercase pointer-events-none select-none"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              letterSpacing: '0.12em',
              padding: '5px 12px',
              borderRadius: '0px',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Project name in Cormorant Garamond italic 32px slides up from bottom of SVG area */}
        <div className="absolute inset-x-5 bottom-[64px] z-20 overflow-hidden pointer-events-none">
          <h3 
            className="m-0 text-[#F5F0E8] font-light italic leading-none transition-all duration-[400ms] [transition-timing-function:ease] transform translate-y-0 md:translate-y-[20px] opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '32px',
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Metadata Strip below SVG (NOT inside it) */}
        <div 
          className="absolute inset-x-0 bottom-0 bg-[#0A0A0A] flex items-center justify-between z-20 select-none"
          style={{
            height: '48px',
            padding: '0 20px',
          }}
        >
          {/* Left: CLIENT // [NAME] · TECH · TECH */}
          <span 
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#6B6560',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '60%',
            }}
          >
            CLIENT // {project.client} · {project.tags.slice(0, 2).join(' · ')}
          </span>
          {/* Right: YEAR */}
          <span 
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#6B6560',
              letterSpacing: '0.12em',
            }}
          >
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen text-[#F5F0E8] selection:bg-[#B8956A]/20 pb-0"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <Noise opacity={0.03} />
      
      {/* ── 1. HERO SECTION ── */}
      <section 
        className="relative w-full border-b border-[rgba(245,240,232,0.08)] px-6"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 0,
        }}
      >
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 flex flex-col items-center"
        >
          {/* Label in DM Mono */}
          <span 
            className="mb-[16px]"
            style={{ 
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#6B6560',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            [ SELECTED WORK ]
          </span>

          {/* Title in Cormorant Garamond */}
          <h1 
            className="italic leading-none uppercase m-0 select-none mb-[16px]"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(96px, 12vw, 160px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
            }}
          >
            Work
          </h1>

          {/* Subtitle */}
          <span 
            className="block mb-[20px]"
            style={{ 
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#B8956A',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            2024 — 2026
          </span>

          {/* Subtitle description in DM Sans */}
          <p 
            style={{ 
              fontFamily: 'var(--font-body), sans-serif', 
              fontSize: '14px',
              color: '#6B6560', 
              fontWeight: 300,
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Premium web design & brand identity for businesses across India & beyond.
          </p>
        </motion.div>

        {/* Scroll indicator with gold animated pulse line */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4 z-20 select-none">
          <span 
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            SCROLL
          </span>
          <motion.div 
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              height: '40px',
              width: '0.5px',
              background: '#B8956A',
            }}
          />
        </div>
      </section>

      {/* ── 2. FILTER BAR (Sticky) ── */}
      <div 
        className="sticky top-0 z-50 py-8 backdrop-blur-md transition-all duration-300"
        style={{ 
          backgroundColor: 'rgba(10, 10, 10, 0.98)',
          borderBottom: '0.5px solid rgba(245, 240, 232, 0.08)',
        }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 onMouseEnter={() => setCursor('link')}
                 onMouseLeave={resetCursor}
                 className="relative px-6 py-2.5 transition-all duration-500 font-mono text-[10px] tracking-[0.15em] uppercase select-none cursor-pointer"
                 style={{
                   fontFamily: 'var(--font-mono), monospace',
                   fontWeight: 300,
                   backgroundColor: activeCategory === category ? '#B8956A' : 'transparent',
                   color: activeCategory === category ? '#0A0A0A' : '#6B6560',
                   border: activeCategory === category ? '1px solid #B8956A' : '1px solid rgba(245, 240, 232, 0.08)',
                   borderRadius: '9999px',
                 }}
               >
                 {category}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* ── 3. ASYMMETRIC MASONRY GRID ── */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1800px] mx-auto px-[24px]">
          {/* Aligned 2-column wide cinematic grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-48 text-center border border-[rgba(245,240,232,0.08)] bg-[#0C0C0C] rounded-lg">
              <span className="font-mono text-[11px] text-[#6B6560] tracking-[0.4em] uppercase italic">
                No active records synchronized in category.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. FOOTER CTA — START A PROJECT ── */}
      <section className="relative z-10 border-t border-[rgba(245,240,232,0.08)] py-36 md:py-48 flex flex-col items-center justify-center text-center px-6">
        <div className="flex flex-col items-center gap-6">
          <Link 
            href="/contact"
            onMouseEnter={() => setCursor('hover', 'INIT')}
            onMouseLeave={resetCursor}
            className="group relative inline-block text-[#B8956A] hover:text-[#F5F0E8] transition-colors duration-500 uppercase tracking-tighter"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontStyle: 'italic',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            Start a project.
            
            {/* Elegant Underline Hover Animation */}
            <div 
              className="absolute bottom-1 left-0 right-0 h-px bg-[#B8956A] scale-x-100 group-hover:scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-right" 
            />
            <div 
              className="absolute bottom-1 left-0 right-0 h-px bg-[#F5F0E8] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left delay-100" 
            />
          </Link>

          <span 
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#6B6560] mt-4"
            style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 300 }}
          >
            deepcipherstudio@gmail.com
          </span>
        </div>
      </section>
    </main>
  );
}
