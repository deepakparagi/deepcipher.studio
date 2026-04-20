const fs = require('fs');

let hero = fs.readFileSync('src/components/sections/Hero.tsx', 'utf-8');

// The required global css block for the hero needs to be actually parsed or moved entirely.
// Since NextJS App router doesn't parse raw string styled-jsx well inside a TSX without the proper plugin,
// we will just strip it again and add the raw CSS into globals.css safely.

const styleMatch = hero.match(/<style jsx global>\{`([\s\S]*?)`\}<\/style>/);
if (styleMatch) {
  let css = styleMatch[1];
  
  hero = hero.replace(/<style jsx global>\{`[\s\S]*?`\}<\/style>/, '{/* Styles moved to globals.css */}');
  
  let globals = fs.readFileSync('src/app/globals.css', 'utf-8');
  
  // Only add if not already there to prevent duplication
  if (!globals.includes('.hero-section {\\n          position: relative;')) {
     globals += '\n\n/* ========================================\n   Hero Section Styles (Restored)\n   ======================================== */\n';
     globals += css;
     fs.writeFileSync('src/app/globals.css', globals);
  }
}

fs.writeFileSync('src/components/sections/Hero.tsx', hero);
console.log('Hero styling re-extracted strictly to globals.css');
