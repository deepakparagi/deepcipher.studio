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
  const text = 'I am Deepak Paragi — an AI & Software Engineering student, designer, and builder. Deepcipher is my independent studio, driven by an absolute obsession with digital craft, uncompromising development quality, and the architecture of modern web experiences.';
  const words = text.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full bg-off-white flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute top-12 left-6 md:top-24 md:left-12 lg:left-24">
        <span 
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#8A8A8A',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#B8956A', marginRight: '4px' }}>—</span> OUR ETHOS
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={textRef}
          className="font-display text-4xl md:text-6xl lg:text-[100px] leading-[1.05] tracking-tight text-ink font-normal not-italic"
        >
          {words.map((word, i) => {
            // Clean word to match special styling cases
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—]/g, "").trim();
            let wordClass = "upright";
            
            if (cleanWord === "Deepak") {
              wordClass = "upright font-medium";
            } else if (cleanWord === "Paragi") {
              wordClass = "italic text-[#B8956A]";
            } else if (cleanWord === "Deepcipher") {
              wordClass = "upright font-medium";
            } else if (["obsession", "craft", "modern", "design", "designer", "builder", "independent"].includes(cleanWord.toLowerCase())) {
              wordClass = "italic text-[#B8956A]";
            }
            
            return (
              <span 
                key={i} 
                className={`reveal-word !opacity-20 transition-opacity duration-100 ${wordClass}`}
                style={{ display: 'inline-block', marginRight: '0.2em', willChange: 'opacity' }}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>

      <div className="absolute bottom-12 left-6 md:bottom-24 md:left-12 lg:left-24">
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-ink-tertiary/40" />
          <span 
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: '#8A8A8A',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO REVEAL
          </span>
        </div>
      </div>
    </section>
  );
}
