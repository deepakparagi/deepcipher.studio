'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import FloatingInput from '@/components/ui/FloatingInput';

/* ========================================
   Start a Project — Multi-step wizard
   ======================================== */


const stepLabels = ['YOURSELF', 'YOUR NEEDS', 'DETAILS', 'BRIEF'];

const serviceOptions = [
  { id: 'website', title: 'New Website', desc: 'Design and development from scratch' },
  { id: 'brand', title: 'Brand Identity & Logo', desc: 'Logo, visual identity, brand guidelines' },
  { id: 'redesign', title: 'Website Redesign', desc: 'Modernise an existing website' },
  { id: 'system', title: 'UI / Design System', desc: 'Component library and design tokens' },
];

const timelineOptions = ['Under 4 weeks', '1–2 months', '2–3 months', 'No rush'];
const budgetOptions = ['Under ₹2,50,000', '₹2,50,000–₹5,00,000', '₹5,00,000–₹10,00,000', '₹10,00,000–₹25,00,000', '₹25,00,000+'];

export default function StartProjectClient() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [info, setInfo] = useState({ name: '', email: '', company: '', role: '', website: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [success, setSuccess] = useState('');
  const [description, setDescription] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [source, setSource] = useState('');

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-[color:var(--off-white)] flex flex-col items-center justify-center p-6 pt-32 md:p-20 md:pt-40 relative"
      >
        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 32, left: 32, width: 32, height: 32, borderTop: '1px solid var(--border-accent)', borderLeft: '1px solid var(--border-accent)' }} />
        <div style={{ position: 'absolute', bottom: 32, right: 32, width: 32, height: 32, borderBottom: '1px solid var(--border-accent)', borderRight: '1px solid var(--border-accent)' }} />

        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          style={{ marginBottom: '32px' }}
        >
          <motion.circle
            cx="24" cy="24" r="22"
            stroke="var(--accent-warm)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M14 24L21 31L34 18"
            stroke="var(--accent-warm)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        </motion.svg>

        <AnimatedText splitBy="word" className="wizard-heading" delay={0.3}>
          We&apos;ve got / your brief.
        </AnimatedText>
        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontWeight: 300,
            fontSize: '17px',
            color: 'var(--ink-tertiary)',
            marginTop: '24px',
            textAlign: 'center',
            lineHeight: 1.85,
            maxWidth: '500px',
          }}
        >
          We’ll review your project details and respond within 48 hours with a proposal.
        </p>
        <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              color: 'var(--ink-tertiary)',
              letterSpacing: '0.15em',
              textDecoration: 'none',
            }}
          >
            ← Back to home
          </a>
          <a
            href="/work"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              color: 'var(--ink)',
              letterSpacing: '0.15em',
              textDecoration: 'none',
            }}
          >
            View our work →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[color:var(--off-white)] flex flex-col items-center justify-center pt-32 md:pt-40 pb-20 px-6 md:px-10 lg:px-20 relative section-standard"
    >
      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 32, left: 32, width: 32, height: 32, borderTop: '1px solid var(--border-accent)', borderLeft: '1px solid var(--border-accent)' }} />
      <div style={{ position: 'absolute', bottom: 32, right: 32, width: 32, height: 32, borderBottom: '1px solid var(--border-accent)', borderRight: '1px solid var(--border-accent)' }} />

      {/* Progress */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '64px' }}>
        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '2px',
                backgroundColor:
                  i < step ? 'var(--accent-warm)' : i === step ? 'var(--ink)' : 'var(--ink-ghost)',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {/* Desktop Labels */}
          <div className="hidden sm:flex justify-between w-full">
            {stepLabels.map((label, i) => (
              <span
                key={label}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: i <= step ? 'var(--ink-tertiary)' : 'var(--ink-ghost)',
                  letterSpacing: '0.15em',
                }}
              >
                {label}
              </span>
            ))}
          </div>
          {/* Mobile Label */}
          <div className="flex sm:hidden justify-center w-full" style={{ position: 'relative', zIndex: 10 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px',
                color: 'var(--ink-tertiary)',
                letterSpacing: '0.15em',
                display: 'block',
                marginTop: '4px',
              }}
            >
              STEP {step + 1} OF 4 — {stepLabels[step]}
            </span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedText splitBy="word" className="wizard-heading">
                Who are / you?
              </AnimatedText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 form-group-container" style={{ marginTop: '48px' }}>
                <div className="md:col-span-1">
                  <FloatingInput
                    label="YOUR NAME *"
                    type="text"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-1">
                  <FloatingInput
                    label="EMAIL *"
                    type="email"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <FloatingInput
                    label="COMPANY"
                    type="text"
                    value={info.company}
                    onChange={(e) => setInfo({ ...info, company: e.target.value })}
                  />
                </div>
                <div className="md:col-span-1">
                  <FloatingInput
                    label="YOUR ROLE"
                    type="text"
                    value={info.role}
                    onChange={(e) => setInfo({ ...info, role: e.target.value })}
                  />
                </div>
                <div className="md:col-span-1">
                  <FloatingInput
                    label="EXISTING WEBSITE"
                    type="url"
                    value={info.website}
                    onChange={(e) => setInfo({ ...info, website: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ marginTop: '48px' }}>
                <MagneticButton variant="filled" onClick={() => setStep(1)} cursorLabel="NEXT">
                  Continue →
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedText splitBy="word" className="wizard-heading">
                What do / you need?
              </AnimatedText>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12"
              >
                {serviceOptions.map((opt) => {
                  const selected = selectedServices.includes(opt.id);
                  return (
                    <motion.div
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: selected ? 'var(--surface-subtle)' : 'var(--white)',
                        border: `1px solid ${selected ? 'var(--accent-warm)' : 'var(--border)'}`,
                        padding: '40px',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s, background-color 0.3s',
                        position: 'relative',
                      }}
                    >
                      {selected && (
                        <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-warm)' }}>✓</div>
                      )}
                      <h4 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontStyle: 'italic', fontSize: '24px', color: 'var(--ink)', marginBottom: '8px' }}>
                        {opt.title}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--ink-tertiary)' }}>
                        {opt.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
                <MagneticButton variant="ghost" onClick={() => setStep(0)} cursorLabel="BACK">
                  ← Back
                </MagneticButton>
                <MagneticButton variant="filled" onClick={() => setStep(2)} cursorLabel="NEXT">
                  Continue →
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedText splitBy="word" className="wizard-heading">
                Tell us / more
              </AnimatedText>

              <div style={{ marginTop: '48px' }}>
                <div className="mb-4">
                  <label style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'var(--accent-warm)', letterSpacing: '0.2em' }}>TIMELINE</label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
                  {timelineOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      style={{
                        border: `1px solid ${timeline === opt ? 'var(--accent-warm)' : 'var(--border)'}`,
                        padding: '24px 16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'border-color 0.3s',
                        fontFamily: 'var(--font-display), serif',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        fontSize: '18px',
                        color: 'var(--ink)',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="mt-8 mb-4">
                  <label style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'var(--accent-warm)', letterSpacing: '0.2em' }}>BUDGET</label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-10">
                  {budgetOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => setBudget(opt)}
                      style={{
                        border: `1px solid ${budget === opt ? 'var(--accent-warm)' : 'var(--border)'}`,
                        padding: '20px 16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'border-color 0.3s',
                        fontFamily: 'var(--font-display), serif',
                        fontWeight: 300,
                        fontSize: '16px',
                        color: 'var(--ink)',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <FloatingInput
                  label="WHAT DOES SUCCESS LOOK LIKE?"
                  value={success}
                  onChange={(e) => setSuccess(e.target.value)}
                  placeholder="e.g. More leads, higher conversions..."
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
                <MagneticButton variant="ghost" onClick={() => setStep(1)} cursorLabel="BACK">
                  ← Back
                </MagneticButton>
                <MagneticButton variant="filled" onClick={() => setStep(3)} cursorLabel="NEXT">
                  Continue →
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedText splitBy="word" className="wizard-heading">
                Almost / there.
              </AnimatedText>

              <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <FloatingInput
                    label="DESCRIBE YOUR PROJECT IN DETAIL"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us everything about your project..."
                  />
                </div>

                <div>
                  <FloatingInput
                    label="INSPIRATION URLS"
                    value={inspiration}
                    onChange={(e) => setInspiration(e.target.value)}
                    placeholder="Websites you admire (comma separated)"
                  />
                </div>

                <div>
                  <div className="py-2">
                    <label style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: 'var(--accent-warm)', letterSpacing: '0.2em' }}>HOW DID YOU FIND US?</label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      style={{ 
                        width: '100%', 
                        background: 'transparent', 
                        border: 'none', 
                        borderBottom: '1px solid var(--border)', 
                        padding: '12px 0', 
                        fontFamily: 'var(--font-body)', 
                        fontSize: '16px', 
                        color: 'var(--ink)', 
                        outline: 'none',
                        cursor: 'pointer' 
                      }}
                    >
                      <option value="">Select</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="awwwards">Awwwards / FWA</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* File upload zone */}
                <div
                  style={{
                    border: '2px dashed var(--border)',
                    padding: '48px',
                    textAlign: 'center',
                    transition: 'border-color 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      color: 'var(--ink-ghost)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    DRAG FILES HERE OR CLICK TO UPLOAD
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      color: 'var(--ink-ghost)',
                      marginTop: '8px',
                    }}
                  >
                    PDF, DOC, images — max 10MB
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
                <MagneticButton variant="ghost" onClick={() => setStep(2)} cursorLabel="BACK">
                  ← Back
                </MagneticButton>
                <MagneticButton variant="filled" onClick={handleSubmit} cursorLabel="SEND" fullWidth>
                  SEND MY PROJECT BRIEF →
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .wizard-heading {
           font-family: var(--font-display), serif;
           font-weight: 300;
           font-style: italic;
           font-size: clamp(32px, 5vw, 64px);
           color: var(--ink);
           line-height: 1.1;
           margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .form-group-container {
             gap: 48px !important;
          }
          .wizard-textarea {
             min-height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
}
