'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCursor } from '../ui/CursorProvider';
import { projects } from '@/lib/projects';

/* =========================================================
   SelectedProjects — 3D Card Stack Carousel
   Features:
   - 5-card depth perspective with 3D transforms
   - Dynamic gradient backgrounds mapping work page styles
   - Arrow, dot, drag, and click navigation
   - Auto-advance with hover pause
   - Mobile responsive
   ========================================================= */

const PROJECT_COVERS: Record<string, string> = {
  'shingri-developers': '/project-covers/shingri-developers.jpg',
  'gadag-info': '/project-covers/gadag-info.jpg',
  'deepak-portfolio': '/project-covers/deepak-portfolio.jpg',
  'bipin-chikkatti-institutions': '/project-covers/bipin-chikkatti-institutions.jpg',
  'bipin-chikkatti-college': '/project-covers/bipin-chikkatti-college.jpg',
  'khans-fitness': '/project-covers/khans-fitness.jpg',
  'cinepulse-ai': '/project-covers/cinepulse-ai.jpg',
  'brown-sugar-fusion-cafe': '/project-covers/brown-sugar-fusion-cafe.jpg',
};

/* ── Card position styles ── */
const CARD_STYLES = {
  active: {
    x: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    zIndex: 10,
    filter: 'brightness(1)',
  },
  left: {
    x: -280,
    scale: 0.88,
    rotate: -4,
    opacity: 0.65,
    zIndex: 8,
    filter: 'brightness(0.7)',
  },
  right: {
    x: 280,
    scale: 0.88,
    rotate: 4,
    opacity: 0.65,
    zIndex: 8,
    filter: 'brightness(0.7)',
  },
  farLeft: {
    x: -420,
    scale: 0.76,
    rotate: -8,
    opacity: 0.3,
    zIndex: 6,
    filter: 'brightness(0.4)',
  },
  farRight: {
    x: 420,
    scale: 0.76,
    rotate: 8,
    opacity: 0.3,
    zIndex: 6,
    filter: 'brightness(0.4)',
  },
  hidden: {
    x: 0,
    scale: 0.6,
    rotate: 0,
    opacity: 0,
    zIndex: 0,
    filter: 'brightness(0.3)',
  },
};

/* ── Mobile card styles ── */
const MOBILE_CARD_STYLES = {
  active: { ...CARD_STYLES.active },
  left: { ...CARD_STYLES.left, x: -180 },
  right: { ...CARD_STYLES.right, x: 180 },
  farLeft: { ...CARD_STYLES.hidden },
  farRight: { ...CARD_STYLES.hidden },
  hidden: { ...CARD_STYLES.hidden },
};

function getCardPosition(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  // Normalize to circular range
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  switch (diff) {
    case 0: return 'active';
    case -1: return 'left';
    case 1: return 'right';
    case -2: return 'farLeft';
    case 2: return 'farRight';
    default: return 'hidden';
  }
}

const cardTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function SelectedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const { setCursor, resetCursor } = useCursor();

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-advance every 5s, pause on hover
  useEffect(() => {
    if (isHovered) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [isHovered]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Card click handler
  const handleCardClick = useCallback((index: number) => {
    const total = projects.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      router.push(`/work/${projects[index].slug}`);
    } else if (diff === 1 || diff === -(total - 1)) {
      goNext();
    } else if (diff === -1 || diff === total - 1) {
      goPrev();
    }
  }, [activeIndex, goNext, goPrev, router]);

  // Drag/swipe handlers
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
  }, []);

  const handleDragEnd = useCallback((clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
  }, [isDragging, dragStartX, goNext, goPrev]);

  const styles = isMobile ? MOBILE_CARD_STYLES : CARD_STYLES;

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: isMobile ? 'auto' : '100svh',
        padding: isMobile ? '36px 0 20px' : 'clamp(40px, 6vw, 72px) 0 clamp(20px, 3vw, 36px)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(44, 52, 128,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Section Header ── */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between"
        style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)' }}
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div
              style={{ width: '24px', height: '0.5px', backgroundColor: '#2C3480', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-helvetica), sans-serif',
                fontSize: '11px',
                color: '#6B6560',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              SELECTED PROJECTS
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-helvetica), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F5F0E8',
              margin: 0,
            }}
          >
            <span className="upright">The </span>
            <span className="font-citadel italic" style={{ color: '#4B5DF5' }}>Archive.</span>
          </h2>
        </div>

        <Link
          href="/work"
          className="mt-4 md:mt-0 hidden md:inline-block group relative"
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2C3480',
            textDecoration: 'none',
          }}
        >
          VIEW ALL WORK →
          <span
            className="absolute bottom-[-2px] left-0 w-full h-[0.5px] bg-[#2C3480] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* ── Card Stack Container ── */}
      <div
        ref={containerRef}
        className="relative z-10 flex items-center justify-center"
        style={{
          height: isMobile ? '480px' : '600px',
          perspective: '1200px',
          perspectiveOrigin: '50% 40%',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {/* Prev Arrow */}
        <button
          onClick={goPrev}
          className="absolute z-20"
          style={{
            left: isMobile ? '16px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(10,10,10,0.8)',
            border: '0.5px solid rgba(245,240,232,0.15)',
            color: '#F5F0E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2C3480';
            e.currentTarget.style.color = '#2C3480';
            e.currentTarget.style.background = 'rgba(44, 52, 128,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)';
            e.currentTarget.style.color = '#F5F0E8';
            e.currentTarget.style.background = 'rgba(10,10,10,0.8)';
          }}
          aria-label="Previous project"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={goNext}
          className="absolute z-20"
          style={{
            right: isMobile ? '16px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(10,10,10,0.8)',
            border: '0.5px solid rgba(245,240,232,0.15)',
            color: '#F5F0E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2C3480';
            e.currentTarget.style.color = '#2C3480';
            e.currentTarget.style.background = 'rgba(44, 52, 128,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)';
            e.currentTarget.style.color = '#F5F0E8';
            e.currentTarget.style.background = 'rgba(10,10,10,0.8)';
          }}
          aria-label="Next project"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Cards */}
        {projects.map((project, index) => {
          const position = getCardPosition(index, activeIndex, projects.length);
          const style = styles[position] || styles.hidden;
          const isActive = position === 'active';
          const coverImage = PROJECT_COVERS[project.slug] || project.image;

          return (
            <motion.div
              key={project.slug}
              className="absolute cursor-pointer group"
              style={{
                width: isMobile ? '300px' : '420px',
                height: isMobile ? '400px' : '520px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isActive
                  ? '0 35px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(75,93,245,0.45)'
                  : '0 20px 40px rgba(0,0,0,0.6)',
                willChange: 'transform',
              }}
              animate={{
                x: style.x,
                scale: style.scale,
                rotate: style.rotate,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              whileHover={isActive ? {
                scale: 1.02,
                y: -8,
              } : undefined}
              transition={cardTransition}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => {
                if (isActive) setCursor('hover', 'VIEW');
              }}
              onMouseLeave={resetCursor}
            >
              {/* Image Cover - explicitly styled to fill 100% of card edge-to-edge */}
              <img
                src={coverImage}
                alt={project.title}
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  zIndex: 0,
                }}
              />

              {/* Subtle ambient scrim so image is 100% visible while maintaining hover depth */}
              <div 
                className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300 bg-black/10 group-hover:bg-black/25" 
              />

              {/* Minimalist Archival Index in Top Left */}
              <div
                className="absolute top-4 left-4 z-[4] pointer-events-none"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9.5px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                }}
              >
                0{index + 1} // 0{projects.length}
              </div>

              {/* Center Project Name */}
              <div
                className="absolute inset-0 z-10 p-6 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-500"
                style={{
                  background: isActive
                    ? 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.72) 0%, rgba(10, 10, 10, 0.3) 55%, transparent 85%)'
                    : 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.45) 55%, transparent 85%)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-helvetica), sans-serif',
                    fontWeight: 700,
                    fontSize: isMobile ? '20px' : '26px',
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textShadow: '0 4px 28px rgba(0,0,0,0.98), 0 2px 8px rgba(0,0,0,0.95)',
                    maxWidth: '85%',
                    margin: 0,
                    opacity: isActive ? 1 : 0.45,
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.4s ease',
                  }}
                  className="upright transition-transform duration-300 group-hover:scale-105"
                >
                  {project.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Dot Indicators ── */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{ marginTop: '24px', gap: '8px' }}
      >
        {projects.map((project, i) => (
          <button
            key={project.slug}
            onClick={() => goTo(i)}
            aria-label={`Go to ${project.title}`}
            style={{
              width: i === activeIndex ? '24px' : '6px',
              height: '6px',
              borderRadius: i === activeIndex ? '3px' : '50%',
              background: i === activeIndex ? '#2C3480' : 'rgba(245,240,232,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link
          href="/work"
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2C3480',
            textDecoration: 'none',
            borderBottom: '0.5px solid rgba(44, 52, 128,0.4)',
            paddingBottom: '4px',
          }}
        >
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
