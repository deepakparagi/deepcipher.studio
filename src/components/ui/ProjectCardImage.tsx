'use client';

import React from 'react';

/* =========================================================
   ProjectCardImage — Quasar-style SVG light ray visuals
   6 unique inline SVGs — one per project card
   Pure black background + curved light rays from focal point
   ========================================================= */

/* ── Ray generation helper ── */
function generateRayPaths(
  focalX: number,
  focalY: number,
  angleStartDeg: number,
  angleEndDeg: number,
  colors: string[],
  count: number,
  minLength: number,
  maxLength: number,
  curveIntensity: number,
  slug: string,
): string[] {
  const rays: string[] = [];
  // Use deterministic pseudo-random based on index for consistent SSR/CSR rendering
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 49979;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angleDeg = angleStartDeg + (angleEndDeg - angleStartDeg) * t;
    const angleRad = (angleDeg * Math.PI) / 180;

    const length = minLength + seededRandom(i * 17 + 3) * (maxLength - minLength);

    const endX = focalX + Math.cos(angleRad) * length;
    const endY = focalY + Math.sin(angleRad) * length;

    // Control point for quadratic bezier curve
    const perpAngle = angleRad + Math.PI / 2;
    const curveOffset = (-curveIntensity + seededRandom(i * 31 + 7) * curveIntensity * 2);
    const cpX = focalX + Math.cos(angleRad) * length * 0.5 + Math.cos(perpAngle) * curveOffset;
    const cpY = focalY + Math.sin(angleRad) * length * 0.5 + Math.sin(perpAngle) * curveOffset;

    const color = colors[i % colors.length];

    // Opacity — brighter near center of fan
    const centerRatio = Math.abs(t - 0.5) * 2;
    const opacity = (0.95 - centerRatio * 0.65).toFixed(2);

    // Stroke width — thinner outer rays
    const strokeWidth = (0.4 + (1 - centerRatio) * 1.6).toFixed(2);

    rays.push(
      `M ${focalX.toFixed(1)} ${focalY.toFixed(1)} Q ${cpX.toFixed(1)} ${cpY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`
    );
  }

  return rays;
}

/* ── Shared SVG wrapper ── */
interface CardSVGProps {
  slug: string;
  focalX: number;
  focalY: number;
  angleStart: number;
  angleEnd: number;
  colors: string[];
  count: number;
  minLength: number;
  maxLength: number;
  curveIntensity: number;
}

function QuasarSVG({
  slug,
  focalX,
  focalY,
  angleStart,
  angleEnd,
  colors,
  count,
  minLength,
  maxLength,
  curveIntensity,
}: CardSVGProps) {
  const rays = generateRayPaths(
    focalX, focalY, angleStart, angleEnd,
    colors, count, minLength, maxLength, curveIntensity, slug
  );

  // Deterministic pseudo-random for ray properties
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 49979;
    return x - Math.floor(x);
  };

  return (
    <svg
      viewBox="0 0 800 560"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', background: '#000000' }}
    >
      <defs>
        <filter
          id={`rayGlow-${slug}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id={`bloom-${slug}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>

      {/* Pure black background */}
      <rect width="800" height="560" fill="#000000" />

      {/* Bloom/glow layer — duplicate rays at low opacity with heavy blur */}
      <g filter={`url(#bloom-${slug})`} opacity="0.4">
        {rays.map((d, i) => {
          const color = colors[i % colors.length];
          const t = i / (count - 1);
          const centerRatio = Math.abs(t - 0.5) * 2;
          const opacity = 0.95 - centerRatio * 0.65;
          const strokeWidth = 0.4 + (1 - centerRatio) * 1.6;
          return (
            <path
              key={`bloom-${i}`}
              d={d}
              stroke={color}
              strokeWidth={strokeWidth * 1.5}
              opacity={opacity * 0.5}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Main ray layer */}
      <g filter={`url(#rayGlow-${slug})`}>
        {rays.map((d, i) => {
          const color = colors[i % colors.length];
          const t = i / (count - 1);
          const centerRatio = Math.abs(t - 0.5) * 2;
          const opacity = 0.95 - centerRatio * 0.65;
          const strokeWidth = 0.4 + (1 - centerRatio) * 1.6;
          return (
            <path
              key={`ray-${i}`}
              d={d}
              stroke={color}
              strokeWidth={strokeWidth}
              opacity={opacity}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Focal point glow circles */}
      <circle cx={focalX} cy={focalY} r={30} fill="white" opacity={0.02} />
      <circle cx={focalX} cy={focalY} r={12} fill="white" opacity={0.06} />
      <circle cx={focalX} cy={focalY} r={4} fill="white" opacity={0.3} />

      {/* Focal point asterisk star */}
      <line x1={focalX - 14} y1={focalY} x2={focalX + 14} y2={focalY}
        stroke="white" strokeWidth={1.5} opacity={0.95} />
      <line x1={focalX} y1={focalY - 14} x2={focalX} y2={focalY + 14}
        stroke="white" strokeWidth={1.5} opacity={0.95} />
      <line x1={focalX - 9} y1={focalY - 9} x2={focalX + 9} y2={focalY + 9}
        stroke="white" strokeWidth={1} opacity={0.75} />
      <line x1={focalX + 9} y1={focalY - 9} x2={focalX - 9} y2={focalY + 9}
        stroke="white" strokeWidth={1} opacity={0.75} />
    </svg>
  );
}

/* =========================================================
   6 Unique Card Image Components
   ========================================================= */

/* CARD 1 — SHINGRI DEVELOPERS — Warm golden sunrise rays */
export function ShingriCardImage() {
  return (
    <QuasarSVG
      slug="shingri-developers"
      focalX={180}
      focalY={140}
      angleStart={-10}
      angleEnd={80}
      colors={[
        'hsl(30, 100%, 55%)', 'hsl(38, 95%, 60%)', 'hsl(45, 100%, 65%)',
        'hsl(25, 90%, 50%)', 'hsl(50, 100%, 70%)', 'hsl(15, 85%, 55%)',
        'hsl(55, 100%, 75%)', 'hsl(20, 80%, 45%)',
      ]}
      count={48}
      minLength={600}
      maxLength={750}
      curveIntensity={60}
    />
  );
}

/* CARD 2 — GADAG INFO — Cultural spectrum purple to amber */
export function GadagCardImage() {
  return (
    <QuasarSVG
      slug="gadag-info"
      focalX={400}
      focalY={120}
      angleStart={200}
      angleEnd={340}
      colors={[
        'hsl(280, 80%, 60%)', 'hsl(300, 75%, 55%)', 'hsl(320, 85%, 58%)',
        'hsl(30, 90%, 60%)', 'hsl(260, 70%, 55%)', 'hsl(15, 80%, 55%)',
        'hsl(310, 80%, 50%)', 'hsl(45, 85%, 65%)',
      ]}
      count={52}
      minLength={500}
      maxLength={680}
      curveIntensity={90}
    />
  );
}

/* CARD 3 — DEEPCIPHER STUDIO — Pure gold luxury rays */
export function DeepCipherCardImage() {
  return (
    <QuasarSVG
      slug="deepcipher-studio"
      focalX={620}
      focalY={200}
      angleStart={140}
      angleEnd={260}
      colors={[
        'hsl(43, 100%, 70%)', 'hsl(40, 95%, 60%)', 'hsl(48, 100%, 80%)',
        'hsl(35, 90%, 55%)', 'hsl(50, 100%, 88%)', 'hsl(38, 85%, 65%)',
        'hsl(45, 100%, 75%)', 'hsl(55, 100%, 90%)',
      ]}
      count={44}
      minLength={580}
      maxLength={720}
      curveIntensity={35}
    />
  );
}

/* CARD 4 — HYROX — Electric blue athletic energy */
export function HyroxCardImage() {
  return (
    <QuasarSVG
      slug="hyrox"
      focalX={650}
      focalY={100}
      angleStart={160}
      angleEnd={270}
      colors={[
        'hsl(200, 100%, 60%)', 'hsl(185, 100%, 55%)', 'hsl(210, 90%, 65%)',
        'hsl(175, 100%, 60%)', 'hsl(220, 95%, 70%)', 'hsl(190, 100%, 75%)',
        'hsl(215, 85%, 50%)', 'hsl(180, 100%, 80%)',
      ]}
      count={56}
      minLength={620}
      maxLength={760}
      curveIntensity={120}
    />
  );
}

/* CARD 5 — SENTIMENT AI — Matrix green intelligence */
export function SentimentCardImage() {
  return (
    <QuasarSVG
      slug="sentiment-ai"
      focalX={160}
      focalY={280}
      angleStart={-40}
      angleEnd={40}
      colors={[
        'hsl(140, 80%, 45%)', 'hsl(150, 85%, 55%)', 'hsl(130, 75%, 50%)',
        'hsl(160, 90%, 60%)', 'hsl(165, 100%, 65%)', 'hsl(120, 70%, 55%)',
        'hsl(155, 95%, 70%)', 'hsl(170, 100%, 75%)',
      ]}
      count={50}
      minLength={600}
      maxLength={740}
      curveIntensity={50}
    />
  );
}

/* CARD 6 — GRIDSYSTEMS — Purple electric energy burst */
export function GridSystemsCardImage() {
  return (
    <QuasarSVG
      slug="gridsystems"
      focalX={200}
      focalY={440}
      angleStart={-80}
      angleEnd={10}
      colors={[
        'hsl(270, 85%, 60%)', 'hsl(280, 90%, 65%)', 'hsl(290, 80%, 58%)',
        'hsl(300, 85%, 62%)', 'hsl(260, 75%, 55%)', 'hsl(285, 100%, 70%)',
        'hsl(295, 80%, 68%)', 'hsl(310, 75%, 65%)',
      ]}
      count={46}
      minLength={580}
      maxLength={700}
      curveIntensity={105}
    />
  );
}

/* ── Slug-to-component mapping ── */
export const cardImages: Record<string, React.FC> = {
  'shingri-developers': ShingriCardImage,
  'gadag-info': GadagCardImage,
  'deepcipher-studio': DeepCipherCardImage,
  'hyrox': HyroxCardImage,
  'sentiment-ai': SentimentCardImage,
  'gridsystems': GridSystemsCardImage,
};
