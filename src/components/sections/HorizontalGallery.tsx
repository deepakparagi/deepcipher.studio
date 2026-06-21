'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';
import { useCursor } from '../ui/CursorProvider';

/* ========================================
   Horizontal Gallery — Featured Work
   ======================================== */

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (!containerRef.current || !railRef.current) return;

      const items = gsap.utils.toArray('.gallery-item');
      
      // Calculate how far we need to move the rail
      // Total width of all items minus the viewport width + some padding
      const getScrollAmount = () => {
        let railWidth = railRef.current!.scrollWidth;
        return -(railWidth - window.innerWidth);
      };

      const tween = gsap.to(railRef.current, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
      
      // Setup image parallax inside the cards
      items.forEach((item: any) => {
        const img = item.querySelector('.gallery-img-inner');
        if (!img) return;
        
        // This parallax creates a subtle move on the image as it slides
        gsap.to(img, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen bg-[#0A0A0A] overflow-hidden flex items-center"
    >
      {/* Editorial Parallax Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.h2 
          className="font-display font-light italic text-white/[0.02] whitespace-nowrap leading-none select-none"
          style={{ fontSize: 'clamp(120px, 40vw, 800px)', letterSpacing: '-0.05em' }}
        >
          CURATED
        </motion.h2>
      </div>

      {/* The Rail that moves horizontally */}
      <div 
        ref={railRef} 
        className="absolute top-1/2 -translate-y-1/2 h-[65vh] flex gap-20 md:gap-40 pl-[25vw] items-center z-10"
      >
        {projects.slice(0, 5).map((project, index) => (
          <div 
            key={project.id} 
            className="gallery-item relative w-[80vw] md:w-[50vw] lg:w-[40vw] h-full flex-shrink-0 group cursor-pointer"
            onMouseEnter={() => setCursor('link', 'VIEW')}
            onMouseLeave={resetCursor}
          >
            <Link href={`/work/${project.slug}`} className="block w-full h-full relative overflow-hidden rounded-sm border border-white/5">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/0 transition-colors duration-700" />
              
              <div 
                className="gallery-img-inner w-[120%] h-full relative -left-[10%] will-change-transform"
              >
                <Image
                  src={project.image || '/placeholder-feature.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>

              {/* Floating label — top right */}
              <div className="absolute top-8 right-8 z-20 mix-blend-difference overflow-hidden">
                 <motion.span 
                   initial={{ y: '100%' }}
                   whileInView={{ y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="block font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase"
                 >
                   PREMIUM CASE {index + 1}
                 </motion.span>
              </div>

              {/* Project Details — bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-end pointer-events-none">
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden">
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-[var(--accent-warm)] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 [transition-property:transform,opacity] duration-500">
                      {project.category} · {project.year}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl md:text-6xl text-white italic font-light m-0 leading-[0.9] tracking-tighter">
                    {project.title.split(' ').map((word, i) => (
                      <span key={i} className="inline-block mr-[0.2em] group-hover:text-[var(--accent-warm)] transition-colors duration-500">
                        {word}
                      </span>
                    ))}
                  </h3>
                </div>
                
                <span className="font-mono text-[12px] tracking-widest text-white/20 mb-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </Link>
          </div>
        ))}

        {/* Ending statement */}
        <div className="flex-shrink-0 w-[40vw] flex items-center justify-center pr-[10vw]">
           <div className="max-w-[300px]">
             <p className="font-body font-light text-white/30 text-[14px] leading-relaxed uppercase tracking-widest">
               Beyond the surface. <br /> Built for purpose.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
}
