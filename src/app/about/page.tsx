import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About the Studio — Vision, Principles & Philosophy',
  description:
    'Learn about DEEPCIPHER Studio, our obsession with craft, operational principles, and modern production technology stack.',
};

export default function AboutPage() {
  return <AboutClient />;
}
