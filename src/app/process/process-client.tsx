'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import RevealLine from '@/components/ui/RevealLine';
import SectionLabel from '@/components/ui/SectionLabel';
import MagneticButton from '@/components/ui/MagneticButton';
import AccordionItem from '@/components/ui/AccordionItem';

/* ========================================
   Process Client Page
   ======================================== */

const phases = [
  {
    number: '01',
    name: 'Discover',
    duration: '1–2 WEEKS',
    quote: 'Before we design a pixel, we understand your business.',
    description:
      'We spend the first phase becoming experts in your business. We look at your competitors, your audience, your existing digital presence, and — most importantly — what you need your website to actually do. Most agencies skip this. We consider it the most important phase of the project.',
    steps: [
      'Brand & business discovery call',
      'Competitor website audit',
      'Target audience research',
      'Content inventory',
      'Goals & conversion mapping',
      'Project brief documentation',
    ],
  },
  {
    number: '02',
    name: 'Strategise',
    duration: '1 WEEK',
    quote: "We define the blueprint before we touch Figma.",
    description:
      'We map every page, every user journey, and every conversion point before a single design is drawn. This phase ends with your full sign-off on structure and direction — meaning no surprises when you see designs.',
    steps: [
      'Sitemap & page structure',
      'User journey mapping',
      'Conversion goal prioritisation',
      'Content structure per page',
      'Visual direction moodboard',
      'Sign-off before design begins',
    ],
  },
  {
    number: '03',
    name: 'Design',
    duration: '3–5 WEEKS',
    quote: 'This is where your website takes shape.',
    description:
      'We design desktop and mobile simultaneously — never as an afterthought. You review in Figma with commenting enabled. We present rationale for every decision. We include two rounds of revisions. By sign-off, your website looks exactly as it will be built.',
    steps: [
      'Homepage design (desktop + mobile)',
      'Inner page designs',
      'Component & interaction design',
      'Brand integration',
      'Client review round 1',
      'Revisions & refinement',
      'Client review round 2',
      'Final design sign-off',
    ],
  },
  {
    number: '04',
    name: 'Build & Launch',
    duration: '2–4 WEEKS',
    quote: 'We build it fast. We launch it right.',
    description:
      'We build your website to a Lighthouse score of 95+. We test on 12 device sizes. We set up your CMS so you can update content without a developer. We launch with you, not just hand off to you. And we are available for 30 days post-launch for any issues.',
    steps: [
      'Development in Next.js / Framer / Webflow',
      'CMS setup & content entry',
      'Animation implementation',
      'Cross-browser & device testing',
      'SEO meta setup',
      'Performance optimisation',
      'Client UAT testing',
      'Launch & 30-day monitoring',
    ],
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take 6–10 weeks from kickoff to launch. A brand identity alone is typically 4–6 weeks. A website redesign with brand work is 8–12 weeks. We always agree on a timeline before we start and we stick to it.',
  },
  {
    q: 'What is your pricing structure?',
    a: "We price on a project basis, not hourly. After an initial discovery call, we send a clear proposal with a fixed price, scope, and timeline. Website projects typically start from €4,500. Brand identity projects start from €3,000. There are never surprise charges.",
  },
  {
    q: 'Do you work with clients internationally?',
    a: 'Yes. We work with clients across Europe, North America, and Asia-Pacific. We use Figma for design collaboration, Loom for async video updates, and schedule live calls that work across time zones. Distance has never affected the quality of our work.',
  },
  {
    q: 'What platforms do you build on?',
    a: 'We build primarily on Next.js for custom-coded sites, Framer for design-led sites that need quick iteration, and Webflow for marketing sites that need visual CMS editing. We recommend the right platform based on your specific needs — not our preferences.',
  },
  {
    q: 'What happens after launch?',
    a: "Every project includes 30 days of post-launch support at no additional cost. After that, we offer ongoing retainer packages for maintenance, updates, and optimisation. Most of our clients stay with us long-term because we genuinely care about their success.",
  },
  {
    q: 'Can you work with our existing brand?',
    a: "Absolutely. Not every project needs a rebrand. If you have an established brand identity, we'll work within your existing guidelines to design and build a website that feels authentically yours. We can also refine and evolve your brand if needed.",
  },
];

const whyUs = [
  {
    icon: '◎',
    title: 'Obsessive Craft',
    body: 'We check every pixel, every line-height, every animation curve. We don\'t ship work we wouldn\'t proudly put in our own portfolio.',
  },
  {
    icon: '◇',
    title: 'Business-First Design',
    body: 'Pretty websites that don\'t convert are a waste of money. Every design decision we make is backed by a business reason.',
  },
  {
    icon: '◆',
    title: 'End-to-End Delivery',
    body: 'From brand strategy to code deployment. One team, one relationship, one standard of quality throughout.',
  },
];

export default function ProcessClient() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          backgroundColor: 'var(--white)',
          paddingTop: 'var(--section-padding)',
          paddingBottom: '48px',
        }}
        className="px-6 md:px-10 lg:px-20 section-standard"
      >
        <SectionLabel>{'[ 04 — HOW WE WORK ]'}</SectionLabel>
        <div style={{ marginTop: '16px' }}>
          <AnimatedText splitBy="word" className="text-section-title">
            How we / build your / website
          </AnimatedText>
        </div>
        <RevealLine delay={0.3}>
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontWeight: 300,
              fontSize: '17px',
              color: 'var(--ink-tertiary)',
              marginTop: '32px',
            }}
          >
            Four phases. Zero guesswork. One outcome — a website that works.
          </p>
        </RevealLine>
      </section>

      {/* Timeline */}
      <section
        style={{
          backgroundColor: 'var(--white)',
          position: 'relative',
        }}
        className="px-6 md:px-10 lg:px-20 pb-[var(--section-padding)] section-standard"
      >
        {/* Center line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: '0px',
            borderLeft: '1px dashed var(--border)',
          }}
          className="hidden md:block"
        />

        {phases.map((phase, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                position: 'relative',
              }}
              className="grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 py-10 md:py-16"
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '96px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  border: '2px solid var(--border)',
                  backgroundColor: 'var(--white)',
                  zIndex: 2,
                }}
                className="hidden md:block"
              />

              <div
                className={`text-left ${isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:text-left'}`}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'var(--accent-warm)',
                    letterSpacing: '0.22em',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {phase.number}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(36px, 4vw, 64px)',
                    color: 'var(--ink)',
                  }}
                >
                  {phase.name}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: 'var(--ink-ghost)',
                    border: '1px solid var(--border)',
                    padding: '4px 12px',
                    display: 'inline-block',
                    marginTop: '8px',
                    marginBottom: '24px',
                  }}
                >
                  {phase.duration}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: '18px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                    maxWidth: '420px',
                    marginLeft: isLeft ? 'auto' : 0,
                    marginRight: isLeft ? 0 : 'auto',
                  }}
                >
                  &ldquo;{phase.quote}&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'var(--ink-tertiary)',
                    lineHeight: 1.8,
                    marginBottom: '32px',
                    maxWidth: '420px',
                    marginLeft: isLeft ? 'auto' : 0,
                    marginRight: isLeft ? 0 : 'auto',
                  }}
                >
                  {phase.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                  className={`items-start ${isLeft ? 'md:items-end' : 'md:items-start'}`}
                >
                  {phase.steps.map((step) => (
                    <span
                      key={step}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        color: 'var(--ink-tertiary)',
                      }}
                    >
                      → {step}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* FAQ */}
      <section
        style={{
          backgroundColor: 'var(--surface-subtle)',
          paddingTop: 'var(--section-padding)',
          paddingBottom: 'var(--section-padding)',
        }}
        className="px-6 md:px-10 lg:px-20 section-standard"
      >
        <AnimatedText splitBy="word" className="faq-heading">
          Common / questions
        </AnimatedText>
        <div style={{ marginTop: '48px', maxWidth: '800px' }}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} question={faq.q}>
              {faq.a}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section
        style={{
          backgroundColor: 'var(--white)',
          paddingTop: 'var(--section-padding)',
          paddingBottom: 'var(--section-padding)',
        }}
        className="px-6 md:px-10 lg:px-20 section-standard"
      >
        <AnimatedText splitBy="word" className="why-heading">
          Why ambitious / brands choose us
        </AnimatedText>
        <div
          style={{
            display: 'grid',
            gap: '24px',
            marginTop: '48px',
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ borderColor: 'rgba(184,149,106,0.4)' }}
              style={{
                backgroundColor: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                padding: '40px',
                transition: 'border-color 0.5s',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: '48px',
                  color: 'rgba(184,149,106,0.4)',
                  display: 'block',
                  transition: 'color 0.4s',
                }}
              >
                {item.icon}
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: '24px',
                  color: 'var(--ink)',
                  marginTop: '16px',
                  marginBottom: '12px',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontWeight: 300,
                  fontSize: '15px',
                  color: 'var(--ink-tertiary)',
                  lineHeight: 1.8,
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </>
  );
}
