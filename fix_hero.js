const fs = require('fs');

let hero = fs.readFileSync('src/components/sections/Hero.tsx', 'utf-8');

// 1. Array replace
hero = hero.replace("['We Design', 'Digital', 'Futures.']", "['WE BUILD', 'WEBSITES', 'BRANDS LOVE.']");

// 2. Insert Right Side element
const rightSideEl = `
      {/* Right side decorative element */}
      <div className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none select-none z-10">
        <div style={{ width: '140px', height: '140px', border: '1px solid rgba(184,149,106,0.25)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'spin 28s linear infinite' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', color: 'rgba(255,255,255,0.9)' }}>DC</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(184,149,106,0.7)', marginTop: '4px' }}>EST. MMXXIV</span>
        </div>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, rgba(184,149,106,0.4), transparent)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', writingMode: 'vertical-rl' }}>
          INDIA · USA · BERLIN · LONDON · REMOTE
        </span>
      </div>

`;
hero = hero.replace('      {/* Content */}\n      <div className="hero-content">', rightSideEl + '      {/* Content */}\n      <div className="hero-content">');

// 3. Extract and remove style tag
const styleMatch = hero.match(/<style jsx global>\{`([\s\S]*?)`\}<\/style>/);
if (styleMatch) {
  let css = styleMatch[1];
  
  // Edit the CSS for user adjustments
  css = css.replace('padding-left: clamp(24px, 6vw, 100px);', 'padding-left: clamp(48px, 6vw, 96px);');
  css = css.replace('.hero-headline-overflow:nth-child(3) .hero-headline {\n          padding-left: clamp(48px, 12vw, 200px);\n        }', '.hero-headline-overflow:nth-child(3) .hero-headline {\n          padding-left: 0;\n        }');
  
  // Left align bottoms
  css = css.replace('.hero-bottom-block {\n          display: flex;\n          align-items: flex-end;\n          justify-content: space-between;\n          margin-top: clamp(40px, 5vh, 72px);\n          gap: 40px;\n          flex-wrap: wrap;\n        }', '.hero-bottom-block {\n          display: flex;\n          flex-direction: column;\n          align-items: flex-start;\n          margin-top: clamp(40px, 5vh, 72px);\n          gap: 40px;\n        }');
  
  css = css.replace('.hero-cta-col {\n          display: flex;\n          align-items: center;\n          gap: 24px;\n          flex-wrap: wrap;\n        }', '.hero-cta-col {\n          display: flex;\n          align-items: center;\n          gap: 16px;\n          margin-top: 24px;\n          flex-wrap: wrap;\n        }');

  hero = hero.replace(/<style jsx global>\{\`[\s\S]*?\`\}<\/style>\n*/, '{/* Styles moved to globals.css */}\n');

  // Read globals.css and append
  let globals = fs.readFileSync('src/app/globals.css', 'utf-8');
  globals += '\n\n/* ========================================\n   Hero Section Styles (Moved)\n   ======================================== */\n';
  globals += css;
  globals += '\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n';

  fs.writeFileSync('src/app/globals.css', globals);
}

fs.writeFileSync('src/components/sections/Hero.tsx', hero);
console.log('Hero and globals.css updated successfully!');
