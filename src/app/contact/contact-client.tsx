'use client';

import { useState, type FormEvent, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import SectionLabel from '@/components/ui/SectionLabel';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCursor } from '@/components/ui/CursorProvider';
import FloatingInput, { FloatingTextarea } from '@/components/ui/FloatingInput';

/* ========================================
   Contact Client Page — Premium Redesign
   Full-screen immersive dark hero → editorial form
   ======================================== */

const contactInfo = [
  {
    label: 'Email',
    value: 'deepcipherstudio@gmail.com',
    href: 'mailto:deepcipherstudio@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'India · Remote worldwide',
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Response',
    value: 'Within 24 hours',
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const socials = [
  { name: 'Instagram', abbr: 'IG', href: '#' },
  { name: 'Twitter', abbr: 'TW', href: '#' },
  { name: 'LinkedIn', abbr: 'LI', href: '#' },
  { name: 'Behance', abbr: 'BE', href: '#' },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const { setCursor, resetCursor } = useCursor();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.1 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <>
      {/* ===== HERO — Full-screen dark immersive ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#060606' }}
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(184,149,106,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <motion.div
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 30, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-[30%] -left-[20%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(184,149,106,0.05) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <SectionLabel light>{'[ GET IN TOUCH ]'}</SectionLabel>
          </motion.div>

          <div className="mt-6">
            <AnimatedText splitBy="word" className="contact-hero-heading">
              Let&apos;s build / something / remarkable.
            </AnimatedText>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '17px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8,
              marginTop: '32px',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Every great partnership starts with a conversation. Tell us about your vision — we&apos;ll show you what&apos;s possible.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[9px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-[40px] bg-gradient-to-b from-[#B8956A]/60 to-transparent"
            />
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/[0.06]" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/[0.06]" />
      </section>

      {/* ===== CONTACT INFO STRIP ===== */}
      <section
        className="relative w-full bg-[#0A0A0A] border-t border-white/[0.06]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 md:p-10 lg:p-12 flex items-start gap-5 group"
            >
              <div className="flex-shrink-0 text-[#B8956A]/60 mt-1 group-hover:text-[#B8956A] transition-colors duration-500">
                {info.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">{info.label}</span>
                {info.href ? (
                  <a
                    href={info.href}
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="font-body font-light text-[15px] text-white/80 hover:text-[#B8956A] transition-colors duration-300 no-underline"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="font-body font-light text-[15px] text-white/60">{info.value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section
        className="relative bg-[var(--white)]"
        style={{
          paddingTop: 'clamp(80px, 10vw, 140px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        <div className="px-6 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left Column — Context & Discovery */}
            <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start">
              <SectionLabel>{'[ START A PROJECT ]'}</SectionLabel>

              <h2
                className="mt-4 font-display italic font-light text-[var(--ink)]"
                style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.9 }}
              >
                Tell us <br />about your <br />vision.
              </h2>

              <p
                className="mt-8"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontWeight: 300,
                  fontSize: '15px',
                  color: 'var(--ink-tertiary)',
                  lineHeight: 1.9,
                  maxWidth: '380px',
                }}
              >
                Fill out the form and we&apos;ll get back to you within 24 hours. Or simply drop us an email — whichever feels right.
              </p>

              {/* Discovery call card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(184,149,106,0.06) 0%, rgba(184,149,106,0.02) 100%)',
                  border: '1px solid rgba(184,149,106,0.12)',
                  padding: '32px',
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-0 right-0 w-full h-full border-t border-r border-[#B8956A]/20" />
                  <div className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-[#B8956A]/30 rotate-45" />
                </div>

                <SectionLabel>{'[ FREE DISCOVERY CALL ]'}</SectionLabel>
                <span
                  className="block mt-3 font-display italic font-light text-[var(--ink)]"
                  style={{ fontSize: '48px', lineHeight: 1 }}
                >
                  30 min
                </span>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    color: 'var(--ink-tertiary)',
                    lineHeight: 1.7,
                  }}
                >
                  No pitch. No pressure. Just a genuine conversation about your project and how we can help bring it to life.
                </p>
              </motion.div>

              {/* Socials */}
              <div className="mt-10 flex gap-6">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.abbr}
                    href={s.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    onMouseEnter={() => setCursor('hover', s.name)}
                    onMouseLeave={resetCursor}
                    className="relative group"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.15em] text-[var(--ink-ghost)] group-hover:text-[#B8956A] transition-colors duration-300"
                    >
                      {s.abbr}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8956A] group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column — Form */}
            <div ref={formRef} className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 30 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <form onSubmit={handleSubmit}>
                      {/* Name & Email row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <FloatingInput
                          label="YOUR NAME *"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                        <FloatingInput
                          label="EMAIL ADDRESS *"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>

                      <FloatingInput
                        label="COMPANY / ORGANIZATION"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />

                      {/* Service & Budget side by side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <div className="relative mb-10 w-full">
                          <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--ink-ghost)] mb-3 block">
                            WHAT DO YOU NEED?
                          </label>
                          <select
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            className="w-full bg-transparent py-3 font-body font-light text-[17px] outline-none cursor-pointer appearance-none text-[var(--ink)]"
                            style={{ borderBottom: '1px solid var(--border)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                          >
                            <option value="">Select a service</option>
                            <option value="website">Website Design & Development</option>
                            <option value="brand">Brand Identity & Logo Design</option>
                            <option value="redesign">UI Redesign & Design Systems</option>
                            <option value="strategy">Brand Strategy & Consulting</option>
                          </select>
                        </div>

                        <div className="relative mb-10 w-full">
                          <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--ink-ghost)] mb-3 block">
                            ESTIMATED BUDGET
                          </label>
                          <select
                            value={form.budget}
                            onChange={(e) => setForm({ ...form, budget: e.target.value })}
                            className="w-full bg-transparent py-3 font-body font-light text-[17px] outline-none cursor-pointer appearance-none text-[var(--ink)]"
                            style={{ borderBottom: '1px solid var(--border)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                          >
                            <option value="">Select a range</option>
                            <option value="3-5k">₹25,000 – ₹50,000</option>
                            <option value="5-10k">₹50,000 – ₹1,00,000</option>
                            <option value="10-25k">₹1,00,000 – ₹2,50,000</option>
                            <option value="25k+">₹2,50,000+</option>
                          </select>
                        </div>
                      </div>

                      <FloatingTextarea
                        label="YOUR MESSAGE *"
                        value={form.message}
                        onChange={(e: any) => setForm({ ...form, message: e.target.value })}
                        required
                      />

                      <div className="mt-4">
                        <MagneticButton variant="filled" fullWidth cursorLabel="SEND">
                          <button
                            type="submit"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'inherit',
                              font: 'inherit',
                              cursor: 'pointer',
                              padding: '14px 0',
                              width: '100%',
                              letterSpacing: '0.15em',
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '11px',
                            }}
                          >
                            SEND YOUR MESSAGE →
                          </button>
                        </MagneticButton>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center min-h-[60vh]"
                  >
                    {/* Animated checkmark */}
                    <motion.div className="mb-10">
                      <motion.svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                      >
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#B8956A"
                          strokeWidth="1"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                        <motion.path
                          d="M20 32L28 40L44 24"
                          stroke="#B8956A"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        />
                      </motion.svg>
                    </motion.div>

                    <AnimatedText splitBy="word" className="success-heading">
                      Thank you. / We&apos;ll be in touch.
                    </AnimatedText>

                    <p
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontWeight: 300,
                        fontSize: '16px',
                        color: 'var(--ink-tertiary)',
                        marginTop: '24px',
                        lineHeight: 1.85,
                        maxWidth: '440px',
                      }}
                    >
                      We&apos;ve received your message and will respond within 24 hours. Meanwhile, feel free to explore our work.
                    </p>

                    <div className="mt-8 flex gap-6">
                      <a
                        href="/work"
                        onMouseEnter={() => setCursor('link')}
                        onMouseLeave={resetCursor}
                        className="font-mono text-[11px] text-[var(--ink)] tracking-[0.15em] uppercase no-underline border-b border-[var(--ink)] pb-1 hover:text-[#B8956A] hover:border-[#B8956A] transition-colors duration-300"
                      >
                        View our work →
                      </a>
                      <a
                        href="/"
                        onMouseEnter={() => setCursor('link')}
                        onMouseLeave={resetCursor}
                        className="font-mono text-[11px] text-[var(--ink-ghost)] tracking-[0.15em] uppercase no-underline pb-1 hover:text-[var(--ink)] transition-colors duration-300"
                      >
                        Back home
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .contact-hero-heading {
          font-family: var(--font-display), serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(52px, 8vw, 120px);
          color: #fff;
          line-height: 0.88;
          letter-spacing: -0.02em;
        }
        .success-heading {
          font-family: var(--font-display), serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(40px, 5vw, 72px);
          color: var(--ink);
          line-height: 0.9;
        }
      `}</style>
    </>
  );
}
