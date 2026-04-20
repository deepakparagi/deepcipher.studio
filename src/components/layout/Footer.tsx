'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';
import MagneticButton from '../ui/MagneticButton';

/* ==========================================================
   v7: THE ELITE CLOSURE — FOOTER
   A high-fidelity terminal cinematic.
   Architecture: Massive Asmymmetric Layout, Technical HUD Grids, 1px Precision.
   ========================================================== */

const footerNav = {
  MANIFEST: [
    { label: 'Studio Portfolio', href: '/work' },
    { label: 'Capabilities Index', href: '/services' },
    { label: 'Project Protocol', href: '/process' },
    { label: 'Digital Heritage', href: '/about' },
  ],
  CONNECTED: [
    { label: 'Project Initialize', href: '/start-a-project' },
    { label: 'Dossier Request', href: '/contact' },
    { label: 'Direct Sync', href: 'mailto:deepcipherstudio@gmail.com' },
  ],
  NODES: [
    { label: 'Instagram', href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const footerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#0A0A0A] text-white pt-44 pb-12 overflow-hidden border-t border-white/5"
      style={{ zIndex: 40 }}
    >
      {/* 01. THE ATMOSPHERIC SPOTLIGHT */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle, rgba(184,149,106,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="relative z-10 px-6 md:px-20 lg:px-40 max-w-[1800px] mx-auto">
        
        {/* TOP HUD: MISSION STATUS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-white/5 pb-12">
           <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-[var(--accent-warm)] opacity-50 tracking-[0.5em] uppercase hover:opacity-100 transition-opacity select-none cursor-none overflow-hidden" onMouseEnter={() => setCursor('hover', 'READY')}>SYSTEM_READY_v7.01</span>
              <h2 className="font-display font-light italic text-[clamp(40px,7vw,110px)] text-white tracking-tighter m-0 uppercase leading-[0.8]">
                 Ready To <br />
                 <span className="opacity-35 italic">Launch.</span>
              </h2>
           </div>

           <div className="flex flex-col gap-8 md:text-right md:items-end">
              <div className="flex flex-col gap-3">
                 <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Communication_Line_Sync</span>
                 <motion.a 
                    href="mailto:deepcipherstudio@gmail.com"
                    onMouseEnter={() => setCursor('hover', 'EMAIL')}
                    onMouseLeave={resetCursor}
                    className="font-display font-light italic text-4xl text-white hover:text-[var(--accent-warm)] transition-colors duration-700 tracking-tighter uppercase underline decoration-[var(--accent-warm)]/20 underline-offset-8"
                  >
                   deepcipherstudio@gmail.com
                 </motion.a>
              </div>
           </div>
        </div>

        {/* MIDDLE: THE ARCHITECTURAL NAV */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32 mb-44">
           {/* CTA HUB */}
           <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between gap-16">
              <p className="font-body font-light text-[18px] md:text-[22px] text-white/30 leading-relaxed italic max-w-[40ch]">
                 Architecting digital authority for ambitious brands across the neuro-technological landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-8">
                 <MagneticButton variant="ghost" href="/start-a-project" className="px-12 py-6 border border-white/10 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all">
                    Initialize_Mission →
                 </MagneticButton>
                 <div className="flex flex-col gap-2 pt-1 sm:pt-0">
                    <span className="font-mono text-[8px] text-white/10 tracking-[0.3em] uppercase">Operational_Status</span>
                    <span className="font-mono text-[9px] text-[var(--accent-warm)] tracking-[0.2em] uppercase">● ACTIVE_ON_GRID</span>
                 </div>
              </div>
           </div>

           {/* NAV NODES */}
           <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-24">
              {Object.entries(footerNav).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-10">
                   <span className="font-mono text-[9px] text-white/10 tracking-[0.5em] uppercase italic underline decoration-white/5 underline-offset-4">{title}</span>
                   <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                      {links.map((link) => (
                        <li key={link.label}>
                           <Link 
                              href={link.href}
                              onMouseEnter={() => setCursor('link')}
                              onMouseLeave={resetCursor}
                              className="font-mono text-[11px] text-white/30 hover:text-white transition-all duration-500 uppercase tracking-[0.2em]"
                           >
                             {link.label}
                           </Link>
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* FOOTER WATERMARK — Cinematic Expansion */}
        <div className="relative pt-24 border-t border-white/5 overflow-hidden">
           <motion.h1 
             whileHover={{ letterSpacing: '0.45em', filter: 'blur(4px)' }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="font-display font-black text-[18vw] leading-[0.7] text-white/[0.03] uppercase tracking-tighter m-0 whitespace-nowrap select-none pointer-events-auto cursor-none overflow-hidden"
             onMouseEnter={() => setCursor('hover', 'TERMINAL')}
             onMouseLeave={resetCursor}
           >
             DEEP_CIPHER®
           </motion.h1>
           
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-12">
              <div className="flex flex-col gap-2 font-mono text-[8px] text-white/10 tracking-[0.4em] uppercase italic">
                 <span>Architecture_Protocol_v7.0</span>
                 <span>Onyx_Gold_Sync_Complete</span>
              </div>
              
              <div className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
                 © 2026 DEEPCIPHER STUDIO. ALL RIGHTS RESERVED.
              </div>

              <div className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase md:text-right">
                 Built with <span className="text-[var(--accent-warm)]">Obsessive_Precision.</span>
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
}
