'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ==========================================================
   DEEPCIPHER — Client Stories
   Minimalist Editorial Architecture
   - Header: 2 words with Citadel script accent matching "Our Services."
   - Full-bleed stretch: Matches homepage rhythm (clamp(24px, 5vw, 80px))
   - Redesigned Case Study action: Architectural badge with hover glow
   - Precision alignment: Verified client badge, balanced quote typography
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
    <section
      id="testimonials"
      className="relative w-full bg-[#0A0A0A] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] box-border"
      style={{
        padding: 'clamp(56px, 7vw, 96px) clamp(24px, 5vw, 80px)',
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-full mx-auto">
        
        {/* ==================================================
            SECTION HEADER — 2-Word Editorial Layout
            Matches "Our Services." styling and alignment
            ================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-[1px] bg-[#3854FF] inline-block shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#8E8982]">
                CLIENT STORIES
              </span>
            </div>

            {/* 2-Word Heading Designed like "Our Services." */}
            <h2
              id="testimonials-heading"
              className="m-0 text-[#F5F0E8] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-helvetica), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(36px, 5.2vw, 76px)',
                lineHeight: 1.02,
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

          {/* Editorial Subline */}
          <div className="hidden md:block pb-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#8E8982]">
              Real Businesses · Measurable Impact
            </span>
          </div>
        </div>

        {/* ==================================================
            TESTIMONIAL GRID (Full-bleed 2-Column Desktop Grid)
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="group/card flex flex-col justify-between h-full bg-[#0D0E12] border border-[rgba(245,240,232,0.08)] hover:border-[#3854FF]/40 rounded-[2px] p-6 sm:p-7 lg:p-8 transition-colors duration-300 relative box-border"
            >
              <div>
                {/* 1. Header: Number + Category on Left | Verified on Right */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(245,240,232,0.07)] gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-[11px] text-[#6B6560] tracking-wider"
                      aria-label={`Story index ${item.number}`}
                    >
                      {item.number}
                    </span>
                    <span
                      className="w-[1px] h-3 bg-white/10"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9E9891] font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Verification Indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#6B6560]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#3854FF] inline-block shrink-0 shadow-[0_0_8px_rgba(56,84,255,0.6)]"
                      aria-hidden="true"
                    />
                    <span>Verified Client</span>
                  </div>
                </div>

                {/* 2. Quote */}
                <div className="my-5 sm:my-6">
                  <p
                    className="m-0 text-[#EDE8E1] font-normal leading-[1.62] tracking-[-0.01em]"
                    style={{
                      fontFamily: "var(--font-helvetica), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 'clamp(15px, 1.15vw, 16.5px)',
                    }}
                  >
                    {item.quote}
                  </p>
                </div>
              </div>

              {/* 3. Attribution Footer: Client Name + Location & Year (Left) | Case Study Action (Right) */}
              <div className="mt-auto pt-4 border-t border-[rgba(245,240,232,0.07)] flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-0 pr-2">
                  <span
                    className="text-[14.5px] sm:text-[15px] font-semibold text-[#F5F0E8] tracking-tight truncate leading-tight"
                    style={{
                      fontFamily: "var(--font-helvetica), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    {item.client}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[10.5px] text-[#8E8982] tracking-wider uppercase mt-1">
                    {item.location} · {item.year}
                  </span>
                </div>

                {item.slug && (
                  <Link
                    href={`/work/${item.slug}`}
                    className="group/btn inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] border border-[rgba(245,240,232,0.14)] hover:border-[#3854FF] bg-[rgba(245,240,232,0.02)] hover:bg-[#3854FF]/12 text-[#EDE8E1] hover:text-white transition-all duration-300 shrink-0 whitespace-nowrap text-[11px] font-mono tracking-[0.14em] uppercase no-underline shadow-[0_0_0_transparent] hover:shadow-[0_0_20px_rgba(56,84,255,0.25)]"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-[#3854FF] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
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
  );
}
