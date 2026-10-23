'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Stories / Selected Results
   Editorial Minimal Luxury 4-Card Showcase
   - 2-word punchy headline: "Proven Impact."
   - Curated 4 flagship client reviews in a balanced 2x2 grid
   - Elevated card styling: subtle numbering, refined badges,
     tactile case study pills, and aligned attribution
   ========================================================== */

export interface ClientReview {
  id: string;
  number: string;
  client: string;
  category: string;
  location: string;
  year: string;
  quote: string;
  slug: string;
}

export const clientReviews: ClientReview[] = [
  {
    id: 'gadag-info',
    number: '01',
    client: 'Gadag Info Community',
    category: 'Regional Media',
    location: 'Gadag, India',
    year: '2026',
    quote:
      'Managing 120k followers on Instagram was getting chaotic. Deepcipher gave us a proper digital home. Now when brands reach out for sponsor deals, we just send them our site — it immediately sets a professional tone and closes partnerships faster.',
    slug: 'gadag-info',
  },
  {
    id: 'khans-fitness',
    number: '02',
    client: "Khan's Fitness",
    category: 'Performance Athletic',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'Most gym sites look like cheap templates from ten years ago. Deepak built something dark, aggressive, and razor-sharp that matches the exact energy of our gym floor. People sign up for memberships before even stepping inside.',
    slug: 'khans-fitness',
  },
  {
    id: 'brown-sugar',
    number: '03',
    client: 'Brown Sugar Fusion Cafe',
    category: 'Luxury Hospitality',
    location: 'Gadag-Betageri',
    year: '2026',
    quote:
      'People walk into our cafe and say, "We saw your website and had to visit." The mobile menu is lightning-fast, and the 3D design blew everyone away. We saw an immediate spike in table reservations the weekend after launch.',
    slug: 'brown-sugar-fusion-cafe',
  },
  {
    id: 'bipin-chikkatti',
    number: '04',
    client: 'Bipin Chikkatti Institutions',
    category: 'Higher Education',
    location: 'Gadag, India',
    year: '2024',
    quote:
      'Our institution has over 30 years of history. We needed a site that reflects our academic dignity while staying fast and intuitive for modern students and parents. The feedback from faculty and alumni has been wonderful.',
    slug: 'bipin-chikkatti-institutions',
  },
];

export default function TestimonialsGrid() {
  return (
    <>
      <style jsx global>{`
        /* ==================================================
           TESTIMONIALS SECTION — Layout & Container
           ================================================== */
        .testimonials-section {
          background-color: #0A0A0A;
          border-top: 1px solid rgba(245, 240, 232, 0.08);
          padding-top: 72px;
          padding-bottom: 72px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .testimonials-container {
          width: 100%;
          max-width: 1440px;
          margin-inline: auto;
        }

        .testimonials-header {
          margin-bottom: 36px;
        }

        /* 4-Card Balanced Responsive Grid (2x2 on Desktop/Tablet, 1-col on Mobile) */
        .testimonials-grid-4 {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 18px;
        }

        @media (min-width: 480px) {
          .testimonials-section {
            padding-top: 80px;
            padding-bottom: 80px;
            padding-left: 24px;
            padding-right: 24px;
          }
          .testimonials-header {
            margin-bottom: 40px;
          }
          .testimonials-grid-4 {
            gap: 22px;
          }
        }

        @media (min-width: 768px) {
          .testimonials-section {
            padding-top: 96px;
            padding-bottom: 96px;
            padding-left: 32px;
            padding-right: 32px;
          }
          .testimonials-header {
            margin-bottom: 48px;
          }
          .testimonials-grid-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 28px;
          }
        }

        @media (min-width: 1280px) {
          .testimonials-section {
            padding-top: 110px;
            padding-bottom: 110px;
            padding-left: 48px;
            padding-right: 48px;
          }
          .testimonials-header {
            margin-bottom: 54px;
          }
          .testimonials-grid-4 {
            gap: 32px;
          }
        }

        @media (min-width: 1536px) {
          .testimonials-section {
            padding-left: 64px;
            padding-right: 64px;
          }
          .testimonials-grid-4 {
            gap: 36px;
          }
        }

        @media (min-width: 1920px) {
          .testimonials-container {
            width: min(100% - 128px, 1440px);
            margin-inline: auto;
          }
        }

        /* ==================================================
           REDESIGNED CARD STYLE — Minimal Luxury Aesthetic
           ================================================== */
        .testimonial-card-v2 {
          position: relative;
          background: #0C0D12;
          border: 1px solid rgba(245, 240, 232, 0.08);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 24px;
          box-sizing: border-box;
          transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .testimonial-card-v2 {
            padding: 32px;
          }
        }

        @media (min-width: 1280px) {
          .testimonial-card-v2 {
            padding: 36px 38px;
          }
        }

        .testimonial-card-v2:hover {
          border-color: rgba(53, 75, 255, 0.35);
          background-color: #101118;
        }

        /* Subtle top hover hairline */
        .card-hairline-accent {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #354BFF, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .testimonial-card-v2:hover .card-hairline-accent {
          opacity: 1;
        }

        /* Card Header */
        .card-header-v2 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(245, 240, 232, 0.06);
        }

        /* Card Body */
        .card-body-v2 {
          flex: 1 1 auto;
          display: flex;
          align-items: flex-start;
          padding-top: 24px;
          padding-bottom: 24px;
        }

        .card-quote-v2 {
          font-family: var(--font-helvetica), 'Helvetica', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #EDE8E1;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
        }

        @media (min-width: 768px) {
          .card-quote-v2 {
            font-size: 15.5px;
          }
        }

        @media (min-width: 1280px) {
          .card-quote-v2 {
            font-size: 16px;
          }
        }

        /* Card Footer */
        .card-footer-v2 {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(245, 240, 232, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 14px;
        }
      `}</style>

      <section
        id="testimonials"
        className="testimonials-section relative w-full text-[#F5F0E8]"
        aria-labelledby="testimonials-heading"
      >
        <div className="testimonials-container">
          {/* Section Header with 2-word Punchy Title */}
          <div className="testimonials-header max-w-[820px]">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#354BFF] inline-block shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#9E9891]">
                CLIENT STORIES / SELECTED RESULTS
              </span>
            </div>

            {/* 2-Word Main Heading */}
            <h2
              id="testimonials-heading"
              className="m-0 text-[#F5F0E8] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(36px, 5.5vw, 68px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Proven Impact.
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

          {/* 4-Card Showcase Grid */}
          <div className="testimonials-grid-4 w-full">
            {clientReviews.map((item) => (
              <article
                key={item.id}
                className="testimonial-card-v2"
              >
                {/* Subtle top hairline on hover */}
                <div className="card-hairline-accent" aria-hidden="true" />

                {/* A. Header: Number, Category Tag & 5-Star Rating */}
                <div className="card-header-v2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono text-[#8E8982] tracking-wider">
                      {item.number}
                    </span>
                    <span className="text-[9.5px] font-mono uppercase tracking-[0.16em] text-[#354BFF] bg-[#354BFF]/10 border border-[#354BFF]/20 px-2.5 py-1 rounded-sm font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Subtle 5-Star Rating */}
                  <div
                    className="flex items-center gap-1 text-[#E0A838]"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* B. Testimonial Body */}
                <div className="card-body-v2">
                  <blockquote className="card-quote-v2">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* C. Attribution Footer */}
                <div className="card-footer-v2">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span
                      className="text-[14px] sm:text-[15px] font-medium text-[#F5F0E8] tracking-tight truncate"
                      style={{ fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif" }}
                    >
                      {item.client}
                    </span>
                    <span className="text-[11.5px] font-mono text-[#8E8982] mt-0.5 tracking-wider">
                      {item.location} · {item.year}
                    </span>
                  </div>

                  {/* Case Study Pill Link */}
                  {item.slug && (
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#F5F0E8]/90 hover:text-white bg-[rgba(245,240,232,0.04)] hover:bg-[#354BFF] border border-[rgba(245,240,232,0.1)] hover:border-[#354BFF] px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 focus:outline-none focus:ring-1 focus:ring-[#354BFF]"
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
