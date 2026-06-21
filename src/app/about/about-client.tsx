'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';
import Image from 'next/image';
import GradientBars from '@/components/ui/gradient-bars-background';
import AnimatedText from '@/components/ui/AnimatedText';

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
            letterSpacing="4">EST. 2026 — GLOBAL REACH</text>
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
        <GradientBars numBars={11} animationDuration={3} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
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
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> WHO WE ARE
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
              textTransform: 'none',
              userSelect: 'none',
            }}
          >
            About
          </AnimatedText>

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
            INDIA · GLOBAL · EST. 2026
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
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left"
            style={{
              padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
            }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px',
                color: '#6B6560',
                letterSpacing: '0.3em',
                display: 'block',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> THE STUDIO
            </span>

            {/* Title */}
            <h2
              className="m-0 mb-8"
              style={{
                color: '#F5F0E8',
                lineHeight: 0.95,
              }}
            >
              <span className="upright block" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Architecting</span>
              <span className="italic block mt-1" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Undeniable</span>
              <span className="upright block mt-1" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Authority.</span>
            </h2>

            {/* Body Paragraphs */}
            <div className="flex flex-col gap-6">
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#BDB8B3',
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
                  color: '#BDB8B3',
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
                  color: '#BDB8B3',
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
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto" style={{ minHeight: '300px' }}>
            <Image
              src="/images/retro-terminal.webp"
              alt="Retro Terminal"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACQAQCdASoHAAoABUB8JQAAVVwYf0AA/tH2T7mb0f3k4yCe52YsQQsf5C9TOtJ5sIEvntg8AAA="
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* ================================================
         SECTION 3: THE FOUNDER
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
          backgroundColor: '#0A0A0A',
        }}
      >
        {/* Section Label */}
        <div
          style={{
            padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
            paddingBottom: '0',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.3em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> THE FOUNDER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '80vh' }}>
          {/* LEFT COLUMN: Founder Photo */}
          <div className="relative overflow-hidden" style={{ minHeight: '500px' }}>
            <Image
              src="/founder.png"
              alt="Deepak Paragi — Founder & Lead Engineer, DEEPCIPHER Studio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              quality={100}
            />
            {/* Gradient overlays for editorial feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/40 hidden lg:block" />
            
            {/* Name overlay on image */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
              style={{ zIndex: 2 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#B8956A',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                FOUNDER & LEAD ENGINEER
              </span>
              <h2
                className="m-0"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#F5F0E8',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Deepak Paragi
              </h2>
            </div>
          </div>

          {/* RIGHT COLUMN: Bio & Details */}
          <div
            className="flex flex-col justify-center"
            style={{
              padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
            }}
          >
            {/* Role Title */}
            <div style={{ marginBottom: '32px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#6B6560',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                // SYSTEM ARCHITECT
              </span>
              <h3
                className="m-0"
                style={{
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: '#F5F0E8',
                  lineHeight: 1.05,
                }}
              >
                <span className="upright block">AI &amp; Full Stack</span>
                <span className="italic block mt-1" style={{ color: '#B8956A' }}>Developer</span>
              </h3>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5" style={{ marginBottom: '40px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#BDB8B3',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  margin: 0,
                }}
              >
                Deepak operates at the precise intersection of <span style={{ color: '#F5F0E8' }}>Artificial Intelligence</span> and <span style={{ color: '#F5F0E8' }}>Production-Grade Engineering</span>. He doesn&apos;t just build models — he architects the ecosystems that allow them to live, breathe, and act autonomously.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#BDB8B3',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  margin: 0,
                }}
              >
                His engineering philosophy is rooted in materiality and precision — whether orchestrating complex RAG pipelines, designing agentic workflows with zero-latency execution, or crafting motion-driven interfaces that prioritize kinetic feedback and editorial typographic scales.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#6B6560',
                  lineHeight: 1.7,
                  maxWidth: '500px',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;The next generation of digital experiences won&apos;t just be smart — they will be sentient-like, proactive, and perfectly integrated into our physical reality.&rdquo;
              </p>
            </div>

            {/* Specialization Cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-px"
              style={{
                backgroundColor: 'rgba(245,240,232,0.06)',
              }}
            >
              {[
                { title: 'Agentic Workflows', desc: 'Autonomous LLM behaviors for complex, multi-step tasks' },
                { title: 'Distributed Systems', desc: 'Resilient backends bridging AI inference & production stability' },
                { title: 'Tactile Interfaces', desc: 'Motion-driven frontends with kinetic feedback & editorial scales' },
              ].map((spec) => (
                <div
                  key={spec.title}
                  style={{
                    backgroundColor: '#0A0A0A',
                    padding: '24px 20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      color: '#B8956A',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {spec.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '12px',
                      fontWeight: 300,
                      color: '#6B6560',
                      lineHeight: 1.5,
                    }}
                  >
                    {spec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.3em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> HOW WE THINK
          </span>

          <h2
            className="m-0 upright"
            style={{
              fontSize: 'clamp(40px, 5vw, 80px)',
              color: '#F5F0E8',
              lineHeight: 0.95,
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
              {(() => {
                const title = pr.title;
                let first = "";
                let second = "";
                let isFirstItalic = false;
                if (title === "Business Over Decoration") {
                  first = "Business Over";
                  second = "Decoration";
                } else if (title === "Intentional Pixels") {
                  first = "Intentional";
                  second = "Pixels";
                  isFirstItalic = true;
                } else if (title === "Craft Obsession") {
                  first = "Craft";
                  second = "Obsession";
                }
                
                return (
                  <h3
                    className="m-0 mb-4"
                    style={{
                      fontSize: '28px',
                      color: '#F5F0E8',
                      lineHeight: 1.05,
                    }}
                  >
                    <span className={isFirstItalic ? "italic text-[#B8956A] block" : "upright block"}>{first}</span>
                    <span className={isFirstItalic ? "upright block mt-1" : "italic text-[#B8956A] block mt-1"}>{second}</span>
                  </h3>
                );
              })()}

              {/* Body */}
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#BDB8B3',
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
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.3em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> STUDIO HISTORY
          </span>

          <h2
            className="m-0 upright"
            style={{
              fontSize: 'clamp(40px, 5vw, 80px)',
              color: '#F5F0E8',
              lineHeight: 0.95,
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
                      color: '#BDB8B3',
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
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.3em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> WHAT WE USE
          </span>

          <h2
            className="m-0 upright"
            style={{
              fontSize: 'clamp(40px, 5vw, 80px)',
              color: '#F5F0E8',
              lineHeight: 0.95,
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
                        color: '#BDB8B3',
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
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            color: '#6B6560',
            letterSpacing: '0.3em',
            display: 'block',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> START HERE
        </span>

        <h2
          className="m-0 upright text-center"
          style={{
            fontSize: 'clamp(40px, 5vw, 80px)',
            color: '#F5F0E8',
            lineHeight: 0.95,
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
