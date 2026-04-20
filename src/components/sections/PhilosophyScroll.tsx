'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';

/* ========================================
   PhilosophyScroll — ELITE 2026 REDESIGN
   Asymmetric Editorial Spread + Kinetic Typography
   ======================================== */

const principles = [
  { 
    id: '0001', 
    title: 'No Templates. Ever.', 
    desc: 'Every pixel is drawn from scratch. Your business is unique; your website should be too.',
    x: '15%', y: '25%', scale: 1.2, rotate: -2
  },
  { 
    id: '0002', 
    title: 'Results Over Aesthetics.', 
    desc: 'A beautiful site that doesn’t convert is an expensive failure.',
    x: '50%', y: '50%', scale: 1.0, rotate: 1
  },
  { 
    id: '0003', 
    title: 'Obsessive Detail.', 
    desc: 'We check every pixel, every line-height, every animation curve.',
    x: '60%', y: '20%', scale: 1.1, rotate: 3
  },
  { 
    id: '0004', 
    title: 'Strategy Before Design.', 
    desc: 'We understand your goals before we touch Figma.',
    x: '20%', y: '65%', scale: 0.9, rotate: -1
  },
  { 
    id: '0005', 
    title: 'Built to Convert.', 
    desc: 'Psychology-driven layouts that guide users to action.',
    x: '40%', y: '75%', scale: 1.1, rotate: 0
  },
  { 
    id: '0006', 
    title: 'Honest Pricing.', 
    desc: 'Fixed-fee proposals. No hidden costs. Zero surprises.',
    x: '55%', y: '30%', scale: 0.9, rotate: 2
  },
  { 
    id: '0007', 
    title: 'Small Team. Full Commitment.', 
    desc: 'Direct access to the founders. No account managers.',
    x: '25%', y: '15%', scale: 1.0, rotate: -3
  },
  { 
    id: '0008', 
    title: 'We Launch. We Support.', 
    desc: '30 days of post-launch care included in every project.',
    x: '45%', y: '45%', scale: 1.2, rotate: 1
  },
];

const services = [
  'LOGO DESIGN', 'UI REDESIGN', 'WEB DEVELOPMENT', 'DESIGN SYSTEMS',
  'BRAND STRATEGY', 'DIGITAL EXPERIENCES', 'WEBSITE DESIGN', 'BRAND IDENTITY'
];

export default function PhilosophyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Background kinetic movement
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0.03, 0.04, 0.04, 0]);
  
  // Smoother background transition to avoid "black gap"
  const sectionBg = useTransform(
    scrollYProgress, 
    [0, 0.8, 0.95, 1], 
    ['#0C0C0C', '#0C0C0C', '#FFFFFF', '#FFFFFF']
  );

  const tickerX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <motion.section
      ref={containerRef}
      className="relative z-30"
      style={{ 
        height: '600vh', // Optimized height
        backgroundColor: sectionBg
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-inherit">
        
        {/* Services Ticker Background */}
        <motion.div 
          style={{ x: tickerX, opacity: useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 0.08, 0.08, 0]) }}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        >
          <div className="flex gap-20 items-center">
            {[...services, ...services, ...services].map((service, i) => (
              <span key={i} className="text-[12vw] font-black tracking-tighter text-white uppercase leading-none opacity-20">
                ✦ {service}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Kinetic Typographic Background */}
        <motion.div 
          style={{ x: bgX, y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        >
          <span className="text-[35vw] font-black uppercase tracking-tighter text-white whitespace-nowrap block leading-none -mt-20">
            PHILOSOPHY · PHILOSOPHY · PHILOSOPHY
          </span>
          <span className="text-[35vw] font-black italic uppercase tracking-tighter text-white/50 whitespace-nowrap block leading-none -mt-40 ml-[20vw]">
            INTENT · CRAFT · RESULTS
          </span>
        </motion.div>

        {/* Technical Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/10" />
          <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/10" />
          <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-white/10" />
          <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-white/10" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          
          {/* Static Header Component */}
          <div className="absolute top-12 left-12 md:top-20 md:left-20 z-20 pointer-events-auto">
            <SectionLabel className="text-white/40">[ THE STUDIO PHILOSOPHY ]</SectionLabel>
            <h2 className="text-display text-4xl text-white mt-4 italic font-light opacity-60">
              Built on / uncompromising / intent<span className="accent-period">.</span>
            </h2>
          </div>

          {/* Principle Spread */}
          {principles.map((principle, index) => {
            const step = 1 / principles.length;
            const start = index * step;
            const end = (index + 1) * step;

            // Reveal thresholds with 30% overlap to prevent black gaps
            const opacity = useTransform(
              scrollYProgress,
              [start - step * 0.15, start + step * 0.2, end - step * 0.2, end + step * 0.15],
              [0, 1, 1, 0]
            );

            const scale = useTransform(
              scrollYProgress,
              [start, start + step * 0.2, end - step * 0.2, end],
              [0.85, principle.scale, principle.scale, 0.95]
            );

            const blur = useTransform(
              scrollYProgress,
              [start, start + step * 0.2, end - step * 0.2, end],
              ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)']
            );

            return (
              <motion.div
                key={principle.id}
                style={{ 
                  opacity, 
                  scale, 
                  filter: blur,
                  top: principle.y,
                  left: principle.x,
                  rotate: principle.rotate
                }}
                className="absolute w-[85vw] md:w-[32vw] pointer-events-auto z-10"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-accent-warm tracking-[0.3em]">
                      [ STUDIO_DATA_{principle.id} ]
                    </span>
                    <div className="h-[1px] w-8 bg-accent-warm/30" />
                  </div>
                  
                  <h3 className="text-display text-4xl md:text-6xl lg:text-7xl text-white leading-[0.9] font-light italic">
                    {principle.title}
                  </h3>
                  
                  <p className="text-body-lg text-white/50 max-w-sm leading-relaxed tracking-tight">
                    {principle.desc}
                  </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-white/20" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-white/20" />
              </motion.div>
            );
          })}

          {/* Final Kinetic "Start" Trigger */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.9, 0.96], [0, 1]),
              scale: useTransform(scrollYProgress, [0.9, 0.96], [0.9, 1]),
              y: useTransform(scrollYProgress, [0.9, 1], [30, 0])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto"
          >
            <h3 className="text-display text-[12vw] text-white italic font-light leading-none opacity-10">
              READY?
            </h3>
            <motion.a
              href="/start-a-project"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 text-label text-accent-warm border border-accent-warm/30 px-10 py-5 hover:bg-accent-warm hover:text-white transition-all duration-500 uppercase tracking-[0.3em] backdrop-blur-md"
            >
              Start Your Project →
            </motion.a>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
