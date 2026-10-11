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
  title: 'DEEPCIPHER — Web Design & Brand Identity Studio',
  description:
    'Premium website design, brand identity, and logo design studio. We help ambitious brands launch websites that convert and identities that endure.',
  icons: {
    icon: [
      { url: '/deepcipher_logo.png' },
      { url: '/icon.png' },
    ],
    shortcut: '/deepcipher_logo.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'DEEPCIPHER',
    description: 'Web Design & Brand Identity Studio',
    type: 'website',
    images: [
      {
        url: '/deepcipher_logo.png',
        width: 1448,
        height: 1086,
        alt: 'DEEPCIPHER Official Logo',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0C0C0C',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DEEPCIPHER',
  url: 'https://deepcipher.studio',
  logo: 'https://deepcipher.studio/deepcipher_logo.png',
  description: 'Premium website design, brand identity, and logo design studio.',
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
          <main id="main-content" style={{ paddingTop: '72px' }}>
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
