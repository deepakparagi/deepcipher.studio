'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/projects';

/* ==========================================================
   v9: THE EDITORIAL CARD — CINEMATIC HOVER
   Architecture: 16:10 Aspect, Dynamic Title Overlay, Scale 1.05.
   ========================================================== */

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`} className="block w-full h-full relative group cursor-none">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full overflow-hidden bg-[#111]"
      >
        {/* Category Pill (Top-Right) */}
        <div className="absolute top-6 right-6 z-30 pointer-events-none">
           <span className="px-5 py-2 bg-[#D4AF37] text-[#0A0A0A] font-mono text-[9px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg">
             {project.category}
           </span>
        </div>

        {/* Thumbnail Image */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full min-h-[inherit]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover ${isHovered ? 'grayscale-0' : 'grayscale-[40%]'} transition-all duration-1000`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
          
          {/* Overlay Gradient (0% -> 60%) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent z-10"
          />
        </motion.div>

        {/* Cinematic Title Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-12">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="text-center"
           >
              <h3 className="font-display italic font-light text-[clamp(28px,3vw,42px)] text-white tracking-tighter leading-none mb-6">
                {project.title}
              </h3>
              <div className="flex items-center justify-center gap-4">
                 <div className="w-8 h-px bg-[#D4AF37]" />
                 <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.4em] uppercase">VIEW CASE STUDY →</span>
                 <div className="w-8 h-px bg-[#D4AF37]" />
              </div>
           </motion.div>
        </div>
      </motion.div>

      {/* Metadata Below Image */}
      <div className="mt-8">
         <div className="w-full h-px bg-white/10 mb-4" />
         <div className="flex justify-between items-end gap-8">
            <div className="flex flex-col gap-1">
               <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">CLIENT // {project.client.toUpperCase()}</span>
               <span className="font-mono text-[8px] text-[var(--accent-warm)]/50 uppercase tracking-[0.2em]">{project.techStack.join(' · ')}</span>
            </div>
            <span className="font-mono text-[10px] text-white/20 tracking-[0.2em]">{project.year}</span>
         </div>
      </div>
    </Link>
  );
}
