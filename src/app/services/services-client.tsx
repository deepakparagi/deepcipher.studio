'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import { services } from '@/lib/services';
import Noise from '@/components/ui/Noise';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Link from 'next/link';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import AnimatedText from '@/components/ui/AnimatedText';

/* ==========================================================
   SERVICES PAGE — Final polish pass
   ========================================================== */

/* ── Inline SVG: SEO & Performance (service 4) ── */
function SeoVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0F0F0F"/>
      <text x="400" y="360" fontFamily="Cormorant Garamond, serif"
            fontSize="260" fontStyle="italic" fontWeight="300"
            fill="#B8956A" opacity="0.12" textAnchor="middle">95</text>
      <text x="400" y="430" fontFamily="DM Mono, monospace"
            fontSize="11" fill="#6B6560" textAnchor="middle"
            letterSpacing="5">LIGHTHOUSE SCORE</text>
      <line x1="160" y1="520" x2="640" y2="520"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.25"/>
      <line x1="160" y1="560" x2="520" y2="560"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.18"/>
      <line x1="160" y1="600" x2="580" y2="600"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.12"/>
      <line x1="160" y1="640" x2="440" y2="640"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.08"/>
      <text x="160" y="510" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" letterSpacing="3">
        PERFORMANCE INDEX
      </text>
    </svg>
  );
}

/* ── Inline SVG: AI & Business Automation (service 5) ── */
function AiVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#080808"/>
      <circle cx="400" cy="340" r="5" fill="#B8956A"/>
      <circle cx="180" cy="200" r="3" fill="#B8956A" opacity="0.5"/>
      <circle cx="620" cy="200" r="3" fill="#B8956A" opacity="0.5"/>
      <circle cx="120" cy="420" r="3" fill="#B8956A" opacity="0.4"/>
      <circle cx="680" cy="420" r="3" fill="#B8956A" opacity="0.4"/>
      <circle cx="260" cy="560" r="3" fill="#B8956A" opacity="0.35"/>
      <circle cx="540" cy="560" r="3" fill="#B8956A" opacity="0.35"/>
      <circle cx="400" cy="640" r="3" fill="#B8956A" opacity="0.3"/>
      <line x1="400" y1="340" x2="180" y2="200"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.35"/>
      <line x1="400" y1="340" x2="620" y2="200"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.35"/>
      <line x1="400" y1="340" x2="120" y2="420"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.25"/>
      <line x1="400" y1="340" x2="680" y2="420"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.25"/>
      <line x1="400" y1="340" x2="260" y2="560"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <line x1="400" y1="340" x2="540" y2="560"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <line x1="400" y1="340" x2="400" y2="640"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.15"/>
      <text x="400" y="740" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">NEURAL ARCHITECTURE</text>
    </svg>
  );
}

/* SVG services: 4 (SEO) and 5 (AI) */
function isSvgService(serviceId: number): boolean {
  return serviceId === 4 || serviceId === 5;
}

/* Title color: services 1, 3, 5 → cream; services 2, 4 → gold */
function getTitleColor(serviceId: number): string {
  return serviceId % 2 === 0 ? '#B8956A' : '#F5F0E8';
}

/* ── START A PROJECT LINK with hover expansion ── */
function StartProjectLink() {
  const [hovered, setHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  return (
    <Link
      href="/start-a-project"
      onMouseEnter={() => { setHovered(true); setCursor('link'); }}
      onMouseLeave={() => { setHovered(false); resetCursor(); }}
      style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        color: '#B8956A',
        letterSpacing: hovered ? '0.26em' : '0.18em',
        textDecoration: 'none',
        textTransform: 'uppercase',
        transition: 'letter-spacing 0.3s ease',
        cursor: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      START A PROJECT →
    </Link>
  );
}

export default function ServicesClient() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.main
      className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      {/* ── 1. HERO SECTION ── */}
      <section
        className="relative w-full border-b border-[rgba(245,240,232,0.08)] overflow-hidden"
        style={{
          height: '100vh',
        }}
      >
        <FluidParticlesBackground className="absolute inset-0 z-0" />
        
        {/* All text content positioned over the background */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: '#6B6560',
                fontWeight: 300,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> WHAT WE DO
            </span>

            {/* Title */}
            <AnimatedText
              splitBy="word"
              as="h1"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 500,
                fontSize: 'clamp(60px, 9vw, 130px)',
                color: '#F5F0E8',
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                margin: 0,
                marginBottom: '16px',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              Services
            </AnimatedText>

            {/* Tagline */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: '#B8956A',
                fontWeight: 300,
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              DESIGN · DEVELOP · DELIVER
            </span>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '14px',
                color: '#6B6560',
                fontWeight: 300,
                maxWidth: '480px',
                margin: '12px auto 0',
                lineHeight: '1.6',
              }}
            >
              End-to-end design and development services for ambitious brands.
              From brand identity to AI-powered automation.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute flex flex-col items-center gap-4 z-20 select-none left-1/2 -translate-x-1/2"
          style={{ bottom: '48px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              height: '40px',
              width: '0.5px',
              background: '#B8956A',
            }}
          />
        </div>
      </section>

      {/* ── 2. SERVICE MODULES ── */}
      <section className="relative z-10 px-6 md:px-20 lg:px-40 pb-0">
        <div className="max-w-[1800px] mx-auto">
          {services.map((service, i) => {
            const isOdd = i % 2 !== 0;
            const hasSvg = isSvgService(service.id);
            const titleColor = getTitleColor(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  minHeight: '100vh',
                  alignItems: 'center',
                  borderTop: i > 0 ? '0.5px solid rgba(245,240,232,0.06)' : 'none',
                }}
              >
                {/* Responsive grid: stacks on mobile, side-by-side on lg */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-2"
                  style={{ minHeight: '100vh' }}
                >
                  {/* ── IMAGE COLUMN ── */}
                  <div
                    className={`relative overflow-hidden ${isOdd ? 'lg:order-2' : ''}`}
                    style={{ minHeight: '400px' }}
                  >
                    {hasSvg ? (
                      <div className="absolute inset-0">
                        {service.id === 4 ? <SeoVisual /> : <AiVisual />}
                      </div>
                    ) : (
                      <ParallaxImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-80"
                        speed={0.05}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />

                    {/* Service number label */}
                    <div className="absolute top-12 left-12 flex flex-col gap-2">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '8px',
                          color: '#B8956A',
                          opacity: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.4em',
                        }}
                      >
                        {service.number}
                      </span>
                      <div style={{ width: '32px', height: '1px', background: '#B8956A', opacity: 0.2 }} />
                    </div>
                  </div>

                  {/* ── TEXT COLUMN ── */}
                  <div
                    className={`flex flex-col justify-center ${isOdd ? 'lg:order-1' : ''}`}
                    style={{
                      padding: service.id === 4 
                        ? 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 64px) clamp(60px, 8vw, 80px)' 
                        : 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
                    }}
                  >
                    {/* Title */}
                    {(() => {
                      const title = service.title;
                      let uprightPart = title;
                      let italicPart = "";
                      if (title.includes(" & ")) {
                        const parts = title.split(" & ");
                        uprightPart = parts[0] + " &";
                        italicPart = parts[1];
                      }
                      
                      return (
                        <h2
                          className="m-0 mb-8"
                          style={{
                            fontSize: 'clamp(40px, 5vw, 80px)',
                            color: titleColor,
                            lineHeight: 0.95,
                          }}
                        >
                          <span className="upright block">{uprightPart}</span>
                          {italicPart && <span className="italic block mt-1">{italicPart}</span>}
                        </h2>
                      );
                    })()}

                    {/* Body paragraphs — no dividers, just whitespace */}
                    <div className="flex flex-col">
                      {service.description.map((para, j) => (
                        <p
                          key={j}
                          style={{
                            fontFamily: 'var(--font-body), sans-serif',
                            fontSize: '15px',
                            fontWeight: 300,
                            color: '#BDB8B3',
                            lineHeight: 1.8,
                            maxWidth: '520px',
                            margin: 0,
                            marginBottom: j < service.description.length - 1 ? '20px' : '0',
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Feature Tags Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px 0',
                        marginTop: '40px',
                        borderTop: '0.5px solid rgba(245,240,232,0.06)',
                        paddingTop: '32px',
                      }}
                    >
                      {service.deliverables.slice(0, 6).map((d) => (
                        <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '9px',
                              color: '#BDB8B3',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {d}
                          </span>
                          <div style={{ width: '28px', height: '1px', background: '#B8956A', opacity: 0.5 }} />
                        </div>
                      ))}
                    </div>

                    {/* Pricing Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '32px',
                        borderTop: '0.5px solid rgba(245,240,232,0.08)',
                        paddingTop: '24px',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '9px',
                            color: '#6B6560',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            display: 'block',
                          }}
                        >
                          STARTING FROM
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display), serif',
                            fontWeight: 300,
                            fontStyle: 'italic',
                            fontSize: 'clamp(40px, 4vw, 56px)',
                            color: '#F5F0E8',
                            letterSpacing: '-0.01em',
                            margin: 0,
                            lineHeight: 1,
                          }}
                        >
                          {service.startingFrom}
                        </span>
                      </div>

                      <StartProjectLink />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 3. "AMBITION IS THE CURRENCY" SECTION ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '80px clamp(24px, 8vw, 120px)',
          backgroundColor: '#0E0E0E',
        }}
      >
        <div
          style={{
            lineHeight: 0.95,
            margin: 0,
            marginBottom: '24px',
          }}
        >
          <h2 className="m-0 text-center" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>
            <span className="upright text-[#F5F0E8] block">Ambition Is</span>
            <span className="block mt-2">
              <span className="upright text-[#6B6560] mr-4">The</span>
              <span className="italic text-[#B8956A]">Currency.</span>
            </span>
          </h2>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '16px',
            color: '#6B6560',
            fontWeight: 300,
            fontStyle: 'italic',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Standard menus are for standard work. We price on the scale of your ambition, the complexity of the challenge, and the impact of the outcome.
        </p>

        {/* CTA Link */}
        <div style={{ marginTop: '40px' }}>
          <StartProjectLink />
        </div>

        {/* FIVE DISCIPLINES watermark — pinned to bottom */}
        <span
          className="select-none"
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(80px, 10vw, 140px)',
            letterSpacing: '0.35em',
            color: '#F5F0E8',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: -1,
            whiteSpace: 'nowrap',
          }}
        >
          FIVE DISCIPLINES
        </span>
      </section>
    </motion.main>
  );
}
