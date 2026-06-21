import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Josefin_Sans } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';

/* ========================================
   Fonts
   - Cormorant Garamond: Display headings (mixed upright/italic)
   - Josefin Sans: Body, UI, Labels, Mono
   ======================================== */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
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
    icon: '/deepcipher_logo.png',
    apple: '/deepcipher_logo.png',
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
      className={`${cormorant.variable} ${josefin.variable}`}
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
          <main id="main-content">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
