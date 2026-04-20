'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../ui/CursorProvider';

/* ========================================
   Services Data
   ======================================== */

interface ServiceItem {
  no: string;
  title: string;
  subtitle: string;
  capabilities: string[];
  accent: string;
}

const services: ServiceItem[] = [
  {
    no: '01',
    title: 'Web Design & Development',
    subtitle: 'Digital experiences that convert visitors into clients.',
    capabilities: ['Next.js', 'Framer', 'Webflow', 'CMS Integration', 'E-Commerce'],
    accent: '#B8956A',
  },
  {
    no: '02',
    title: 'Brand Identity & Logo Design',
    subtitle: 'Visual systems that make your brand unforgettable.',
    capabilities: ['Brand Strategy', 'Logo Design', 'Guidelines', 'Asset Library'],
    accent: '#C4A882',
  },
  {
    no: '03',
    title: 'UI Redesign & Design Systems',
    subtitle: 'Pixel-perfect interfaces built for scale.',
    capabilities: ['UI Audit', 'Figma Systems', 'Component Libraries', 'Design Tokens'],
    accent: '#A8845A',
  },
  {
    no: '04',
    title: 'Brand Strategy & Consulting',
    subtitle: 'Positioning that puts you ahead of the competition.',
    capabilities: ['Market Analysis', 'Positioning', 'Messaging', 'Creative Direction'],
    accent: '#D4B896',
  },
];

/* ========================================
   Service Row Component
   ======================================== */

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const { setCursor, resetCursor } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={rowRef}
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('link', 'VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
    >
      <Link
        href="/services"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            padding: 'clamp(28px, 3.5vw, 48px) 0',
            borderTop: '1px solid rgba(10,10,10,0.08)',
            transition: 'background-color 0.5s cubic-bezier(0.16,1,0.3,1)',
            backgroundColor: isHovered ? 'rgba(184,149,106,0.04)' : 'transparent',
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: isHovered ? '4px' : '0px',
              backgroundColor: service.accent,
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          {/* Main row — number + title + arrow */}
          <div
            className="flex items-start md:items-center justify-between"
            style={{
              paddingLeft: isHovered ? '24px' : '0px',
              transition: 'padding-left 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-start md:items-center gap-4 md:gap-8 flex-1">
              {/* Number */}
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  color: service.accent,
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                  marginTop: '8px',
                }}
              >
                {service.no}
              </span>

              {/* Title + subtitle */}
              <div className="flex flex-col gap-2">
                <h3
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(28px, 3.5vw, 52px)',
                    lineHeight: 1,
                    color: isHovered ? '#0A0A0A' : 'rgba(10,10,10,0.3)',
                    transition: 'color 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  {service.title}
                </h3>

                {/* Subtitle — only visible on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      className="m-0 hidden md:block"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontWeight: 300,
                        fontSize: '14px',
                        color: 'rgba(10,10,10,0.5)',
                        paddingLeft: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      {service.subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side — capabilities chips + arrow */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Capability chips — desktop only */}
              <div className="hidden lg:flex items-center gap-2">
                {service.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '9px',
                      color: isHovered ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.3)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: '1px solid',
                      borderColor: isHovered ? 'rgba(184,149,106,0.3)' : 'rgba(10,10,10,0.08)',
                      padding: '4px 10px',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '18px',
                  color: isHovered ? '#0A0A0A' : 'rgba(10,10,10,0.2)',
                  transition: 'color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                  display: 'block',
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ========================================
   Section 6 — Services
   ======================================== */

export default function ServicesV2() {
  return (
    <section
      style={{
        backgroundColor: '#F8F7F4',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Header — editorial layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <SectionLabel className="mb-4 text-[#0A0A0A]/40">[ WHAT WE BUILD ]</SectionLabel>

          <motion.h2
            className="m-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 6vw, 96px)',
              lineHeight: 0.9,
              color: '#0A0A0A',
            }}
          >
            Our Services
          </motion.h2>
        </div>

        <motion.p
          className="m-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 300,
            fontSize: '15px',
            color: 'rgba(10,10,10,0.5)',
            maxWidth: '240px',
            textAlign: 'right',
          }}
        >
          Four disciplines. Each one obsessed over.
        </motion.p>
      </div>

      {/* Service rows */}
      <div className="w-full flex flex-col">
        {services.map((svc, i) => (
          <ServiceRow key={svc.no} service={svc} index={i} />
        ))}
        {/* Bottom border */}
        <div style={{ borderTop: '1px solid rgba(10,10,10,0.08)' }} />
      </div>

    </section>
  );
}
