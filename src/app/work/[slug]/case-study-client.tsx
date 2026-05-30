'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import type { Project } from '@/lib/projects';
import Noise from '@/components/ui/Noise';

/* ==========================================================
   ELITE NARRATIVE — WORLD-CLASS CASE STUDY
   Theme: Obsidian & Warm Gold, Editorial Layout.
   ========================================================== */

function getInitials(title: string) {
  const cleanTitle = title.replace(/\([^)]*\)/g, '').trim();
  const words = cleanTitle.split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Dynamic Inline Swiss SVG Crop Renderer
 * Custom ViewBox sizes slice the same SVG into three portrait detail grids.
 */
function renderSwissSVG(slug: string, viewBox: string) {
  switch (slug) {
    case 'shingri-developers':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect width="600" height="400" fill="#F5F0E8" />
          <polygon points="-50,0 250,0 180,500 -120,500" fill="#E8185A" />
          <polygon points="200,0 480,0 410,500 130,500" fill="#E84A18" opacity="0.9" />
          <polygon points="420,0 700,0 630,500 350,500" fill="#F06040" opacity="0.85" />
        </svg>
      );
    case 'gadag-info':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect x="0" y="0" width="800" height="500" fill="#F5EDD8" />
          <circle cx="400" cy="220" r="220" fill="none" stroke="#C41230" stroke-width="2.5" />
          <circle cx="400" cy="220" r="160" fill="none" stroke="#C45A12" stroke-width="1.5" />
          <circle cx="400" cy="220" r="80" fill="#C8A55A" opacity="0.25" />
          <polygon points="400,60 480,200 320,200" fill="#C8A55A" />
          <polygon points="400,380 480,240 320,240" fill="#C41230" opacity="0.85" />
          <polygon points="240,130 400,220 240,310" fill="#C45A12" opacity="0.7" />
          <polygon points="560,130 400,220 560,310" fill="#C8A55A" opacity="0.7" />
        </svg>
      );
    case 'deepcipher-studio':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect width="600" height="400" fill="#0A0A0A" />
          <polygon points="100,-50 250,-50 180,450 30,450" fill="#B8956A" opacity="0.5" />
          <polygon points="250,-50 400,-50 330,450 180,450" fill="#B8956A" opacity="0.8" />
          <polygon points="400,-50 550,-50 480,450 330,450" fill="#B8956A" />
        </svg>
      );
    case 'bipin-chikkatti-school':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect width="600" height="400" fill="#F5F0E8" />
          {/* Open book shape */}
          <polygon points="300,80 140,160 140,340 300,280" fill="#2D5A27" opacity="0.85" />
          <polygon points="300,80 460,160 460,340 300,280" fill="#3A7D32" opacity="0.85" />
          {/* Pencil diagonal accent */}
          <rect x="420" y="60" width="18" height="180" rx="3" fill="#B8956A" opacity="0.9" transform="rotate(25 430 150)" />
          <polygon points="430,238 420,260 440,260" fill="#B8956A" opacity="0.9" transform="rotate(25 430 250)" />
          {/* Knowledge circles */}
          <circle cx="160" cy="100" r="28" fill="#2D5A27" opacity="0.25" />
          <circle cx="480" cy="320" r="22" fill="#B8956A" opacity="0.3" />
        </svg>
      );
    case 'sentiment-ai':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect width="600" height="400" fill="#F5F0E8" />
          <rect x="80" y="50" width="280" height="300" fill="#185A30" />
          <rect x="280" y="100" width="240" height="250" fill="#7AB818" opacity="0.95" />
        </svg>
      );
    case 'gridsystems':
      return (
        <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
          <rect width="600" height="400" fill="#E8E4E0" />
          <polygon points="100,-50 250,-50 180,450 30,450" fill="#6018D8" />
          <polygon points="250,-50 400,-50 330,450 180,450" fill="#D818A8" />
          <polygon points="400,-50 550,-50 480,450 330,450" fill="#6018D8" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Dynamic outcomes metrics mapping helper
 */
function getProjectStats(slug: string) {
  switch (slug) {
    case 'shingri-developers':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '8.1/10' },
        { label: 'PROJECT VALUE TIER', value: '₹1L+' },
        { label: 'POSITIONING', value: 'World-class' },
      ];
    case 'gadag-info':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '8.3/10' },
        { label: 'PROJECT VALUE TIER', value: '₹75K+' },
        { label: 'POSITIONING', value: 'Cultural Authority' },
      ];
    case 'deepcipher-studio':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '9.0/10' },
        { label: 'PROJECT VALUE TIER', value: 'Internal' },
        { label: 'POSITIONING', value: 'Studio Standard' },
      ];
    case 'bipin-chikkatti-school':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '8.2/10' },
        { label: 'PROJECT VALUE TIER', value: '₹60K+' },
        { label: 'POSITIONING', value: 'Education Leader' },
      ];
    case 'sentiment-ai':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '8.7/10' },
        { label: 'PROJECT VALUE TIER', value: '₹80K+' },
        { label: 'POSITIONING', value: 'AI-Native' },
      ];
    case 'gridsystems':
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '9.1/10' },
        { label: 'PROJECT VALUE TIER', value: '₹1.2L+' },
        { label: 'POSITIONING', value: 'Enterprise Grade' },
      ];
    default:
      return [
        { label: 'DEEPCIPHER AUDIT SCORE', value: '8.0/10' },
        { label: 'PROJECT VALUE TIER', value: 'Standard' },
        { label: 'POSITIONING', value: 'Production' },
      ];
  }
}

/**
 * Editorial paragraph splits ensuring exactly 3 body paragraphs are rendered
 */
function getProjectParagraphs(project: Project): string[] {
  if (project.paragraphs && project.paragraphs.length >= 3) {
    return project.paragraphs.slice(0, 3);
  }
  
  // Custom fallback details tailored to fill space symmetrically
  switch (project.slug) {
    case 'gadag-info':
      return [
        'The Gadag Info platform was initiated to establish a premium digital archive of regional history and culture. The primary goal was to preserve the rich architectural and linguistic lineage of Karnataka for the modern digital landscape.',
        'By implementing cinematic page triggers and Next.js performance optimizations, we ensured that the archive loads seamlessly under heavy viral traffic spikes, keeping the massive 115k+ community connected and highly engaged.',
        'The final outcome is a gorgeous digital heritage hub featuring an interactive historical timeline and virtual landmark tours, defining a benchmark in cultural archival engineering and studio excellence.'
      ];
    case 'gridsystems':
      return [
        'GridSystems (Flux) was engineered to address a critical challenge in energy grid load-balancing. High power usage surges required a high-performance prediction console that could forecast demand in real-time.',
        'We architected a high-fidelity prediction HUD utilizing LSTM ensemble network forecasting, connected directly to local smart grid nodes via real-time WebSockets anomaly detection.',
        'This intelligent power grid automation console enables energy operators to visualize complex ML models with zero latency, optimizing grid routing paths and improving efficiency by 18%.'
      ];
    default:
      return [
        project.description,
        project.challenge,
        project.solution
      ];
  }
}

interface CaseStudyClientProps {
  project: Project;
  nextProject: Project;
}

export default function CaseStudyClient({ project, nextProject }: CaseStudyClientProps) {
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const initials = getInitials(project.title);
  const paragraphs = getProjectParagraphs(project);
  const stats = getProjectStats(project.slug);

  return (
    <div 
      ref={containerRef} 
      className="relative text-[#F5F0E8] selection:bg-[#B8956A]/20 pb-0 overflow-x-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <Noise opacity={0.03} />
      
      {/* ── 01. EDITORIAL LENS HERO ── */}
      <section 
        className="relative w-full flex flex-col justify-center items-center px-6 md:px-20 lg:px-40 overflow-hidden border-b border-[rgba(245,240,232,0.08)]"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* Full-bleed Background SVG (opacity: 0.08, same as work card SVG) */}
        <div className="absolute inset-0 z-0 opacity-[0.08] select-none pointer-events-none flex items-center justify-center">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-contain" 
            unoptimized 
            priority
          />
        </div>

        {/* Subtle dark backdrop gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0A0A0A] z-0 pointer-events-none" />

        {/* Back navigation HUD block */}
        <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-30">
          <Link 
            href="/work" 
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="font-mono text-[9px] tracking-[0.4em] text-[#6B6560] hover:text-[#F5F0E8] transition-colors duration-500 uppercase decoration-[rgba(245,240,232,0.15)] underline-offset-8 underline"
          >
            ← BACK TO ARCHIVE
          </Link>
        </div>

        {/* Main Content Layout with Radial Vignette */}
        <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center text-center">
          
          {/* Subtle Radial Vignette behind title text to guarantee high legibility */}
          <div 
            className="absolute inset-0 -my-20 z-0 pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 80%)',
              filter: 'blur(40px)'
            }}
          />

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* DM Mono Case Index Label */}
            <span 
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8"
              style={{ color: '#B8956A', fontWeight: 300 }}
            >
              [ CASE STUDY — 0{project.id} ]
            </span>

            {/* Cormorant Garamond Title — Smooth Page Entry Animation */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-light italic leading-[0.85] tracking-tight uppercase m-0 flex flex-col items-center"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(56px, 9vw, 130px)',
                color: '#F5F0E8',
              }}
            >
               {project.title}
             </motion.h1>

            {/* Thin gold rule line */}
            <div className="w-16 h-px bg-[#B8956A] my-10 opacity-70" />

            {/* One-Liner Description */}
            <p 
              className="font-light text-[18px] md:text-[22px] max-w-[45ch] leading-relaxed italic"
              style={{ fontFamily: 'var(--font-body), sans-serif', color: '#6B6560' }}
            >
              {project.description}
            </p>

            {/* Symmetrical 4-Column Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-[rgba(245,240,232,0.08)] py-12 w-full mt-20 select-none">
              <div className="flex flex-col gap-2 items-center md:items-start">
                <span className="font-mono text-[9px] text-[#6B6560] tracking-[0.2em] uppercase">CLIENT</span>
                <span className="font-body font-light text-[14px] text-[#F5F0E8]" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{project.client}</span>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <span className="font-mono text-[9px] text-[#6B6560] tracking-[0.2em] uppercase">CATEGORY</span>
                <span className="font-body font-light text-[14px] text-[#F5F0E8]" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{project.category}</span>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <span className="font-mono text-[9px] text-[#6B6560] tracking-[0.2em] uppercase">YEAR</span>
                <span className="font-body font-light text-[14px] text-[#F5F0E8]" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{project.year}</span>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <span className="font-mono text-[9px] text-[#6B6560] tracking-[0.2em] uppercase">ROLE</span>
                <span className="font-body font-light text-[14px] text-[#F5F0E8]" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{project.tags[0] || 'Design & Engineering'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator with gold animated dot */}
        <div 
          className="absolute flex flex-col items-center gap-4 z-20 select-none opacity-40"
          style={{ bottom: '32px' }}
        >
          <div className="w-[18px] h-[30px] rounded-full border border-[rgba(245,240,232,0.15)] flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-[#B8956A]"
            />
          </div>
        </div>
      </section>

      {/* ── 02. CORE CHALLENGE + TECH STACK TWO-COLUMN GRID ── */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 md:py-48 px-6 md:px-20 lg:px-40 border-b border-[rgba(245,240,232,0.08)]">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[0.55fr_0.45fr] gap-24 md:gap-40 items-start">
          
          {/* LEFT COLUMN (55% width) */}
          <div className="flex flex-col gap-14 md:gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-[#6B6560] tracking-[0.4em] uppercase font-bold">// CORE_CHALLENGE</span>
              <h2 
                className="text-[#F5F0E8] m-0 tracking-tight"
                style={{ 
                  fontFamily: 'var(--font-display), serif',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  lineHeight: '1.2',
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                {project.challenge}
              </h2>
            </div>
            
            {/* 3 Symmetrical short paragraphs */}
            <div className="flex flex-col gap-8 border-l border-[rgba(245,240,232,0.08)] pl-10 md:pl-12 select-text">
              {paragraphs.map((para, i) => (
                <p 
                  key={i} 
                  className="font-light text-[14px] text-[#9A9590] leading-[1.8] m-0"
                  style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 300 }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (45% width) */}
          <div className="flex flex-col gap-12 lg:pl-10">
            {/* Tech stack section */}
             <div className="flex flex-col gap-6">
                <span className="font-mono text-[10px] text-[#6B6560] tracking-[0.4em] uppercase font-bold">// ARCH_TECH_STACK</span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="font-mono text-[10px] text-[#B8956A] uppercase tracking-[0.15em] border border-[rgba(184,149,106,0.3)] px-4 py-2 select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
             </div>

             {/* Symmetrical DELIVERABLES bullet list in DM Sans 13px muted */}
             <div className="flex flex-col gap-6 border-t border-[rgba(245,240,232,0.08)] pt-10 select-none">
               <span className="font-mono text-[10px] text-[#6B6560] tracking-[0.4em] uppercase font-bold">// DELIVERABLES</span>
               <ul className="flex flex-col gap-3 font-light text-[13px] text-[#6B6560] pl-0 m-0 list-none" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
                 <li className="flex items-center gap-2">
                   <span className="text-[#B8956A] opacity-60">·</span> Custom Web Design
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="text-[#B8956A] opacity-60">·</span> Development &amp; Deployment
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="text-[#B8956A] opacity-60">·</span> Brand Identity System
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="text-[#B8956A] opacity-60">·</span> Performance Optimisation
                 </li>
               </ul>
             </div>

             {/* Live Experience Button */}
             <div className="pt-8 mt-4 select-none">
                <a 
                  href={project.liveUrl || '#'} 
                  onMouseEnter={() => setCursor('hover', 'LIVE')}
                  onMouseLeave={resetCursor}
                  className="block w-full text-center py-5 text-[11px] font-mono tracking-[0.15em] uppercase hover:bg-[#B8956A] hover:text-[#0A0A0A] text-[#B8956A] border border-[#B8956A] transition-all duration-300 select-none"
                >
                  Enter Live Experience →
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* ── 03. VISUAL ARCHIVE — SWISS SVG ZOOM DETAIL SHOTS ── */}
      <section className="relative z-20 py-32 bg-[#0E0E0E] border-b border-[rgba(245,240,232,0.08)] overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20 mb-16 select-none">
          <span className="font-mono text-[10px] text-[#B8956A] tracking-[0.4em] uppercase font-bold">// VISUAL ARCHIVE</span>
        </div>
        
        {/* Editorial portrait grid (Cards: aspect 3/4, sharp corners, zoom viewBox, 4px gap) */}
        <div className="max-w-[1800px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-[4px] select-none overflow-hidden">
          {/* Card 1: Left portion */}
          <div className="flex flex-col gap-4 group overflow-hidden">
            <div 
              onMouseEnter={() => setCursor('hover', 'ZOOM')}
              onMouseLeave={resetCursor}
              className="relative w-full aspect-[3/4] overflow-hidden border border-[rgba(245,240,232,0.06)] bg-[#0C0C0C]"
            >
              {renderSwissSVG(project.slug, "0 0 267 500")}
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
            <span className="font-mono text-[10px] text-[#6B6560] uppercase tracking-[0.2em]">// DETAIL 01 / 03</span>
          </div>

          {/* Card 2: Center portion */}
          <div className="flex flex-col gap-4 group overflow-hidden">
            <div 
              onMouseEnter={() => setCursor('hover', 'ZOOM')}
              onMouseLeave={resetCursor}
              className="relative w-full aspect-[3/4] overflow-hidden border border-[rgba(245,240,232,0.06)] bg-[#0C0C0C]"
            >
              {renderSwissSVG(project.slug, "267 0 267 500")}
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
            <span className="font-mono text-[10px] text-[#6B6560] uppercase tracking-[0.2em]">// DETAIL 02 / 03</span>
          </div>

          {/* Card 3: Right portion */}
          <div className="flex flex-col gap-4 group overflow-hidden">
            <div 
              onMouseEnter={() => setCursor('hover', 'ZOOM')}
              onMouseLeave={resetCursor}
              className="relative w-full aspect-[3/4] overflow-hidden border border-[rgba(245,240,232,0.06)] bg-[#0C0C0C]"
            >
              {renderSwissSVG(project.slug, "534 0 267 500")}
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            </div>
            <span className="font-mono text-[10px] text-[#6B6560] uppercase tracking-[0.2em]">// DETAIL 03 / 03</span>
          </div>
        </div>
      </section>

      {/* ── 04. EDITORIAL PULL QUOTE SECTION ── */}
      <section className="relative z-20 py-32 md:py-48 bg-[#0A0A0A] px-6 md:px-20 lg:px-40 border-b border-[rgba(245,240,232,0.08)]">
         <div className="max-w-[800px] mx-auto flex flex-col gap-10 items-stretch justify-center text-left">
            
            {/* Elegant luxury pull quote with gold left-border accent - centered and correctly formatted */}
            <div className="border-l-[3px] border-[#B8956A] pl-[32px] py-2">
              <blockquote 
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '36px',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.3,
                  color: '#F5F0E8',
                }}
              >
                Capturing structural harmony through liquid motion and architectural editorial balance.
              </blockquote>
            </div>

            <div className="pl-[35px] text-[#6B6560] leading-relaxed" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px' }}>
              <p className="m-0 font-light">
                We believe that every technical platform deserves a luxury execution. By implementing bespoke micro-interactions, Variable typeface sizing parameters, and organic WebGL shaders, we guarantee that the final digital artifact is not just usable—it is a landmark in visual storytelling and digital authority.
              </p>
            </div>
         </div>
      </section>

      {/* ── 05. DYNAMIC RESULTS / METRICS CARDS ── */}
      <section 
        className="stats-section relative z-20 bg-[#0A0A0A] py-24 md:py-36 border-b border-[rgba(245,240,232,0.08)] px-6 md:px-20 lg:px-40"
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-[1800px] mx-auto">
          <span className="font-mono text-[10px] text-[#B8956A] tracking-[0.4em] uppercase mb-16 block font-bold">// PROJECT OUTCOMES</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-none">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="stat-card flex flex-col gap-6 group transition-all duration-500"
                style={{
                  pointerEvents: 'auto',
                  padding: '40px 32px',
                  backgroundColor: 'rgba(184, 149, 106, 0.05)',
                  borderTop: '1px solid rgba(184, 149, 106, 0.3)',
                }}
              >
                <span className="font-mono text-[10px] text-[#6B6560] tracking-[0.4em] uppercase select-none">
                  // {stat.label}
                </span>
                
                <span 
                  className="font-light italic text-[#B8956A] leading-none tracking-tighter"
                  style={{ 
                    fontFamily: 'var(--font-display), serif',
                    fontSize: 'clamp(48px, 5vw, 72px)'
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06. SYMMETRICAL CASE STUDY PORTAL — PREV/NEXT NAVIGATION ── */}
      <section className="relative z-20 border-t border-[rgba(245,240,232,0.08)] py-20 md:py-24 bg-[#0E0E0E] w-full">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20 flex justify-between items-center w-full">
          
          {/* Left Column: Go Back button */}
          <Link 
            href="/work" 
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="group font-mono text-[10px] tracking-[0.3em] text-[#6B6560] hover:text-[#F5F0E8] transition-colors duration-500 uppercase flex items-center gap-2 select-none"
          >
            ← BACK TO ARCHIVE
          </Link>

          {/* Right Column: Evolve / Next dynamic case study */}
          <Link 
            href={`/work/${nextProject.slug}`} 
            onMouseEnter={() => setCursor('hover', 'NEXT')}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-6 text-right select-none"
          >
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-[9px] text-[#6B6560] tracking-[0.2em] uppercase">// EVOLVE TO NEXT ARCHIVE</span>
              <span 
                className="text-[#B8956A] group-hover:text-white transition-colors duration-500 font-light italic text-[28px] uppercase tracking-tight relative overflow-hidden pb-1"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                {nextProject.title}
                {/* Elegant Underline Hover Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </span>
            </div>
            
            {/* Symmetrical 48px Gold Circular Arrow Button */}
            <div className="w-[48px] h-[48px] rounded-full border border-[#B8956A] flex items-center justify-center text-[#B8956A] group-hover:bg-[#B8956A] group-hover:text-[#0A0A0A] transition-all duration-500">
              <span className="text-[18px] font-mono leading-none">&rarr;</span>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}
