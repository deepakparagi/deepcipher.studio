'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';

const values = [
  { id: '01', label: "PURE CUSTOM", speed: 0.1, x: "10%", y: "20%", rotate: 5 },
  { id: '02', label: "RESULT DRIVEN", speed: 0.15, x: "65%", y: "15%", rotate: -8 },
  { id: '03', label: "MICRO PRECISION", speed: 0.08, x: "40%", y: "35%", rotate: 12 },
  { id: '04', label: "STRATEGIC DEPTH", speed: 0.12, x: "15%", y: "55%", rotate: -15 },
  { id: '05', label: "CONVERSION DNA", speed: 0.2, x: "75%", y: "50%", rotate: 10 },
  { id: '06', label: "TOTAL TRANSPARENCY", speed: 0.1, x: "50%", y: "70%", rotate: -5 },
  { id: '07', label: "ELITE FOCUS", speed: 0.18, x: "85%", y: "80%", rotate: 20 },
  { id: '08', label: "SCALED CARE", speed: 0.14, x: "20%", y: "85%", rotate: -10 },
];

function FloatingElement({ value }: { value: typeof values[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [0, -150 * value.speed * 10]);
  const ySpring = useSpring(yPos, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{
        left: value.x,
        top: value.y,
        y: ySpring,
        rotate: value.rotate,
      }}
      className="absolute z-10"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="group relative"
      >
        {/* Glassmorphism Panel */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-sm flex items-center gap-4 shadow-2xl overflow-hidden min-w-[220px]">
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="font-mono text-[10px] text-[#B8956A] font-bold">
            {value.id}
          </span>
          
          <span className="font-display italic text-white text-[16px] tracking-widest uppercase">
            {value.label}
          </span>

          {/* Sci-fi UI bit */}
          <div className="ml-auto opacity-20">
            <div className="w-1 h-1 bg-white mb-1" />
            <div className="w-4 h-[1px] bg-white" />
          </div>
        </div>

        {/* 3D Metaphor Element (Floating Cube/Shard visual) */}
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
            rotateZ: [0, 15, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: parseInt(value.id) * 0.5
          }}
          className="absolute -top-6 -right-6 w-12 h-12 border border-white/5 bg-gradient-to-br from-white/10 to-transparent rotate-45 backdrop-blur-sm pointer-events-none group-hover:border-white/20 transition-colors" 
        />
      </motion.div>
    </motion.div>
  );
}

export default function ValuesGrid() {
  return (
    <section className="bg-[#050505] min-h-[120vh] py-[100px] overflow-hidden relative cursor-crosshair">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] md:left-[30%] w-[150vw] md:w-[600px] h-[150vw] md:h-[600px] bg-[#B8956A]/5 rounded-full blur-[120px] md:blur-[160px]" />
        <div className="absolute bottom-[30%] right-[10%] md:right-[20%] w-[100vw] md:w-[400px] h-[100vw] md:h-[400px] bg-white/5 rounded-full blur-[100px] md:blur-[140px]" />
        
        {/* Digital Grid Trace */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative h-auto lg:h-[1200px] pb-32 lg:pb-0">
        {/* The Bold Static Header - Distorted Editorial Style */}
        <div className="relative z-20 pt-[60px]">
          <SectionLabel className="mb-[24px] text-white/30 tracking-[0.3em] font-medium">CORE OPERATING SYSTEM</SectionLabel>
          <h2 className="font-display italic font-light text-white m-0 pointer-events-none"
              style={{ fontSize: 'clamp(64px, 12vw, 160px)', lineHeight: 0.8, mixBlendMode: 'difference' }}>
            What we <br />
            <span className="font-bold text-[#B8956A]">stand for</span>
          </h2>
          
          <div className="mt-8 max-w-[300px]">
             <p className="font-mono text-[11px] text-white/40 leading-relaxed uppercase tracking-[0.2em]">
               Non-standard protocols. <br />
               Uncompromising precision.
             </p>
          </div>
        </div>

        {/* The Spatial Canvas Elements (Desktop Only for Full Effect) */}
        <div className="hidden lg:block absolute inset-0 mt-[100px]">
          {values.map((v) => (
            <FloatingElement key={v.id} value={v} />
          ))}
        </div>

        {/* Mobile Fallback - Simplified Modern Stack */}
        <div className="lg:hidden grid grid-cols-1 gap-6 mt-[100px]">
          {values.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm"
            >
              <div className="text-[#B8956A] font-mono text-[10px] mb-2">{v.id}</div>
              <div className="text-white font-display italic text-[24px] tracking-tighter">{v.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Futuristic Accents */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-20 group">
        <div className="font-mono text-white text-[9px] tracking-widest uppercase">System Status: Optimal</div>
        <div className="w-[150px] h-[1px] bg-white" />
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-[#B8956A]" />
          ))}
        </div>
      </div>
    </section>
  );
}
