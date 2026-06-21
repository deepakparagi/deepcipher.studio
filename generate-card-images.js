// SVG viewBox: 0 0 800 560
// We'll generate rays for each card

function generateRays(focalX, focalY, angleStart, angleEnd, colors, count, minLength, maxLength, curveIntensity) {
  const rays = [];
  for (let i = 0; i < count; i++) {
    // Distribute angle across range
    const angle = angleStart + (angleEnd - angleStart) * (i / count);
    const angleRad = (angle * Math.PI) / 180;

    // Random length within range
    const length = minLength + Math.random() * (maxLength - minLength);

    // End point of ray
    const endX = focalX + Math.cos(angleRad) * length;
    const endY = focalY + Math.sin(angleRad) * length;

    // Control point for curve (perpendicular offset)
    const perpAngle = angleRad + Math.PI / 2;
    const curveOffset = -curveIntensity + Math.random() * curveIntensity * 2;
    const cpX = focalX + Math.cos(angleRad) * length * 0.5 + Math.cos(perpAngle) * curveOffset;
    const cpY = focalY + Math.sin(angleRad) * length * 0.5 + Math.sin(perpAngle) * curveOffset;

    // Color from palette cycling
    const color = colors[i % colors.length];

    // Opacity — brighter near center of fan
    const centerRatio = Math.abs(i / count - 0.5) * 2;
    const opacity = 0.95 - centerRatio * 0.65;

    // Stroke width — thinner outer rays
    const strokeWidth = 0.4 + (1 - centerRatio) * 1.6;

    rays.push(`      <path
        d="M ${focalX} ${focalY}
           Q ${cpX} ${cpY} ${endX} ${endY}"
        stroke="${color}"
        stroke-width="${strokeWidth}"
        opacity="${opacity}"
        fill="none"
        filter="url(#rayGlow)"
      />`);
  }
  return rays.join('\n');
}

// Card configurations
const cards = [
  {
    name: 'ShingriCardImage',
    slug: 'shingri-developers',
    focalX: 180,
    focalY: 140,
    angleStart: -10,
    angleEnd: 80,
    colors: [
      'hsl(30, 100%, 55%)',   // deep orange
      'hsl(38, 95%, 60%)',    // warm amber
      'hsl(45, 100%, 65%)',   // golden yellow
      'hsl(25, 90%, 50%)',    // burnt orange
      'hsl(50, 100%, 70%)',   // light gold
      'hsl(15, 85%, 55%)',    // orange-red
      'hsl(55, 100%, 75%)',   // cream gold
      'hsl(20, 80%, 45%)'     // dark amber
    ],
    count: 48,
    minLength: 600,
    maxLength: 750,
    curveIntensity: 60
  },
  {
    name: 'GadagCardImage',
    slug: 'gadag-info',
    focalX: 400,
    focalY: 120,
    angleStart: 200,
    angleEnd: 340,
    colors: [
      'hsl(280, 80%, 60%)',
      'hsl(300, 75%, 55%)',
      'hsl(320, 85%, 58%)',
      'hsl(30, 90%, 60%)',
      'hsl(260, 70%, 55%)',
      'hsl(15, 80%, 55%)',
      'hsl(310, 80%, 50%)',
      'hsl(45, 85%, 65%)'
    ],
    count: 52,
    minLength: 500,
    maxLength: 680,
    curveIntensity: 90
  },
  {
    name: 'DeepCipherCardImage',
    slug: 'deepcipher-studio',
    focalX: 620,
    focalY: 200,
    angleStart: 140,
    angleEnd: 260,
    colors: [
      'hsl(43, 100%, 70%)',
      'hsl(40, 95%, 60%)',
      'hsl(48, 100%, 80%)',
      'hsl(35, 90%, 55%)',
      'hsl(50, 100%, 88%)',
      'hsl(38, 85%, 65%)',
      'hsl(45, 100%, 75%)',
      'hsl(55, 100%, 90%)'
    ],
    count: 44,
    minLength: 580,
    maxLength: 720,
    curveIntensity: 35
  },
  {
    name: 'HyroxCardImage',
    slug: 'hyrox-cape-town',
    focalX: 650,
    focalY: 100,
    angleStart: 160,
    angleEnd: 270,
    colors: [
      'hsl(200, 100%, 60%)',
      'hsl(185, 100%, 55%)',
      'hsl(210, 90%, 65%)',
      'hsl(175, 100%, 60%)',
      'hsl(220, 95%, 70%)',
      'hsl(190, 100%, 75%)',
      'hsl(215, 85%, 50%)',
      'hsl(180, 100%, 80%)'
    ],
    count: 56,
    minLength: 620,
    maxLength: 760,
    curveIntensity: 120
  },
  {
    name: 'SentimentCardImage',
    slug: 'sentiment-ai',
    focalX: 160,
    focalY: 280,
    angleStart: -40,
    angleEnd: 40,
    colors: [
      'hsl(140, 80%, 45%)',
      'hsl(150, 85%, 55%)',
      'hsl(130, 75%, 50%)',
      'hsl(160, 90%, 60%)',
      'hsl(165, 100%, 65%)',
      'hsl(120, 70%, 55%)',
      'hsl(155, 95%, 70%)',
      'hsl(170, 100%, 75%)'
    ],
    count: 50,
    minLength: 600,
    maxLength: 740,
    curveIntensity: 50
  },
  {
    name: 'GridSystemsCardImage',
    slug: 'gridsystems-flux',
    focalX: 200,
    focalY: 440,
    angleStart: -80,
    angleEnd: 10,
    colors: [
      'hsl(270, 85%, 60%)',
      'hsl(280, 90%, 65%)',
      'hsl(290, 80%, 58%)',
      'hsl(300, 85%, 62%)',
      'hsl(260, 75%, 55%)',
      'hsl(285, 100%, 70%)',
      'hsl(295, 80%, 68%)',
      'hsl(310, 75%, 65%)'
    ],
    count: 46,
    minLength: 580,
    maxLength: 700,
    curveIntensity: 105
  }
];

// Generate the component strings
let output = '';
cards.forEach(card => {
  const rays = generateRays(
    card.focalX, card.focalY,
    card.angleStart, card.angleEnd,
    card.colors, card.count,
    card.minLength, card.maxLength,
    card.curveIntensity
  );

  const svg = `
<svg viewBox="0 0 800 560" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="rayGlow-${card.slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bloom-${card.slug}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
    </filter>
  </defs>
  <!-- Pure black background -->
  <rect width="800" height="560" fill="#000000"/>

  <!-- Rays -->
  ${rays}

  <!-- Second duplicate layer of rays for bloom -->
  ${rays.replace(/opacity="([^"]+)"/g, (match, p1) => {
    const opacity = parseFloat(p1) * 0.4;
    return `opacity="${opacity}" filter="url(#bloom-${card.slug})"`;
  })}

  <!-- Focal point star -->
  <!-- Horizontal line -->
  <line x1="${card.focalX - 14}" y1="${card.focalY}"
        x2="${card.focalX + 14}" y2="${card.focalY}"
        stroke="white" stroke-width="1.5" opacity="0.95"/>
  <!-- Vertical line -->
  <line x1="${card.focalX}" y1="${card.focalY - 14}"
        x2="${card.focalX}" y2="${card.focalY + 14}"
        stroke="white" stroke-width="1.5" opacity="0.95"/>
  <!-- Diagonal 1 -->
  <line x1="${card.focalX - 9}" y1="${card.focalY - 9}"
        x2="${card.focalX + 9}" y2="${card.focalY + 9}"
        stroke="white" stroke-width="1" opacity="0.75"/>
  <!-- Diagonal 2 -->
  <line x1="${card.focalX + 9}" y1="${card.focalY - 9}"
        x2="${card.focalX - 9}" y2="${card.focalY + 9}"
        stroke="white" stroke-width="1" opacity="0.75"/>

  <!-- Center glow circles -->
  <circle cx="${card.focalX}" cy="${card.focalY}" r="30"
          fill="white" opacity="0.02"/>
  <circle cx="${card.focalX}" cy="${card.focalY}" r="12"
          fill="white" opacity="0.06"/>
  <circle cx="${card.focalX}" cy="${card.focalY}" r="4"
          fill="white" opacity="0.3"/>
</svg>
  `;

  output += `export function ${card.name}() {\n  return (\n    ${svg}\n  );\n}\n\n`;
});

// Export the cardImages object
output += `export const cardImages: Record<string, React.FC> = {\n`;
cards.forEach(card => {
  output += `  '${card.slug}': ${card.name},\n`;
});
output += `};\n`;

console.log(output);