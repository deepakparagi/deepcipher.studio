'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';
import RevealLine from '@/components/ui/RevealLine';
import SectionLabel from '@/components/ui/SectionLabel';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCursor } from '@/components/ui/CursorProvider';

/* ========================================
   About Client Page — Premium Redesign
   Immersive storytelling with rich typography & imagery
   ======================================== */

const beliefs = [
  {
    title: 'Business > Decoration',
    text: 'Design is a business strategy — not decoration. We build sites that function as your most powerful digital asset, engineered to drive growth and establish authority.',
  },
  {
    title: 'Intentional Pixels',
    text: 'Every pixel, every interaction, every word should justify its existence. We strip away the unnecessary until nothing stands between your brand and your audience.',
  },
  {
    title: 'Craft Obsession',
    text: 'Great work comes from obsessive attention to craft. We pore over typography scales, micro-interactions, and performance metrics because excellence lives in the margins.',
  },
];

const teamMembers = [
  {
    name: 'Deepak Paragi',
    role: 'Developer & AI Builder',
    bio: 'Builds digital products that combine functionality with intent. Works across full-stack development and AI systems, with a focus on execution that actually delivers. Background in React, Node.js, and machine learning. Approaches every project with a bias toward clarity, performance, and real-world impact.',
    image: '/images/deepak-paragi-profile.png',
  },
];

const milestones = [
  { year: '2025', title: 'Studio Founded', category: 'Origin' },
  { year: '2025', title: 'First AI Product Shipped', category: 'Development' },
  { year: '2025', title: 'ML Sentiment Platform Built', category: 'AI / ML' },
  { year: '2024', title: 'Open Source Portfolio Published', category: 'Community' },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div ref={containerRef} className="bg-[var(--white)]">
      
      {/* ===== HERO — Typographic Editorial ===== */}
      <section className="relative w-full overflow-hidden px-6 md:px-10 lg:px-20 pt-40 pb-32 border-b border-[var(--border)]">
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col justify-end">
          <SectionLabel className="mb-6">{'[ 05 — STUDIO ]'}</SectionLabel>
          
          <h1 
            className="font-display italic font-light text-[var(--ink)] mb-8"
            style={{ fontSize: 'clamp(56px, 9vw, 140px)', lineHeight: 0.9, letterSpacing: '-0.02em', maxWidth: '1200px' }}
          >
            We build <br />
            digital <span className="text-[var(--accent-warm)]">authority.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-[var(--border)] pt-8 max-w-[1200px]">
            <p className="font-body font-light text-[16px] md:text-[18px] text-[var(--ink-secondary)] max-w-[480px] leading-relaxed">
              Deepcipher is a specialized design & development studio. We build premium websites and AI platforms that combine undeniable aesthetics with technical precision.
            </p>
            
            <div className="flex gap-12 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-ghost)] uppercase">
              <div className="flex flex-col gap-2">
                <span>Location</span>
                <span className="text-[var(--ink-secondary)]">India → Global</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>Focus</span>
                <span className="text-[var(--ink-secondary)]">Web Apps · Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ORIGIN STORY — Editorial Layout ===== */}
      <section className="relative px-6 md:px-10 lg:px-20 py-[var(--section-padding)] bg-[var(--white)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 max-w-[1600px] mx-auto items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-[120px]">
            <SectionLabel>{'[ OUR ORIGIN ]'}</SectionLabel>
            <div className="mt-8">
              <AnimatedText 
                splitBy="word" 
                className="font-display italic font-light text-[var(--ink)]"
              >
                {"Rejecting / the Sea / of Sameness."}
              </AnimatedText>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-10 md:gap-16 pt-2">
            {[
              "Most websites are entirely forgettable. They look like each other, they feel like each other, and they perform like each other. The web has become a sea of sameness built on mass-market templates.",
              "DEEPCIPHER was born from a simple observation: brands that do exceptional work are often trapped behind average digital experiences that fail to communicate their true value.",
              "We started this studio to fix that. We combine design craft with technical mastery — utilizing modern frameworks like Next.js and integrated AI — to ensure your website is your most powerful business asset, not just a digital brochure.",
              "We don't start with templates. We don't follow trends for the sake of it. We understand the business first, then design the solution. We design from intent."
            ].map((text, i) => (
              <RevealLine key={i} delay={i * 0.1}>
                <p 
                  className="font-body font-light text-[20px] md:text-[24px] lg:text-[28px] text-[var(--ink-secondary)] leading-[1.6]"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {i === 0 && <span className="text-[var(--accent-warm)] font-display text-[40px] italic mr-2 leading-[0.5] -ml-2">"</span>}
                  {text}
                  {i === 3 && <span className="text-[var(--accent-warm)] font-display text-[40px] italic ml-1 leading-[0.5]">"</span>}
                </p>
              </RevealLine>
            ))}
          </div>
          
        </div>
      </section>

      {/* ===== BELIEFS — Interactive List ===== */}
      <section className="bg-[var(--white)] py-[var(--section-padding)] border-t border-[var(--border)]">
        <div className="px-6 md:px-10 lg:px-20 max-w-[1600px] mx-auto">
          <SectionLabel className="mb-16 md:mb-24">{'[ OUR BELIEFS ]'}</SectionLabel>
          
          <div className="flex flex-col border-t border-[var(--border)]">
            {beliefs.map((belief, i) => (
              <div 
                key={i} 
                className="group border-b border-[var(--border)] py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 relative overflow-hidden"
              >
                {/* Hover Reveal Background */}
                <div className="absolute inset-0 bg-[var(--surface-subtle)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                
                <div className="md:col-span-4 relative z-10">
                  <span className="font-mono text-[10px] text-[var(--accent-warm)] tracking-[0.2em] block mb-4">
                    BELIEF 0{i + 1}
                  </span>
                  <h3 className="font-display italic font-light text-[var(--ink)] text-[32px] md:text-[40px] leading-none">
                    {belief.title}
                  </h3>
                </div>
                
                <div className="md:col-span-7 md:col-start-6 relative z-10 flex items-center">
                  <p className="font-body font-light text-[16px] md:text-[18px] text-[var(--ink-tertiary)] leading-relaxed max-w-[600px] group-hover:text-[var(--ink)] transition-colors duration-500">
                    {belief.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM — Visual Grid ===== */}
      <section className="px-6 md:px-10 lg:px-20 py-[var(--section-padding)] bg-[var(--surface-subtle)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--border)] pb-8 mb-16">
            <div>
              <SectionLabel className="mb-4">{'[ LEADERSHIP ]'}</SectionLabel>
              <h2 className="font-display italic font-light text-[var(--ink)] text-[clamp(40px,6vw,80px)] leading-none">
                The mind <br />behind the craft.
              </h2>
            </div>
            <p className="font-body font-light text-[15px] text-[var(--ink-tertiary)] max-w-[320px]">
              A multidisciplinary approach blending extreme design aesthetics with robust software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {teamMembers.map((member) => (
              <div key={member.name} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[3/4] w-full max-w-[600px] overflow-hidden group border border-[var(--border)]"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
                </motion.div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-warm)] uppercase mb-4">
                    {member.role}
                  </span>
                  <h3 className="font-display italic font-light text-[var(--ink)] text-[clamp(40px,5vw,64px)] leading-none mb-8">
                    {member.name}
                  </h3>
                  <p className="font-body font-light text-[17px] text-[var(--ink-secondary)] leading-[1.8] max-w-[500px]">
                    {member.bio}
                  </p>
                  
                  <div className="mt-12">
                    <MagneticButton variant="outline" cursorLabel="CONNECT" href="/contact">
                      <span className="px-8 py-3 block font-mono text-[10px] tracking-[0.15em] text-[var(--ink)]">
                        WORK WITH ME
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MILESTONES & CAPABILITIES ===== */}
      <section className="px-6 md:px-10 lg:px-20 py-[var(--section-padding)] bg-[var(--white)]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Milestones */}
          <div>
            <SectionLabel className="mb-12">{'[ MILESTONES ]'}</SectionLabel>
            <div className="flex flex-col border-t border-[var(--border)]">
              {milestones.map((m, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center py-6 border-b border-[var(--border)] group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[10px] text-[var(--ink-ghost)]">{m.year}</span>
                    <span className="font-display font-light text-[22px] text-[var(--ink)] group-hover:text-[var(--accent-warm)] transition-colors">{m.title}</span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-[var(--ink-tertiary)] uppercase hidden md:block">
                    {m.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <SectionLabel className="mb-12">{'[ EXPERTISE ]'}</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { title: 'Web Development', tools: 'Next.js, React, TypeScript' },
                { title: 'AI Integration', tools: 'OpenRouter, NLP, LLMs' },
                { title: 'Creative Coding', tools: 'GSAP, Framer Motion, Canvas' },
                { title: 'UI/UX Design', tools: 'Figma, Design Systems' },
              ].map((cap, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display italic text-[24px] text-[var(--ink)] mb-2">{cap.title}</span>
                  <span className="font-mono text-[10px] text-[var(--ink-ghost)] tracking-[0.1em] uppercase">{cap.tools}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-[var(--ink)] p-10 flex flex-col justify-between items-start min-h-[220px]">
              <h3 className="font-display italic font-light text-[var(--white)] text-[32px] leading-tight">
                Ready to build <br />something exceptional?
              </h3>
              <Link 
                href="/contact"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-warm)] uppercase hover:text-[var(--white)] transition-colors border-b border-[var(--accent-warm)]/30 pb-1"
              >
                Start a project →
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
