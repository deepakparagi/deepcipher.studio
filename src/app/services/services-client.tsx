'use client';

import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import { services } from '@/lib/services';
import Noise from '@/components/ui/Noise';
import MagneticButton from '@/components/ui/MagneticButton';
import ParallaxImage from '@/components/ui/ParallaxImage';

/* ==========================================================
   v7: THE CAPABILITY HUD — ELITE SERVICES
   A high-fidelity technical expertise index.
   Architecture: 1px HUD Grids, Magnetic Detail Cards, Liquid Imagery.
   ========================================================== */

export default function ServicesClient() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <main className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30">
      <Noise opacity={0.03} />
      
      {/* 01. THE TECHNICAL HEADER — Architectural Focus */}
      <section className="relative pt-44 pb-20 md:pt-64 md:pb-32 px-6 md:px-20 overflow-hidden">
        {/* Background Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
          <span className="font-display font-black text-[25vw] uppercase tracking-tighter italic">EXPERTISE</span>
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="flex flex-col items-start gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[var(--accent-warm)] opacity-40" />
              <span className="font-mono text-[9px] tracking-[0.5em] text-[var(--accent-warm)] opacity-60 uppercase">SYSTEM_INDEX_CAP_03</span>
            </div>
            
            <h1 className="text-[clamp(60px,11vw,180px)] font-display font-light italic leading-[0.8] tracking-tighter uppercase m-0">
              Shaping <br />
              <span className="text-[var(--accent-warm)] opacity-30">The</span> Futures.
            </h1>
          </div>

          <div className="max-w-[450px] border-l border-white/5 pl-12 pb-4">
             <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 leading-relaxed mb-12 italic">
               We don&apos;t just design interfaces. We architect digital ecosystems that elevate ambitious brands from industry participants to category leaders.
             </p>
             <div className="flex items-center gap-6">
               <span className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase">Core_Specialization.03</span>
               <div className="flex-1 h-px bg-white/5" />
             </div>
          </div>
        </div>
      </section>

      {/* 02. CAPABILITY MODULES — Elite HUD Grid */}
      <section className="relative z-10 pb-44 px-6 md:px-20 lg:px-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 gap-px bg-white/5 border border-white/5">
          {services.map((service, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 md:grid-cols-12 bg-[#0A0A0A] overflow-hidden"
              >
                {/* Visual Reveal Block */}
                <div className={`md:col-span-12 lg:col-span-6 relative aspect-[16/9] lg:aspect-auto overflow-hidden border-b lg:border-b-0 ${isOdd ? 'lg:order-2' : 'lg:border-r lg:border-white/5'}`}>
                   <ParallaxImage 
                     src={service.image} 
                     alt={service.title} 
                     className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[0.16, 1, 0.3, 1] opacity-40 group-hover:opacity-80"
                     speed={0.05}
                   />
                   <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />
                   
                   {/* Iris Label */}
                   <div className="absolute top-12 left-12 flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-[var(--accent-warm)] opacity-50 uppercase tracking-[0.4em]">{service.number}</span>
                      <div className="w-8 h-px bg-[var(--accent-warm)] opacity-20" />
                   </div>
                </div>

                {/* Content HUD Block */}
                <div className={`md:col-span-12 lg:col-span-6 p-12 md:p-20 lg:p-32 flex flex-col gap-16 ${isOdd ? 'lg:order-1' : ''}`}>
                   <div className="flex flex-col gap-8">
                     <h2 className="font-display font-light italic text-[clamp(40px,5vw,90px)] text-white tracking-tighter m-0 uppercase group-hover:text-[var(--accent-warm)] transition-colors duration-700 leading-none">
                       {service.title}
                     </h2>
                   </div>

                   <div className="flex flex-col gap-12 border-l border-white/5 pl-12 md:pl-20">
                     {service.description.map((para, j) => (
                       <p key={j} className="font-body font-light text-[17px] md:text-[20px] text-white/30 leading-relaxed max-w-[45ch]">
                         {para}
                       </p>
                     ))}
                   </div>

                   {/* Deliverable Tags — HUD Precision */}
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                      {service.deliverables.slice(0, 6).map((d) => (
                        <div key={d} className="flex flex-col gap-2">
                           <span className="font-mono text-[8px] text-white/10 uppercase tracking-[0.3em]">{d}</span>
                           <div className="w-4 h-[1px] bg-[var(--accent-warm)] opacity-20" />
                        </div>
                      ))}
                   </div>

                   <div className="pt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12">
                      <div className="flex flex-col gap-3">
                         <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase underline decoration-[var(--accent-warm)]/40 underline-offset-8">Initialization_Cost</span>
                         <span className="font-display font-light italic text-4xl text-white tracking-tighter m-0 uppercase">from {service.startingFrom}</span>
                      </div>

                      <MagneticButton href="/start-a-project" variant="ghost" className="py-6 px-12 border border-white/10 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all">
                        SYSM_INIT_CONTRACT →
                      </MagneticButton>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 03. PRICING PHILOSOPHY — High-Fidelity Minimalist */}
      <section className="relative py-44 md:py-80 px-6 md:px-20 lg:px-40 bg-[#0E0E0E] text-center flex flex-col items-center">
         <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[var(--accent-warm)]/50 to-transparent mb-16" />
         
         <h2 className="font-display font-light italic text-[clamp(40px,6vw,120px)] text-white tracking-tighter m-0 uppercase leading-[1] max-w-[12ch] mb-16">
           Ambition Is <br /><span className="opacity-30">The Currency.</span>
         </h2>

         <p className="font-body font-light text-[18px] md:text-[24px] text-white/30 max-w-[45ch] leading-relaxed mb-24 italic">
            Standard menus are for standard work. We price on the scale of your ambition, the complexity of the challenge, and the impact of the outcome.
         </p>

         <MagneticButton href="/start-a-project" variant="ghost" className="px-16 py-8 border border-white/10 text-[11px] font-mono tracking-[0.6em] uppercase hover:bg-[var(--accent-warm)] hover:text-white transition-all">
           Request Custom Intelligence Node →
         </MagneticButton>
      </section>

      {/* Footer Divider */}
      <section className="py-24 border-t border-white/5 opacity-[0.03] select-none text-center">
         <span className="font-display font-black text-[12vw] uppercase tracking-tighter italic">CAPABILITY_SYNC</span>
      </section>
    </main>
  );
}
