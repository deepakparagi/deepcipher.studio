'use client';

import { useState, useRef, type FormEvent } from 'react';
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
  const [isSlowSubmission, setIsSlowSubmission] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; brief?: string; general?: string }>({});
  const submitAbortRef = useRef<AbortController | null>(null);
  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    brief: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  };

  const handleSubmit = async (e?: FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const newErrors: { name?: string; phone?: string; brief?: string } = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.brief.trim()) newErrors.brief = 'Please share a brief description of your project';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setIsSlowSubmission(false);

    if (submitAbortRef.current) submitAbortRef.current.abort();
    const controller = new AbortController();
    submitAbortRef.current = controller;

    // State 5: Slow Loading threshold (3000ms)
    slowTimerRef.current = setTimeout(() => {
      setIsSlowSubmission(true);
    }, 3000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.brief,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Server responded with an error');
      }

      setSubmitted(true);
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Submission failed:', error);
      setErrors({
        general: error?.message || 'Transmission failed. You can safely retry without losing your input.',
      });
    } finally {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      setIsSubmitting(false);
      setIsSlowSubmission(false);
    }
  };

  return (
    <motion.main
      className="relative bg-[#0A0A0A] text-white selection:bg-[#2C3480]/30 overflow-hidden"
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
              className="relative w-full px-6 overflow-hidden flex flex-col justify-between items-center text-center"
              style={{
                height: '100dvh',
                minHeight: '520px',
                borderBottom: '0.5px solid rgba(245,240,232,0.06)',
                paddingTop: 'clamp(56px, 8vh, 80px)',
                paddingBottom: 'clamp(20px, 4vh, 40px)',
              }}
            >
              {/* ── Background image layer with 40% dreamy blur effect ── */}
              <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  backgroundImage: "url('/images/contact%20page%20hero%20section.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(11px) saturate(108%)',
                  transform: 'scale(1.08)',
                }}
              />

              {/* ── Dark overlay to ensure text contrast ── */}
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.82) 100%)',
                  backgroundColor: 'rgba(10, 10, 10, 0.45)',
                }}
              />

              {/* Top spacer for balanced vertical centering */}
              <div aria-hidden="true" className="w-full h-2 shrink-0 pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center max-w-[1000px] my-auto"
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    color: '#E0DCD6',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}
                >
                  <span style={{ color: '#2C3480', marginRight: '4px' }}>—</span> GET IN TOUCH
                </span>

                {/* Main H1 */}
                <h1
                  style={{
                    fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                    fontSize: 'clamp(36px, 5.8vw, 92px)',
                    color: '#F5F0E8',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.02,
                    margin: 0,
                    marginBottom: '16px',
                    userSelect: 'none',
                    textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="upright font-bold" style={{ color: '#F5F0E8' }}>
                    Let&apos;s bring your ideas to{' '}
                  </span>
                  <span
                    className="font-citadel italic font-normal"
                    style={{
                      fontFamily: "var(--font-citadel, 'Citadel Script'), 'Citadel Script', cursive",
                      color: '#4B5DF5',
                      textShadow: '0 0 40px rgba(75, 93, 245, 0.7), 0 2px 20px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    life.
                  </span>
                </h1>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: 'clamp(13px, 1.1vw, 16px)',
                    color: '#F5F0E8',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    maxWidth: '520px',
                    margin: '8px auto 0',
                    lineHeight: '1.6',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  Your idea, our creation.
                </p>
              </motion.div>

              {/* Scroll Indicator — docked cleanly at bottom of viewport */}
              <div
                className="relative flex flex-col items-center gap-2 z-20 select-none shrink-0"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '9px',
                    color: '#E0DCD6',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}
                >
                  SCROLL
                </span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ height: '32px', width: '1px', background: '#3049E8' }}
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
                  viewport={{ once: true, amount: 0.05 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* REACH US Label */}
                  <motion.span
                    variants={staggerItem}
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '11px',
                      color: '#FFFFFF',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '40px',
                    }}
                  >
                    <span style={{ color: '#4B5DF5', marginRight: '6px' }}>—</span> REACH US
                  </motion.span>

                  {/* Email */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      EMAIL
                    </span>
                    <a
                      href="mailto:deepcipherstudio@gmail.com"
                      onMouseEnter={() => setCursor('link')}
                      onMouseLeave={resetCursor}
                      style={{
                        fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                        fontStyle: 'italic',
                        fontSize: '24px',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'block',
                      }}
                      onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#4B5DF5'; }}
                      onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                    >
                      deepcipherstudio@gmail.com
                    </a>
                  </motion.div>

                  {/* Location */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      LOCATION
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#E2E8F0',
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
                        color: '#E2E8F0',
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
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      AVAILABILITY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: '#4B5DF5',
                          boxShadow: '0 0 8px #4B5DF5',
                          display: 'inline-block',
                          marginRight: '10px',
                          flexShrink: 0,
                        }}
                      />
                      Currently accepting projects for {new Date().getFullYear()}
                    </span>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '40px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      RESPONSE TIME
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#E2E8F0',
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
                      borderTop: '0.5px solid rgba(255,255,255,0.15)',
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
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          paddingBottom: '2px',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#4B5DF5';
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                        }}
                      >
                        {social.label}
                        <span
                          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                          style={{ background: '#4B5DF5' }}
                        />
                      </a>
                    ))}
                  </motion.div>
                </motion.div>

                {/* ── RIGHT COLUMN: Contact Form ── */}
                <motion.form
                  onSubmit={handleSubmit}
                  noValidate
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >

                  {/* NAME */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '10px',
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
                      style={{
                        borderColor: errors.name ? '#FF5449' : undefined,
                      }}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-[#FF5449] font-mono tracking-wider mt-2 block">
                        {errors.name}
                      </span>
                    )}
                  </motion.div>

                  {/* PHONE */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                      }}
                    >
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your phone number"
                      className="contact-form-input"
                      required
                      style={{
                        borderColor: errors.phone ? '#FF5449' : undefined,
                      }}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-[#FF5449] font-mono tracking-wider mt-2 block">
                        {errors.phone}
                      </span>
                    )}
                  </motion.div>


                  {/* TELL US ABOUT YOUR PROJECT */}
                  <motion.div variants={staggerItem} style={{ marginBottom: '32px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: '#FFFFFF',
                        letterSpacing: '0.25em',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '10px',
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
                      style={{
                        borderColor: errors.brief ? '#FF5449' : undefined,
                      }}
                    />
                    {errors.brief && (
                      <span className="text-[10px] text-[#FF5449] font-mono tracking-wider mt-2 block">
                        {errors.brief}
                      </span>
                    )}
                  </motion.div>

                  {/* RECOVERABLE ERROR BANNER (STATE 6) */}
                  {errors.general && (
                    <motion.div
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded bg-[#1A0B0B] border border-[#FF5449]/40 text-[#FF857C] text-[11px] font-mono tracking-wide leading-relaxed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <span>{errors.general}</span>
                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="px-3 py-1.5 bg-[#FF5449]/20 hover:bg-[#FF5449]/30 text-white rounded text-[10px] tracking-wider uppercase border border-[#FF5449]/40 cursor-pointer self-start sm:self-auto shrink-0 transition-colors"
                      >
                        RETRY TRANSMISSION
                      </button>
                    </motion.div>
                  )}

                  {/* SLOW LOADING REASSURANCE (STATE 5) */}
                  {isSubmitting && isSlowSubmission && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4 text-[10px] font-mono text-[#D4A373] tracking-widest text-center uppercase"
                    >
                      Taking a little longer than usual… finalizing dispatch
                    </motion.div>
                  )}

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
                    {isSubmitting
                      ? isSlowSubmission
                        ? 'TRANSMITTING… (HOLD TIGHT)'
                        : 'TRANSMITTING BRIEF…'
                      : 'SEND PROJECT BRIEF →'}
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
                  fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  color: '#F5F0E8',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                <span className="upright font-medium">Or simply email </span>
                <span className="italic font-normal text-[#4B5DF5]">us directly.</span>
              </h2>

              <motion.a
                variants={staggerItem}
                href="mailto:deepcipherstudio@gmail.com"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative inline-block"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginTop: '18px',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#4B5DF5'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
              >
                DEEPCIPHERSTUDIO@GMAIL.COM
                <span
                  className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: '#4B5DF5' }}
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
                  border: '1.5px solid #2C3480',
                }}
              />
              <motion.div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid #2C3480',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0A0A0A',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C3480" strokeWidth="1.5" aria-hidden="true">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#F5F0E8',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '16px',
              }}
            >
              <span className="upright font-medium">Transmission </span>
              <span className="italic font-normal text-[#2C3480]">received.</span>
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
                  color: '#2C3480',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid #2C3480',
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
