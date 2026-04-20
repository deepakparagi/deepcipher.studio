'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useVelocity, useAcceleration } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import type { Project } from '@/lib/projects';
import MagneticButton from '@/components/ui/MagneticButton';
import Noise from '@/components/ui/Noise';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { useTextScramble } from '@/lib/hooks/useTextScramble';

/* ==========================================================
   v5: LIQUID NARRATIVE — WORLD-CLASS CASE STUDY
   A high-fidelity, kinetic digital experience.
   Architecture: Lens Distortion, Iris Masking, Magnetic 3D HUD.
   ========================================================== */

interface CaseStudyClientProps {
  project: Project;
  nextProject: Project;
}

/**
 * Magnetic3DCard — Elite HUD Component
 */
function Magnetic3DCard({ module, index }: { module: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const { text, scramble } = useTextScramble(module.label);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * 20, y: x * -20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="relative p-12 md:p-16 bg-[#0E0E0E] border border-white/5 overflow-hidden group perspective-1000"
    >
      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="w-1 h-1 rounded-full bg-[var(--accent-warm)]" />
          <span className="font-mono text-[9px] text-white/30 tracking-[0.6em] uppercase">{module.label}</span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display font-light italic text-4xl text-white group-hover:text-[var(--accent-warm)] transition-colors duration-700 tracking-tighter m-0">
            {module.value}
          </h3>
          <p className="font-body font-light text-white/20 text-[15px] leading-relaxed m-0 max-w-[28ch]">
            {module.description}
          </p>
        </div>

        <div className="w-full h-[1px] bg-white/5 overflow-hidden">
           <motion.div 
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
             className="w-1/2 h-full bg-white/10"
           />
        </div>
      </div>

      {/* Background Decorative Index */}
      <span className="absolute bottom-4 right-8 font-mono text-[40px] text-white/[0.02] italic select-none">
        0{index + 1}
      </span>
    </motion.div>
  );
}

export default function CaseStudyClient({ project, nextProject }: CaseStudyClientProps) {
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-fidelity weighted scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20, restDelta: 0.001 });

  // LIQUID TRANSFORMATIONS
  const lensBlur = useTransform(smoothProgress, [0, 0.1], [20, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1.1, 1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  
  // Kinetic Typography
  const textSkew = useTransform(scrollVelocity, [-1, 0, 1], [-5, 0, 5]);
  const textBlur = useTransform(scrollVelocity, [-1, 0, 1], [4, 0, 4]);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/20">
      <Noise opacity={0.03} />
      
      {/* 01. THE LENS HERO — Dynamic Distortion Reveal */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, filter: `blur(${lensBlur}px)` }}
          className="absolute inset-0 z-0"
        >
          <ParallaxImage 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full grayscale opacity-40 mix-blend-luminosity"
            speed={0.1}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0A]" />
        </motion.div>

        {/* HUD Precision Elements */}
        <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-30">
          <MagneticButton variant="ghost" href="/work" cursorLabel="ARCHIVE">
            <span className="font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">SystemNode_Archive</span>
          </MagneticButton>
        </div>

        <div className="absolute top-12 right-6 md:right-12 lg:right-20 z-30 flex flex-col items-end gap-3 text-right">
           <div className="flex flex-col gap-1">
             <span className="font-mono text-[8px] tracking-[0.8em] text-[var(--accent-warm)] opacity-50 uppercase">MISSION_STATUS // ACTIVE</span>
             <div className="w-full h-px bg-[var(--accent-warm)] opacity-20" />
           </div>
           <span className="font-display font-light italic text-[22px] text-white/10 uppercase tracking-tighter">REF_CODE.0{project.id}</span>
        </div>

        {/* KINETIC HEADLINE — Skew/Blur on Scroll */}
        <motion.div 
          style={{ skewY: textSkew, filter: `blur(${textBlur}px)`, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1400px] flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[10px] text-[var(--accent-warm)] opacity-40 tracking-[0.8em] uppercase mb-12">
            DESIGN_BUILD // {project.year}
          </span>
          <h1 className="text-[clamp(60px,12vw,180px)] font-display font-light italic leading-[0.85] tracking-tight uppercase m-0 flex flex-col items-center">
             <span className="block">{project.title.split(' ')[0]}</span>
             {project.title.split(' ').length > 1 && (
               <div className="flex items-center gap-8 mt-4">
                 <div className="w-24 h-px bg-white/10" />
                 <span className="block opacity-30">{project.title.split(' ')[1]}</span>
               </div>
             )}
          </h1>
        </motion.div>

        {/* Weighted Scroll Anchor */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 flex flex-col items-center gap-8 z-20"
        >
          <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Scrub To Initialize</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        </motion.div>
      </section>

      {/* 02. LIQUID NARRATIVE — High-Contrast Flow */}
      <section className="relative z-20 bg-[#0A0A0A] py-40 md:py-64 px-6 md:px-20 lg:px-40 border-y border-white/5">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 md:gap-40 items-start">
          
          {/* Narrative Pillar */}
          <div className="flex flex-col gap-24 md:gap-32">
            <div className="flex flex-col gap-8">
              <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-60 tracking-[0.4em] uppercase">CORE_CHALLENGE</span>
              <h2 className="font-display font-light italic text-[clamp(36px,5vw,90px)] text-white leading-[1] m-0 tracking-tight uppercase max-w-[15ch]">
                {project.pullQuote || project.description}
              </h2>
            </div>
            
            <div className="flex flex-col gap-12 border-l border-white/5 pl-12 md:pl-20">
              {(project.paragraphs || [project.description]).map((para, i) => (
                <p key={i} className="font-body font-light text-[18px] md:text-[22px] text-white/30 leading-[1.8] m-0 max-w-[50ch]">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Technical Pillar — Immersive HUD Stack */}
          <div className="flex flex-col gap-32 pt-12 lg:pt-44">
             <div className="flex flex-col gap-12">
                <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase underline decoration-[var(--accent-warm)]/40 underline-offset-8">ARCH_TECH_STACK</span>
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-[var(--accent-warm)] opacity-60 uppercase tracking-[0.4em]">
                      {tech}
                    </span>
                  ))}
                </div>
             </div>

             <div className="grid grid-cols-1 gap-12">
                {[
                  { label: 'DELIVERABLE', value: project.category },
                  { label: 'TIMELINE', value: project.year },
                  { label: 'KPI_METRIC', value: project.result }
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-4 group">
                    <span className="font-mono text-[8px] text-white/10 tracking-[0.6em] uppercase group-hover:text-[var(--accent-warm)] transition-colors duration-700">{stat.label}</span>
                    <span className="font-display font-light italic text-4xl md:text-6xl text-white/70 group-hover:text-white transition-all duration-700 tracking-tighter">{stat.value}</span>
                  </div>
                ))}
             </div>

             <div className="pt-24 border-t border-white/5">
                <MagneticButton href={project.liveUrl || '#'} variant="ghost" className="w-full text-center py-10 bg-white/5 hover:bg-white text-white hover:text-black transition-all">
                  <span className="font-mono text-[10px] tracking-[0.6em] uppercase">Enter Live Experience →</span>
                </MagneticButton>
             </div>
          </div>
        </div>
      </section>

      {/* 03. MISSION MODULES — 3D Magnetic Grid */}
      {project.modules && (
        <section className="relative z-20 bg-[#0A0A0A] border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-4 bg-white/5 gap-px">
            {project.modules.map((module, i) => (
              <Magnetic3DCard key={module.label} module={module} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* 04. THE IRIS EXHIBIT — Liquid Circular Reveal */}
      <section className="relative z-20 py-44 md:py-80 bg-[#0A0A0A] px-4 md:px-20 lg:px-40">
         <div className="flex flex-col gap-80 md:gap-[40vh]">
            {(project.galleryImages || [1, 2, 3]).map((_, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setCursor('hover', 'IRIS')}
                  onMouseLeave={resetCursor}
                  className={`relative flex flex-col gap-20 ${isEven ? 'lg:w-[75%]' : 'lg:w-[75%] lg:ml-auto'}`}
                >
                  {/* LIQUID IRIS MASK */}
                  <div className="relative aspect-[16/10] bg-[#0E0E0E] overflow-hidden rounded-[4vw] ring-1 ring-white/5 shadow-2xl">
                     <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
                        <span className="font-display font-light italic text-[25vw] text-white tracking-widest uppercase italic">XRAY.0{i+1}</span>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-warm)]/10 via-transparent to-transparent opacity-20" />
                  </div>

                  <div className={`flex flex-col gap-6 ${isEven ? 'items-start pl-12 border-l border-white/5' : 'items-end text-right pr-12 border-r border-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] tracking-[0.5em] text-[var(--accent-warm)] opacity-60 uppercase italic">OBS_REF.0{i+1}</span>
                      <div className="w-12 h-px bg-[var(--accent-warm)] opacity-20" />
                    </div>
                    <p className="font-display font-light italic text-2xl md:text-4xl text-white/40 max-w-[24ch] leading-[1.1] tracking-tighter">
                      Capturing structural harmony through liquid motion and architectural editorial balance.
                    </p>
                  </div>
                </motion.div>
              );
            })}
         </div>
      </section>

      {/* 05. CAMERA ZOOM PORTAL — Infinite Narrative Evolution */}
      <Link 
        href={`/work/${nextProject.slug}`} 
        className="group relative block w-full bg-[#0E0E0E] overflow-hidden py-80 md:py-[35vh]"
      >
        <motion.section
          onMouseEnter={() => setCursor('hover', 'EVOLVE')}
          onMouseLeave={resetCursor}
          className="relative z-10 flex flex-col items-center justify-center text-center gap-24"
        >
          <div className="flex flex-col items-center gap-12">
             <div className="w-px h-32 bg-gradient-to-b from-transparent via-[var(--accent-warm)] to-transparent group-hover:h-44 transition-all duration-1000" />
             <span className="font-mono text-[10px] text-white/30 tracking-[1em] uppercase">Evolve Viewport</span>
          </div>

          <div className="relative">
             <h2 className="font-display font-light italic text-white text-[clamp(60px,10vw,160px)] leading-[0.7] tracking-tighter m-0 uppercase group-hover:scale-110 group-hover:blur-sm transition-all duration-1000">
               {nextProject.title}
             </h2>
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000">
                <span className="font-mono text-[11px] text-[var(--accent-warm)] tracking-[0.6em] uppercase bg-black/40 backdrop-blur-xl px-8 py-4 border border-[var(--accent-warm)]/40 rounded-full">Enter Archive Node</span>
             </div>
          </div>
        </motion.section>
      </Link>
    </div>
  );
}
