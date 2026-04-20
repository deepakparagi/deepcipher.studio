'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import MagneticButton from '@/components/ui/MagneticButton';
import ParallaxImage from '@/components/ui/ParallaxImage';

/* ==========================================================
   v7: THE DISCOVERY NARRATIVE — ELITE ABOUT
   A high-fidelity, kinetic digital heritage.
   Architecture: Atmospheric Gradients, Weighted Motion, Architectural Milestones.
   ========================================================== */

const beliefs = [
  {
    title: 'Business > Decoration',
    text: 'Design is a business strategy — not decoration. We build sites that function as your most powerful digital asset, engineered to drive growth and establish authority.',
    code: 'STRAT_INIT.01'
  },
  {
    title: 'Intentional Pixels',
    text: 'Every pixel, every interaction, every word should justify its existence. We strip away the unnecessary until nothing stands between your brand and your audience.',
    code: 'CORE_ELIM.02'
  },
  {
    title: 'Craft Obsession',
    text: 'Great work comes from obsessive attention to craft. We pore over typography scales, micro-interactions, and performance metrics because excellence lives in the margins.',
    code: 'CRAFT_SYNC.03'
  },
];

const milestones = [
  { year: '2025', title: 'Studio Founded', category: 'Origin' },
  { year: '2025', title: 'First AI Product Shipped', category: 'Development' },
  { year: '2025', title: 'ML Sentiment Platform Built', category: 'AI / ML' },
  { year: '2024', title: 'Open Source Portfolio Published', category: 'Community' },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });
  const { setCursor, resetCursor } = useCursor();

  // Cinematic reveals
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1.1, 1]);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30">
      <Noise opacity={0.03} />
      
      {/* 01. THE ATMOSPHERIC HEADER — Cinematic Scale */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Background Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
          <span className="font-display font-black text-[25vw] uppercase tracking-tighter italic">IDENTITY</span>
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-[1400px] mx-auto w-full"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-[var(--accent-warm)] opacity-40" />
            <span className="font-mono text-[9px] tracking-[0.6em] text-[var(--accent-warm)] opacity-60 uppercase">SystemNode_Identity_Ref.05</span>
          </div>

          <h1 className="text-[clamp(60px,10vw,160px)] font-display font-light italic leading-[0.8] tracking-tighter mb-16 uppercase">
            Architecting <br />
            <span className="opacity-30">Undeniable</span> <br />
            <span className="text-[var(--accent-warm)]">Authority.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-16 border-t border-white/5">
            <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 max-w-[45ch] leading-relaxed border-l border-white/5 pl-12">
              Deepcipher is a specialized digital craft studio centered on surgical precision, architectural aesthetics, and the integration of artificial intelligence into the modern web ecosystem.
            </p>
            
            <div className="flex gap-16 font-mono text-[9px] tracking-[0.4em] text-white/10 uppercase">
              <div className="flex flex-col gap-3">
                <span className="opacity-40">Core_Region</span>
                <span className="text-white">Global // Remote</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="opacity-40">Operational_Focus</span>
                <span className="text-white">Next.js · AI · Design</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
           <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Scrub To Discover</span>
           <div className="w-px h-16 bg-gradient-to-b from-white/40 via-white/5 to-transparent" />
        </div>
      </section>

      {/* 02. THE DEPTH SHIFT — Profile Reveal */}
      <section className="relative py-44 md:py-64 px-6 md:px-20 lg:px-40 bg-[#0E0E0E] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-24 md:gap-40 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] overflow-hidden group rounded-[2vw] ring-1 ring-white/5"
          >
            <Image
              src="/images/deepak-paragi-profile.png"
              alt="Deepak Paragi"
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[0.16, 1, 0.3, 1]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* HUD Scan Line Decorative */}
            <motion.div 
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
               <div className="w-full h-px bg-[var(--accent-warm)]/20 shadow-[0_0_20px_var(--accent-warm)]" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
               <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase">PRINCIPAL_LEAD</span>
               <h2 className="font-display font-light italic text-[clamp(40px,6vw,100px)] text-white leading-none tracking-tighter uppercase m-0">
                 Deepak <br />
                 <span className="opacity-30">Paragi.</span>
               </h2>
            </div>

            <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 leading-relaxed m-0 border-l border-white/5 pl-12 max-w-[45ch]">
              A multidisciplinary developer and AI architect committed to the surgical union of software engineering and cinematic design. Currently building elite digital products that leverage neural intelligence and high-fidelity motion.
            </p>

            <div className="flex flex-col gap-8 mt-12">
               <div className="flex items-center gap-6">
                  <div className="w-px h-12 bg-[var(--accent-warm)] opacity-20" />
                  <span className="font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase hover:text-white transition-colors cursor-none" onMouseEnter={() => setCursor('hover', 'RESUME')}>View Full Dossier.</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'STACK', value: 'NEXT.JS / TS' },
                    { label: 'INTEL', value: 'OPENROUTER' },
                    { label: 'MOTION', value: 'GSAP / FRAMER' },
                    { label: 'DATA', value: 'POSTGRES' }
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                       <span className="font-mono text-[8px] text-[var(--accent-warm)] opacity-40 uppercase tracking-[0.2em]">{stat.label}</span>
                       <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em]">{stat.value}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. THE CORE BELIEFS — Interactive HUD Stack */}
      <section className="relative py-44 md:py-80 px-6 md:px-20 lg:px-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between gap-8 mb-32 border-b border-white/5 pb-16">
            <div className="flex flex-col gap-4">
               <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase">SYSTEM_PHILOSOPHY</span>
               <h2 className="font-display font-light italic text-[clamp(32px,4.5vw,80px)] text-white tracking-tighter m-0 uppercase">Operational <span className="opacity-30">Principles.</span></h2>
            </div>
            <span className="font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase hidden md:block select-none">DEEP_CIPHER_CORE_v2.0</span>
          </div>

          <div className="flex flex-col">
            {beliefs.map((belief, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                onMouseEnter={() => setCursor('hover', 'PRINCIPLE')}
                onMouseLeave={resetCursor}
                className="group relative py-16 md:py-24 border-b border-white/5 grid grid-cols-1 md:grid-cols-12 gap-12 items-center overflow-hidden"
              >
                {/* Reveal Background */}
                <div className="absolute inset-x-0 bottom-0 top-full bg-white/[0.02] group-hover:top-0 transition-all duration-700 ease-[0.16, 1, 0.3, 1]" />
                
                <div className="md:col-span-4 relative z-10 flex flex-col gap-4">
                  <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-40 tracking-[0.4em] uppercase">{belief.code}</span>
                  <h3 className="font-display font-light italic text-4xl md:text-6xl text-white m-0 tracking-tighter uppercase">{belief.title}</h3>
                </div>
                
                <div className="md:col-span-7 md:col-start-6 relative z-10">
                  <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 group-hover:text-white transition-colors duration-700 leading-relaxed m-0 max-w-[45ch]">
                    {belief.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. MILESTONES — Architectural Logic Grid */}
      <section className="relative py-44 md:py-64 px-6 md:px-20 lg:px-40 bg-[#0E0E0E] border-t border-white/5">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
               <div className="flex items-center gap-12 mb-20">
                  <span className="font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase">HISTORICAL_NODES</span>
                  <div className="flex-1 h-px bg-white/5" />
               </div>

               <div className="flex flex-col border-t border-white/5">
                 {milestones.map((m, i) => (
                   <div key={i} className="group relative flex justify-between items-center py-10 border-b border-white/5">
                      <div className="absolute inset-y-0 left-0 w-0 bg-[var(--accent-warm)] opacity-20 group-hover:w-full transition-all duration-1000 pointer-events-none" />
                      <div className="flex items-center gap-12 relative z-10">
                         <span className="font-mono text-[10px] text-white/20">{m.year}</span>
                         <span className="font-display font-light italic text-3xl text-white group-hover:translate-x-2 transition-transform duration-700 tracking-tighter uppercase">{m.title}</span>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-white/10 uppercase italic relative z-10 group-hover:text-[var(--accent-warm)] transition-colors">
                        [ {m.category} ]
                      </span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="flex flex-col justify-between">
               <div className="flex flex-col gap-12 pt-12 md:pt-0">
                  <span className="font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase underline decoration-[var(--accent-warm)]/40 underline-offset-8">CAPABILITY_INDEX</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {[
                      { title: 'Web Development', tools: 'Next.js, React, TypeScript' },
                      { title: 'AI Integration', tools: 'OpenRouter, LLMs, Neural UI' },
                      { title: 'Creative Coding', tools: 'GSAP, Framer Motion, Shaders' },
                      { title: 'Architectural Design', tools: 'Figma, Design Systems' },
                    ].map((cap, i) => (
                      <div key={i} className="flex flex-col gap-4 border-l border-white/5 pl-8 hover:border-[var(--accent-warm)] transition-colors duration-700">
                        <span className="font-display font-light italic text-[24px] text-white m-0 uppercase tracking-tighter">{cap.title}</span>
                        <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase">{cap.tools}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-32 relative py-20 px-12 bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center group transition-all duration-1000 hover:border-[var(--accent-warm)]/40 overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--accent-warm)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
                  <h3 className="relative z-10 font-display font-light italic text-[clamp(32px,3.5vw,70px)] text-white m-0 tracking-tighter uppercase mb-12">
                    Start a <br /><span className="opacity-30">Mission.</span>
                  </h3>
                  <MagneticButton href="/contact" variant="ghost" className="relative z-10 text-[10px] font-mono tracking-[0.4em] uppercase py-6 px-12 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    System_Initialize_Node →
                  </MagneticButton>
               </div>
            </div>
         </div>
      </section>

      {/* Footer Branding Divider */}
      <section className="py-24 flex items-center justify-center pointer-events-none opacity-[0.03]">
         <span className="font-display font-black text-[15vw] uppercase tracking-tighter leading-none m-0">DEEP_CIPHER®</span>
      </section>
    </div>
  );
}
