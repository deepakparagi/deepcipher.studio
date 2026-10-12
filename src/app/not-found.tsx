import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found | DEEPCIPHER',
  description: 'The requested architectural resource or page could not be located.',
};

export default function NotFound() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        color: '#F5F0E8',
      }}
    >
      {/* Background Decorative Gradient */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(44, 52, 128, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Eyebrow Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '11px',
          color: '#2C3480',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          display: 'block',
        }}
      >
        — ERROR 404 // RESOURCE NOT FOUND
      </span>

      {/* Main Heading with Script Accent */}
      <h1
        className="m-0 upright leading-none select-none"
        style={{
          fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
          fontSize: 'clamp(64px, 12vw, 140px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#F5F0E8',
        }}
      >
        404<span className="font-citadel italic font-normal text-[#2C3480]">.</span>
      </h1>

      {/* Secondary Subtitle */}
      <h2
        className="m-0 mt-4 text-[20px] sm:text-[24px] font-medium"
        style={{
          fontFamily: "var(--font-helvetica), 'Helvetica', sans-serif",
          color: '#F5F0E8',
          letterSpacing: '-0.01em',
        }}
      >
        Void in the Architecture
      </h2>

      {/* Description */}
      <p
        className="m-0 mt-3 max-w-md text-[14px] sm:text-[15px] font-light leading-relaxed"
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          color: '#BDB8B3',
        }}
      >
        The page, case study, or terminal asset you are attempting to access does not exist, has been relocated, or is currently being architected.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] text-white bg-[#2C3480] hover:bg-[#3854FF] border border-[#2C3480] hover:border-[#3854FF] transition-all duration-300 shadow-lg shadow-[#2C3480]/20 w-full sm:w-auto"
        >
          <span>Return Home</span>
          <span aria-hidden="true">→</span>
        </Link>

        <Link
          href="/work"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] text-[#F5F0E8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-full sm:w-auto"
        >
          <span>Explore Work</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {/* Bottom Technical Indicator */}
      <span
        className="mt-16 text-[10px] font-mono tracking-[0.2em] uppercase text-[#6B6560]"
        aria-hidden="true"
      >
        STATUS // 404_PAGE_RESOLVED
      </span>
    </div>
  );
}
