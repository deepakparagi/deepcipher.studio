'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Reviews Showcase
   Continuous Sliding Marquee with Large Rounded Cards
   Features:
   - Infinite linear motion at comfortable reading pace
   - Automatic pause on hover (desktop) or click/tap (mobile/desktop)
   - Generous white space and luxury rounded-3xl borders
   - Left and right gradient fade masks
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
          animation: testimonials-slide 55s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-[#0A0A0A] text-[#F5F0E8]"
        style={{
          paddingTop: 'clamp(48px, 6vw, 84px)',
          paddingBottom: 'clamp(80px, 9vw, 130px)',
          borderTop: '0.5px solid rgba(245, 240, 232, 0.06)',
        }}
      >
        {/* Subtle ambient lighting */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            left: '30%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(69, 101, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          aria-hidden="true"
        />

        {/* Section Header with Proper Alignment & Clean Spacing */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4565FF] inline-block animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#8E8882]">
              CLIENT RESULTS // TESTIMONIALS
            </span>
          </div>

          {/* Heading */}
          <h2
            className="m-0 upright"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              color: '#F5F0E8',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="block">What Our</span>
            <span className="block font-citadel italic mt-1 sm:mt-1.5">
              <span style={{ color: '#4565FF' }}>Clients</span>{' '}
              <span style={{ color: '#F5F0E8' }}>Say.</span>
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="m-0 mt-5 sm:mt-6 max-w-2xl text-[14px] sm:text-[15.5px] text-[#A6A099] font-light leading-relaxed"
            style={{ fontFamily: 'var(--font-body), sans-serif' }}
          >
            Understated, genuine partnerships with founders and institutions who value obsessive craft and measurable digital authority.
          </p>
        </div>

        {/* Continuous Sliding Cards Container */}
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Edge Vignette */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Right Gradient Edge Vignette */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Marquee Infinite Sliding Track */}
          <div
            className="testimonials-track flex items-stretch gap-6 sm:gap-8 md:gap-10 py-6 px-4"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedReviews.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={handleCardClick}
                className="group relative flex flex-col justify-between w-[340px] sm:w-[440px] md:w-[480px] lg:w-[500px] shrink-0 rounded-[26px] sm:rounded-[30px] border border-white/[0.08] hover:border-white/[0.22] bg-[#0E0F12] hover:bg-[#121317] p-7 sm:p-9 md:p-10 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: '0 20px 48px -16px rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* Subtle top hover highlight hairline */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#4565FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Meta: Number + Category + 5 Stars */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '11px',
                          color: '#4565FF',
                          letterSpacing: '0.12em',
                          fontWeight: 600,
                        }}
                      >
                        {item.number}
                      </span>
                      <span className="text-white/[0.15]">/</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '10px',
                          color: '#8E8882',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* 5-star rating */}
                    <div className="flex items-center gap-1 text-[#D4AF37] opacity-85" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Quote with Generous Whitespace */}
                  <blockquote
                    className="m-0 text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#D8D2C7] font-light leading-[1.78] mb-8"
                    style={{ fontFamily: 'var(--font-body), sans-serif' }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Card Footer: Client Identity + Scope Tag + Case Study Link */}
                <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-[14px] sm:text-[15px] font-medium text-[#F5F0E8] truncate group-hover:text-white"
                      style={{ fontFamily: 'var(--font-body), sans-serif' }}
                    >
                      {item.client}
                    </span>
                    <span
                      className="text-[12px] text-[#7E7973] font-light truncate mt-0.5"
                      style={{ fontFamily: 'var(--font-body), sans-serif' }}
                    >
                      {item.location} · {item.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[10.5px] font-mono text-[#8E8882] bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full">
                      {item.scopeTag}
                    </span>
                    <Link
                      href={`/work/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] font-mono uppercase tracking-wider text-[#A6A099] hover:text-[#F5F0E8] bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] transition-all"
                    >
                      <span>Case</span>
                      <ArrowUpRight size={13} />
                    </Link>
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
