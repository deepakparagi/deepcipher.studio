'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';

/* ========================================
   Case Study Data
   ======================================== */

interface CaseStudy {
  slug: string;
  number: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  resultMetric: string;
  image: string;
  techStack: string[];
  liveUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'shingri-developers',
    number: '01',
    title: 'SHINGRI DEVELOPERS',
    client: 'Shingri Developers',
    category: 'LUXURY REAL ESTATE',
    year: '2026',
    description:
      'A state-of-the-art real estate platform that evokes luxury, trust, and architectural excellence through a minimal yet high-impact digital presence.',
    challenge:
      'Implementing complex, high-performance animations (60fps) alongside large media assets without compromising mobile load times or SEO readability.',
    solution:
      'Engineered a custom motion framework using Framer Motion and GSAP, optimized through aggressive code-splitting and asset lazy-loading with zero-layout-shift architecture.',
    result: 'A benchmark in luxury real estate digital presence with premium fluid motion across all viewports.',
    resultMetric: '60fps',
    image: '/Project cards images/Shingri_developers.png',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    liveUrl: 'https://shingri-developers.vercel.app/',
  },
  {
    slug: 'gadag-info',
    number: '02',
    title: 'GADAG INFO',
    client: 'Gadag District',
    category: 'DIGITAL HERITAGE',
    year: '2026',
    description:
      'A premium editorial platform celebrating Gadag\'s rich cultural heritage through cinematic animations, bilingual localization, and 4K visual storytelling.',
    challenge:
      'Handling seamless switching between English and Kannada scripts while maintaining perfect typographic alignment and 60fps scroll performance.',
    solution:
      'Developed a CSS-driven localization engine eliminating JS-state lag, with a custom horizontal scroll engine using Lenis for a physical gallery walk-through experience.',
    result: '115K+ follower digital hub serving the entire Gadag district community.',
    resultMetric: '115K+',
    image: '/Project cards images/gadag_info.png',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    liveUrl: 'https://gadag.vercel.app/',
  },
  {
    slug: 'cinepulse-ai',
    number: '03',
    title: 'CINEPULSE AI',
    client: 'CinePulse AI Intelligence Network',
    category: 'ARTIFICIAL INTELLIGENCE',
    year: '2026',
    description:
      'A production-grade sentiment analysis platform for the cinematic industry, providing deep emotional insights into movie reviews with explainable AI metrics.',
    challenge:
      'Ensuring AI-generated plans followed strict scientific methodology while handling real-time API latency and maintaining a responsive UI.',
    solution:
      'Integrated a custom Prompt Engineering layer to sanitize model outputs, with an optimistic UI update strategy and background processing for zero-wait interaction.',
    result: 'Real-time cinematic intelligence with 92.4% validation accuracy.',
    resultMetric: '92.4%',
    image: '/Project cards images/Sentiment movie analysis.png',
    techStack: ['React', 'Flask', 'Scikit-learn', 'TF-IDF', 'SQLite'],
    liveUrl: 'https://cinepulse-ai-sentiment-analysis.vercel.app/',
  },
];

/* ========================================
   Case Study Card — Full-width editorial
   ======================================== */

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { setCursor, resetCursor } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const imgX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 100, damping: 20 });
  const imgY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 100, damping: 20 });
  const imgScale = useSpring(isHovered ? 1.04 : 1, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('hover', 'VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
        resetCursor();
      }}
      style={{
        borderTop: '0.5px solid rgba(245,240,232,0.08)',
        padding: 'clamp(40px, 5vw, 80px) 0',
      }}
    >
      <Link href={`/work/${study.slug}`} className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
          {/* Image */}
          <div
            className={`relative overflow-hidden ${isReversed ? 'lg:[direction:ltr]' : ''}`}
            style={{
              aspectRatio: '16/10',
              backgroundColor: '#111',
            }}
          >
            <motion.div
              style={{
                x: imgX,
                y: imgY,
                scale: imgScale,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={study.image}
                alt={study.title}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
              />
            </motion.div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
              }}
            />

            {/* Number badge */}
            <div
              className="absolute top-0 left-0 flex items-center gap-2"
              style={{ padding: '20px 24px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '32px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#B8956A',
                  lineHeight: 1,
                }}
              >
                {study.number}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '8px',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                / {study.category}
              </span>
            </div>

            {/* Result metric badge */}
            <div
              className="absolute bottom-0 right-0"
              style={{ padding: '20px 24px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '28px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#F5F0E8',
                  lineHeight: 1,
                }}
              >
                {study.resultMetric}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={`flex flex-col gap-6 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
            {/* Category & Year */}
            <div className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#B8956A',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {study.category}
              </span>
              <span
                style={{
                  width: '40px',
                  height: '0.5px',
                  backgroundColor: 'rgba(184,149,106,0.3)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: '#6B6560',
                  letterSpacing: '0.15em',
                }}
              >
                {study.year}
              </span>
            </div>

            {/* Title */}
            <h3
              className="m-0"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(28px, 3vw, 48px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {study.title}
            </h3>

            {/* Description */}
            <p
              className="m-0"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                color: '#BDB8B3',
                lineHeight: 1.8,
                maxWidth: '480px',
              }}
            >
              {study.description}
            </p>

            {/* Challenge & Solution */}
            <div className="flex flex-col gap-4" style={{ marginTop: '8px' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  // THE CHALLENGE
                </span>
                <p
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.7,
                    maxWidth: '420px',
                  }}
                >
                  {study.challenge}
                </p>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  // THE SOLUTION
                </span>
                <p
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.7,
                    maxWidth: '420px',
                  }}
                >
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2" style={{ marginTop: '8px' }}>
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.1em',
                    padding: '6px 12px',
                    border: '0.5px solid rgba(245,240,232,0.08)',
                    textTransform: 'uppercase',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Arrow */}
            <motion.div
              className="flex items-center gap-3"
              style={{ marginTop: '8px' }}
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  color: isHovered ? '#B8956A' : '#6B6560',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                VIEW CASE STUDY
              </span>
              <motion.span
                animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                style={{ color: '#B8956A', fontSize: '14px' }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ========================================
   Premium Case Studies Section
   ======================================== */

export default function PremiumCaseStudies() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Section Header */}
      <div className="relative z-10" style={{ marginBottom: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
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
              <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> FEATURED CASE STUDIES
            </span>

            <h2
              className="m-0"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 5vw, 80px)',
                lineHeight: 0.95,
                color: '#F5F0E8',
              }}
            >
              Engineered<br />
              <span style={{ color: '#B8956A' }}>Experiences.</span>
            </h2>
          </div>

          <p
            className="m-0"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#6B6560',
              maxWidth: '320px',
              lineHeight: 1.7,
              textAlign: 'right',
            }}
          >
            A selection of projects where complex engineering systems meet beautiful, conversion-driven interfaces.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="flex flex-col">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="flex justify-center"
          style={{
            marginTop: '60px',
            borderTop: '0.5px solid rgba(245,240,232,0.06)',
            paddingTop: '40px',
          }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#6B6560',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              padding: '16px 36px',
              border: '0.5px solid rgba(245,240,232,0.08)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#B8956A')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#6B6560')}
          >
            VIEW COMPLETE ARCHIVE →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
