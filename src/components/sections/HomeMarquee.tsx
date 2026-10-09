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
}: {
  items: string[];
  direction: 'left' | 'right';
  duration?: number;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: '#141414',
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
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'rgba(245,240,232,0.3)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                cursor: 'default',
                padding: '0 24px',
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#B8956A',
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
          height: '96px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TickerRow
          items={row1Items}
          direction="left"
          duration={45}
        />
        <TickerRow
          items={row2Items}
          direction="right"
          duration={45}
        />
      </section>
    </>
  );
}
