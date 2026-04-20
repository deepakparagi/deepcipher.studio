'use client';

import ProjectCover from '../ui/ProjectCover';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '../ui/CursorProvider';
import type { Project } from '@/lib/projects';

/* ========================================
   WorkCard — Production-Grade Project Card
   Standardized with Tailwind CSS for perfection.
   ======================================== */

interface WorkCardProps {
  project: Project;
  index: number;
}

export default function WorkCard({ project, index }: WorkCardProps) {
  const { setCursor, resetCursor } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt state with refined physics for 2026 standards
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    resetCursor();
  };

  return (
    <Link 
      href={`/work/${project.slug}`} 
      className="group block relative w-full h-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.05,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursor('hover', 'EXPLORE')}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden will-change-transform rounded-sm border border-white/[0.03] group-hover:border-white/[0.08] transition-colors duration-700"
      >
        {/* Main Image Layer */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <ProjectCover 
            project={project} 
            className="w-full h-full grayscale-[50%] group-hover:grayscale-0 contrast-[1.1] transition-all duration-1000" 
          />
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />

        {/* Content Layer */}
        <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
          
          {/* Top Corner Bracket */}
          <div className="absolute top-8 left-8 w-6 h-[1px] bg-[var(--accent-warm)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
          <div className="absolute top-8 left-8 w-[1px] h-6 bg-[var(--accent-warm)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100" />

          {/* Metadata Block */}
          <div className="overflow-hidden mb-2">
            <motion.span 
              className="block font-mono text-[9px] text-[var(--accent-warm)] tracking-[0.3em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            >
              {project.category}
            </motion.span>
          </div>

          {/* Title */}
          <h3 className="font-display font-light italic text-white leading-[0.9] tracking-tighter m-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            {project.title}
          </h3>

          {/* Footer Metadata */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                Release: {project.year}
              </span>
              <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                {project.tags?.slice(0, 2).join(' / ')}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="font-mono text-[9px] text-[var(--accent-warm)] uppercase tracking-widest">
                 Case Study
               </span>
               <span className="text-[var(--accent-warm)] text-lg">→</span>
            </div>
          </div>
        </div>

        {/* Inner Glare Effect */}
        <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </motion.div>
    </Link>
  );
}
