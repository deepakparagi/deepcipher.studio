'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import Noise from '@/components/ui/Noise';
import Link from 'next/link';

/* ==========================================================
   CONTACT PAGE — Simplified Intuitively, Aligned & Creative Polish
   ========================================================== */

const projectTypes = [
  'Portfolio',
  'Startup Website',
  'SaaS Platform',
  'Ecommerce',
  'Agency Website',
  'Brand Refresh',
];

const budgetRanges = [
  '₹50k–1L',
  '₹1L–2L',
  '₹2L–5L',
  '₹5L+',
];

const timelines = [
  'ASAP',
  '30 Days',
  '60 Days',
  'Flexible',
];

export default function ContactClient() {
  const { setCursor, resetCursor } = useCursor();
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: '',
  });

  // Custom validation error state
  const [errors, setErrors] = useState<{ name?: string; email?: string; projectType?: string; brief?: string }>({});

  // Auto-save form state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('deepcipher_luxury_intake_state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setForm((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Error rehydrating luxury intake state:', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('deepcipher_luxury_intake_state', JSON.stringify(form));
    }
  }, [form]);

  // Real-time custom validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === 'name') {
      if (!value.trim()) {
        newErrors.name = 'OPERATOR NAME REQUIRED';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        newErrors.email = 'TRANSMISSION ADDR REQUIRED';
      } else if (!emailRegex.test(value)) {
        newErrors.email = 'INVALID TRANSMISSION PROTOCOL';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'projectType') {
      if (!value) {
        newErrors.projectType = 'PROJECT TYPE REQUIRED';
      } else {
        delete newErrors.projectType;
      }
    }

    if (field === 'brief') {
      if (!value.trim()) {
        newErrors.brief = 'MISSION STATEMENT REQUIRED';
      } else if (value.trim().length < 20) {
        newErrors.brief = 'BRIEF REQUIRES MINIMUM 20 CHARACTERS';
      } else {
        delete newErrors.brief;
      }
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // WhatsApp pre-filled generation
  const handleWhatsAppSubmit = () => {
    // Final checks
    const finalErrors: typeof errors = {};
    if (!form.name.trim()) finalErrors.name = 'OPERATOR NAME REQUIRED';
    if (!form.email.trim()) {
      finalErrors.email = 'TRANSMISSION ADDR REQUIRED';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        finalErrors.email = 'INVALID TRANSMISSION PROTOCOL';
      }
    }
    if (!form.projectType) finalErrors.projectType = 'PROJECT TYPE REQUIRED';
    if (!form.brief.trim()) {
      finalErrors.brief = 'MISSION STATEMENT REQUIRED';
    } else if (form.brief.trim().length < 20) {
      finalErrors.brief = 'BRIEF REQUIRES MINIMUM 20 CHARACTERS';
    }

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      const firstError = Object.keys(finalErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const rawMessage = `🚀 NEW PROJECT REQUEST

Name: ${form.name}
Email: ${form.email}
Company: ${form.company || 'Not specified'}
Website: ${form.website || 'Not specified'}
Project Type: ${form.projectType || 'Not specified'}
Budget: ${form.budget || 'Not specified'}
Timeline: ${form.timeline || 'Not specified'}

Project Brief:
${form.brief}

Submitted via DEEPCIPHER.`;

    const encodedMessage = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/918197174493?text=${encodedMessage}`, '_blank');
  };

  const handleSubmit = (e?: FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();

    // Final checks
    const finalErrors: typeof errors = {};
    if (!form.name.trim()) finalErrors.name = 'OPERATOR NAME REQUIRED';
    if (!form.email.trim()) {
      finalErrors.email = 'TRANSMISSION ADDR REQUIRED';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        finalErrors.email = 'INVALID TRANSMISSION PROTOCOL';
      }
    }
    if (!form.projectType) finalErrors.projectType = 'PROJECT TYPE REQUIRED';
    if (!form.brief.trim()) {
      finalErrors.brief = 'MISSION STATEMENT REQUIRED';
    } else if (form.brief.trim().length < 20) {
      finalErrors.brief = 'BRIEF REQUIRES MINIMUM 20 CHARACTERS';
    }

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      const firstError = Object.keys(finalErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Build structured email pre-filled content
    const rawSubject = `DEEPCIPHER Onboarding: New Project Request from ${form.name}`;
    const rawBody = `🚀 NEW PROJECT PROTOCOL TRANSMISSION

OPERATOR IDENTIFICATION
Name: ${form.name}
Email: ${form.email}
Company: ${form.company || 'Not specified'}
Website: ${form.website || 'Not specified'}

PROJECT SPECS
Project Type: ${form.projectType}
Budget Tier: ${form.budget || 'Not specified'}
Timeline Lock: ${form.timeline || 'Not specified'}

PROJECT BRIEF / STORY:
${form.brief}

---
Sent via DEEPCIPHER intake terminal.`;

    const mailtoUrl = `mailto:deepakparagi03@gmail.com?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

    // Trigger email client redirect
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }

    // Success transition
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('deepcipher_luxury_intake_state');
    }
  };

  // Button hover states
  const [submitHovered, setSubmitHovered] = useState(false);
  const [whatsappHovered, setWhatsappHovered] = useState(false);
  const [footerSubmitHovered, setFooterSubmitHovered] = useState(false);
  const [footerWhatsappHovered, setFooterWhatsappHovered] = useState(false);

  return (
    <motion.main
      className="relative bg-[#0A0A0A] text-white selection:bg-[#B8956A]/30 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Noise opacity={0.03} />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <div key="intake-form" className="w-full flex flex-col">
            
            {/* ================================================
               SECTION 1: HERO
               ================================================ */}
            <section
              className="relative w-full border-b border-[rgba(245,240,232,0.08)] px-6 overflow-hidden flex flex-col justify-center items-center text-center"
              style={{ minHeight: '90vh' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative z-10 flex flex-col items-center max-w-[1000px]"
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: '#6B6560',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  [ START A PROJECT ]
                </span>

                {/* Main H1 */}
                <h1
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(54px, 8vw, 110px)',
                    color: '#F5F0E8',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    margin: 0,
                    marginBottom: '24px',
                    textTransform: 'none',
                    userSelect: 'none',
                  }}
                >
                  Let's build something<br />worth remembering.
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '14px',
                    color: '#6B6560',
                    fontWeight: 300,
                    maxWidth: '480px',
                    margin: '12px auto 0',
                    lineHeight: '1.65',
                  }}
                >
                  Tell us about your project. We'll review the details and respond with a clear strategic direction.
                </p>
              </motion.div>

              {/* Scroll Indicator */}
              <div
                className="absolute flex flex-col items-center gap-3 z-20 select-none"
                style={{ bottom: '48px' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#6B6560',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  SCROLL TO BRIEF
                </span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    height: '40px',
                    width: '0.5px',
                    background: '#B8956A',
                  }}
                />
              </div>
            </section>

            {/* ================================================
               SECTION 2: UNIFIED EDITORIAL FORM
               ================================================ */}
            <section
              style={{
                position: 'relative',
                width: '100%',
                borderBottom: '1px solid rgba(245,240,232,0.08)',
                paddingTop: '100px',
                paddingBottom: '120px',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              <div 
                style={{ 
                  maxWidth: '800px', 
                  margin: '0 auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '48px',
                  width: '100%' 
                }}
              >
                
                {/* Form Heading Header */}
                <div 
                  style={{
                    borderBottom: '1px solid rgba(245,240,232,0.06)',
                    paddingBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#B8956A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    // PROJECT BRIEF SPECIFICATIONS
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#6B6560' }}>
                    01 / INTAKE
                  </span>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  
                  {/* Operator Name */}
                  <div id="field-name" style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="FULL NAME *"
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: errors.name ? '1px solid #E8185A' : '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                        transition: 'border-color 0.3s ease',
                      }}
                    />
                    {errors.name && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: '#E8185A', display: 'block', marginTop: '6px' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div id="field-email" style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="EMAIL ADDRESS *"
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: errors.email ? '1px solid #E8185A' : '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                        transition: 'border-color 0.3s ease',
                      }}
                    />
                    {errors.email && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: '#E8185A', display: 'block', marginTop: '6px' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Organization / Company */}
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="ORGANIZATION / COMPANY"
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                      }}
                    />
                  </div>

                  {/* Existing Link / Website */}
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="EXISTING SITE LINK"
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                      }}
                    />
                  </div>

                  {/* Project Type Select */}
                  <div id="field-projectType" style={{ position: 'relative' }}>
                    <select
                      value={form.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        paddingRight: '32px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: errors.projectType ? '1px solid #E8185A' : '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                        appearance: 'none',
                        cursor: 'none',
                      }}
                    >
                      <option value="" disabled className="bg-[#0A0A0A] text-[#6B6560]">SELECT PROJECT TYPE *</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#0A0A0A] text-[#F5F0E8]">
                          {type.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.6 }}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#B8956A" strokeWidth="1">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {errors.projectType && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: '#E8185A', display: 'block', marginTop: '6px' }}>
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  {/* Budget Ranges */}
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        paddingRight: '32px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                        appearance: 'none',
                        cursor: 'none',
                      }}
                    >
                      <option value="" disabled className="bg-[#0A0A0A] text-[#6B6560]">SELECT BUDGET TIER</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-[#0A0A0A] text-[#F5F0E8]">
                          {range.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.6 }}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#B8956A" strokeWidth="1">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Timelines */}
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        paddingRight: '32px',
                        fontSize: '14px',
                        color: '#F5F0E8',
                        outline: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.15em',
                        borderRadius: 0,
                        appearance: 'none',
                        cursor: 'none',
                      }}
                    >
                      <option value="" disabled className="bg-[#0A0A0A] text-[#6B6560]">SELECT TIMELINE LOCK</option>
                      {timelines.map((time) => (
                        <option key={time} value={time} className="bg-[#0A0A0A] text-[#F5F0E8]">
                          {time.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.6 }}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#B8956A" strokeWidth="1">
                        <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Textarea strategic story */}
                  <div id="field-brief" style={{ position: 'relative' }}>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                      PROJECT BRIEF / STORY *
                    </span>
                    <textarea
                      value={form.brief}
                      onChange={(e) => handleInputChange('brief', e.target.value)}
                      placeholder="What are you building? Who is it for? What problem does it solve? What does success look like?"
                      className="protocol-input"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        minHeight: '300px',
                        border: 'none',
                        borderBottom: errors.brief ? '1px solid #E8185A' : '1px solid rgba(245,240,232,0.08)',
                        fontFamily: 'var(--font-body), sans-serif',
                        lineHeight: '1.7',
                        resize: 'none',
                        transition: 'border-color 0.3s ease',
                        borderRadius: 0,
                        outline: 'none',
                        color: '#F5F0E8',
                        fontSize: '16px',
                      }}
                    />
                    {errors.brief && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono), monospace', color: '#E8185A', display: 'block', marginTop: '6px' }}>
                        {errors.brief}
                      </span>
                    )}
                  </div>

                  {/* Immediate Submit group right below the form */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '24px',
                      flexWrap: 'wrap',
                      marginTop: '16px',
                      borderTop: '0.5px solid rgba(245,240,232,0.06)',
                      paddingTop: '32px'
                    }}
                  >
                    <button
                      type="submit"
                      onMouseEnter={() => {
                        setCursor('link');
                        setSubmitHovered(true);
                      }}
                      onMouseLeave={() => {
                        resetCursor();
                        setSubmitHovered(false);
                      }}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        padding: '16px 36px',
                        border: '1px solid #B8956A',
                        backgroundColor: submitHovered ? '#B8956A' : 'transparent',
                        color: submitHovered ? '#0A0A0A' : '#B8956A',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                        cursor: 'none',
                        outline: 'none',
                      }}
                    >
                      Submit Project →
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      onMouseEnter={() => {
                        setCursor('link');
                        setWhatsappHovered(true);
                      }}
                      onMouseLeave={() => {
                        resetCursor();
                        setWhatsappHovered(false);
                      }}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        padding: '16px 36px',
                        border: '1px solid #B8956A',
                        backgroundColor: whatsappHovered ? '#B8956A' : 'transparent',
                        color: whatsappHovered ? '#0A0A0A' : '#B8956A',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                        cursor: 'none',
                        outline: 'none',
                      }}
                    >
                      WhatsApp ↗
                    </button>
                  </div>

                </form>

              </div>
            </section>

            {/* ================================================
               SECTION 3: CREATIVE closing cta (Reinvented screenshot block)
               ================================================ */}
            <section
              style={{
                width: '100%',
                padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 64px)',
                backgroundColor: '#0A0A0A',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Luxury HUD Outlined Framing Box with Corner Tick Marks */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  border: '1px dashed rgba(184, 149, 106, 0.15)',
                  position: 'relative',
                  padding: 'clamp(64px, 8vw, 96px) clamp(32px, 6vw, 64px)',
                  textAlign: 'center',
                  backgroundColor: '#0C0C0C',
                }}
              >
                {/* Technical HUD Corners */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#B8956A]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#B8956A]" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#B8956A]" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#B8956A]" />

                {/* Subtitle Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    color: '#6B6560',
                    letterSpacing: '0.25em',
                    display: 'block',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                  }}
                >
                  [ READY TO BEGIN ]
                </span>

                {/* Massive Creative Cormorant Garamond italic Title */}
                <motion.h2
                  whileHover={{ letterSpacing: '0.04em' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(44px, 6.5vw, 84px)',
                    color: '#F5F0E8',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    marginBottom: '20px',
                    cursor: 'default',
                  }}
                >
                  Start the conversation.
                </motion.h2>

                {/* Explanatory Body */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#6B6560',
                    maxWidth: '520px',
                    margin: '0 auto 48px',
                    lineHeight: '1.75',
                  }}
                >
                  Every project begins with a single conversation. Tell us what you're building and we'll tell you exactly how we'd approach it.
                </p>

                {/* Replicated Screenshot buttons inside our creative box */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => {
                      setCursor('link');
                      setFooterSubmitHovered(true);
                    }}
                    onMouseLeave={() => {
                      resetCursor();
                      setFooterSubmitHovered(false);
                    }}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      padding: '16px 36px',
                      border: '1px solid #B8956A',
                      backgroundColor: footerSubmitHovered ? '#B8956A' : 'transparent',
                      color: footerSubmitHovered ? '#0A0A0A' : '#B8956A',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                      cursor: 'none',
                      outline: 'none',
                    }}
                  >
                    Submit Project →
                  </button>

                  <button
                    onClick={handleWhatsAppSubmit}
                    onMouseEnter={() => {
                      setCursor('link');
                      setFooterWhatsappHovered(true);
                    }}
                    onMouseLeave={() => {
                      resetCursor();
                      setFooterWhatsappHovered(false);
                    }}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      padding: '16px 36px',
                      border: '1px solid #B8956A',
                      backgroundColor: footerWhatsappHovered ? '#B8956A' : 'transparent',
                      color: footerWhatsappHovered ? '#0A0A0A' : '#B8956A',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                      cursor: 'none',
                      outline: 'none',
                    }}
                  >
                    WhatsApp ↗
                  </button>
                </div>

              </div>
            </section>

          </div>
        ) : (
          /* ================================================
             SUCCESS STATE SCREEN
             ================================================ */
          <motion.section
            key="success-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8956A" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#F5F0E8',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: '16px',
              }}
            >
              Transmission received.
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                color: '#9A9590',
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
                  cursor: 'none',
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
                  cursor: 'none',
                }}
              >
                Back home
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .protocol-input:focus {
          border-bottom-color: #B8956A !important;
        }
        .hover-lift:hover {
          border-color: #B8956A !important;
          color: #F5F0E8 !important;
        }
      `}</style>
    </motion.main>
  );
}
