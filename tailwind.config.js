/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', 'Oswald', 'Arial', 'sans-serif'],
        display: ['var(--font-primary)', 'Oswald', 'Arial', 'sans-serif'],
        body: ['var(--font-primary)', 'Oswald', 'Arial', 'sans-serif'],
        sans: ['var(--font-primary)', 'Oswald', 'Arial', 'sans-serif'],
        mono: ['var(--font-primary)', 'Oswald', 'Arial', 'sans-serif'],
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.35' }],
        small: ['14px', { lineHeight: '1.5' }],
        body: ['16px', { lineHeight: '1.75' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        h4: ['24px', { lineHeight: '1.25' }],
        h3: ['28px', { lineHeight: '1.2' }],
        h2: ['36px', { lineHeight: '1.12' }],
        h1: ['48px', { lineHeight: '1.05' }],
        'display-l': ['60px', { lineHeight: '0.98' }],
        'display-xl': ['72px', { lineHeight: '0.94' }],
      },
    },
  },
};

export default config;
