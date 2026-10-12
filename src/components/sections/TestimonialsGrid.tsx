'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Reviews Showcase
   Continuous Sliding Marquee with Big Luxury Cards & Generous Whitespace
   Features:
   - Big, spacious cards (380px to 620px width)
   - Generous breathing room across section and card interiors
   - Infinite linear motion with hover/tap pause
   - Luxury rounded-3xl borders, top accent hairline, and rich typography
   ========================================================== */

interface ClientReview {
  id: string;
  number: string;
  client: string;
  initials: string;
  category: string;
  location: string;
  year: string;
  quote: string;
  scopeTag: string;
  slug: string;
}

const clientReviews: ClientReview[] = [
  {
    id: 'shingri-developers',
    number: '01',
    client: 'Shingri Developers',
    initials: 'SD',
    category: 'Luxury Real Estate',
    location: 'Hubli, India',
    year: '2026',
    quote:
      'DEEPCIPHER architected an immersive digital experience that genuinely captures the luxury of our properties. Client enquiries increased dramatically in the first month.',
    scopeTag: '3D Property Navigator',
    slug: 'shingri-developers',
  },
  {
    id: 'gadag-info',
    number: '02',
    client: 'Gadag Info Community',
    initials: 'GI',
    category: 'Regional Media',
    location: 'Gadag, India',
    year: '2026',
    quote:
      'They gave our 120k community a real digital home. It streamlined brand partnerships and established our authority across the region.',
    scopeTag: '120K+ Creator Platform',
    slug: 'gadag-info',
  },
  {
    id: 'khans-fitness',
    number: '03',
    client: "Khan's Fitness",
    initials: 'KF',
    category: 'Performance Athletic',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'The platform delivers the same high-performance intensity as our physical gym. It completely transformed our member onboarding and digital presence.',
    scopeTag: 'AI Fitness Lab',
    slug: 'khans-fitness',
  },
  {
    id: 'bipin-chikkatti',
    number: '04',
    client: 'Bipin Chikkatti Institutions',
    initials: 'BC',
    category: 'Higher Education',
    location: 'Gadag, India',
    year: '2024',
    quote:
      'A digital presence carrying the dignity and heritage of our institutions. Clean, reliable, and praised by parents and faculty alike.',
    scopeTag: 'Heritage Campus Platform',
    slug: 'bipin-chikkatti-institutions',
  },
  {
    id: 'brown-sugar',
    number: '05',
    client: 'Brown Sugar Fusion Cafe',
    initials: 'BS',
    category: 'Luxury Hospitality',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'Jaw-dropping 3D visual design with seamless mobile ordering. Table reservations and digital visits jumped over four times in our opening week.',
    scopeTag: 'Cinematic 3D WebGL',
    slug: 'brown-sugar-fusion-cafe',
  },
  {
    id: 'cinepulse-ai',
    number: '06',
    client: 'CinePulse AI Network',
    initials: 'CP',
    category: 'Machine Learning',
    location: 'Global Platform',
    year: '2026',
    quote:
      'Real-time sentiment telemetry delivered with world-class polish. The platform feels like a Bloomberg terminal merged with contemporary editorial craft.',
    scopeTag: 'Cognitive NLP Telemetry',
    slug: 'cinepulse-ai',
  },
];

export default function TestimonialsGrid() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate cards for a seamless infinite loop
  const duplicatedReviews = [...clientReviews, ...clientReviews];

  const handleCardClick = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes testimonials-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .testimonials-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: testimonials-slide 32s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused !important;
        }
        @media (max-width: 768px) {
          .testimonials-track {
            animation-duration: 25s;
          }
        }
      `}</style>

      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-[#0A0A0A] text-[#F5F0E8]"
        style={{
          paddingTop: 'clamp(80px, 9vw, 130px)',
          paddingBottom: 'clamp(90px, 10vw, 140px)',
          borderTop: '0.5px solid rgba(245, 240, 232, 0.08)',
        }}
      >
        {/* Subtle ambient lighting */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            width: '900px',
            height: '650px',
            background: 'radial-gradient(ellipse at center, rgba(69, 101, 255, 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          aria-hidden="true"
        />

        {/* Section Header with Generous Whitespace */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-14 sm:mb-18 md:mb-20">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4565FF] inline-block animate-pulse shrink-0" />
            <span
              className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-[#9E9891]"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              CLIENT RESULTS // TESTIMONIALS
            </span>
          </div>

          {/* Heading */}
          <h2
            className="m-0 upright"
            style={{
              fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 5.5vw, 78px)',
              color: '#F5F0E8',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="block">What Our</span>
            <span className="block font-citadel italic mt-2 sm:mt-2.5 font-normal">
              <span style={{ color: '#4565FF' }}>Clients</span>{' '}
              <span style={{ color: '#F5F0E8' }}>Say.</span>
            </span>
          </h2>

          {/* Subtitle with Spacious Line-Height */}
          <p
            className="m-0 mt-6 sm:mt-7 max-w-2xl text-[15px] sm:text-[16.5px] text-[#A6A099] font-light leading-[1.75]"
            style={{ fontFamily: 'var(--font-body), sans-serif' }}
          >
            Understated, genuine partnerships with founders and institutions who value obsessive craft and measurable digital authority.
          </p>
        </div>

        {/* Continuous Sliding Cards Container */}
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Edge Vignette */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 md:w-60 lg:w-80 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Right Gradient Edge Vignette */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 md:w-60 lg:w-80 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Marquee Infinite Sliding Track */}
          <div
            className="testimonials-track flex items-stretch py-6"
            style={{
              gap: '24px',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedReviews.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={handleCardClick}
                className="group relative flex flex-col justify-between shrink-0 transition-all duration-300 cursor-pointer"
                style={{
                  width: 'clamp(340px, 28vw, 420px)',
                  minHeight: '270px',
                  padding: '28px 30px 24px 30px',
                  borderRadius: '20px',
                  background: 'linear-gradient(170deg, rgba(22, 24, 30, 0.92) 0%, rgba(12, 13, 17, 0.98) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  boxShadow: '0 20px 48px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Subtle top hover highlight hairline */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #4565FF, transparent)',
                  }}
                />

                {/* Inner flex column */}
                <div className="flex flex-col flex-1 justify-between" style={{ minHeight: '100%' }}>
                  {/* Top Meta: Number + Category + 5 Stars */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      paddingBottom: '14px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                      marginBottom: '18px',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '11px',
                          color: '#4565FF',
                          letterSpacing: '0.14em',
                          fontWeight: 700,
                        }}
                      >
                        {item.number}
                      </span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '11px' }}>/</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '10px',
                          color: '#9E9891',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* 5-star rating */}
                    <div
                      className="flex items-center gap-1"
                      style={{ color: '#F5C042' }}
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Quote */}
                  <blockquote
                    className="m-0"
                    style={{
                      fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                      fontSize: '14.5px',
                      lineHeight: 1.65,
                      color: 'rgba(245, 240, 232, 0.9)',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      marginBottom: '20px',
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Card Footer: Client Identity + Scope Tag + Case Study Link */}
                  <div
                    className="flex items-center justify-between gap-3"
                    style={{
                      paddingTop: '15px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    }}
                  >
                    <div className="flex flex-col min-w-0 flex-1 pr-2">
                      <span
                        className="truncate group-hover:text-white transition-colors"
                        style={{
                          fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: '#F5F0E8',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.client}
                      </span>
                      <span
                        className="truncate"
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '11px',
                          color: '#8E8882',
                          marginTop: '2px',
                        }}
                      >
                        {item.location} · {item.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="hidden sm:inline-block"
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono), monospace',
                          color: '#9E9891',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '4px 9px',
                          borderRadius: '999px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {item.scopeTag}
                      </span>
                      <Link
                        href={`/work/${item.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 transition-all duration-300"
                        style={{
                          fontSize: '10.5px',
                          fontFamily: 'var(--font-mono), monospace',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#F5F0E8',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '5px 11px',
                          borderRadius: '999px',
                        }}
                      >
                        <span>Case</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
