'use client';

import React, { useRef } from 'react';
import ProjectCover from '../ui/ProjectCover';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '../ui/CursorProvider';
import { projects } from '@/lib/projects';

/* ========================================
   3D Work Card Component
   ======================================== */

interface WorkCard3DProps {
  project: any;
  index: number;
}

function WorkCard3D({ project, index }: WorkCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    resetCursor();
  };

  // Using exact height for unified 3 column row layout
  const gridStyles = { height: '600px' };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursor('link', 'EXPLORE')}
      style={{
        ...gridStyles,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full group block border border-transparent min-w-[300px]"
    >
      <Link href={`/work/${project.slug}`} className="block w-full h-full relative overflow-hidden">
        <motion.div
          style={{
            rotateX,
            rotateY,
          }}
          className="w-full h-full relative will-change-transform"
        >
          {/* CSS-generated cover */}
          <div className="w-full h-full relative overflow-hidden">
            <div className="w-[106%] h-[106%] relative -left-[3%] -top-[3%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
              <ProjectCover project={project} className="w-full h-full" />
            </div>
          </div>

          {/* Dark gradient overlay bottom 60% */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col pointer-events-none">
            <span className="font-mono text-[9px] text-[#B8956A] uppercase tracking-[0.2em] mb-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              {project.category}
            </span>
            <h3 className="font-display italic font-light text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                style={{ fontSize: 'clamp(24px, 2.5vw, 38px)', lineHeight: 1.1 }}>
              {project.title}
            </h3>
            
            <div className="flex justify-between items-end mt-4 overflow-hidden relative h-[24px]">
              <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-px">
                {project.tags?.join(' · ') || 'Digital Experience'}
              </span>

              {/* Result metric slides up on hover */}
              <span className="font-mono text-[9px] text-[#B8956A] uppercase tracking-widest absolute right-0 bottom-[-100%] group-hover:bottom-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {project.result || 'View Case Study'}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ========================================
   Section 5 — Selected Work Grid
   ======================================== */

export default function WorkGrid() {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="relative w-full bg-[#FFFFFF] pt-32 pb-0">
      
      {/* Header Row */}
      <div className="px-6 md:px-12 lg:px-20 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <h2 className="font-display italic font-light text-[#0A0A0A] leading-[0.9] m-0"
            style={{ fontSize: 'clamp(56px, 6.5vw, 100px)', letterSpacing: '-0.02em' }}>
          <span className="block not-italic">Selected</span>
          <span className="block">Work</span>
        </h2>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="font-mono text-[9px] text-[rgba(10,10,10,0.3)] tracking-[0.2em] uppercase">
             6 projects · 2024–2025
          </span>
          <Link href="/work" className="font-mono text-[10px] text-[#0A0A0A] uppercase tracking-[0.1em] hover:text-[#B8956A] border-b border-[#0A0A0A] hover:border-[#B8956A] transition-colors pb-1 mt-1">
            View all work →
          </Link>
        </div>
      </div>

      {/* Work Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(10,10,10,0.08)]">
        {displayProjects.map((p, i) => (
          <WorkCard3D key={p.id} project={p} index={i} />
        ))}
      </div>

    </section>
  );
}
