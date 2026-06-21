'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';
import ShaderLines from '@/components/ui/shader-lines';
import { staggerContainer, staggerItem } from '@/lib/animations';
import AnimatedText from '@/components/ui/AnimatedText';

/* =========================================================
   CONTACT PAGE — Complete Redesign
   Two-column: Contact Info (left) + Form (right)
   ========================================================= */

const projectTypes = [
  'Select a service...',
  'Web Design & Development',
  'Brand Identity & Logo Design',
  'Brand Strategy & Consulting',
  'SEO & Performance Optimisation',
  'AI & Business Automation',
  'Full Studio Package',
];

const budgetRanges = [
  'Select a range...',
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  '₹2,00,000+',
  "Let's discuss",
];

const submitBtnVariants = {
  hidden: { opacity: 0, scaleX: 0.95 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

export default function ContactClient() {
  const { setCursor, resetCursor } = useCursor();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    brief: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (!form.name.trim() || !form.email.trim() || !form.brief.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          projectType: form.projectType,
          budget: form.budget,
          message: form.brief,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed', error);
      alert('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main
      className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Noise opacity={0.03} />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <div key="contact-form" className="w-full flex flex-col">

            {/* ══════════════════════════════════════════════
                SECTION 1: HERO
                ══════════════════════════════════════════════ */}
            <section
              className="relative w-full px-6 overflow-hidden flex flex-col justify-center items-center text-center"
              style={{
                minHeight: '100vh',
                borderBottom: '0.5px solid rgba(245,240,232,0.06)',
              }}
            >
              <ShaderLines />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center max-w-[1000px]"
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    color: '#6B6560',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> GET IN TOUCH
                </span>

                {/* Main H1 */}
                <h1
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: 'clamp(60px, 9vw, 130px)',
                    color: '#F5F0E8',
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    margin: 0,
                    marginBottom: '24px',
                    userSelect: 'none',
                  }}
                >
                  <span className="upright font-medium">Let&apos;s build </span>
                  <span className="italic font-normal text-[#B8956A]">something.</span>
                </h1>

                {/* Subline */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '15px',
                    color: '#6B6560',
                    fontWeight: 300,
                    maxWidth: '480px',
                    margin: '16px auto 0',
                    lineHeight: '1.65',
                  }}
                >
                  Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d approach it
                  — and what it would cost. No pressure, no obligation.
                </p>
              </motion.div>

              {/* Scroll Indicator */}
              <div
                className="absolute flex flex-col items-center gap-3 z-20 select-none"
                style={{ bottom: '48px' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}
                >
                  SCROLL
                </span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ height: '40px', width: '0.5px', background: '#B8956A' }}
                />
              </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 2: TWO-COLUMN CONTACT + FORM
                ══════════════════════════════════════════════ */}
            <section
              className="contact-form-section"
              style={{
                padding: '80px 64px',
                borderTop: '0.5px solid rgba(245,240,232,0.06)',
              }}
            >
              <div
                className="contact-two-col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '80px',
                  alignItems: 'start',
                  maxWidth: '1400px',
                  margin: '0 auto',
                  width: '100%',
                }}
              >
                {/* ── LEFT COLUMN: Contact Info ── */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* REACH US Label */}
                  <motion.span
                    variants={staggerItem}
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '10px',
                      color: '#6B6560',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      marginBottom: '40px',
                    }}
                  >
                    <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> REACH US
                  </motion.span>

                  {/* Email */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      EMAIL
                    </span>
                    <a
                      href="mailto:deepcipherstudio@gmail.com"
                      onMouseEnter={() => setCursor('link')}
                      onMouseLeave={resetCursor}
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontStyle: 'italic',
                        fontSize: '24px',
                        color: '#F5F0E8',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'block',
                      }}
                      onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#B8956A'; }}
                      onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0E8'; }}
                    >
                      deepcipherstudio@gmail.com
                    </a>
                  </motion.div>

                  {/* Location */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      LOCATION
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#9A9590',
                        display: 'block',
                      }}
                    >
                      Bengaluru, Karnataka, India
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#9A9590',
                        display: 'block',
                      }}
                    >
                      Available for remote projects worldwide
                    </span>
                  </motion.div>

                  {/* Availability */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      AVAILABILITY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#9A9590',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#B8956A',
                          display: 'inline-block',
                          marginRight: '8px',
                          flexShrink: 0,
                        }}
                      />
                      Currently accepting projects for Q3 2026
                    </span>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      RESPONSE TIME
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#9A9590',
                        display: 'block',
                      }}
                    >
                      Within 24 hours on business days
                    </span>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    variants={staggerItem}
                    style={{
                      marginTop: '48px',
                      borderTop: '0.5px solid rgba(245,240,232,0.08)',
                      paddingTop: '32px',
                      display: 'flex',
                      gap: '24px',
                    }}
                  >
                    {[
                      { label: 'INSTAGRAM ↗', href: 'https://www.instagram.com/deepcipher.ai/' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursor('link')}
                        onMouseLeave={resetCursor}
                        className="group relative"
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '9px',
                          letterSpacing: '0.15em',
                          color: '#6B6560',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          paddingBottom: '2px',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#B8956A';
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#6B6560';
                        }}
                      >
                        {social.label}
                        <span
                          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                          style={{ background: '#B8956A' }}
                        />
                      </a>
                    ))}
                  </motion.div>
                </motion.div>

                {/* ── RIGHT COLUMN: Contact Form ── */}
                <motion.form
                  onSubmit={handleSubmit}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >

                  {/* NAME */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="contact-form-input"
                      required
                    />
                  </motion.div>

                  {/* EMAIL */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="contact-form-input"
                      required
                    />
                  </motion.div>

                  {/* PHONE */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your mobile number"
                      className="contact-form-input"
                    />
                  </motion.div>

                  {/* BUSINESS / BRAND */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      BUSINESS / BRAND
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="What's the name of your business?"
                      className="contact-form-input"
                    />
                  </motion.div>

                  {/* PROJECT TYPE */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px', position: 'relative' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      PROJECT TYPE
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className="contact-form-select"
                    >
                      {projectTypes.map((type, i) => (
                        <option key={type} value={i === 0 ? '' : type} disabled={i === 0}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        position: 'absolute',
                        right: '8px',
                        bottom: '16px',
                        pointerEvents: 'none',
                        opacity: 0.6,
                      }}
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#B8956A" strokeWidth="1" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* BUDGET RANGE */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px', position: 'relative' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      BUDGET RANGE
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="contact-form-select"
                    >
                      {budgetRanges.map((range, i) => (
                        <option key={range} value={i === 0 ? '' : range} disabled={i === 0}>
                          {range}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        position: 'absolute',
                        right: '8px',
                        bottom: '16px',
                        pointerEvents: 'none',
                        opacity: 0.6,
                      }}
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#B8956A" strokeWidth="1">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* TELL US ABOUT YOUR PROJECT */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '10px',
                        color: '#6B6560',
                        letterSpacing: '0.2em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      TELL US ABOUT YOUR PROJECT
                    </label>
                    <textarea
                      value={form.brief}
                      onChange={(e) => handleInputChange('brief', e.target.value)}
                      placeholder="What are you building? What's the goal? Any reference sites you admire?"
                      rows={4}
                      className="contact-form-textarea"
                      required
                    />
                  </motion.div>

                  {/* SUBMIT BUTTON */}
                  <motion.button
                    type="submit"
                    variants={submitBtnVariants}
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    className="contact-submit-btn"
                    style={{ transformOrigin: 'center' }}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND PROJECT BRIEF →'}
                  </motion.button>
                </motion.form>
              </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 3: CLOSING EMAIL CTA
                ══════════════════════════════════════════════ */}
            <motion.section
              className="contact-cta-section"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                width: '100%',
                padding: '80px 64px',
                borderTop: '0.5px solid rgba(245,240,232,0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  color: '#F5F0E8',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                <span className="upright font-medium">Or simply email </span>
                <span className="italic font-normal text-[#B8956A]">us directly.</span>
              </h2>

              <motion.a
                variants={staggerItem}
                href="mailto:deepcipherstudio@gmail.com"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative inline-block"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: '#B8956A',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  marginTop: '16px',
                  paddingBottom: '2px',
                }}
              >
                DEEPCIPHERSTUDIO@GMAIL.COM
                <span
                  className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: '#B8956A' }}
                />
              </motion.a>
            </motion.section>

          </div>
        ) : (
          /* ══════════════════════════════════════════════
              SUCCESS STATE
              ══════════════════════════════════════════════ */
          <motion.section
            key="success-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#0A0A0A',
              padding: '0 24px',
            }}
          >
            {/* Animated Gold Pulse Circle */}
            <div className="relative mb-12 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1.5px solid #B8956A',
                }}
              />
              <motion.div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid #B8956A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0A0A0A',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8956A" strokeWidth="1.5" aria-hidden="true">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#F5F0E8',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '16px',
              }}
            >
              <span className="upright font-medium">Transmission </span>
              <span className="italic font-normal text-[#B8956A]">received.</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                color: '#BDB8B3',
                maxWidth: '480px',
                lineHeight: '1.85',
                margin: '12px auto 32px',
              }}
            >
              Your project brief has entered the DEEPCIPHER pipeline. Expect a response within 24–48 hours.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link
                href="/work"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#B8956A',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid #B8956A',
                  paddingBottom: '2px',
                }}
              >
                View our work →
              </Link>
              <Link
                href="/"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#6B6560',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Back home
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
