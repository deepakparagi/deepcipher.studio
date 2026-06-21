'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/ui/CursorProvider';
import type { Project } from '@/lib/projects';
import Noise from '@/components/ui/Noise';
import AnimatedText from '@/components/ui/AnimatedText';

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <div className="flex flex-col">
      <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
        [ {label} ]
      </span>
      <h2 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 32px)', color: '#F5F0E8', lineHeight: 1.3, margin: 0, textTransform: 'none' }}>
        {text}
      </h2>
    </div>
  );
}

function getProjectBackground(slug: string) {
  switch (slug) {
    case 'shingri-developers':
      return 'linear-gradient(160deg, #0D1B2A 0%, #1B3A5C 25%, #2E6B9E 45%, #C4763A 65%, #E8A456 80%, #F2C87E 100%)';
    case 'gadag-info':
      return 'linear-gradient(150deg, #1A0A2E 0%, #3D1A6E 30%, #7B3FA0 55%, #C4663A 75%, #E8954A 90%, #F5C878 100%)';
    case 'deepak-portfolio':
      return 'linear-gradient(165deg, #0A0A0A 0%, #1A1208 20%, #3D2E0A 40%, #8B6914 60%, #C4A028 78%, #E8C84A 92%, #F5E8A0 100%)';
    case 'khans-fitness':
      return 'linear-gradient(155deg, #050D1A 0%, #0A2040 25%, #0E3D7A 45%, #1560B8 62%, #2890D8 78%, #5AB8E8 90%, #A0D8F5 100%)';
    case 'cinepulse-ai':
      return 'linear-gradient(158deg, #0A0F0A 0%, #0D2010 25%, #1A4020 45%, #2A7034 62%, #3A9E48 76%, #6AC878 88%, #A8E8B0 100%)';
    case 'bipin-chikkatti-college':
      return 'linear-gradient(162deg, #0D0A1A 0%, #1E1040 25%, #3D1A7A 45%, #6828B0 62%, #9040D0 76%, #C060E8 88%, #E0A0F8 100%)';
    default:
      return 'linear-gradient(160deg, #0A0A0A 0%, #1A1A1A 100%)';
  }
}

function getProjectImageFolder(slug: string) {
  switch (slug) {
    case 'bipin-chikkatti-college':
      return 'Bipin Chikkati School';
    case 'cinepulse-ai':
      return 'Cinepusle AI';
    case 'deepak-portfolio':
      return 'Deepak Paragi Portfolio';
    case 'gadag-info':
      return 'Gadag_info';
    case 'khans-fitness':
      return "Khan's Fitness";
    case 'shingri-developers':
      return 'Shingri developers';
    default:
      return '';
  }
}

export default function CaseStudyClient({ project, nextProject }: { project: Project; nextProject: Project }) {
  const { setCursor, resetCursor } = useCursor();
  
  const bgGradient = getProjectBackground(project.slug);
  const imageFolder = getProjectImageFolder(project.slug);
  const stats = project.stats || [
    { label: 'DEEPCIPHER AUDIT SCORE', value: '8.0/10' },
    { label: 'PROJECT VALUE TIER', value: 'Standard' },
    { label: 'POSITIONING', value: 'Production' },
  ];
  
  const paragraphs = project.paragraphs || [
    project.description,
    project.challenge,
    project.solution
  ].filter(Boolean);

  const modules = project.modules || [
    { label: 'CUSTOM WEB DESIGN', value: '', description: '' },
    { label: 'DEVELOPMENT & DEPLOYMENT', value: '', description: '' },
    { label: 'BRAND IDENTITY SYSTEM', value: '', description: '' },
    { label: 'PERFORMANCE OPTIMISATION', value: '', description: '' }
  ];

  const techStack = project.techStack || [];
  const pId = String(project.id).padStart(2, '0');

  return (
    <motion.main
      className="relative text-[#F5F0E8] selection:bg-[#B8956A]/20 pb-0 overflow-x-hidden bg-[#0A0A0A]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Noise opacity={0.03} />
      
      {/* SECTION 1: HERO */}
      <section 
        className="relative overflow-hidden flex flex-col justify-center items-center text-center px-[24px] md:px-[64px] pt-[120px] md:pt-[80px] pb-[80px] md:pb-[40px] w-full"
        style={{ minHeight: '100svh' }}
      >
        {/* Mobile alignment override using tailwind classes on the inner container below */}
        <div 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 z-0" style={{ background: bgGradient, opacity: 0.12 }} />
        </div>
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(255,255,255,0.015) 32px, rgba(255,255,255,0.015) 34px)`
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-end md:justify-center w-full max-w-[1400px] h-full pb-[80px] md:pb-0">
          <span 
            className="mb-[20px] uppercase block"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#6B6560' }}
          >
            [ CASE STUDY — {pId} ]
          </span>
          <AnimatedText 
            splitBy="word"
            as="h1"
            className="m-0 mb-[16px] italic font-light normal-case"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(36px, 10vw, 100px)',
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            {project.title}
          </AnimatedText>

          <div style={{ width: '48px', height: '1px', background: '#B8956A', margin: '0 auto 20px' }} />

          <p 
            className="italic font-light m-0 mb-[48px] max-w-[600px]"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', color: '#9A9590' }}
          >
            {project.description}
          </p>

          <div 
            className="grid grid-cols-2 md:grid-cols-4 w-full max-w-[900px] pt-[40px] gap-y-8 gap-x-4 md:gap-y-0"
            style={{ borderTop: '0.5px solid rgba(245,240,232,0.1)' }}
          >
            <div className="text-left md:border-r border-[rgba(245,240,232,0.08)] md:pr-6">
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#6B6560', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>CLIENT</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', fontWeight: 300, color: '#F5F0E8' }}>{project.client}</span>
            </div>
            <div className="text-left md:border-r border-[rgba(245,240,232,0.08)] md:px-6">
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#6B6560', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>CATEGORY</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', fontWeight: 300, color: '#F5F0E8' }}>{project.category}</span>
            </div>
            <div className="text-left md:border-r border-[rgba(245,240,232,0.08)] md:px-6">
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#6B6560', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>YEAR</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', fontWeight: 300, color: '#F5F0E8' }}>{project.year}</span>
            </div>
            <div className="text-left md:pl-6">
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#6B6560', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>ROLE</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', fontWeight: 300, color: '#F5F0E8' }}>{project.tags[0] || 'Design'}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px] z-10">
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.2em' }}>SCROLL</span>
          <motion.div 
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '0.5px', height: '40px', background: '#B8956A' }}
          />
        </div>
      </section>

      {/* SECTION 2: NARRATIVE */}
      <section 
        className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-[64px] lg:gap-[80px] items-start px-[24px] md:px-[64px] py-[80px] md:py-[100px]"
        style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)' }}
      >
        <div className="flex flex-col gap-16">
          <NarrativeBlock label="OVERVIEW" text={project.overview || ''} />
          <NarrativeBlock label="THE PROBLEM" text={project.problem || ''} />
          <NarrativeBlock label="THE CHALLENGE" text={project.challenge || ''} />
          <NarrativeBlock label="OBJECTIVE" text={project.objective || ''} />
          <NarrativeBlock label="RESEARCH & STRATEGY" text={project.researchStrategy || ''} />
          <NarrativeBlock label="DESIGN PROCESS" text={project.designProcess || ''} />
          <NarrativeBlock label="DEVELOPMENT PROCESS" text={project.developmentProcess || ''} />
          <NarrativeBlock label="CHALLENGES" text={project.challenges || ''} />
          <NarrativeBlock label="SOLUTIONS" text={project.solutions || ''} />
          <NarrativeBlock label="FINAL OUTCOME" text={project.finalOutcome || ''} />
          <NarrativeBlock label="KEY LEARNINGS" text={project.keyLearnings || ''} />
          <NarrativeBlock label="RESULTS" text={project.resultsNarrative || ''} />

          {/* Legacy Paragraphs Fallback */}
          {(!project.overview && !project.problem && paragraphs.length > 0) && (
            <div className="flex flex-col">
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
                [ NARRATIVE ]
              </span>
              <div className="flex flex-col gap-[20px]">
                {paragraphs.map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '15px', fontWeight: 300, color: '#9A9590', lineHeight: 1.8, margin: 0, maxWidth: '100%' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col order-last lg:order-none lg:sticky lg:top-[120px]">
          {project.roleResponsibilities && project.roleResponsibilities.length > 0 && (
            <>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
                [ ROLE & RESPONSIBILITIES ]
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {project.roleResponsibilities.map((role, idx) => (
                  <span key={idx} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: '#B8956A', border: '0.5px solid rgba(184,149,106,0.3)', background: 'rgba(184,149,106,0.05)', padding: '6px 12px', borderRadius: 0, textTransform: 'uppercase' }}>
                    {role}
                  </span>
                ))}
              </div>
            </>
          )}

          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
            [ TECH STACK ]
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {techStack.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.12em', color: '#B8956A', border: '0.5px solid rgba(184,149,106,0.3)', background: 'rgba(184,149,106,0.05)', padding: '6px 12px', borderRadius: 0, textTransform: 'uppercase' }}>
                {t}
              </span>
            ))}
          </div>

          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
            [ DELIVERABLES ]
          </span>
          <div style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)', paddingTop: '20px', marginBottom: '32px' }}>
            {modules.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '0.5px solid rgba(245,240,232,0.04)', fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 300, color: '#9A9590' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#B8956A', flexShrink: 0 }} />
                {m.label}
              </div>
            ))}
          </div>

          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('hover', 'LIVE')}
              onMouseLeave={resetCursor}
              className="group block"
              style={{
                marginTop: '24px',
                width: '100%',
                border: '1px solid rgba(245,240,232,0.15)',
                background: 'transparent',
                padding: '14px 0',
                textAlign: 'center',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: '#F5F0E8',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <span className="group-hover:text-[#B8956A] transition-colors duration-300">ENTER LIVE EXPERIENCE →</span>
            </a>
          )}
        </div>
      </section>

      {/* SECTION 3: VISUAL ARCHIVE */}
      <section className="px-[24px] md:px-[64px] py-[80px] md:py-[100px]" style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', display: 'block', marginBottom: '48px', letterSpacing: '0.18em' }}>[ VISUAL ARCHIVE ]</span>
        <div className="flex flex-col gap-[32px] md:gap-[64px]">
          {[1, 2, 3].map((num, i) => {
            const imagePath = imageFolder ? `/images/case-studies/${imageFolder}/${num}.png` : null;
            const isFullWidth = i === 0;
            
            return (
              <motion.div 
                key={num} 
                className={`relative overflow-hidden cursor-pointer group ${isFullWidth ? 'w-full' : 'w-full md:w-[48%]'} ${i === 2 ? 'self-end' : ''}`}
                onMouseEnter={() => setCursor('hover', 'ZOOM')} 
                onMouseLeave={resetCursor}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  border: '1px solid rgba(245,240,232,0.05)',
                  background: 'rgba(255,255,255,0.01)'
                }}
              >
                 <div className="w-full relative" style={{ aspectRatio: isFullWidth ? '16/9' : '4/5' }}>
                   {imagePath && (
                     <motion.img 
                       src={imagePath}
                       alt={`${project.title} screenshot ${num}`}
                       className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                     />
                   )}
                   
                   {/* Extremely subtle vignette to maintain text readability without obscuring the image */}
                   <div 
                     className="absolute inset-0 z-10 pointer-events-none"
                     style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 20%, transparent 100%)' }}
                   />
                   
                   <div 
                     className="absolute bottom-0 left-0 right-0 p-[24px] z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   >
                     <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#F5F0E8', letterSpacing: '0.12em' }}>
                       // DETAIL 0{num} / 03
                     </span>
                     <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#B8956A', letterSpacing: '0.1em' }}>
                       [ EXAMINE ]
                     </span>
                   </div>
                 </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: PULL QUOTE */}
      <section style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)' }}>
        <div className="px-[24px] md:px-[64px] py-[80px] md:py-[120px] max-w-[928px] mx-auto">
          <div style={{ borderLeft: '2px solid #B8956A', paddingLeft: '40px' }}>
            <p style={{ fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px, 3vw, 34px)', color: '#F5F0E8', lineHeight: 1.4, margin: 0 }}>
              {project.pullQuote || 'Capturing structural harmony through liquid motion and architectural editorial balance.'}
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', fontWeight: 300, color: '#9A9590', lineHeight: 1.8, marginTop: '24px', paddingLeft: '40px', marginBottom: 0 }}>
            We believe that every technical platform deserves a luxury execution. By implementing bespoke micro-interactions, Variable typeface sizing parameters, and organic WebGL shaders, we guarantee that the final digital artifact is not just usable—it is a landmark in visual storytelling and digital authority.
          </p>
        </div>
      </section>

      {/* SECTION 5: STATS */}
      <section className="px-[24px] md:px-[64px] py-[80px] md:py-[100px]" style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', marginBottom: '40px', display: 'block', letterSpacing: '0.18em' }}>[ OUTCOMES ]</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[32px]">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="p-[40px] md:p-[48px] relative overflow-hidden group" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                background: 'rgba(255,255,255,0.015)', 
                border: '1px solid rgba(245,240,232,0.05)', 
                backdropFilter: 'blur(10px)' 
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(184,149,106,0.05) 0%, transparent 70%)' }}
              />
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#9A9590', display: 'block', marginBottom: '24px', textTransform: 'uppercase' }}>
                {stat.label}
              </span>
              <p style={{ fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 48px)', color: '#F5F0E8', margin: 0, lineHeight: 1.1 }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: NEXT PROJECT NAV */}
      <section 
        className="flex flex-col md:flex-row items-start md:items-center justify-between px-[24px] md:px-[64px] py-[64px] md:py-[80px]"
        style={{ borderTop: '0.5px solid rgba(245,240,232,0.08)' }}
      >
        <Link 
          href="/work"
          style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: '#6B6560', letterSpacing: '0.15em', textDecoration: 'none', transition: 'color 0.3s ease' }}
          className="hover:text-[#B8956A] mb-8 md:mb-0 block"
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
        >
          ← BACK TO WORK
        </Link>
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block"
          style={{ textDecoration: 'none' }}
          onMouseEnter={() => setCursor('hover', 'NEXT')}
          onMouseLeave={resetCursor}
        >
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#6B6560', display: 'block', marginBottom: '4px', textAlign: 'left', letterSpacing: '0.1em' }} className="md:text-right">
            NEXT PROJECT
          </span>
          <span className="group-hover:text-[#B8956A] transition-colors duration-300" style={{ fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px, 3vw, 32px)', color: '#F5F0E8', display: 'block', textAlign: 'left' }} >
            {nextProject.title} →
          </span>
        </Link>
      </section>

      {/* SECTION 7: FOOTER EMAIL CTA */}
      <section className="px-[24px] md:px-[64px] py-[80px] md:py-[100px]" style={{ borderTop: '0.5px solid rgba(245,240,232,0.06)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontSize: 'clamp(20px, 4vw, 24px)', color: '#9A9590', marginBottom: '24px', fontWeight: 300, margin: '0 auto 24px' }}>
          Or start your own project.
        </p>
        <a 
          href="mailto:deepcipherstudio@gmail.com"
          className="group relative inline-block overflow-hidden"
          style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#B8956A', letterSpacing: '0.18em', textDecoration: 'none' }}
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
        >
          DEEPCIPHERSTUDIO@GMAIL.COM
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B8956A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
        </a>
      </section>

    </motion.main>
  );
}
