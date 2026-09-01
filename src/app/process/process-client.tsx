'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';
import ShaderAnimation from '@/components/ui/spiral-shader';
import AnimatedText from '@/components/ui/AnimatedText';
import Image from 'next/image';

/* ==========================================================
   PROCESS PAGE — Completely Redesigned
   ========================================================== */

/* ==========================================================
   MINIMAL ARTISTIC PROCESS VISUALS (Phase 01 - 04)
   Precision vector geometry, subtle gold accents, 120Hz smooth
   ========================================================== */

/* ── Phase 01: Discover — Optical Aperture & Coordinate Lens ── */
function DiscoverVisual() {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center bg-[#070707] overflow-hidden p-8 border border-white/[0.04]">
      {/* Subtle radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(184,149,106,0.06) 0%, transparent 65%)',
        }}
      />
      {/* Grid cross lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        {/* Outer Orbit Ring with dashed styling */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-dashed border-[#B8956A]/20"
        />

        {/* Secondary Precision Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-14 rounded-full border border-[#B8956A]/30"
          style={{
            borderTopColor: '#B8956A',
            borderRightColor: 'transparent',
          }}
        />

        {/* Inner Coordinate Ring */}
        <div className="absolute inset-28 rounded-full border border-white/10 flex items-center justify-center">
          <div className="w-full h-px bg-white/[0.06] absolute" />
          <div className="h-full w-px bg-white/[0.06] absolute" />
        </div>

        {/* Center Golden Core */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-[#B8956A]/10 border border-[#B8956A]/60 shadow-[0_0_30px_rgba(184,149,106,0.3)]"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5F0E8]" />
        </motion.div>

        {/* Minimal Corner Labels */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-[#B8956A]/50 tracking-[0.25em]">
          SYS // 01.DISCOVERY
        </div>
        <div className="absolute top-2 right-2 font-mono text-[9px] text-white/30 tracking-[0.2em]">
          INTAKE PROTOCOL
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/30 tracking-[0.2em]">
          SCOPE: AUDIENCE &amp; MARKET
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#B8956A]/60 tracking-[0.2em]">
          STATUS: ALIGNED
        </div>
      </div>
    </div>
  );
}

/* ── Phase 02: Strategise — Architectural Blueprint & Logic Node ── */
function StrategiseVisual() {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center bg-[#070707] overflow-hidden p-8 border border-white/[0.04]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(184,149,106,0.05) 0%, transparent 70%)',
        }}
      />
      {/* Blueprint Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,149,106,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,149,106,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative w-full max-w-[420px] h-[320px] flex flex-col justify-between">
        {/* Header telemetry */}
        <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#B8956A]">
            ARCHITECTURAL_MATRIX // 02
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/40">
            SITEMAP_HIERARCHY
          </span>
        </div>

        {/* Blueprint Layout Schema */}
        <div className="relative flex-1 my-4 flex items-center justify-center">
          {/* Main Frame Box */}
          <div className="w-full h-full border border-white/10 relative p-4 flex flex-col justify-between">
            {/* Top Node Row */}
            <div className="flex justify-between items-center">
              <div className="px-3 py-1.5 border border-[#B8956A]/40 bg-[#0A0A0A] font-mono text-[9px] text-[#F5F0E8] tracking-widest">
                [ 01_HERO_EXP ]
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#B8956A]/40 via-white/10 to-[#B8956A]/40 mx-3" />
              <div className="px-3 py-1.5 border border-white/15 bg-[#0A0A0A] font-mono text-[9px] text-white/60 tracking-widest">
                [ 02_STORY_FLOW ]
              </div>
            </div>

            {/* Central Conversion Core Node */}
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute inset-x-0 h-px bg-white/[0.06]" />
              <motion.div
                animate={{ borderColor: ['rgba(184,149,106,0.3)', 'rgba(184,149,106,0.8)', 'rgba(184,149,106,0.3)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 px-5 py-2.5 bg-[#0D0D0D] border border-[#B8956A]/60 flex items-center gap-2.5 shadow-[0_0_20px_rgba(184,149,106,0.15)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#B8956A] animate-pulse" />
                <span className="font-mono text-[10px] text-[#F5F0E8] tracking-[0.2em]">
                  CONVERSION_ENGINE
                </span>
              </motion.div>
            </div>

            {/* Bottom Node Row */}
            <div className="flex justify-between items-center">
              <div className="px-3 py-1.5 border border-white/15 bg-[#0A0A0A] font-mono text-[9px] text-white/60 tracking-widest">
                [ 03_PROOF_METRICS ]
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-[#B8956A]/40 to-white/10 mx-3" />
              <div className="px-3 py-1.5 border border-[#B8956A]/40 bg-[#0A0A0A] font-mono text-[9px] text-[#F5F0E8] tracking-widest">
                [ 04_TRANSMISSION ]
              </div>
            </div>
          </div>
        </div>

        {/* Footer telemetry */}
        <div className="flex justify-between items-center border-t border-white/[0.06] pt-3">
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">
            PAGE_DEPTH: 5_TIERS
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#B8956A]/70">
            UX_LOGIC: OPTIMAL
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Phase 03: Design — Golden Ratio & Haute Typography Geometry ── */
function DesignVisual() {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center bg-[#070707] overflow-hidden p-8 border border-white/[0.04]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(184,149,106,0.07) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        {/* Nested Golden Diamonds */}
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 border border-white/[0.08] transform rotate-45"
        />

        <motion.div
          animate={{ rotate: [360, 270, 180, 90, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-16 border border-[#B8956A]/30 transform rotate-12"
        />

        <div className="absolute inset-28 border border-[#B8956A]/50 transform rotate-45 flex items-center justify-center bg-[#B8956A]/[0.02]">
          {/* Inner golden jewel / typography accent */}
          <div className="transform -rotate-45 text-center flex flex-col items-center gap-1">
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '32px',
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1,
              }}
            >
              Φ
            </span>
            <span className="font-mono text-[8px] text-[#B8956A] tracking-[0.3em]">
              1.618_RATIO
            </span>
          </div>
        </div>

        {/* Minimal Corner Accents */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-[#B8956A]/60 tracking-[0.2em]">
          FIDELITY: ULTRA_HIGH
        </div>
        <div className="absolute top-2 right-2 font-mono text-[9px] text-white/30 tracking-[0.2em]">
          DESKTOP + MOBILE
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/30 tracking-[0.2em]">
          BESPOKE_INTERACTIONS
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#B8956A]/60 tracking-[0.2em]">
          2_REVISION_LOOPS
        </div>
      </div>
    </div>
  );
}

/* ── Phase 04: Build & Launch — Monolithic Velocity & Precision Telemetry ── */
function BuildVisual() {
  return (
    <div className="relative w-full h-full min-h-[440px] flex items-center justify-center bg-[#070707] overflow-hidden p-8 border border-white/[0.04]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(184,149,106,0.08) 0%, transparent 65%)',
        }}
      />
      {/* Telemetry vertical scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px]" />

      <div className="relative w-full max-w-[420px] flex flex-col justify-between h-[320px]">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4BB543] shadow-[0_0_8px_#4BB543]" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#F5F0E8]">
              RUNTIME // PRODUCTION_READY
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#B8956A]">
            120HZ_CERTIFIED
          </span>
        </div>

        {/* Center Metric Display */}
        <div className="my-auto flex flex-col items-center justify-center py-4">
          <div className="relative flex items-baseline justify-center gap-2">
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '84px',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1,
              }}
            >
              99
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '32px',
                color: '#B8956A',
              }}
            >
              /100
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#B8956A] tracking-[0.3em] uppercase mt-1">
            LIGHTHOUSE_PERFORMANCE_INDEX
          </span>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3">
          <div className="flex flex-col border-r border-white/[0.06] pr-2">
            <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">LATENCY</span>
            <span className="font-mono text-[11px] text-[#F5F0E8] font-medium">&lt; 15ms</span>
          </div>
          <div className="flex flex-col border-r border-white/[0.06] px-2">
            <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">FRAME_PACING</span>
            <span className="font-mono text-[11px] text-[#B8956A] font-medium">120 FPS</span>
          </div>
          <div className="flex flex-col pl-2">
            <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">SEO_INDEX</span>
            <span className="font-mono text-[11px] text-[#F5F0E8] font-medium">100 / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const phases = [
  {
    id: 1,
    number: '01 / 04',
    title: 'Discover',
    quote: 'Before we design a pixel, we understand your business.',
    body: 'We spend the first phase becoming experts in your world. We study your competitors, your audience, your existing presence — and most importantly, what your website needs to actually do for your business.',
    deliverables: [
      'Brand & business discovery',
      'Competitor website intelligence',
      'Target audience profiling',
      'Content architecture inventory',
      'Goal & conversion mapping',
    ],
  },
  {
    id: 2,
    number: '02 / 04',
    title: 'Strategise',
    quote: 'We define the blueprint before we touch Figma.',
    body: 'We map every page, every user journey, and every conversion point before a single design is drawn. This phase ends with your full sign-off on direction, structure, and visual strategy.',
    deliverables: [
      'Sitemap & page structure',
      'User journey logic mapping',
      'Conversion goal prioritising',
      'Content structure per page',
      'Visual direction moodboard',
    ],
  },
  {
    id: 3,
    number: '03 / 04',
    title: 'Design',
    quote: 'This is where your brand takes visual form.',
    body: 'We design desktop and mobile simultaneously — never as an afterthought. Every decision has a rationale. We include two rounds of high-fidelity revisions and present the work in context, not isolation.',
    deliverables: [
      'Homepage architecture',
      'Inner page high-fidelity design',
      'Component & interaction design',
      'Cinematic brand integration',
      'Client refinement loop',
    ],
  },
  {
    id: 4,
    number: '04 / 04',
    title: 'Build & Launch',
    quote: 'We build it fast. We launch it right.',
    body: 'We build to a Lighthouse score of 95+. We test across all device sizes. We launch with you present, ensuring every performance metric is met before handoff.',
    deliverables: [
      'Development in Next.js or Framer',
      'CMS & dynamic content setup',
      'Motion & interaction implementation',
      'Performance optimisation (95+ Lighthouse)',
      'Launch & 30-day monitoring',
    ],
  },
];

const faqs = [
  {
    id: 1,
    q: 'How long does a typical project take?',
    a: 'Most projects take 6–10 weeks from kickoff to launch. We agree on a timeline before we start and we hold to it.',
  },
  {
    id: 2,
    q: 'What is your pricing structure?',
    a: 'We price on a project basis, not hourly. After an initial discovery call, we send a clear proposal with a fixed price and timeline. No surprises.',
  },
  {
    id: 3,
    q: 'Do you work with clients globally?',
    a: 'Yes. We work with clients across India, the US, Japan, and internationally — across Europe, North America, and Asia-Pacific — using async video updates and scheduled live calls.',
  },
  {
    id: 4,
    q: 'What platforms do you build on?',
    a: 'We build primarily on Next.js for custom-coded sites and Framer for design-led sites that need fast iteration. We recommend the right tool for your specific goals.',
  },
];

export default function ProcessClient() {
  const { setCursor, resetCursor } = useCursor();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Button hover states
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
        <ShaderAnimation />
        
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
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> HOW WE WORK
          </span>

          {/* Title */}
          <AnimatedText
            splitBy="word"
            as="h1"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 500,
              fontStyle: 'normal',
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
            Process
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
            DISCOVER · STRATEGISE · DESIGN · BUILD
          </span>

          {/* Body */}
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
            Four surgical phases. Zero guesswork. A documented lifecycle engineered to move your brand from concept to category leader.
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
         SECTION 2: FOUR PHASES
         ================================================ */}
      <section className="relative z-10 px-6 md:px-20 lg:px-40 pb-0">
        <div className="max-w-[1800px] mx-auto">
          {phases.map((phase, i) => {
            const isOdd = i % 2 !== 0;
            const titleColor = phase.id % 2 === 0 ? '#B8956A' : '#F5F0E8';

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  minHeight: '80vh',
                  alignItems: 'center',
                  borderTop: '0.5px solid rgba(245,240,232,0.06)',
                }}
              >
                {/* Responsive grid: stacks on mobile, side-by-side on lg */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-2"
                  style={{ minHeight: '80vh' }}
                >
                  {/* ── VISUAL COLUMN ── */}
                  <div
                    className={`relative overflow-hidden flex items-center justify-center ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}
                    style={{ minHeight: '440px' }}
                  >
                    <div className="w-full h-full">
                      {phase.id === 1 && <DiscoverVisual />}
                      {phase.id === 2 && <StrategiseVisual />}
                      {phase.id === 3 && <DesignVisual />}
                      {phase.id === 4 && <BuildVisual />}
                    </div>
                  </div>

                  {/* ── TEXT COLUMN ── */}
                  <div
                    className={`flex flex-col justify-center ${isOdd ? 'lg:order-2 lg:pl-16 lg:pr-12' : 'lg:order-1 lg:pr-16 lg:pl-12'}`}
                    style={{
                      padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
                    }}
                  >
                    {/* Phase number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {phase.number}
                    </span>

                    {/* Phase title */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontSize: 'clamp(40px, 5vw, 80px)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        marginBottom: '8px',
                      }}
                    >
                      {phase.title === "Discover" && (
                        <span className="italic text-[#B8956A]">Discover</span>
                      )}
                      {phase.title === "Strategise" && (
                        <span className="upright text-[#F5F0E8]">Strategise</span>
                      )}
                      {phase.title === "Design" && (
                        <span className="italic text-[#B8956A]">Design</span>
                      )}
                      {phase.title === "Build & Launch" && (
                        <>
                          <span className="upright text-[#F5F0E8]">Build & </span>
                          <span className="italic text-[#B8956A]">Launch</span>
                        </>
                      )}
                    </h2>

                    {/* Pull Quote */}
                    <div
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '20px',
                        color: '#8A8A8A',
                        borderLeft: '2px solid #B8956A',
                        paddingLeft: '20px',
                        margin: '20px 0 28px',
                        lineHeight: '1.4',
                      }}
                    >
                      “{phase.quote}”
                    </div>

                    {/* Body paragraph */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#BDB8B3',
                        lineHeight: 1.8,
                        maxWidth: '480px',
                        margin: 0,
                        marginBottom: '32px',
                      }}
                    >
                      {phase.body}
                    </p>

                    {/* Deliverables list */}
                    <div
                      style={{
                        borderTop: '0.5px solid rgba(245,240,232,0.06)',
                        paddingTop: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      {phase.deliverables.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                        >
                          {/* Gold dot */}
                          <div
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              backgroundColor: '#B8956A',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-body), sans-serif',
                              fontSize: '13px',
                              fontWeight: 300,
                              color: '#BDB8B3',
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================================================
         SECTION 3: FAQ
         ================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          width: '100%',
          backgroundColor: '#0A0A0A',
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)',
          borderTop: '0.5px solid rgba(245,240,232,0.06)',
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
            <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> COMMON QUESTIONS
          </span>

          <h2
            className="m-0"
            style={{
              lineHeight: 0.95,
            }}
          >
            <span className="upright text-[#F5F0E8]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Common </span>
            <span className="italic text-[#B8956A]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Questions.</span>
          </h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderTop: '0.5px solid rgba(245,240,232,0.08)',
                  padding: '24px 0',
                }}
              >
                <div
                  onClick={() => {
                    setOpenFaq(isOpen ? null : faq.id);
                  }}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '15px',
                    color: '#F5F0E8',
                    fontWeight: 400,
                    cursor: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    userSelect: 'none',
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '20px',
                      color: '#B8956A',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#BDB8B3',
                    lineHeight: 1.8,
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, padding 0.3s ease',
                    paddingTop: isOpen ? '16px' : '0px',
                  }}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================
         SECTION 4: CLOSING CTA
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
          <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> READY TO START
        </span>

        <h2
          className="m-0 text-center"
          style={{
            lineHeight: 0.95,
            marginBottom: '24px',
          }}
        >
          <span className="upright text-[#F5F0E8]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Start the </span>
          <span className="italic text-[#B8956A]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>protocol.</span>
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
          Every project begins with a single conversation. Tell us what you're building and we'll tell you exactly how we'd approach it.
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
          {/* Button 1 — Primary */}
          <Link
            href="/contact"
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
            Launch Project Protocol →
          </Link>

          {/* Button 2 — Ghost */}
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
