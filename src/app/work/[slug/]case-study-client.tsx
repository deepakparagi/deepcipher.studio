'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project, getNextProject } from '@/lib/projects';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import MagneticButton from '@/components/ui/MagneticButton';
import ParallaxImage from '@/components/ui/ParallaxImage';

/* ==========================================================
   v8: THE EDITORIAL MAG — ELITE CASE STUDY
   Architecture: 8-Section High-Fidelity Narrative.
   Typography: Cormorant Garamond Italic (Display), DM Sans (Body).
   ========================================================== */

interface CaseStudyClientProps {
  project: Project;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const nextProject = getNextProject(project.slug);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  // 1. HERO SECTION (Full viewport)
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30">
      <Noise opacity={0.04} />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Abstract 3D/Mesh Background (CSS Mesh for stability) */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10"
        >
          <h1 className="font-display italic font-light text-[clamp(48px,10vw,140px)] text-white tracking-tighter leading-[0.8] mb-10 uppercase">
             {project.title}
          </h1>
          <div className="flex flex-col items-center gap-6">
             <div className="w-12 h-px bg-[#D4AF37] opacity-60" />
             <p className="font-mono text-[16px] text-[#D4AF37] tracking-[0.4em] uppercase">
                {project.description}
             </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
           <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Explore Narrative</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/5 to-transparent" />
        </div>
      </section>

      {/* 2. PROJECT BRIEF SECTION (Centered column) */}
      <section className="relative py-44 md:py-64 flex justify-center px-6">
        <div className="max-w-[800px] w-full">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
              <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.2em] font-bold uppercase mb-8 block">PROJECT CONTEXT</span>
              <p className="font-body font-light text-[20px] md:text-[24px] text-white/40 leading-[1.8] mb-24 italic">
                 {project.challenge}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-24 border-t border-white/5 pt-16">
                 {/* Left Col */}
                 <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] text-[#D4AF37] opacity-40 uppercase tracking-[0.2em]">CLIENT</span>
                       <span className="font-body font-light text-[17px] text-white/60">{project.client}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] text-[#D4AF37] opacity-40 uppercase tracking-[0.2em]">TIMELINE</span>
                       <span className="font-body font-light text-[17px] text-white/60">{project.year}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] text-[#D4AF37] opacity-40 uppercase tracking-[0.2em]">DELIVERABLE</span>
                       <span className="font-body font-light text-[17px] text-white/60">{project.category}</span>
                    </div>
                 </div>
                 {/* Right Col */}
                 <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] text-[#D4AF37] opacity-40 uppercase tracking-[0.2em]">ROLE</span>
                       <span className="font-body font-light text-[17px] text-white/60">Design & Development</span>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] text-[#D4AF37] opacity-40 uppercase tracking-[0.2em]">TECH STACK</span>
                       <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="font-body font-light text-[16px] text-white/60 border-b border-white/10">{tech}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 3. CHALLENGE SECTION (Dark Gray Background Panel) */}
      <section className="relative py-44 md:py-64 bg-[#0E0E0E] px-6 md:px-20 lg:px-40 border-y border-white/5">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32 items-start">
            <div className="md:col-span-5">
               <h2 className="font-display italic font-light text-[clamp(48px,6.5vw,90px)] text-white tracking-tighter uppercase leading-[0.8]">
                 THE <br />CHALLENGE.
               </h2>
            </div>
            <div className="md:col-span-7">
               <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 leading-[1.9] m-0 border-l border-[#D4AF37]/20 pl-12 italic">
                  {project.challenge}
               </p>
            </div>
         </div>
      </section>

      {/* 4. SOLUTION NARRATIVE (Alternating Blocks) */}
      <section className="relative">
         {project.paragraphs?.map((para, i) => {
           const isEven = i % 2 === 0;
           return (
             <div key={i} className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 md:px-20 lg:px-40 overflow-hidden">
                <div className={`max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center`}>
                    
                    {/* Content Block */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex flex-col gap-10 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:text-right md:items-end'}`}
                    >
                       <h3 className="font-display italic font-light text-[clamp(32px,4.5vw,68px)] text-white tracking-tighter uppercase leading-[0.9] max-w-[15ch]">
                         {i === 0 ? "Strategic Intent." : i === 1 ? "Architectural Flow." : "Cinematic Reveal."}
                       </h3>
                       <p className="font-body font-light text-[17px] md:text-[20px] text-white/30 leading-[1.8] max-w-[45ch] italic">
                         {para}
                       </p>
                    </motion.div>

                    {/* Media Block (Parallax) */}
                    <div className={`relative aspect-[16/10] overflow-hidden rounded-[1vw] border border-white/5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                       <ParallaxImage 
                         src={project.image} 
                         alt={project.title} 
                         className="w-full h-full object-cover scale-110"
                         speed={0.06}
                       />
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.4)_0%,transparent_60%)]" />
                    </div>
                </div>
             </div>
           );
         })}
      </section>

      {/* 5. TECHNICAL DEEP DIVE (2x2 Grid) */}
      <section className="relative py-44 md:py-80 px-6 md:px-20 lg:px-40 bg-[#0A0A0A]">
         <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-32 flex flex-col items-center gap-6">
               <span className="font-mono text-[9px] text-[#D4AF37] opacity-50 tracking-[0.6em] uppercase">SYSTEM_NODES</span>
               <h2 className="font-display italic font-light text-[clamp(44px,6vw,96px)] text-white tracking-tighter uppercase leading-[0.8]">
                 Systems & <br /><span className="opacity-30">Architecture.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D4AF37]/10 border border-[#D4AF37]/10">
               {project.modules?.map((m, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="relative group p-12 md:p-20 bg-[#0A0A0A] hover:bg-[#0E0E0E] transition-all duration-700 min-h-[400px] flex flex-col justify-between"
                   onMouseEnter={() => setCursor('hover', 'DEEP_DIVE')}
                   onMouseLeave={resetCursor}
                 >
                    <div className="flex justify-between items-start">
                       <div className="flex flex-col gap-4">
                          <span className="font-mono text-[9px] text-[#D4AF37] opacity-60 tracking-[0.4em] uppercase">{m.value}</span>
                          <h3 className="font-display italic font-light text-4xl md:text-5xl text-white tracking-tighter uppercase leading-none">{m.label}</h3>
                       </div>
                       <div className="w-10 h-10 border border-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                    </div>
                    <p className="font-body font-light text-[17px] text-white/30 leading-relaxed italic max-w-[30ch]">
                      {m.description}
                    </p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. VISUAL SHOWCASE (Full-width gallery) — Using high-quality placeholder logic */}
      <section className="relative overflow-hidden">
         <div className="flex flex-col gap-2">
            {[project.image, project.image, project.image].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                className="relative aspect-[16/9] w-full"
              >
                 <Image src={img} alt={`Gallery ${i}`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* 7. IMPACT SECTION (Stat Grid) */}
      <section className="relative py-44 md:py-80 px-6 md:px-20 text-center flex flex-col items-center">
         <div className="max-w-[1000px] w-full">
            <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.6em] uppercase mb-16 block">OUTCOME_IMPACT</span>
            
            <h2 className="font-display italic font-light text-[clamp(40px,7.5vw,120px)] text-white tracking-tighter uppercase leading-[0.8] mb-32">
               &ldquo;{project.result}&rdquo;
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 pt-24 border-t border-white/5">
               {project.stats?.map((stat, i) => (
                 <div key={i} className="flex flex-col items-center gap-6">
                    <span className="font-display font-light text-7xl md:text-8xl text-[#D4AF37] tracking-tighter leading-none">{stat.value}</span>
                    <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">{stat.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 8. NEXT PROJECT TEASER (Gold Accent Background) */}
      <section className="relative h-screen bg-[#D4AF37] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-40 overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10 font-display font-black text-[30vw] uppercase italic tracking-tighter vertical-text select-none pointer-events-none text-black">
            NEXT
         </div>

         <div className="relative z-10 flex flex-col gap-6 items-start">
            <span className="font-mono text-[11px] text-black tracking-[0.5em] uppercase font-bold opacity-60">Sequence_Next_Node.0{nextProject.id}</span>
            <h2 className="font-display italic font-light text-[clamp(56px,12vw,160px)] text-black tracking-tighter leading-[0.7] uppercase">
               {nextProject.title}
            </h2>
         </div>

         <Link 
           href={`/work/${nextProject.slug}`} 
           className="relative z-10 group bg-[#0A0A0A] p-12 md:p-20 max-w-[500px] w-full shadow-2xl hover:scale-[1.02] transition-transform duration-700 mt-20 md:mt-0"
           onMouseEnter={() => setCursor('hover', 'INITIALIZE')}
           onMouseLeave={resetCursor}
         >
            <div className="relative aspect-[16/9] w-full overflow-hidden mb-12">
               <Image src={nextProject.image} alt={nextProject.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-2">
                  <span className="font-display italic text-3xl text-white tracking-tight uppercase leading-none">{nextProject.title}</span>
                  <span className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase">{nextProject.description}</span>
               </div>
               <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0A] transition-all">
                  →
               </div>
            </div>
         </Link>
      </section>

    </div>
  );
}
