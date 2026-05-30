'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';

/* ==========================================================
   PROCESS PAGE — Completely Redesigned
   ========================================================== */

/* ── Inline SVG: Phase 01 — Discover ── */
function DiscoverVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0A0A0A"/>
      <circle cx="400" cy="420" r="280" fill="none"
              stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="400" cy="420" r="180" fill="none"
              stroke="#B8956A" strokeWidth="0.5" opacity="0.15"/>
      <circle cx="400" cy="420" r="80" fill="none"
              stroke="#B8956A" strokeWidth="0.5" opacity="0.1"/>
      <circle cx="400" cy="420" r="6"
              fill="#B8956A" opacity="0.8"/>
      <line x1="400" y1="140" x2="400" y2="700"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.1"/>
      <line x1="120" y1="420" x2="680" y2="420"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.1"/>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">DISCOVERY PHASE</text>
    </svg>
  );
}

/* ── Inline SVG: Phase 02 — Strategise ── */
function StrategiseVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0A0A0A"/>
      <line x1="160" y1="200" x2="640" y2="200"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.3"/>
      <line x1="160" y1="300" x2="640" y2="300"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.25"/>
      <line x1="160" y1="400" x2="640" y2="400"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <line x1="160" y1="500" x2="640" y2="500"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.15"/>
      <line x1="160" y1="600" x2="640" y2="600"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.1"/>
      <rect x="160" y="240" width="120" height="120"
            fill="none" stroke="#B8956A" strokeWidth="0.5"
            opacity="0.4"/>
      <rect x="340" y="320" width="160" height="100"
            fill="none" stroke="#B8956A" strokeWidth="0.5"
            opacity="0.3"/>
      <rect x="240" y="440" width="200" height="80"
            fill="none" stroke="#B8956A" strokeWidth="0.5"
            opacity="0.25"/>
      <line x1="220" y1="300" x2="340" y2="370"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <line x1="500" y1="370" x2="440" y2="440"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">STRATEGY PHASE</text>
    </svg>
  );
}

/* ── Inline SVG: Phase 03 — Design ── */
function DesignVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0A0A0A"/>
      <polygon points="400,160 600,400 400,640 200,400"
               fill="none" stroke="#B8956A"
               strokeWidth="0.5" opacity="0.3"/>
      <polygon points="400,220 560,400 400,580 240,400"
               fill="none" stroke="#B8956A"
               strokeWidth="0.5" opacity="0.2"/>
      <polygon points="400,280 520,400 400,520 280,400"
               fill="none" stroke="#B8956A"
               strokeWidth="0.5" opacity="0.15"/>
      <circle cx="400" cy="400" r="8"
              fill="#B8956A" opacity="0.6"/>
      <circle cx="400" cy="400" r="40"
              fill="none" stroke="#B8956A"
              strokeWidth="0.5" opacity="0.15"/>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">DESIGN PHASE</text>
    </svg>
  );
}

/* ── Inline SVG: Phase 04 — Build & Launch ── */
function BuildVisual() {
  return (
    <svg viewBox="0 0 800 900" width="100%" height="100%"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="900" fill="#0A0A0A"/>
      <text x="400" y="400" fontFamily="Cormorant Garamond, serif"
            fontSize="200" fontStyle="italic" fontWeight="300"
            fill="#B8956A" opacity="0.08" textAnchor="middle">95</text>
      <text x="400" y="460" fontFamily="DM Mono, monospace"
            fontSize="10" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">LIGHTHOUSE SCORE</text>
      <line x1="200" y1="520" x2="600" y2="520"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.2"/>
      <line x1="200" y1="555" x2="520" y2="555"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.15"/>
      <line x1="200" y1="590" x2="560" y2="590"
            stroke="#B8956A" strokeWidth="0.5" opacity="0.1"/>
      <text x="400" y="780" fontFamily="DM Mono, monospace"
            fontSize="9" fill="#6B6560" textAnchor="middle"
            letterSpacing="4">BUILD & LAUNCH PHASE</text>
    </svg>
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
            [ HOW WE WORK ]
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
            Process
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
                    className={`relative overflow-hidden ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}
                    style={{ minHeight: '400px' }}
                  >
                    <div className="absolute inset-0">
                      {phase.id === 1 && <DiscoverVisual />}
                      {phase.id === 2 && <StrategiseVisual />}
                      {phase.id === 3 && <DesignVisual />}
                      {phase.id === 4 && <BuildVisual />}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-60" />
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
                        fontFamily: 'var(--font-mono), monospace',
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
                        fontWeight: 300,
                        fontStyle: 'italic',
                        fontSize: 'clamp(48px, 5.5vw, 72px)',
                        color: titleColor,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        marginBottom: '8px',
                        textTransform: 'none',
                      }}
                    >
                      {phase.title}
                    </h2>

                    {/* Pull Quote */}
                    <div
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontStyle: 'italic',
                        fontSize: '18px',
                        color: '#6B6560',
                        borderLeft: '2px solid #B8956A',
                        paddingLeft: '20px',
                        margin: '20px 0 28px',
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
                        color: '#9A9590',
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
                              color: '#9A9590',
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
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '48px',
              textTransform: 'uppercase',
            }}
          >
            [ COMMON QUESTIONS ]
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 5vw, 64px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Questions.
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
                    color: '#9A9590',
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
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#6B6560',
            letterSpacing: '0.2em',
            display: 'block',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          [ READY TO START ]
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
          Start the protocol.
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
