import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About — DEEPCIPHER',
  description: 'The studio behind the websites. Learn about our team, beliefs, and approach.',
};

export default function AboutPage() {
  return <AboutClient />;
}
