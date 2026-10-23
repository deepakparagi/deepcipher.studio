'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';
import ShaderAnimation from '@/components/ui/spiral-shader';
import AnimatedText from '@/components/ui/AnimatedText';
import ParallaxImage from '@/components/ui/ParallaxImage';
import EditorialPageHero from '@/components/layout/EditorialPageHero';

/* ==========================================================
   MINIMAL ARTISTIC PROCESS VISUALS (Phase 01 - 04)
   ========================================================== */

const phases = [
  {
    id: 1,
    number: '01 / 04',
    title: 'Discover',
    quote: 'Before we design a pixel, we understand your business.',
    body: 'We spend the first phase becoming experts in your world. We study your competitors, your audience, your existing presence — and most importantly, what your website needs to actually do for your business.',
    image: '/images/process-discover-3d.jpg',
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
    image: '/images/process-strategise-3d.jpg',
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
    image: '/images/process-design-3d.jpg',
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
    image: '/images/process-build-3d.jpg',
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
    a: 'Most projects take 2–4 weeks from kickoff to launch. We agree on a timeline before we start and we hold to it.',
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
      className="relative bg-[#0A0A0A] text-white selection:bg-[#2C3480]/30 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />

      {/* ── 1. HERO SECTION ── */}
      <EditorialPageHero
        eyebrow="OUR METHODOLOGY"
        title="A structured journey from concept to "
        italicWord="launch."
        description="Four disciplined phases. Zero wasted movement."
        backgroundImage="/images/process%20page%20hero.png"
      />

      {/* ================================================
         SECTION 2: FOUR PHASES
         ================================================ */}
      <section className="relative z-10 px-6 md:px-20 lg:px-40 pb-0">
        <div className="max-w-[1800px] mx-auto">
          {phases.map((phase, i) => {
            const isOdd = i % 2 !== 0;
            const titleColor = phase.id % 2 === 0 ? '#2C3480' : '#F5F0E8';

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
                    className={`relative overflow-hidden flex items-center justify-center min-h-[320px] lg:min-h-[440px] ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className="w-full h-full">
                      <ParallaxImage
                        src={phase.image}
                        alt={phase.title}
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-80"
                      />
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
                        fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif", fontWeight: 700, fontSize: 'clamp(40px, 5vw, 80px)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        marginBottom: '8px',
                      }}
                    >
                      {phase.title === "Discover" && (
                        <span className="italic text-[#2C3480]">Discover</span>
                      )}
                      {phase.title === "Strategise" && (
                        <span className="upright text-[#F5F0E8]">Strategise</span>
                      )}
                      {phase.title === "Design" && (
                        <span className="italic text-[#2C3480]">Design</span>
                      )}
                      {phase.title === "Build & Launch" && (
                        <>
                          <span className="upright text-[#F5F0E8]">Build & </span>
                          <span className="italic text-[#2C3480]">Launch</span>
                        </>
                      )}
                    </h2>

                    {/* Pull Quote */}
                    <div
                      style={{
                        fontFamily: "var(--font-citadel), 'Citadel Script', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '24px',
                        color: '#8A8A8A',
                        borderLeft: '2px solid #2C3480',
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
                              backgroundColor: '#2C3480',
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
            <span style={{ color: '#2C3480', marginRight: '4px' }}>—</span> COMMON QUESTIONS
          </span>

          <h2
            className="m-0"
            style={{
              lineHeight: 0.95,
            }}
          >
            <span className="upright text-[#F5F0E8]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Common </span>
            <span className="italic text-[#2C3480]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Questions.</span>
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
                      color: '#2C3480',
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
          <span style={{ color: '#2C3480', marginRight: '4px' }}>—</span> READY TO START
        </span>

        <h2
          className="m-0 text-center"
          style={{
            lineHeight: 0.95,
            marginBottom: '24px',
          }}
        >
          <span className="upright text-[#F5F0E8]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>Start the </span>
          <span className="italic text-[#2C3480]" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>protocol.</span>
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
              border: '1px solid #2C3480',
              backgroundColor: ctaHovered ? '#2C3480' : 'transparent',
              color: ctaHovered ? '#0A0A0A' : '#2C3480',
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
              color: emailHovered ? '#2C3480' : '#6B6560',
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
