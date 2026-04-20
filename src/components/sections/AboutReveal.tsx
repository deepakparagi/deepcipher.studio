'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/* ========================================
   About Reveal — GSAP Pinned Storytelling
   ======================================== */

export default function AboutReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Use gsap.context for easy cleanup
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !textRef.current) return;
      
      const words = textRef.current.querySelectorAll('.reveal-word');
      
      // Pin the section and scrub the text opacity
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%', // Scroll for 2.5x the viewport height
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true,
        animation: gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
        }),
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Automatically kills all ScrollTriggers created within this context
    };
  }, []);

  // Split text into words for animation
  const text = 'We are a vanguard digital studio architecting award-winning web experiences. We fuse meticulous engineering with unrestrained, provocative design to create the unforgettable.';
  const words = text.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full bg-off-white flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute top-12 left-6 md:top-24 md:left-12 lg:left-24">
        <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-ink-tertiary uppercase">
          [ OUR ETHOS ]
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={textRef}
          className="font-display text-4xl md:text-6xl lg:text-[100px] leading-[1.05] tracking-tight text-ink font-light italic"
        >
          {words.map((word, i) => (
            <span 
              key={i} 
              className="reveal-word !opacity-20 transition-opacity duration-100" // Initial state: 20% opacity. Transition added for slight smoothness beyond GSAP.
              style={{ display: 'inline-block', marginRight: '0.2em', willChange: 'opacity' }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="absolute bottom-12 left-6 md:bottom-24 md:left-12 lg:left-24">
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-ink-tertiary/40" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-ink-tertiary uppercase">
            SCROLL TO REVEAL
          </span>
        </div>
      </div>
    </section>
  );
}
