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
import EditorialPageHero from '@/components/layout/EditorialPageHero';

/* ==========================================================
   SERVICES PAGE — Final polish pass
   ========================================================== */



/* Title color: services 1, 3, 5 → cream; services 2, 4 → gold */
function getTitleColor(serviceId: number): string {
  return serviceId % 2 === 0 ? '#2C3480' : '#F5F0E8';
}

/* ── START A PROJECT LINK with hover expansion ── */
function StartProjectLink() {
  const [hovered, setHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  return (
    <Link
      href="/contact"
      onMouseEnter={() => { setHovered(true); setCursor('link'); }}
      onMouseLeave={() => { setHovered(false); resetCursor(); }}
      style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        color: '#2C3480',
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
      className="relative bg-[#0A0A0A] text-white selection:bg-[#2C3480]/30"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      {/* ── 1. HERO SECTION ── */}
      <EditorialPageHero
        eyebrow="OUR DISCIPLINES"
        title="Disciplines built to accelerate "
        italicWord="growth."
        description="End-to-end web design, brand systems & AI-driven digital products."
        backgroundImage="/images/services%20page%20hero.png"
      />

      {/* ── 2. SERVICE MODULES ── */}
      <section className="relative z-10 px-6 md:px-20 lg:px-40 pb-0">
        <div className="max-w-[1800px] mx-auto">
          {services.map((service, i) => {
            const isOdd = i % 2 !== 0;
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
                      <ParallaxImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-80"
                        speed={0.05}
                      />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />

                    {/* Service number label */}
                    <div className="absolute top-12 left-12 flex flex-col gap-2">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '8px',
                          color: '#2C3480',
                          opacity: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.4em',
                        }}
                      >
                        {service.number}
                      </span>
                      <div style={{ width: '32px', height: '1px', background: '#2C3480', opacity: 0.2 }} />
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
                          <div style={{ width: '28px', height: '1px', background: '#2C3480', opacity: 0.5 }} />
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
                            fontFamily: "var(--font-citadel), 'Citadel Script', cursive", fontWeight: 400, fontStyle: 'normal', fontSize: 'clamp(44px, 4.5vw, 60px)',
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
          <h2
            className="m-0 text-center"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontSize: 'clamp(40px, 5vw, 80px)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            <span className="upright text-[#F5F0E8] block">Ambition Is</span>
            <span className="block mt-2">
              <span className="upright text-[#6B6560] mr-4">The</span>
              <span className="text-[#3049E8]">Currency.</span>
            </span>
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
            fontSize: '15px',
            color: '#B8BEC9',
            fontWeight: 400,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          Standard menus are for standard work. We price on the scale of your ambition, the complexity of the challenge, and the impact of the outcome.
        </p>

        {/* CTA Link */}
        <div style={{ marginTop: '40px' }}>
          <StartProjectLink />
        </div>

        {/* SIX DISCIPLINES watermark — pinned to bottom */}
        <span
          className="select-none"
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif", fontWeight: 700, fontSize: 'clamp(80px, 10vw, 140px)',
            letterSpacing: '0.35em',
            color: '#F5F0E8',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: -1,
            whiteSpace: 'nowrap',
          }}
        >
          SIX DISCIPLINES
        </span>
      </section>
    </motion.main>
  );
}
