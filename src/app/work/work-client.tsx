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

const FRACTAL_STYLES = [
  { bg: 'linear-gradient(160deg, #0D1B2A 0%, #1B3A5C 25%, #2E6B9E 45%, #C4763A 65%, #E8A456 80%, #F2C87E 100%)', ray: 0.03 }, // 01 Shingri
  { bg: 'linear-gradient(150deg, #1A0A2E 0%, #3D1A6E 30%, #7B3FA0 55%, #C4663A 75%, #E8954A 90%, #F5C878 100%)', ray: 0.04 }, // 02 Gadag
  { bg: 'linear-gradient(165deg, #0A0A0A 0%, #1A1208 20%, #3D2E0A 40%, #8B6914 60%, #C4A028 78%, #E8C84A 92%, #F5E8A0 100%)', ray: 0.03 }, // 03 Deepcipher
  { bg: 'linear-gradient(155deg, #050D1A 0%, #0A2040 25%, #0E3D7A 45%, #1560B8 62%, #2890D8 78%, #5AB8E8 90%, #A0D8F5 100%)', ray: 0.04 }, // 04 Hyrox
  { bg: 'linear-gradient(158deg, #0A0F0A 0%, #0D2010 25%, #1A4020 45%, #2A7034 62%, #3A9E48 76%, #6AC878 88%, #A8E8B0 100%)', ray: 0.03 }, // 05 Sentiment
  { bg: 'linear-gradient(162deg, #0D0A1A 0%, #1E1040 25%, #3D1A7A 45%, #6828B0 62%, #9040D0 76%, #C060E8 88%, #E0A0F8 100%)', ray: 0.04 }, // 06 Gridsystems
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursor, resetCursor } = useCursor();

  const techString = project.techStack ? project.techStack.slice(0, 2).join(' · ') : '';
  const metadataLeft = techString ? `CLIENT // ${project.client.toUpperCase()} · ${techString.toUpperCase()}` : `CLIENT // ${project.client.toUpperCase()}`;

  const styleObj = FRACTAL_STYLES[index % FRACTAL_STYLES.length];

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
        className="group relative block w-full aspect-[16/10] overflow-hidden"
        style={{ cursor: 'none', background: styleObj.bg }}
        onMouseEnter={() => setCursor('hover', 'VIEW')}
        onMouseLeave={resetCursor}
      >
        {/* Hover Outline */}
        <div className="absolute inset-0 z-[60] pointer-events-none transition-all duration-300 outline outline-1 outline-transparent group-hover:outline-[rgba(184,149,106,0.2)]" />

        {/* Vertical Rays */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(255,255,255,${styleObj.ray}) 32px, rgba(255,255,255,${styleObj.ray}) 34px)`
          }}
        />

        {/* Light Bloom Effect */}
        <div 
          className="absolute pointer-events-none z-[2] transition-transform duration-600 ease-out group-hover:translate-x-[10%] group-hover:scale-110"
          style={{
            top: '-20%', left: '30%', width: '40%', height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)'
          }}
        />

        {/* Category Badge */}
        <div 
          className="absolute top-[14px] right-[14px] z-[20]"
          style={{
            background: 'rgba(184,149,106,0.15)',
            border: '0.5px solid rgba(184,149,106,0.4)',
            color: '#B8956A',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.12em',
            padding: '4px 10px',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)'
          }}
        >
          {project.category}
        </div>

        {/* Card Content Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[10] p-[24px] transition-all duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)'
          }}
        >
          {/* Darker hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)' }} />
          
          <div className="relative z-10">
            <h3 
              className="block mb-1 transition-colors duration-300 group-hover:text-[#B8956A] font-light italic"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                color: '#F5F0E8',
                lineHeight: 1.05,
                fontWeight: 300
              }}
            >
              {project.title}
            </h3>
            <span 
              className="block"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                color: '#9A9590'
              }}
            >
              {project.description}
            </span>
          </div>
        </div>

        {/* View Case Study Text */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[30] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#B8956A',
            letterSpacing: '0.15em'
          }}
        >
          VIEW CASE STUDY &rarr;
        </div>
      </Link>

      {/* Metadata Strip BELOW Card */}
      <div 
        className="flex justify-between items-center"
        style={{
          background: '#0A0A0A',
          padding: '10px 16px',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '9px',
          color: '#6B6560',
          letterSpacing: '0.1em'
        }}
      >
        <span className="uppercase">{metadataLeft}</span>
        <span>{project.year}</span>
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
      className="min-h-screen pb-0 text-[#F5F0E8] selection:bg-[#B8956A]/20"
      style={{ backgroundColor: '#0A0A0A' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      <section
        className="relative flex flex-col items-center justify-center text-center w-full"
        style={{ height: '100vh', paddingTop: '56px' }}
      >
        <NeuralBackground color="#B8956A" speed={0.8} trailOpacity={0.15} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <span
            className="mb-4 uppercase"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', color: '#6B6560', letterSpacing: '0.3em' }}
          >
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> SELECTED WORK
          </span>
          <AnimatedText
            splitBy="word"
            as="h1"
            className="m-0 mb-4 select-none not-italic font-normal text-[#F5F0E8]"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: 'clamp(60px, 9vw, 130px)', fontWeight: 500, lineHeight: 0.9 }}
          >
            Work
          </AnimatedText>
          <span
            className="mb-3 block uppercase"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#B8956A', letterSpacing: '0.25em' }}
          >
            2024 — 2026
          </span>
          <p
            className="mx-auto max-w-[480px]"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', fontWeight: 300, color: '#6B6560', lineHeight: 1.6 }}
          >
            Premium web design & brand identity for businesses across India & beyond.
          </p>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '9px', letterSpacing: '0.3em', color: '#6B6560', writingMode: 'vertical-rl' }}>
            SCROLL
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#6B6560] to-transparent" />
        </div>
      </section>

      <div
        className="sticky z-50 flex items-center justify-center"
        style={{
          top: '56px',
          height: '52px',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(245, 240, 232, 0.08)',
          borderTop: '0.5px solid rgba(245, 240, 232, 0.08)',
          padding: '0 48px',
        }}
      >
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar items-center justify-center gap-[32px] w-full max-w-[1800px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="relative cursor-pointer select-none uppercase whitespace-nowrap transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px',
                letterSpacing: '0.15em',
                padding: '6px 0',
                color: activeCategory === category ? '#B8956A' : '#6B6560',
                borderBottom: activeCategory === category ? '1px solid #B8956A' : '1px solid transparent',
              }}
              onMouseOver={(e) => {
                if (activeCategory !== category) (e.target as HTMLElement).style.color = '#F5F0E8';
              }}
              onMouseOut={(e) => {
                if (activeCategory !== category) (e.target as HTMLElement).style.color = '#6B6560';
              }}
            >
              {category}
            </button>
          ))}
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
            <span className="upright text-[#F5F0E8] group-hover:text-[#B8956A] transition-colors duration-300">Start a </span>
            <span className="italic text-[#B8956A] group-hover:text-[#F5F0E8] transition-colors duration-300">project.</span>
            <div className="absolute bottom-1 left-0 right-0 h-px origin-right scale-x-100 bg-[#B8956A] transition-transform duration-700 group-hover:scale-x-0" />
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
