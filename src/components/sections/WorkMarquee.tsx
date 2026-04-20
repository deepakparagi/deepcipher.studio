'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

/* ========================================
   Premium Marquee Ticker — Awwwards Edition
   Gradient glow · Animated separators · Scroll-reactive
   ======================================== */

interface MarqueeProps {
  variant?: 'light' | 'dark';
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}

export default function WorkMarquee({
  variant = 'light',
  items,
  speed = 28,
  direction = 'left',
}: MarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isLight = variant === 'light';
  const isRight = direction === 'right';
  const uid = `mq-${variant}-${isRight ? 'r' : 'l'}`;

  /* ── Scroll-reactive perspective ── */
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const normalized = (center - windowH / 2) / (windowH / 2);
    setScrollProgress(Math.max(-1, Math.min(1, normalized)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Build item set ── */
  const singleSet = items.map((item, i) => (
    <span key={i} className={`${uid}-item`}>
      <span className={`${uid}-text`}>
        {item}
      </span>
      <span className={`${uid}-sep`}>
        <span className={`${uid}-sep-dot`} />
      </span>
    </span>
  ));

  const skew = scrollProgress * 1.5;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: 'clamp(36px, 4vw, 52px)',
        background: isLight
          ? 'linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 50%, #F8F7F4 100%)'
          : 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
        borderTop: `1px solid ${isLight ? 'rgba(10,10,10,0.08)' : 'rgba(255,255,255,0.06)'}`,
        borderBottom: `1px solid ${isLight ? 'rgba(10,10,10,0.08)' : 'rgba(255,255,255,0.06)'}`,
        perspective: '600px',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Edge fades ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isLight
            ? 'linear-gradient(to right, #F8F7F4 0%, transparent 6%, transparent 94%, #F8F7F4 100%)'
            : 'linear-gradient(to right, #0A0A0A 0%, transparent 6%, transparent 94%, #0A0A0A 100%)',
        }}
      />

      {/* ── Animated gold shimmer line ── */}
      <div
        className={`${uid}-shimmer absolute left-0 right-0 z-[5] pointer-events-none`}
        style={{
          top: '50%',
          height: '1px',
          transform: 'translateY(-50%)',
          background: isLight
            ? 'linear-gradient(90deg, transparent 0%, rgba(184,149,106,0.0) 20%, rgba(184,149,106,0.3) 50%, rgba(184,149,106,0.0) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(184,149,106,0.0) 20%, rgba(184,149,106,0.4) 50%, rgba(184,149,106,0.0) 80%, transparent 100%)',
          opacity: 0.6,
        }}
      />

      {/* ── Top/bottom accent hairlines ── */}
      <div
        className="absolute left-[10%] right-[10%] top-0 z-[5] pointer-events-none"
        style={{
          height: '1px',
          background: isLight
            ? 'linear-gradient(to right, transparent, rgba(184,149,106,0.12), transparent)'
            : 'linear-gradient(to right, transparent, rgba(184,149,106,0.08), transparent)',
        }}
      />
      <div
        className="absolute left-[10%] right-[10%] bottom-0 z-[5] pointer-events-none"
        style={{
          height: '1px',
          background: isLight
            ? 'linear-gradient(to right, transparent, rgba(184,149,106,0.12), transparent)'
            : 'linear-gradient(to right, transparent, rgba(184,149,106,0.08), transparent)',
        }}
      />

      {/* ── 3D Scrolling track ── */}
      <div
        className={`${uid}-track`}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: 'max-content',
          animationPlayState: isPaused ? 'paused' : 'running',
          transform: `rotateX(${skew}deg) skewX(${skew * -0.4}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
            }}
          >
            {singleSet}
          </div>
        ))}
      </div>

      <style>{`
        /* ── Track animation ── */
        .${uid}-track {
          animation: ${uid}-scroll ${speed}s linear infinite;
        }

        @keyframes ${uid}-scroll {
          0% { transform: translateX(${isRight ? '-25%' : '0%'}) rotateX(${skew}deg) skewX(${skew * -0.4}deg); }
          100% { transform: translateX(${isRight ? '0%' : '-25%'}) rotateX(${skew}deg) skewX(${skew * -0.4}deg); }
        }

        /* ── Item layout ── */
        .${uid}-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 0;
        }

        /* ── Text styling ── */
        .${uid}-text {
          font-family: var(--font-display), serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(10px, 1.1vw, 13px);
          line-height: 1;
          white-space: nowrap;
          padding: 0 clamp(20px, 2.8vw, 48px);
          cursor: default;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          color: ${isLight ? 'rgba(10, 10, 10, 0.35)' : 'rgba(255, 255, 255, 0.3)'};
        }

        /* ── Hover: text illuminates ── */
        .${uid}-text:hover {
          color: ${isLight ? 'rgba(10, 10, 10, 0.9)' : 'rgba(255, 255, 255, 0.95)'} !important;
          text-shadow: ${isLight
            ? '0 0 20px rgba(184, 149, 106, 0.15)'
            : '0 0 30px rgba(184, 149, 106, 0.3), 0 0 60px rgba(184, 149, 106, 0.1)'};
          letter-spacing: 0.28em;
        }

        /* ── Animated separator ── */
        .${uid}-sep {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .${uid}-sep-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${isLight
            ? 'linear-gradient(135deg, rgba(184,149,106,0.5), rgba(184,149,106,0.2))'
            : 'linear-gradient(135deg, rgba(184,149,106,0.6), rgba(184,149,106,0.2))'};
          box-shadow: ${isLight
            ? '0 0 8px rgba(184,149,106,0.2)'
            : '0 0 12px rgba(184,149,106,0.3), 0 0 4px rgba(184,149,106,0.5)'};
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: ${uid}-pulse 3s ease-in-out infinite;
        }

        .${uid}-item:hover .${uid}-sep-dot {
          width: 6px;
          height: 6px;
          box-shadow: 0 0 16px rgba(184,149,106,0.6), 0 0 32px rgba(184,149,106,0.2);
          background: linear-gradient(135deg, rgba(184,149,106,0.9), rgba(212,175,55,0.6));
        }

        @keyframes ${uid}-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* ── Shimmer sweep ── */
        .${uid}-shimmer {
          animation: ${uid}-shimmer-sweep 4s ease-in-out infinite;
        }

        @keyframes ${uid}-shimmer-sweep {
          0% { opacity: 0.2; }
          50% { opacity: 0.7; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
