'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';
import Image from 'next/image';

/* ==========================================================
   ABOUT PAGE — Completely Redesigned
   ========================================================== */

/* ── Inline SVG: Section 2 — Studio Manifesto ── */
function ManifestoVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0A0A0A"/>
      <text x="400" y="420" fontFamily="Cormorant Garamond, serif"
            fontSize="280" fontStyle="italic" fontWeight="300"
            fill="#B8956A" opacity="0.06" textAnchor="middle">
        DC
      </text>
      <circle cx="400" cy="380" r="300" fill="none"
              stroke="#B8956A" strokeWidth="0.5" opacity="0.08"/>
      <circle cx="400" cy="380" r="200" fill="none"
              stroke="#B8956A" strokeWidth="0.5" opacity="0.06"/>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">EST. 2024 — GLOBAL REACH</text>
    </svg>
  );
}

/* ── Inline SVG: Section 3 — Founder Portrait Placeholder ── */
function FounderVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#111111"/>
      <rect x="200" y="120" width="400" height="500"
            fill="none" stroke="#B8956A"
            strokeWidth="0.5" opacity="0.15"/>
      <rect x="220" y="140" width="360" height="460"
            fill="none" stroke="#B8956A"
            strokeWidth="0.5" opacity="0.1"/>
      <text x="400" y="390" fontFamily="Cormorant Garamond, serif"
            fontSize="72" fontStyle="italic" fontWeight="300"
            fill="#B8956A" opacity="0.12" textAnchor="middle">DP</text>
      <text x="400" y="440" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="3">DEEPAK PARAGI</text>
      <text x="400" y="460" fontFamily="DM Mono, monospace"
            fontSize="8" fill="#6B6560" textAnchor="middle"
            letterSpacing="2">FOUNDER</text>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">NMIT BENGALURU — 2025</text>
    </svg>
  );
}

const techStack = [
  'Next.js',
  'TypeScript',
  'React',
  'FastAPI',
  'Python',
  'GSAP',
  'Framer Motion',
  'Three.js',
  'TensorFlow',
  'Agentic AI',
];

const principles = [
  {
    number: '01',
    title: 'Business Over Decoration',
    body: 'Design is a business strategy — not decoration. We build sites that function as your most powerful digital asset, engineered to drive growth and establish authority in your market.',
  },
  {
    number: '02',
    title: 'Intentional Pixels',
    body: 'Every pixel, every interaction, every word must justify its existence. We strip away the unnecessary until nothing stands between your brand and the attention it deserves.',
  },
  {
    number: '03',
    title: 'Craft Obsession',
    body: 'Great work comes from obsessive attention to craft. We pore over typography scales, micro-interactions, and performance metrics — because excellence lives in the margins.',
  },
];

const timeline = [
  {
    year: '2024',
    category: 'ORIGIN',
    event: 'DEEPCIPHER Studio Founded',
    detail: "Identified the gap between traditional web development and high-end, agency-grade digital craft.",
  },
  {
    year: '2024',
    category: 'COMMUNITY',
    event: 'Open Source Portfolio Published',
    detail: 'deepakparagi.github.io — documenting the full technical stack and design process publicly.',
  },
  {
    year: '2025',
    category: 'AI / ML',
    event: 'ML Sentiment Platform Built',
    detail: 'CinePulse — a real-time movie sentiment analysis platform built with DistilBERT, FastAPI, and React.',
  },
  {
    year: '2025',
    category: 'RESEARCH',
    event: 'IEEE Paper Submitted',
    detail: 'LSTM-based residential energy consumption prediction — co-authored and submitted for academic publication.',
  },
  {
    year: '2025',
    category: 'DEVELOPMENT',
    event: 'First AI Product Shipped',
    detail: 'Flux — Smart Energy Intelligence dashboard with ensemble ML models and automated PDF reporting.',
  },
  {
    year: '2026',
    category: 'EXPANSION',
    event: 'Studio Scaling',
    detail: "Scaling DEEPCIPHER's client base across India, the US, Japan, and other global markets.",
  },
];

const capabilities = [
  {
    title: 'WEB DEVELOPMENT',
    items: [
      'Next.js 15, React, TypeScript',
      'Node.js, FastAPI, Python',
      'PostgreSQL, MongoDB',
      'Prisma, REST APIs',
    ],
  },
  {
    title: 'AI & MACHINE LEARNING',
    items: [
      'TensorFlow, Keras',
      'LSTM, Random Forest',
      'OpenRouter, LLMs',
      'DistilBERT, Scikit-learn',
    ],
  },
  {
    title: 'DESIGN & MOTION',
    items: [
      'Figma, Design Systems',
      'GSAP, ScrollTrigger',
      'Framer Motion',
      'Three.js, WebGL',
    ],
  },
  {
    title: 'BRAND & STRATEGY',
    items: [
      'Brand Identity',
      'Visual Direction',
      'Market Positioning',
      'Content Architecture',
    ],
  },
];

export default function AboutClient() {
  const { setCursor, resetCursor } = useCursor();

  // CTA button hover states
  const [ctaHovered, setCtaHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  return (
    <motion.main
      className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      {/* ================================================
         SECTION 1: HERO
         ================================================ */}
      <section
        className="relative w-full border-b border-[rgba(245,240,232,0.08)] px-6 overflow-hidden"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Label */}
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#6B6560',
              fontWeight: 300,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            [ WHO WE ARE ]
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(96px, 12vw, 160px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
              marginBottom: '16px',
              textTransform: 'none',
              userSelect: 'none',
            }}
          >
            About
          </h1>

          {/* Subline */}
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
            INDIA · GLOBAL · EST. 2024
          </span>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              color: '#6B6560',
              fontWeight: 300,
              maxWidth: '520px',
              margin: '12px auto 0',
              lineHeight: '1.6',
            }}
          >
            A specialized digital craft studio built on surgical precision, architectural aesthetics, and the integration of AI into the modern web.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute flex flex-col items-center gap-4 z-20 select-none"
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

      {/* ================================================
         SECTION 2: STUDIO MANIFESTO
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          minHeight: '80vh',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '80vh' }}>
          {/* LEFT COLUMN: Content */}
          <div
            className="flex flex-col justify-center"
            style={{
              padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
            }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#6B6560',
                letterSpacing: '0.2em',
                display: 'block',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}
            >
              [ THE STUDIO ]
            </span>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(48px, 5vw, 64px)',
                color: '#F5F0E8',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: '32px',
              }}
            >
              Architecting Undeniable Authority.
            </h2>

            {/* Body Paragraphs */}
            <div className="flex flex-col gap-6">
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                DEEPCIPHER is a premium web design and brand identity studio based in India, operating globally. We work with ambitious businesses across India, the US, Japan, and beyond who understand that their digital presence is their most powerful business asset.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                We don't build websites. We architect digital authority. Every project is approached with the same obsessive attention to craft — from typography scales and micro-interactions to performance metrics and conversion architecture.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                Our clients range from regional enterprises and healthcare brands to fitness platforms and AI companies across India, the US, Japan, and three continents.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual */}
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto" style={{ minHeight: '400px' }}>
            <Image
              src="/images/retro-terminal.jpg"
              alt="Retro Terminal"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* ================================================
         SECTION 3: FOUNDER
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          minHeight: '80vh',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '80vh' }}>
          {/* LEFT COLUMN: Content */}
          <div
            className="flex flex-col justify-center lg:order-1"
            style={{
              padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
            }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#6B6560',
                letterSpacing: '0.2em',
                display: 'block',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}
            >
              [ FOUNDER ]
            </span>

            {/* Name */}
            <h2
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 4.5vw, 60px)',
                color: '#B8956A',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: '8px',
              }}
            >
              Deepak Paragi.
            </h2>

            {/* Role */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#6B6560',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: '32px',
                textTransform: 'uppercase',
              }}
            >
              FOUNDER & CREATIVE DIRECTOR
            </span>

            {/* Body */}
            <div className="flex flex-col gap-6">
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                A final-year AI & ML engineering student at NMIT Bengaluru, and the founder of DEEPCIPHER. Deepak combines a rigorous technical background in machine learning and full-stack development with an obsessive eye for cinematic, editorial design.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                Deepak founded DEEPCIPHER after identifying a clear gap in the market — the absence of agency-grade web design for ambitious local and international businesses. Every project is personally overseen from strategy through to launch.
              </p>
            </div>

            {/* Tech Stack Grid — Clean 5 columns on desktop, 2 columns on mobile */}
            <div
              className="grid grid-cols-2 sm:grid-cols-5"
              style={{
                gap: '24px 20px',
                marginTop: '40px',
                borderTop: '0.5px solid rgba(245,240,232,0.06)',
                paddingTop: '32px',
              }}
            >
              {techStack.map((tech) => (
                <div key={tech} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '9px',
                      color: '#9A9590',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tech}
                  </span>
                  {/* Underline */}
                  <div style={{ width: '20px', height: '1px', background: '#B8956A' }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Visual */}
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:order-2" style={{ minHeight: '400px' }}>
            <Image
              src="/images/Deepak.jpg"
              alt="Deepak Paragi"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* ================================================
         SECTION 4: THREE PRINCIPLES
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            [ HOW WE THINK ]
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 4.5vw, 56px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Operational Principles.
          </h2>
        </div>

        {/* 3-column Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: '2px',
            backgroundColor: 'rgba(245,240,232,0.06)', // creates fine editorial line borders in gap
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {principles.map((pr) => (
            <div
              key={pr.number}
              style={{
                border: '0.5px solid rgba(245,240,232,0.06)',
                padding: '48px 40px',
                backgroundColor: '#0A0A0A', // wraps card content with solid dark bg
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  color: '#B8956A',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                {pr.number}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: '28px',
                  color: '#F5F0E8',
                  margin: 0,
                  marginBottom: '16px',
                }}
              >
                {pr.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#9A9590',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                {pr.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================
         SECTION 5: TIMELINE
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            [ STUDIO HISTORY ]
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 4.5vw, 56px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '64px',
            }}
          >
            How we got here.
          </h2>

          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 sm:gap-12"
                style={{
                  alignItems: 'flex-start',
                  borderTop: '0.5px solid rgba(245,240,232,0.06)',
                  padding: '32px 0',
                }}
              >
                {/* Year */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    color: '#B8956A',
                    letterSpacing: '0.15em',
                    minWidth: '60px',
                  }}
                >
                  {item.year}
                </span>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Category */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '9px',
                      color: '#6B6560',
                      letterSpacing: '0.12em',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Event Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      color: '#F5F0E8',
                      margin: 0,
                      marginBottom: '4px',
                    }}
                  >
                    {item.event}
                  </h3>

                  {/* Detail */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#9A9590',
                      margin: 0,
                      lineHeight: '1.6',
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
         SECTION 6: CAPABILITIES
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            [ WHAT WE USE ]
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 4.5vw, 56px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '64px',
            }}
          >
            Capabilities.
          </h2>

          {/* 4-column Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{
              gap: '2px',
              backgroundColor: 'rgba(245,240,232,0.06)',
            }}
          >
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                style={{
                  border: '0.5px solid rgba(245,240,232,0.06)',
                  padding: '40px 32px',
                  backgroundColor: '#0A0A0A',
                }}
              >
                {/* Column Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    color: '#B8956A',
                    letterSpacing: '0.15em',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                  }}
                >
                  {cap.title}
                </h3>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cap.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '13px',
                        fontWeight: 300,
                        color: '#9A9590',
                        lineHeight: '2.0',
                        display: 'block',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
         SECTION 7: CLOSING CTA
         ================================================ */}
      <section
        style={{
          width: '100%',
          textAlign: 'center',
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          backgroundColor: '#0A0A0A',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#6B6560',
            letterSpacing: '0.2em',
            display: 'block',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          [ START HERE ]
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 7vw, 96px)',
            color: '#F5F0E8',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Work with us.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '15px',
            fontWeight: 300,
            color: '#6B6560',
            maxWidth: '480px',
            margin: '20px auto 40px',
            lineHeight: '1.8',
          }}
        >
          We take on a limited number of projects each quarter to ensure every client receives our full obsessive attention. If you're building something that deserves to look world-class, let's talk.
        </p>

        {/* Buttons container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {/* Button 1 */}
          <Link
            href="/start-a-project"
            onMouseEnter={() => {
              setCursor('link');
              setCtaHovered(true);
            }}
            onMouseLeave={() => {
              resetCursor();
              setCtaHovered(false);
            }}
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.15em',
              padding: '16px 36px',
              border: '1px solid #B8956A',
              backgroundColor: ctaHovered ? '#B8956A' : 'transparent',
              color: ctaHovered ? '#0A0A0A' : '#B8956A',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'none',
            }}
          >
            Start a Project →
          </Link>

          {/* Button 2 */}
          <a
            href="mailto:deepcipherstudio@gmail.com"
            onMouseEnter={() => {
              setCursor('link');
              setEmailHovered(true);
            }}
            onMouseLeave={() => {
              resetCursor();
              setEmailHovered(false);
            }}
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.15em',
              padding: '16px 0',
              backgroundColor: 'transparent',
              border: 'none',
              color: emailHovered ? '#B8956A' : '#6B6560',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              cursor: 'none',
            }}
          >
            DEEPCIPHERSTUDIO@GMAIL.COM
          </a>
        </div>
      </section>
    </motion.main>
  );
}
