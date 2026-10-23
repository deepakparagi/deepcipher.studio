'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Stories
   Minimalist Editorial Architecture
   - Header: 2 words with Citadel script accent matching "Our Services."
   - Uncluttered: Zero redundant metrics or marketing paragraphs
   - Controlled proportions: Balanced 2-column grid, natural card height
   - Clean spacing: Exact 56–72px vertical rhythm without empty voids
   ========================================================== */

export interface TestimonialItem {
  id: string;
  number: string;
  client: string;
  category: string;
  location: string;
  year: string;
  quote: string;
  slug: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'gadag-info',
    number: '01',
    client: 'Gadag Info Community',
    category: 'Regional Media',
    location: 'Gadag, India',
    year: '2026',
    quote:
      '“Managing 120k followers on Instagram was getting chaotic. DEEPCIPHER gave us a proper digital home. Now when brands reach out for sponsor deals, we just send them our site — it immediately sets a professional tone and closes partnerships faster.”',
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
      '“Most gym sites look like cheap templates from ten years ago. Deepak built something dark, aggressive, and razor-sharp that matches the exact energy of our gym floor. People sign up for memberships before even stepping inside.”',
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
      '“People walk into our cafe and say, \'We saw your website and had to visit.\' The mobile menu is lightning-fast, and the 3D design blew everyone away. We saw an immediate spike in table reservations the weekend after launch.”',
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
      '“Our institution has over 30 years of history. We needed a site that reflects our academic dignity while staying fast and intuitive for modern students and parents. The feedback from faculty and alumni has been wonderful.”',
    slug: 'bipin-chikkatti-institutions',
  },
];

export default function TestimonialsGrid() {
  return (
    <>
      <style jsx>{`
        /* ==================================================
           CONTAINER & BREAKPOINTS
           ================================================== */
        .testimonials-section {
          background-color: #0A0A0A;
          border-top: 1px solid rgba(245, 240, 232, 0.08);
          padding-top: 52px;
          padding-bottom: 64px;
          padding-left: clamp(20px, 3vw, 44px);
          padding-right: clamp(20px, 3vw, 44px);
        }

        .testimonials-container {
          width: 100%;
          max-width: 1680px;
          margin-inline: auto;
        }

        .testimonials-header-zone {
          margin-bottom: 28px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 18px;
          width: 100%;
        }

        @media (min-width: 480px) {
          .testimonials-grid {
            gap: 20px;
          }
        }

        @media (min-width: 768px) {
          .testimonials-section {
            padding-top: 64px;
            padding-bottom: 72px;
          }
          .testimonials-header-zone {
            margin-bottom: 36px;
          }
          .testimonials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
          }
        }

        @media (min-width: 1536px) {
          .testimonials-section {
            padding-top: 72px;
            padding-bottom: 80px;
          }
        }

        /* ==================================================
           CARD STYLING — Precision Minimalist Structure
           ================================================== */
        .testimonial-card-editorial {
          background-color: #0D0E12;
          border: 1px solid rgba(245, 240, 232, 0.08);
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px 22px;
          box-sizing: border-box;
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }

        @media (min-width: 768px) {
          .testimonial-card-editorial {
            padding: 24px 28px;
          }
        }

        .testimonial-card-editorial:hover {
          border-color: rgba(56, 84, 255, 0.35);
          background-color: #101217;
        }

        /* Card Header */
        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(245, 240, 232, 0.06);
          margin-bottom: 18px;
        }

        /* Card Quote Body */
        .card-quote-body {
          flex: 1 1 auto;
          margin-bottom: 20px;
        }

        .card-quote-text {
          font-family: var(--font-helvetica), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 15px;
          line-height: 1.62;
          color: #EDE8E1;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
        }

        @media (min-width: 768px) {
          .card-quote-text {
            font-size: 16px;
            line-height: 1.65;
          }
        }

        /* Card Footer */
        .card-footer-bar {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(245, 240, 232, 0.06);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Case study link */
        .case-study-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #A39E97;
          border: 1px solid rgba(245, 240, 232, 0.12);
          border-radius: 2px;
          padding: 6px 12px;
          background-color: rgba(245, 240, 232, 0.02);
          text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
          flex-shrink: 0;
        }

        .case-study-action:hover {
          color: #FFFFFF;
          border-color: #3854FF;
          background-color: rgba(56, 84, 255, 0.15);
        }

        .case-study-action:focus-visible {
          outline: 1px solid #3854FF;
          outline-offset: 2px;
        }
      `}</style>

      <section
        id="testimonials"
        className="testimonials-section relative w-full text-[#F5F0E8]"
        aria-labelledby="testimonials-heading"
      >
        <div className="testimonials-container">
          
          {/* ==================================================
              SECTION HEADER — Clean & Uncluttered
              ================================================== */}
          <div className="testimonials-header-zone">
            {/* Eyebrow */}
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: '12px' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-[1px] bg-[#3854FF] inline-block shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#8E8982]"
              >
                CLIENT STORIES
              </span>
            </div>

            {/* 2-Word Heading Designed like "Our Services." */}
            <h2
              id="testimonials-heading"
              className="m-0 text-[#F5F0E8] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-helvetica), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(36px, 5vw, 68px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              <span>Client </span>
              <span
                className="font-citadel italic font-normal text-[#3854FF]"
                style={{
                  fontFamily: "var(--font-citadel, 'Citadel Script'), cursive",
                  textShadow: '0 0 32px rgba(56, 84, 255, 0.45)',
                  marginLeft: '0.04em',
                }}
              >
                Stories.
              </span>
            </h2>
          </div>

          {/* ==================================================
              TESTIMONIAL GRID (2-Column Desktop Matrix)
              ================================================== */}
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="testimonial-card-editorial"
              >
                {/* 1. Header: Sequence number + Category Label */}
                <div className="card-header-bar">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-[11px] text-[#6B6560] tracking-wider"
                      aria-label={`Story index ${item.number}`}
                    >
                      {item.number}
                    </span>
                    <span
                      className="w-[1px] h-3 bg-white/[0.1]"
                      aria-hidden="true"
                    />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9E9891] font-medium"
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* 2. Quote */}
                <div className="card-quote-body">
                  <p className="card-quote-text">
                    {item.quote}
                  </p>
                </div>

                {/* 3. Attribution Footer: Client Name, Location & Year, Case Study Link */}
                <div className="card-footer-bar">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span
                      className="text-[14.5px] sm:text-[15px] font-medium text-[#F5F0E8] tracking-tight truncate leading-tight"
                      style={{
                        fontFamily: "var(--font-helvetica), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      {item.client}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#6B6560] tracking-wider uppercase mt-1">
                      {item.location} · {item.year}
                    </span>
                  </div>

                  {item.slug && (
                    <Link
                      href={`/work/${item.slug}`}
                      className="case-study-action group"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight
                        size={12}
                        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#3854FF]"
                        aria-hidden="true"
                      />
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
