'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Stories / Selected Results
   Editorial Minimal Luxury Grid & Card Architecture
   - Strict 3-part card layout: Header, Body (quote), Footer (attribution)
   - CSS Grid with exact responsive breakpoints
   - Flexbox with margin-top: auto for aligned footers in every row
   - Consistent typography, zero awkward overlaps, zero clipping
   ========================================================== */

export interface ClientReview {
  id: string;
  client: string;
  category: string;
  location: string;
  year: string;
  quote: string;
  slug: string;
}

export const clientReviews: ClientReview[] = [
  {
    id: 'shingri-developers',
    client: 'Shingri Developers',
    category: 'Luxury Real Estate',
    location: 'Hubli, India',
    year: '2026',
    quote:
      'DEEPCIPHER architected an immersive digital experience that genuinely captures the luxury of our properties. Client enquiries increased dramatically in the first month.',
    slug: 'shingri-developers',
  },
  {
    id: 'gadag-info',
    client: 'Gadag Info Community',
    category: 'Regional Media',
    location: 'Gadag, India',
    year: '2026',
    quote:
      'They gave our 120k community a real digital home. It streamlined brand partnerships and established our authority across the region.',
    slug: 'gadag-info',
  },
  {
    id: 'khans-fitness',
    client: "Khan's Fitness",
    category: 'Performance Athletic',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'The platform delivers the same high-performance intensity as our physical gym. It completely transformed our member onboarding and digital presence.',
    slug: 'khans-fitness',
  },
  {
    id: 'bipin-chikkatti',
    client: 'Bipin Chikkatti Institutions',
    category: 'Higher Education',
    location: 'Gadag, India',
    year: '2024',
    quote:
      'A digital presence carrying the dignity and heritage of our institutions. Clean, reliable, and praised by parents and faculty alike.',
    slug: 'bipin-chikkatti-institutions',
  },
  {
    id: 'brown-sugar',
    client: 'Brown Sugar Fusion Cafe',
    category: 'Luxury Hospitality',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'Jaw-dropping 3D visual design with seamless mobile ordering. Table reservations and digital visits jumped over four times in our opening week.',
    slug: 'brown-sugar-fusion-cafe',
  },
  {
    id: 'cinepulse-ai',
    client: 'CinePulse AI Network',
    category: 'Machine Learning',
    location: 'Global Platform',
    year: '2026',
    quote:
      'Real-time sentiment telemetry delivered with world-class polish. The platform feels like a Bloomberg terminal merged with contemporary editorial craft.',
    slug: 'cinepulse-ai',
  },
];

export default function TestimonialsGrid() {
  return (
    <>
      <style jsx global>{`
        /* ==================================================
           TESTIMONIALS SECTION — Responsive Layout & Breakpoints
           ================================================== */
        .testimonials-section {
          background-color: #0A0A0A;
          border-top: 1px solid rgba(245, 240, 232, 0.08);
          padding-top: 64px;
          padding-bottom: 64px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .testimonials-container {
          width: 100%;
          max-width: 1440px;
          margin-inline: auto;
        }

        .testimonials-header {
          margin-bottom: 28px;
        }

        /* Responsive Grid: Base (320px–479px) */
        .testimonials-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
        }

        /* Large mobile: 480px–767px */
        @media (min-width: 480px) {
          .testimonials-section {
            padding-top: 72px;
            padding-bottom: 72px;
            padding-left: 24px;
            padding-right: 24px;
          }
          .testimonials-header {
            margin-bottom: 32px;
          }
          .testimonials-grid {
            gap: 20px;
          }
        }

        /* Tablet: 768px–1023px */
        @media (min-width: 768px) {
          .testimonials-section {
            padding-top: 80px;
            padding-bottom: 80px;
            padding-left: 32px;
            padding-right: 32px;
          }
          .testimonials-header {
            margin-bottom: 36px;
          }
          .testimonials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
          }
        }

        /* Laptop / Small Desktop: 1024px–1279px */
        @media (min-width: 1024px) {
          .testimonials-section {
            padding-top: 96px;
            padding-bottom: 96px;
            padding-left: 32px;
            padding-right: 32px;
          }
          .testimonials-header {
            margin-bottom: 44px;
          }
          .testimonials-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
          }
        }

        /* Desktop: 1280px–1535px */
        @media (min-width: 1280px) {
          .testimonials-section {
            padding-left: 48px;
            padding-right: 48px;
          }
          .testimonials-header {
            margin-bottom: 48px;
          }
          .testimonials-grid {
            gap: 28px;
          }
        }

        /* Large Desktop: 1536px–1919px */
        @media (min-width: 1536px) {
          .testimonials-section {
            padding-left: 64px;
            padding-right: 64px;
          }
          .testimonials-grid {
            gap: 32px;
          }
        }

        /* Wide Desktop: 1920px and above */
        @media (min-width: 1920px) {
          .testimonials-container {
            width: min(100% - 128px, 1440px);
            margin-inline: auto;
          }
        }

        /* ==================================================
           TESTIMONIAL CARD — Three-Part Flex Structure
           ================================================== */
        .testimonial-card {
          background-color: #0C0D11;
          border: 1px solid rgba(245, 240, 232, 0.08);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }

        @media (min-width: 768px) {
          .testimonial-card {
            padding: 24px;
          }
        }

        @media (min-width: 1280px) {
          .testimonial-card {
            padding: 28px;
          }
        }

        .testimonial-card:hover {
          border-color: rgba(69, 101, 255, 0.35);
          background-color: #101117;
        }

        /* A. Card Header: Category & Rating */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(245, 240, 232, 0.07);
        }

        /* B. Card Body: Dedicated Quote Area */
        .card-body {
          flex: 1 1 auto;
          display: flex;
          align-items: flex-start;
          padding-top: 22px;
          padding-bottom: 22px;
        }

        .card-quote {
          font-family: var(--font-helvetica), 'Helvetica', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: #EDE8E1;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
        }

        @media (min-width: 1024px) {
          .card-quote {
            font-size: 15.5px;
          }
        }

        /* C. Card Footer: Client Info & Case Study Link */
        .card-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(245, 240, 232, 0.07);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>

      <section
        id="testimonials"
        className="testimonials-section relative w-full text-[#F5F0E8]"
        aria-labelledby="testimonials-heading"
      >
        <div className="testimonials-container">
          {/* Section Header */}
          <div className="testimonials-header max-w-[820px]">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#354BFF] inline-block shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#9E9891]">
                CLIENT STORIES / SELECTED RESULTS
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="testimonials-heading"
              className="m-0 text-[#F5F0E8] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              Trusted by teams building what’s next.
            </h2>

            {/* Supporting Text */}
            <p
              className="m-0 mt-4 max-w-[620px] text-[#A6A099] font-light"
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(14.5px, 1.2vw, 16px)',
                lineHeight: 1.65,
              }}
            >
              Thoughtful digital experiences built around real businesses, real people, and measurable outcomes.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="testimonials-grid w-full">
            {clientReviews.map((item) => (
              <article
                key={item.id}
                className="testimonial-card"
              >
                {/* A. Header: Category & Rating */}
                <div className="card-header">
                  <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#354BFF] font-medium">
                    {item.category}
                  </span>

                  {/* Subtle 5-Star Rating */}
                  <div
                    className="flex items-center gap-1 text-[#E0A838]"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* B. Testimonial Body */}
                <div className="card-body">
                  <blockquote className="card-quote">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* C. Attribution Footer */}
                <div className="card-footer">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span
                      className="text-[13.5px] sm:text-[14px] font-medium text-[#F5F0E8] tracking-tight truncate"
                      style={{ fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif" }}
                    >
                      {item.client}
                    </span>
                    <span className="text-[11px] font-mono text-[#8E8982] mt-0.5 tracking-wider">
                      {item.location} · {item.year}
                    </span>
                  </div>

                  {/* Case Study Link */}
                  {item.slug && (
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#354BFF] hover:text-[#6579FF] transition-colors duration-200 py-1 shrink-0 focus:outline-none focus:ring-1 focus:ring-[#354BFF]"
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight size={12} className="shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
