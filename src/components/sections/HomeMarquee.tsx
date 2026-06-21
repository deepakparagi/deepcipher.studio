'use client';

import { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useVelocity, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useAnimationFrame 
} from 'framer-motion';

const row1Items = [
  'WEBSITE DESIGN', 'BRAND IDENTITY', 'LOGO DESIGN', 'UI REDESIGN', 
  'WEB DEVELOPMENT', 'DESIGN SYSTEMS', 'BRAND STRATEGY', 'DIGITAL EXPERIENCES', 
  'SEO OPTIMISATION', 'AI AUTOMATION', 'MOTION DESIGN', 'CREATIVE DIRECTION'
];

const row2Items = [
  'NEXT.JS', 'FRAMER', 'WEBFLOW', 'FIGMA', 
  'THREE.JS', 'GSAP', 'TYPESCRIPT', 'TAILWIND', 'SANITY CMS', 'SHOPIFY'
];

function TickerRow({ 
  items, 
  direction, 
  speed = 40, 
  bg,
  textColor,
  dotColor,
}: { 
  items: string[]; 
  direction: 'left' | 'right'; 
  speed?: number; 
  bg: string;
  textColor: string;
  dotColor: string;
}) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', padding: '0 32px' }}>
          <span 
            style={{ 
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.25em',
              color: textColor,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              lineHeight: 1,
              cursor: 'default',
              opacity: 0.8
            }}
          >
            {item}
          </span>
          <span 
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: dotColor,
              flexShrink: 0,
              display: 'inline-block',
              verticalAlign: 'middle',
              margin: '0 12px'
            }} 
          />
        </div>
      ))}
    </div>
  );

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const moveDirection = direction === 'left' ? -1 : 1;
  const baseVelocity = speed; // Adjust this scale if needed

  useAnimationFrame((t, delta) => {
    let moveBy = moveDirection * baseVelocity * (delta / 1000);
    // Add scroll velocity to the movement
    moveBy += moveDirection * velocityFactor.get() * (delta / 1000) * 80;
    baseX.set(baseX.get() + moveBy);
  });

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div 
      style={{ 
        height: '36px', 
        display: 'flex', 
        alignItems: 'center', 
        width: '100%',
        background: bg,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          flexShrink: 0,
          x
        }}
      >
        {/* We render multiple copies to ensure seamless loop */}
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
}

export default function HomeMarquee() {
  return (
    <section 
      style={{
        overflow: 'hidden',
        width: '100%',
        padding: 0,
        height: '72px', // Two 36px rows
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TickerRow 
        items={row1Items} 
        direction="left" 
        speed={1.5} 
        bg="#F5F0E8" 
        textColor="rgba(10,10,10,0.3)" 
        dotColor="rgba(10,10,10,0.15)"
      />
      <TickerRow 
        items={row2Items} 
        direction="right" 
        speed={1.2} 
        bg="#0A0A0A" 
        textColor="rgba(245,240,232,0.3)" 
        dotColor="#B8956A"
      />
    </section>
  );
}
