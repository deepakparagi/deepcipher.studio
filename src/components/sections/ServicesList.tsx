'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCursor } from '../ui/CursorProvider';
import MagneticButton from '../ui/MagneticButton';

const services = [
  {
    id: '01',
    title: 'Brand Identity',
    desc: 'Distinctive visual systems that elevate your market positioning.',
  },
  {
    id: '02',
    title: 'Web & App Design',
    desc: 'Award-winning digital experiences engineered for conversion.',
  },
  {
    id: '03',
    title: 'Development',
    desc: 'Flawless execution using Next.js, WebGL, and GSAP.',
  },
  {
    id: '04',
    title: 'Motion & 3D',
    desc: 'Provocative interactions that transcend static design.',
  },
];

export default function ServicesList() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-surface-subtle">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
        
        {/* Left Column — Sticky Intro */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <span className="font-mono text-[10px] tracking-[0.2em] text-ink-tertiary uppercase mb-8 block">
              [ OUR EXPERTISE ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-ink leading-tight tracking-tight mb-8">
              We design for the <span className="italic font-light">future</span>, not the present.
            </h2>
            <MagneticButton variant="ghost" href="/services" cursorLabel="VIEW">
              <span className="text-ink hover:text-accent-warm transition-colors">EXPLORE ALL SERVICES →</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column — Interactive List */}
        <div className="lg:w-2/3 flex flex-col pt-12">
          {services.map((service, i) => (
            <Link 
              key={service.id} 
              href="/services"
              onMouseEnter={() => setCursor('link', 'VIEW')}
              onMouseLeave={resetCursor}
              className="group block border-t border-ink/10 py-12 lg:py-16 hover:border-ink/30 transition-colors duration-500 relative"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-ink-light/20 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex gap-8 items-start">
                  <span className="font-mono text-xs text-ink-tertiary mt-2 md:mt-4">
                    {service.id}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-ink group-hover:italic group-hover:translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {service.title}
                  </h3>
                </div>
                
                <p className="font-sans text-sm text-ink-secondary max-w-[280px] md:text-right group-hover:-translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {service.desc}
                </p>
              </div>
            </Link>
          ))}
          <div className="border-t border-ink/10" />
        </div>

      </div>
    </section>
  );
}
