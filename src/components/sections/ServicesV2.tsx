'use client';

import { memo, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../ui/CursorProvider';
import AnimatedText from '../ui/AnimatedText';

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
    title: 'Website Design',
    subtitle: 'We design digital architectures that command authority, balancing premium aesthetics with uncompromising conversion strategy.',
    capabilities: ['Visual Direction', 'Interaction Design', 'Conversion Strategy'],
    accent: '#B8956A',
  },
  {
    no: '02',
    title: 'Web Development',
    subtitle: 'We engineer robust, scalable platforms using modern frameworks, ensuring your vision is translated into flawless technical reality.',
    capabilities: ['Next.js', 'React', 'WebGL', 'CMS Integration'],
    accent: '#C4A882',
  },
  {
    no: '03',
    title: 'UI/UX Design',
    subtitle: 'We build intuitive interfaces that reduce friction and elevate user experience, turning complex workflows into seamless interactions.',
    capabilities: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    accent: '#A8845A',
  },
  {
    no: '04',
    title: 'Brand Identity',
    subtitle: 'We craft bespoke visual systems—typography, color, and structure—that establish your business as a premium entity.',
    capabilities: ['Brand Strategy', 'Logo Design', 'Typography', 'Asset Library'],
    accent: '#D4B896',
  },
  {
    no: '05',
    title: 'Performance Optimization',
    subtitle: 'We optimize for absolute speed and technical perfection. A beautiful site that is slow to load is a silent luxury.',
    capabilities: ['Core Web Vitals', 'Technical SEO', 'Asset Compression'],
    accent: '#B8956A',
  },
  {
    no: '06',
    title: 'AI Integrations',
    subtitle: 'We embed intelligent models directly into your platform, transforming static interfaces into dynamic, context-aware engines.',
    capabilities: ['LLM Integration', 'Custom Agents', 'Data Pipelines'],
    accent: '#C4A882',
  },
  {
    no: '07',
    title: 'Automation Systems',
    subtitle: 'We build custom workflows that eliminate operational drag, allowing your team to focus on high-leverage growth.',
    capabilities: ['CRM Workflows', 'API Bridges', 'Business Logic'],
    accent: '#A8845A',
  },
];

/* ========================================
   Service Row Component
   ======================================== */

const ServiceRow = memo(function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const { setCursor, resetCursor } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setCursor('link', 'VIEW');
  }, [setCursor]);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    resetCursor();
  }, [resetCursor]);

  return (
    <motion.div
      ref={rowRef}
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/services"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <div
          className="service-row-shell relative overflow-hidden"
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
              width: '4px',
              backgroundColor: service.accent,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
          />

          {/* Main row — number + title + arrow */}
          <div
            className="service-row-content flex items-start md:items-center justify-between"
            style={{
              transform: isHovered ? 'translate3d(24px,0,0)' : 'translate3d(0,0,0)',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
          >
            <div className="service-title-wrap flex items-start md:items-center gap-4 md:gap-8 flex-1">
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
                    color: isHovered ? '#0A0A0A' : 'rgba(10,10,10,0.42)',
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
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
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
            <div className="service-row-meta flex items-center gap-6 flex-shrink-0">
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
                      transition: 'color 0.3s ease, border-color 0.3s ease',
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
});

/* ========================================
   Section 6 — Services
   ======================================== */

export default function ServicesV2() {
  return (
    <section
      className="services-home-section"
      style={{
        backgroundColor: '#F8F7F4',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Header — editorial layout */}
      <div className="services-home-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <SectionLabel className="mb-4 text-[#0A0A0A]/40">[ WHAT WE BUILD ]</SectionLabel>

          <AnimatedText
            splitBy="word"
            as="h2"
            className="services-home-title m-0"
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
          </AnimatedText>
        </div>

        <motion.p
          className="services-home-copy m-0"
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
          Seven disciplines. Each one obsessed over.
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
