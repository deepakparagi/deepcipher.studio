'use client';

import Image from 'next/image';
import type { Project } from '@/lib/projects';

/* ========================================
   ProjectCover — AI-Generated Image Cover
   Beautiful image-based covers with elegant overlays
   ======================================== */

interface ProjectCoverProps {
  project: Project;
  className?: string;
}

export default function ProjectCover({ project, className = '' }: ProjectCoverProps) {
  const idx = String(project.id).padStart(2, '0');

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* AI-generated cover image */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={project.id <= 3}
        />
      ) : (
        /* Fallback dark background if no image */
        <div className="absolute inset-0 bg-[#0A0A0A]" />
      )}

      {/* Subtle vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Project number — top right */}
      <div className="absolute top-[24px] right-[24px] z-10">
        <span
          className="font-mono text-[11px] tracking-[0.3em]"
          style={{ color: 'rgba(184,149,106,0.7)' }}
        >
          {idx}
        </span>
      </div>

      {/* Metadata — bottom left */}
      <div className="absolute bottom-[24px] left-[24px] z-10 flex flex-col gap-[6px]">
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {project.category}
        </span>
        <span
          className="font-mono text-[8px] tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {project.techStack.slice(0, 3).join(' · ')}
        </span>
      </div>
    </div>
  );
}
