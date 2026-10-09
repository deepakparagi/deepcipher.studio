'use client';

/* ========================================
   HomeMarquee — CSS-driven infinite ticker
   Two rows, opposite directions, same speed
   ======================================== */

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
  duration = 40,
  bg,
  textColor,
  dotColor,
}: {
  items: string[];
  direction: 'left' | 'right';
  duration?: number;
  bg: string;
  textColor: string;
  dotColor: string;
}) {
  /* Duplicate items so the strip is wide enough for seamless looping */
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: bg,
        overflow: 'hidden',
      }}
    >
      <div
        className={direction === 'left' ? 'marquee-left' : 'marquee-right'}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animationDuration: `${duration}s`,
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: textColor,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                cursor: 'default',
                opacity: 0.8,
                padding: '0 24px',
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
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomeMarquee() {
  return (
    <>
      {/* Keyframes injected once */}
      <style jsx global>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-scroll-left linear infinite;
        }
        .marquee-right {
          animation: marquee-scroll-right linear infinite;
        }
      `}</style>
      <section
        style={{
          overflow: 'hidden',
          width: '100%',
          padding: 0,
          height: '72px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TickerRow
          items={row1Items}
          direction="left"
          duration={45}
          bg="#F5F0E8"
          textColor="rgba(10,10,10,0.3)"
          dotColor="rgba(10,10,10,0.15)"
        />
        <TickerRow
          items={row2Items}
          direction="right"
          duration={45}
          bg="#0A0A0A"
          textColor="rgba(245,240,232,0.3)"
          dotColor="#B8956A"
        />
      </section>
    </>
  );
}
