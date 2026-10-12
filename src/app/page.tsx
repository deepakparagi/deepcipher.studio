import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'DEEPCIPHER — High-Impact Web Design & AI Engineering Studio',
  description:
    'DEEPCIPHER is an elite digital product and AI engineering studio architecting bespoke web flagships, robust brand identities, and production-grade intelligent systems.',
};

export default function Home() {
  return <HomeClient />;
}
