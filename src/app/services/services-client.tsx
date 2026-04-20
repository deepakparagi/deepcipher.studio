'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import RevealLine from '@/components/ui/RevealLine';
import SectionLabel from '@/components/ui/SectionLabel';
import MagneticButton from '@/components/ui/MagneticButton';
import { services } from '@/lib/services';

/* ========================================
   Services Client Page
   ======================================== */

export default function ServicesClient() {
  return (
    <>
      {/* Header — Creative & Aesthetic */}
      <section
        className="relative w-full overflow-hidden px-6 md:px-10 lg:px-20 pt-40 pb-32"
        style={{ backgroundColor: 'var(--white)' }}
      >
        {/* Aesthetic background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[1px] border-[var(--border)] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 pointer-events-none" />
        <div className="absolute top-20 right-20 w-[350px] h-[350px] border-[1px] border-[var(--accent-warm)] rounded-full -translate-y-1/2 translate-x-1/4 opacity-20 pointer-events-none" />
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <SectionLabel>{'[ 03 — CAPABILITIES ]'}</SectionLabel>
          
          <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <h1 
              className="font-display italic font-light text-[var(--ink)] leading-[0.85] tracking-tighter"
              style={{ fontSize: 'clamp(64px, 11vw, 180px)' }}
            >
              Shaping<br />
              <span className="text-[var(--accent-warm)]">futures.</span>
            </h1>

            <RevealLine delay={0.3}>
              <div className="max-w-[420px] pb-4">
                <p className="font-body font-light text-[18px] md:text-[20px] text-[var(--ink-secondary)] leading-relaxed">
                  We don&apos;t just design interfaces. We architect digital ecosystems that elevate ambitious brands from industry participants to category leaders.
                </p>
                <div className="flex items-center gap-4 mt-10">
                  <span className="h-[1px] w-12 bg-[var(--ink)]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]">
                    Explore our expertise
                  </span>
                </div>
              </div>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const isOdd = i % 2 === 0;
        return (
          <section
            key={service.id}
            style={{
              backgroundColor: isOdd ? 'var(--white)' : 'var(--surface-subtle)',
              paddingTop: 'var(--section-padding)',
              paddingBottom: 'var(--section-padding)',
            }}
            className="px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center section-standard"
          >
            {/* Info side */}
            <div className={`order-2 ${isOdd ? 'md:order-1 md:col-span-7' : 'md:order-2 md:col-span-5'}`}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: 'var(--accent-warm)',
                  letterSpacing: '0.22em',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {service.number}
              </motion.span>

              <AnimatedText
                splitBy="word"
                className="service-title"
              >
                {service.title}
              </AnimatedText>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '48px',
                  height: '1px',
                  backgroundColor: 'var(--accent-warm)',
                  marginTop: '24px',
                  marginBottom: '24px',
                  transformOrigin: 'left',
                }}
              />

              {service.description.map((para, j) => (
                <motion.p
                  key={j}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.85,
                    maxWidth: '480px',
                    marginBottom: '20px',
                  }}
                  className="service-description"
                >
                  {para}
                </motion.p>
              ))}

              {/* Deliverables */}
              <div
                style={{
                  display: 'grid',
                  gap: '12px',
                  marginTop: '32px',
                  maxWidth: '480px',
                }}
                className="grid-cols-1 sm:grid-cols-2"
              >
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '9px',
                      color: 'var(--ink-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--accent-warm)' }}>→</span>
                    {d}
                  </span>
                ))}
              </div>

              {/* Duration + Price */}
              <div style={{ marginTop: '36px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'var(--ink-ghost)',
                    border: '1px solid var(--border)',
                    padding: '8px 16px',
                    display: 'inline-block',
                  }}
                >
                  {service.duration}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontSize: '32px',
                    color: 'var(--ink)',
                    marginTop: '12px',
                  }}
                >
                  Starting from {service.startingFrom}
                </p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <MagneticButton 
                  variant="outline" 
                  href="/start-a-project" 
                  cursorLabel="START"
                  className="service-cta"
                >
                  Start this project →
                </MagneticButton>
              </div>
            </div>

            {/* Visual side */}
            <div className={`order-1 ${isOdd ? 'md:order-2 md:col-span-5' : 'md:order-1 md:col-span-7'}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '480px',
                  backgroundColor: isOdd ? 'var(--surface-subtle)' : 'var(--white)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.85,
                    }}
                  />
                </motion.div>

                {/* Overlay gradient for depth */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.05))' 
                  }} 
                />

                {/* Corner brackets */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    width: '24px',
                    height: '24px',
                    borderTop: '1px solid var(--border-accent)',
                    borderLeft: '1px solid var(--border-accent)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    width: '24px',
                    height: '24px',
                    borderBottom: '1px solid var(--border-accent)',
                    borderRight: '1px solid var(--border-accent)',
                  }}
                />

                {/* Result metric */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'var(--accent-warm)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {service.number} · {service.shortTitle.toUpperCase()}
                </span>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Pricing Philosophy */}
      <section
        style={{
          backgroundColor: 'var(--surface-dark)',
          paddingTop: 'var(--section-padding)',
          paddingBottom: 'var(--section-padding)',
        }}
        className="px-6 md:px-10 lg:px-20 text-center section-standard"
      >
        <AnimatedText splitBy="word" className="pricing-heading">
          Every project is priced / on its ambition — not a menu.
        </AnimatedText>
        <RevealLine delay={0.3}>
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '672px',
              margin: '32px auto 0',
              lineHeight: 1.85,
            }}
          >
            We don’t have a pricing grid because no two projects are the same. Tell us about your
            goals and we’ll send a clear proposal within 48 hours.
          </p>
        </RevealLine>
        <div style={{ marginTop: '48px' }}>
          <MagneticButton variant="dark" href="/start-a-project" cursorLabel="START">
            Tell us about your project
          </MagneticButton>
        </div>
      </section>

      <style jsx global>{`
        .service-title {
           font-family: var(--font-display), serif;
           font-weight: 300;
           font-style: italic;
           font-size: clamp(40px, 4.5vw, 64px);
           color: var(--ink);
           line-height: 1.1;
        }

        .pricing-heading {
           font-family: var(--font-display), serif;
           font-weight: 300;
           font-style: italic;
           font-size: clamp(32px, 3.8vw, 56px);
           color: var(--white);
           line-height: 1.2;
           max-width: 900px;
           margin: 0 auto;
        }

        @media (max-width: 768px) {
          .service-title {
             margin-bottom: 24px !important;
          }
          .service-description {
             font-size: 15px !important;
             line-height: 1.7 !important;
          }
        }
      `}</style>
    </>
  );
}
