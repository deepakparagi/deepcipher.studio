'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SectionLabel from '../ui/SectionLabel';
import Link from 'next/link';

/* ========================================
   Headline words — split for word reveal
   ======================================== */

const HEADLINE_WORDS = [
  'Websites', 'that', 'convert',
  'are', 'designed',
  'with', 'obsession', '—',
  'not', 'assembled.',
];

const BRAND_WORD = 'obsession';

/* ========================================
   Section 3 — Philosophy (GSAP Pinned)
   ======================================== */

export default function PhilosophyV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;

    if (checkMobile() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMobile(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

      /* ── Pin the section ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      /* ── Word color reveal ── */
      wordEls.forEach((word, i) => {
        const isBrand = word.dataset.brand === 'true';
        if (isBrand) {
          // Brand word is always gold — animate opacity to make it prominent
          gsap.set(word, { color: '#B8956A', opacity: 0.3 });
          tl.to(word, {
            opacity: 1,
            ease: 'none',
            duration: 0.15,
          }, i * 0.15);
        } else {
          gsap.set(word, { color: 'rgba(10,10,10,0.08)' });
          tl.to(word, {
            color: 'rgba(10,10,10,0.95)',
            ease: 'none',
            duration: 0.15,
          }, i * 0.15);
        }
      });

      /* ── Body text + rule reveal ── */
      if (ruleRef.current) {
        gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'center' });
        tl.to(ruleRef.current, {
          scaleX: 1,
          ease: 'power2.out',
          duration: 0.3,
        }, 1.0);
      }

      if (bodyRef.current) {
        gsap.set(bodyRef.current, { opacity: 0, y: 20 });
        tl.to(bodyRef.current, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.4,
        }, 1.1);
      }

      /* ── Signature row ── */
      if (sigRef.current) {
        gsap.set(sigRef.current, { opacity: 0 });
        tl.to(sigRef.current, {
          opacity: 1,
          ease: 'power2.out',
          duration: 0.3,
        }, 1.4);
      }

      /* Brief spacer before unpin */
      tl.to({}, { duration: 0.1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        backgroundColor: '#F5F3EF',
      }}
    >
      {/* ── 4 Corner L-Brackets ── */}
      <div
        className="hidden md:block absolute"
        style={{ top: '32px', left: '32px', width: '24px', height: '24px', borderTop: '1.5px solid rgba(184,149,106,0.25)', borderLeft: '1.5px solid rgba(184,149,106,0.25)' }}
      />
      <div
        className="hidden md:block absolute"
        style={{ top: '32px', right: '32px', width: '24px', height: '24px', borderTop: '1.5px solid rgba(184,149,106,0.25)', borderRight: '1.5px solid rgba(184,149,106,0.25)' }}
      />
      <div
        className="hidden md:block absolute"
        style={{ bottom: '32px', left: '32px', width: '24px', height: '24px', borderBottom: '1.5px solid rgba(184,149,106,0.25)', borderLeft: '1.5px solid rgba(184,149,106,0.25)' }}
      />
      <div
        className="hidden md:block absolute"
        style={{ bottom: '32px', right: '32px', width: '24px', height: '24px', borderBottom: '1.5px solid rgba(184,149,106,0.25)', borderRight: '1.5px solid rgba(184,149,106,0.25)' }}
      />

      {/* ── Top-left vertical studio label ── */}
      <div className="hidden md:block absolute" style={{ top: '80px', left: '32px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: 'rgba(10,10,10,0.2)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          DEEPCIPHER — WEB & BRAND STUDIO
        </span>
      </div>

      {/* ── Top-right philosophy label ── */}
      <div className="absolute" style={{ top: '32px', right: '32px' }}>
        <SectionLabel className="text-[rgba(10,10,10,0.3)]">[ 01 — PHILOSOPHY ]</SectionLabel>
      </div>

      {/* ── Ghost "01" background number ── */}
      <div
        className="absolute select-none pointer-events-none hidden md:block"
        style={{ bottom: 0, right: '16px' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 700,
            fontSize: 'clamp(160px, 18vw, 280px)',
            color: 'rgba(10,10,10,0.025)',
            lineHeight: 0.8,
          }}
        >
          01
        </span>
      </div>

      {/* ── Center Content — uses flexbox, NOT absolute ── */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-0"
        style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
      >
        {/* Section label */}
        <span
          className="mb-8"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: '#B8956A',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          [ OUR PHILOSOPHY ]
        </span>

        {/* Headline — word-by-word reveal */}
        <h2
          className="m-0"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(44px, 6vw, 96px)',
            lineHeight: 0.9,
            textAlign: 'center',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => {
            const isBrand = word === BRAND_WORD;
            const isLineBreak = i === 3 || i === 5 || i === 8;
            return (
              <span key={i}>
                {isLineBreak && <br className="hidden md:inline" />}
                <span
                  ref={(el) => { wordsRef.current[i] = el; }}
                  data-brand={isBrand}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    color: isMobile
                      ? (isBrand ? '#B8956A' : 'rgba(10,10,10,0.95)')
                      : (isBrand ? '#B8956A' : 'rgba(10,10,10,0.08)'),
                    transition: 'color 0.1s linear',
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h2>

        {/* Body content — revealed late */}
        <div ref={bodyRef} className="flex flex-col items-center" style={{ opacity: isMobile ? 1 : 0 }}>
          {/* Gold rule */}
          <div
            ref={ruleRef}
            className="mx-auto"
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: '#B8956A',
              marginTop: '40px',
              marginBottom: '32px',
              transform: isMobile ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />

          {/* Body paragraph */}
          <p
            className="m-0 mx-auto"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '16px',
              color: 'rgba(10,10,10,0.6)',
              maxWidth: '540px',
              textAlign: 'center',
              lineHeight: 1.9,
            }}
          >
            We don&apos;t assemble websites from templates and call it design. Every
            layout, every interaction, every word on every page is a deliberate
            decision — made in service of one goal. Moving your visitor one step
            closer to choosing you.
          </p>

          {/* Process link */}
          <Link
            href="/process"
            className="nav-link-underline"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#0A0A0A',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              marginTop: '32px',
              display: 'inline-block',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#B8956A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#0A0A0A'; }}
          >
            Read our process →
          </Link>
        </div>
      </div>

      {/* ── Bottom signature row ── */}
      <div
        ref={sigRef}
        className="hidden md:flex absolute items-center justify-between pointer-events-none"
        style={{
          bottom: '32px',
          left: '80px',
          right: '80px',
          opacity: isMobile ? 1 : 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: 'rgba(10,10,10,0.25)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          WEB & BRAND STUDIO
        </span>

        <div className="flex items-center" style={{ gap: '16px' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(184,149,106,0.3)' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: 'rgba(10,10,10,0.25)',
              letterSpacing: '0.15em',
            }}
          >
            India · Dubai · London · Remote
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            color: 'rgba(10,10,10,0.25)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          MMXXV
        </span>
      </div>
    </section>
  );
}
