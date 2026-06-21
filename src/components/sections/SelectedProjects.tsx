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

const FRACTAL_STYLES = [
  { bg: 'linear-gradient(160deg, #0D1B2A 0%, #1B3A5C 25%, #2E6B9E 45%, #C4763A 65%, #E8A456 80%, #F2C87E 100%)', ray: 0.03 }, // 01 Shingri
  { bg: 'linear-gradient(150deg, #1A0A2E 0%, #3D1A6E 30%, #7B3FA0 55%, #C4663A 75%, #E8954A 90%, #F5C878 100%)', ray: 0.04 }, // 02 Gadag
  { bg: 'linear-gradient(165deg, #0A0A0A 0%, #1A1208 20%, #3D2E0A 40%, #8B6914 60%, #C4A028 78%, #E8C84A 92%, #F5E8A0 100%)', ray: 0.03 }, // 03 Deepcipher
  { bg: 'linear-gradient(155deg, #050D1A 0%, #0A2040 25%, #0E3D7A 45%, #1560B8 62%, #2890D8 78%, #5AB8E8 90%, #A0D8F5 100%)', ray: 0.04 }, // 04 Hyrox
  { bg: 'linear-gradient(158deg, #0A0F0A 0%, #0D2010 25%, #1A4020 45%, #2A7034 62%, #3A9E48 76%, #6AC878 88%, #A8E8B0 100%)', ray: 0.03 }, // 05 Sentiment
  { bg: 'linear-gradient(162deg, #0D0A1A 0%, #1E1040 25%, #3D1A7A 45%, #6828B0 62%, #9040D0 76%, #C060E8 88%, #E0A0F8 100%)', ray: 0.04 }, // 06 Gridsystems
];

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
        minHeight: '100svh',
        padding: 'clamp(40px, 6vw, 80px) 0',
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
          background: 'radial-gradient(circle, rgba(184,149,106,0.04) 0%, transparent 70%)',
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
              style={{ width: '24px', height: '0.5px', backgroundColor: '#B8956A', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                color: '#6B6560',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              SELECTED PROJECTS
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.1,
              color: '#F5F0E8',
              margin: 0,
            }}
          >
            <span className="upright">The </span>
            <span className="italic" style={{ color: '#B8956A' }}>Archive.</span>
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
            color: '#B8956A',
            textDecoration: 'none',
          }}
        >
          VIEW ALL WORK →
          <span
            className="absolute bottom-[-2px] left-0 w-full h-[0.5px] bg-[#B8956A] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"
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
            e.currentTarget.style.borderColor = '#B8956A';
            e.currentTarget.style.color = '#B8956A';
            e.currentTarget.style.background = 'rgba(184,149,106,0.1)';
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
            e.currentTarget.style.borderColor = '#B8956A';
            e.currentTarget.style.color = '#B8956A';
            e.currentTarget.style.background = 'rgba(184,149,106,0.1)';
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
          const styleObj = FRACTAL_STYLES[index % FRACTAL_STYLES.length];

          return (
            <motion.div
              key={project.slug}
              className="absolute cursor-pointer group"
              style={{
                width: isMobile ? '300px' : '420px',
                height: isMobile ? '400px' : '520px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isActive
                  ? '0 40px 80px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(245,240,232,0.08)'
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
              {/* Fractal Gradient Background */}
              <div
                className="absolute inset-0"
                style={{ background: styleObj.bg }}
              />

              {/* Vertical Rays */}
              <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                  background: `repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(255,255,255,${styleObj.ray}) 32px, rgba(255,255,255,${styleObj.ray}) 34px)`
                }}
              />

              {/* Light Bloom Effect */}
              <div 
                className="absolute pointer-events-none z-[2] transition-transform duration-600 ease-out group-hover:translate-x-[10%] group-hover:scale-110"
                style={{
                  top: '-20%', left: '30%', width: '40%', height: '80%',
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)'
                }}
              />

              {/* Category badge */}
              <div
                className="absolute"
                style={{
                  top: '14px',
                  right: '14px',
                  background: 'rgba(0,0,0,0.6)',
                  border: '0.5px solid rgba(184,149,106,0.4)',
                  color: '#B8956A',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '8px',
                  letterSpacing: '0.12em',
                  padding: '4px 10px',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                  zIndex: 4,
                }}
              >
                {project.category}
              </div>

              {/* Info overlay — floats over canvas with gradient backdrop */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  zIndex: 3,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                  padding: isMobile ? '40px 20px 20px' : '60px 28px 24px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 500,
                    fontSize: isMobile ? 'clamp(18px, 4vw, 22px)' : '22px',
                    color: '#F5F0E8',
                    margin: '0 0 6px 0',
                    lineHeight: 1.1,
                  }}
                  className="upright"
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: '#9A9590',
                    lineHeight: 1.4,
                  }}
                >
                  {project.description}
                </span>
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
              background: i === activeIndex ? '#B8956A' : 'rgba(245,240,232,0.2)',
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
            color: '#B8956A',
            textDecoration: 'none',
            borderBottom: '0.5px solid rgba(184,149,106,0.4)',
            paddingBottom: '4px',
          }}
        >
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
