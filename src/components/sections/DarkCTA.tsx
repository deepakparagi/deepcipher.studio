'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { useCursor } from '../ui/CursorProvider';

/* ========================================
   Dark CTA — Atmospheric Footer
   ======================================== */

export default function DarkCTA() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative min-h-[90vh] bg-surface-dark flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background Gradient Orbs */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'var(--accent-warm)' }}
      />
      
      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-8">
          [ INITIATE DIALOGUE ]
        </span>
        
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl text-white font-light tracking-tighter leading-[0.9] mb-12">
          Ready to become <br />
          <span className="italic text-accent-warm pl-12 md:pl-24">unignorable?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6"
             onMouseEnter={() => setCursor('link')}
             onMouseLeave={resetCursor}
        >
          <MagneticButton variant="filled" href="/start-a-project" cursorLabel="START">
            START YOUR PROJECT
          </MagneticButton>
        </div>
      </div>
      
      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
