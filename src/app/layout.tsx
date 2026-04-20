import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';

/* ========================================
   Fonts
   ======================================== */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--dm-mono',
  display: 'swap',
});

/* ========================================
   Metadata
   ======================================== */

export const metadata: Metadata = {
  title: 'DEEPCIPHER — Web Design & Brand Identity Studio',
  description:
    'Premium website design, brand identity, and logo design studio. We help ambitious brands launch websites that convert and identities that endure.',
  openGraph: {
    title: 'DEEPCIPHER',
    description: 'Web Design & Brand Identity Studio',
    type: 'website',
  },
  icons: {
    icon: '/dc-logo-big.png',
    apple: '/dc-logo-big.png',
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
  logo: 'https://deepcipher.studio/dc-logo-big.png',
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
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
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
      <body>
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
