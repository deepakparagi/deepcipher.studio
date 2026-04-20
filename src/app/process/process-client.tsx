'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Noise from '@/components/ui/Noise';
import MagneticButton from '@/components/ui/MagneticButton';

/* ==========================================================
   v7: THE MISSION PIPELINE — ELITE PROCESS
   A high-fidelity project lifecycle.
   Architecture: Glowing Sequence Nodes, Weighted Motion, HUD Detailers.
   ========================================================== */

const phases = [
  {
    number: '01',
    name: 'Discover',
    duration: '1–2 WEEKS',
    quote: 'Before we design a pixel, we understand your business.',
    description:
      'We spend the first phase becoming experts in your business. We look at your competitors, your audience, your existing digital presence, and — most importantly — what you need your website to actually do.',
    code: 'SYSTEM_AUDIT_REF.DIS',
    steps: [
      'Brand & business discovery',
      'Competitor website intelligence',
      'Target audience profiling',
      'Content architecture inventory',
      'Goal & conversion mapping',
    ],
  },
  {
    number: '02',
    name: 'Strategise',
    duration: '1 WEEK',
    quote: "We define the blueprint before we touch Figma.",
    description:
      'We map every page, every user journey, and every conversion point before a single design is drawn. This phase ends with your full architectural sign-off on direction.',
    code: 'BLUEPRINT_VAL.STR',
    steps: [
      'Sitemap & page structure',
      'User journey logic mapping',
      'Conversion goal prioritizing',
      'Content structure per node',
      'Visual direction moodboard',
    ],
  },
  {
    number: '03',
    name: 'Design',
    duration: '3–5 WEEKS',
    quote: 'This is where your website takes shape.',
    description:
      'We design desktop and mobile simultaneously — never as an afterthought. We present rationale for every decision. We include two rounds of high-fidelity revisions.',
    code: 'RENDER_ENGINE.DSG',
    steps: [
      'Homepage architecting',
      'Inner page high-fidelity',
      'Component & interaction design',
      'Cinematic brand integration',
      'Client refinement loop',
    ],
  },
  {
    number: '04',
    name: 'Build & Launch',
    duration: '2–4 WEEKS',
    quote: 'We build it fast. We launch it right.',
    description:
      'We build to a Lighthouse score of 95+. We test across all device nodes. We launch with you, ensuring total performance metrics are met on delivery.',
    code: 'DEPLOY_SYNC.BLD',
    steps: [
      'Development in Next.js / Framer',
      'CMS & dynamic content sync',
      'Kinetic motion implementation',
      'Total performance optimization',
      'Launch & 30-day monitoring',
    ],
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take 6–10 weeks from kickoff to launch. We always agree on a timeline before we start and we stick to it.',
  },
  {
    q: 'What is your pricing structure?',
    a: "We price on a project basis, not hourly. After an initial discovery call, we send a clear proposal with a fixed price and timeline.",
  },
  {
    q: 'Do you work with clients internationally?',
    a: 'Yes. We work with clients across Europe, North America, and Asia-Pacific using async video updates and live calls.',
  },
  {
    q: 'What platforms do you build on?',
    a: 'We build primarily on Next.js for custom-coded sites and Framer for design-led sites that need quick iteration.',
  },
];

export default function ProcessClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <main ref={containerRef} className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30">
      <Noise opacity={0.03} />
      
      {/* 01. THE SEQUENTIAL HEADER — Kinetic Entrance */}
      <section className="relative pt-44 pb-20 md:pt-64 md:pb-32 px-6 md:px-20 overflow-hidden">
        {/* Background Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
          <span className="font-display font-black text-[25vw] uppercase tracking-tighter italic">PROTOCOL</span>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-12 h-px bg-[var(--accent-warm)] opacity-40" />
            <span className="font-mono text-[9px] tracking-[0.5em] text-[var(--accent-warm)] opacity-60 uppercase">SYSTEM_WORKFLOW_v3.01</span>
            <div className="w-12 h-px bg-[var(--accent-warm)] opacity-40" />
          </div>
          
          <h1 className="text-[clamp(60px,11vw,180px)] font-display font-light italic leading-[0.8] tracking-tighter uppercase m-0 flex flex-col items-center">
            <span className="block italic opacity-30">The</span>
            <span className="block mt-4">Protocol.</span>
          </h1>

          <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 max-w-[50ch] leading-relaxed mt-16 border-b border-white/5 pb-12">
            Four surgical phases. Zero guesswork. A documented lifecycle engineered to move your brand from concept to category leader.
          </p>
        </div>
      </section>

      {/* 02. THE MISSION PIPELINE — Glowing Timeline */}
      <section className="relative z-10 pb-44 px-6 md:px-20 lg:px-40">
        <div className="max-w-[1400px] mx-auto relative">
          
          {/* Vertical Pulsing Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-px md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

          <div className="flex flex-col gap-32 md:gap-64">
            {phases.map((phase, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
                >
                  {/* Glowing Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-[11px] md:-translate-x-[11px] top-4 w-6 h-6 flex items-center justify-center z-20">
                     <div className="w-6 h-6 rounded-full border border-white/10 bg-[#0A0A0A]" />
                     <motion.div 
                       animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                       transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                       className="absolute w-3 h-3 rounded-full bg-[var(--accent-warm)]" 
                     />
                  </div>

                  <div className={`md:col-span-1 flex flex-col gap-8 pl-16 md:pl-0 ${isLeft ? 'md:items-end md:text-right md:pr-24' : 'md:col-start-2 md:pl-24'}`}>
                     <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase">{phase.code}</span>
                     <h2 className="font-display font-light italic text-[clamp(40px,5vw,90px)] text-white tracking-tighter m-0 uppercase leading-[0.8] mb-6">
                        {phase.name}
                     </h2>
                     <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] px-4 py-2 border border-white/5 uppercase select-none w-fit">
                        Duration // {phase.duration}
                     </span>
                  </div>

                  <div className={`md:col-span-1 pl-16 md:pl-0 ${isLeft ? 'md:col-start-2 md:pl-24 pt-4 md:pt-44' : 'md:items-end md:text-right md:pr-24 pt-4 md:pt-44 md:col-start-1 md:row-start-1'}`}>
                     <p className="font-display font-light italic text-2xl text-white/60 mb-10 leading-tight">
                       &ldquo;{phase.quote}&rdquo;
                     </p>
                     <p className="font-body font-light text-[17px] md:text-[20px] text-white/30 leading-relaxed mb-12 max-w-[40ch] mx-auto md:mx-0">
                       {phase.description}
                     </p>
                     <div className={`flex flex-col gap-3 ${isLeft ? 'items-start' : 'items-start md:items-end'}`}>
                        {phase.steps.map((step) => (
                          <div key={step} className="flex items-center gap-4 group">
                             {!isLeft && <span className="font-mono text-[8px] text-[var(--accent-warm)] opacity-0 group-hover:opacity-100 transition-opacity">ARCHIVE_SYNC</span>}
                             <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase group-hover:text-white transition-colors cursor-none">{step}</span>
                             {isLeft && <span className="font-mono text-[8px] text-[var(--accent-warm)] opacity-0 group-hover:opacity-100 transition-opacity">ARCHIVE_SYNC</span>}
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. MISSION INTEL — Minimalist FAQ */}
      <section className="relative py-44 md:py-80 px-6 md:px-20 lg:px-40 bg-[#0E0E0E] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-16 mb-32 items-center text-center">
             <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase">SYSTEM_INTEL_FAQ</span>
             <h2 className="font-display font-light italic text-[clamp(40px,5vw,80px)] text-white tracking-tighter m-0 uppercase italic">Common <span className="opacity-30">Questions.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-12 md:p-16 bg-[#0E0E0E] flex flex-col gap-8 group hover:bg-[#111111] transition-all duration-700">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-1 rounded-full bg-[var(--accent-warm)] opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="font-display font-light italic text-2xl text-white tracking-tight leading-none group-hover:text-[var(--accent-warm)] transition-colors">{faq.q}</span>
                </div>
                <p className="font-body font-light text-[16px] text-white/30 leading-relaxed m-0 border-l border-white/5 pl-8 italic">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. GLOBAL CALL — Kinetic Termination */}
      <section className="py-64 md:py-[35vh] px-6 text-center flex flex-col items-center">
         <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[var(--accent-warm)]/50 to-transparent mb-16" />
         
         <h2 className="font-display font-light italic text-[clamp(40px,6vw,120px)] text-white tracking-tighter m-0 uppercase leading-[0.8] mb-16">
           READY TO <br /><span className="opacity-30">INITIALIZE?</span>
         </h2>

         <MagneticButton href="/contact" variant="ghost" className="px-16 py-8 border border-white/10 text-[11px] font-mono tracking-[0.6em] uppercase hover:bg-white hover:text-black transition-all">
           Launch Project Protocol →
         </MagneticButton>

         <div className="mt-32 opacity-[0.02] select-none">
            <span className="font-display font-black text-[20vw] uppercase tracking-tighter italic">TERMINATE.04</span>
         </div>
      </section>
    </main>
  );
}
