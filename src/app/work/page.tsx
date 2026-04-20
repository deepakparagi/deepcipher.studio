'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects, categories, Category } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Noise from '@/components/ui/Noise';

/* ==========================================================
   THE INFINITE ARCHIVE — ELITE PROJECT LISTING
   A world-class, high-fidelity project index.
   Pivoting to Asymmetric Editorial Grid & Floating HUD filters.
   ========================================================== */

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse responsive Header Parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30">
      <Noise opacity={0.03} />
      
      {/* 01. THE CINEMATIC HEADER — Magnetic Typographic Focus */}
      <section className="relative pt-44 pb-20 md:pt-64 md:pb-32 px-6 overflow-hidden">
        {/* Background Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
          <span className="font-display font-black text-[30vw] uppercase tracking-tighter italic">ARCHIVE</span>
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            style={{ 
              rotateX: mousePosition.y * -0.5, 
              rotateY: mousePosition.x * 0.5,
              x: mousePosition.x * 2,
              y: mousePosition.y * 2
            }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[var(--accent-warm)] opacity-40" />
              <span className="font-mono text-[9px] tracking-[0.5em] text-[var(--accent-warm)] opacity-60 uppercase">SYSTEM_INDEX_DEEP_01</span>
            </div>
            
            <h1 className="text-[clamp(60px,12vw,180px)] font-display font-light italic leading-[0.8] tracking-tighter mb-12 uppercase flex flex-col">
              <span className="block">Selected</span>
              <span className="block ml-12 md:ml-32 opacity-30">Works.</span>
            </h1>

            <p className="font-body font-light text-[18px] md:text-[22px] text-white/40 leading-relaxed max-w-[50ch] border-l border-white/5 pl-8 md:pl-12">
              Transforming complex technical challenges into simplified, high-fidelity digital narratives through architectural precision and cinematic motion. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02. ASYMMETRIC GRID — Editorial Archive Flow */}
      <section className="pb-44 px-6 relative z-10">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-40 md:gap-x-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                // Generate asymmetric column spans and offsets based on index
                const isFull = index % 5 === 0;
                const isLarge = index % 3 === 0;
                const colSpan = isFull ? 'md:col-span-12' : isLarge ? 'md:col-span-8' : 'md:col-span-4';
                const offset = index % 4 === 1 ? 'md:mt-32' : index % 4 === 3 ? 'md:-mt-20' : '';

                return (
                  <motion.div 
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${colSpan} ${offset} relative flex flex-col`}
                  >
                    <div className="relative group">
                       {/* Subtle Index Number */}
                       <div className="absolute -top-12 left-0 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                          <span className="font-mono text-[8px] text-[var(--accent-warm)] tracking-[0.5em] uppercase">ARCH_REF_0{project.id}</span>
                          <div className="w-8 h-px bg-[var(--accent-warm)] opacity-20" />
                       </div>
                       
                       <ProjectCard project={project} index={index} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-64 text-center">
              <span className="font-mono text-[9px] text-white/20 tracking-[0.6em] uppercase">No archives detected in current filter state</span>
            </div>
          )}
        </div>
      </section>

      {/* 03. FLOATING HUD FILTER — Liquid Glassmorphism */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-3 rounded-full text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-700
                ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Footer-styled CTA */}
      <section className="py-40 md:py-64 px-6 bg-[#0E0E0E] border-t border-white/5 text-center flex flex-col items-center">
         <div className="w-px h-24 bg-gradient-to-b from-transparent via-[var(--accent-warm)]/40 to-transparent mb-12" />
         <h2 className="font-display font-light italic text-[clamp(40px,6vw,120px)] leading-none tracking-tighter text-white mb-16 uppercase">
           Start a <span className="opacity-30">Mission.</span>
         </h2>
         <a
           href="/contact"
           className="group flex items-center gap-8 px-12 py-6 border border-white/10 rounded-full transition-all duration-700 hover:border-[var(--accent-warm)]/40 hover:bg-[#111111]"
         >
           <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/40 group-hover:text-white">Initialize Project</span>
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[var(--accent-warm)] group-hover:text-white transition-colors duration-700">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4.16669 10H15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M10 4.16666L15.8333 9.99999L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </div>
         </a>
      </section>
    </main>
  );
}
