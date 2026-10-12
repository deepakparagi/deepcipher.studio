import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';

/* ========================================
   Fonts
   - Helvetica: Timeless modernist Swiss sans-serif (Body, UI, Monospace)
   - Cormorant Garamond: Classical editorial serif (Hero Display Headlines)
   - Citadel Script: Luxury calligraphic cursive script (Editorial & Italic accents)
   ======================================== */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const helvetica = localFont({
  src: [
    {
      path: '../../public/fonts/helvetica/helvetica-light-587ebe5a59211.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/Helvetica-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helvetica/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/Helvetica-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});

const citadelScript = localFont({
  src: '../../public/fonts/citadel/CitadelScriptStd.otf',
  variable: '--font-citadel',
  display: 'swap',
});

/* ========================================
   Metadata
   ======================================== */

export const metadata: Metadata = {
  title: {
    default: 'DEEPCIPHER — High-Impact Web Design & AI Engineering Studio',
    template: '%s | DEEPCIPHER',
  },
  description:
    'DEEPCIPHER is an elite digital product and AI engineering studio architecting bespoke web flagships, robust brand identities, and production-grade intelligent systems.',
  metadataBase: new URL('https://deepcipher.studio'),
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'DEEPCIPHER — Web Design & Brand Identity Studio',
    description: 'Architecting digital authority for ambitious brands globally.',
    type: 'website',
    url: 'https://deepcipher.studio',
    siteName: 'DEEPCIPHER',
    images: [
      {
        url: '/images/deepcipher logo final.png',
        width: 1536,
        height: 1024,
        alt: 'DEEPCIPHER Official Logo',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DEEPCIPHER',
  url: 'https://deepcipher.studio',
  logo: 'https://deepcipher.studio/images/deepcipher%20logo%20final.png',
  description: 'Premium website design, brand identity, and cognitive AI architecture studio.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'deepcipherstudio@gmail.com',
    contactType: 'customer service',
  },
  areaServed: ['International', 'India', 'USA', 'Europe'],
};

/* ========================================
   Root Layout
   ======================================== */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${helvetica.variable} ${cormorant.variable} ${citadelScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="view-transition" content="same-origin" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ClientLayout>
          <main id="main-content">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
