'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 as Github, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-[#111111] border border-white/5 overflow-hidden transition-all duration-700"
    >
      {/* 01. IMAGE CONTAINER — Depth Shift Reveal */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* HUD Precision Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div className="flex flex-col gap-1">
               <span className="font-mono text-[8px] text-[var(--accent-warm)] opacity-40">NODE_REF.0{project.id}</span>
               <div className="w-4 h-px bg-[var(--accent-warm)] opacity-20" />
             </div>
             <span className="font-mono text-[8px] text-white/10 uppercase tracking-[0.4em]">system_active</span>
           </div>

           <div className="absolute bottom-6 right-6 overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: isHovered ? '0%' : '100%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                 <div className="w-10 h-10 rounded-full bg-[var(--accent-warm)] flex items-center justify-center text-white shadow-2xl shadow-[var(--accent-warm)]/40">
                    <ArrowUpRight size={20} />
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Category HUD Badge */}
        <div className="absolute bottom-6 left-6 z-20">
          <span className="font-mono text-[9px] font-medium tracking-[0.3em] uppercase text-white/30 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* 02. CONTENT — High-Contrast Typography */}
      <div className="flex flex-col flex-grow p-8 md:p-10 border-t border-white/5">
        <div className="flex justify-between items-baseline mb-6">
          <h3 className="font-display font-light italic text-3xl md:text-4xl text-white group-hover:text-[var(--accent-warm)] transition-colors duration-700 tracking-tighter">
            {project.title}
          </h3>
          <span className="font-mono text-[9px] text-white/20 tracking-[0.2em]">{project.year}</span>
        </div>

        <p className="font-body font-light text-white/30 text-[15px] leading-relaxed mb-10 line-clamp-2 italic">
          {project.description}
        </p>

        {/* Atmospheric Tech Stack */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] text-[var(--accent-warm)] opacity-40 uppercase tracking-[0.2em]"
            >
              {tech}
            </span>
          ))}
          <div className="flex-1 border-b border-white/5 mb-1" />
        </div>

        {/* Hover Actions — Minimalist Glassmorphism */}
        <div className="grid grid-cols-2 gap-4 mt-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000">
          <Link
            href={project.liveUrl || '#'}
            target="_blank"
            className="flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold text-[10px] tracking-widest uppercase hover:bg-[var(--accent-warm)] hover:text-white transition-all duration-700"
          >
            Experience
            <ExternalLink size={12} />
          </Link>
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-white font-semibold text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all duration-700"
          >
            Archive
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      {/* Full link overlay for internal navigation */}
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-0 sm:z-10 cursor-none"
        aria-label={`View ${project.title} Case Study`}
      />
    </motion.div>
  );
}
