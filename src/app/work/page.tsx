'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects, categories, Category } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Noise from '@/components/ui/Noise';

/* ==========================================================
   v9: THE EDITORIAL GALLERY — ELITE WORK PAGE
   Architecture: Rhythmic Masonry Grid, Sticky Pill Filters, Luxury Typography.
   Pallete: #0A0A0A (Black), #D4AF37 (Warm Gold).
   ========================================================== */

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stagger-fade constants
  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 pb-32">
      <Noise opacity={0.04} />
      
      {/* 1. HERO SECTION (40vh, centered) */}
      <section className="relative h-[45vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={transition}
           className="relative z-10"
        >
          <h1 className="font-display italic font-light text-[clamp(56px,8vw,110px)] text-white tracking-tighter leading-none mb-6">
            WORK
          </h1>
          <p className="font-mono text-[14px] text-[#D4AF37] tracking-[0.3em] uppercase mb-10">
            Selected projects from 2024-2026
          </p>
          <p className="font-body font-light text-[18px] text-white/30 max-w-[45ch] leading-relaxed mx-auto italic">
            Premium web design & brand identity for businesses across India & beyond.
          </p>
        </motion.div>

        {/* Cinematic Watermark Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
           <span className="font-display font-black text-[30vw] tracking-tighter uppercase italic">ARCHIVE</span>
        </div>
      </section>

      {/* 2. FILTER BAR (Sticky) */}
      <div className="sticky top-20 z-40 bg-[#0A0A0A]/40 backdrop-blur-2xl border-b border-white/5 py-8 md:py-12 mb-20 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-4">
           {categories.map((category) => (
             <button
               key={category}
               onClick={() => setActiveCategory(category)}
               className={`
                 group relative px-8 py-3.5 border transition-all duration-700
                 ${activeCategory === category 
                   ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A0A0A]' 
                   : 'border-white/10 hover:border-[#D4AF37] text-white/40 hover:text-white'}
               `}
             >
               <span className="relative z-10 font-mono text-[11px] tracking-[0.2em] font-bold uppercase transition-colors duration-500">
                 {category}
               </span>
               {activeCategory !== category && (
                 <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-0" />
               )}
             </button>
           ))}
        </div>
      </div>

      {/* 3. PORTFOLIO GRID (Masonry - Custom CSS Grid) */}
      <section className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-x-16 md:gap-y-32">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                // Determine heights: Card 1 (600px), Card 2 (500px) ...
                const isTall = index % 4 === 0 || index % 4 === 3;
                const cardHeightClass = isTall ? 'h-[500px] md:h-[700px]' : 'h-[400px] md:h-[550px]';
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    className={`relative w-full ${cardHeightClass}`}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-64 text-center">
              <span className="font-mono text-[12px] text-white/20 tracking-[0.5em] uppercase italic underline decoration-[#D4AF37]/20 underline-offset-8">
                No archives found in current node synchronization.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. FOOTER / CLOSURE (Simplified for Work page) */}
      <section className="mt-64 py-40 border-t border-white/5 flex flex-col items-center">
         <Link 
            href="/contact"
            className="font-display italic font-light text-[clamp(32px,5vw,72px)] text-[#D4AF37] tracking-tighter hover:text-white transition-colors duration-700 uppercase underline decoration-[#D4AF37]/20 underline-offset-12"
          >
           START A PROJECT →
         </Link>
         
         <div className="flex gap-16 mt-24 opacity-30">
            {['GH', 'LI', 'IG'].map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-[0.5em] hover:text-[#D4AF37] transition-colors cursor-none">{s}</span>
            ))}
         </div>
         
         <p className="mt-12 font-mono text-[9px] text-white/10 tracking-[0.3em]">
           © 2026 DEEPCIPHER. ALL RIGHTS RESERVED.
         </p>
      </section>
    </main>
  );
}
