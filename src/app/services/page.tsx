import type { Metadata } from 'next';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Services — Web Design, Brand Identity & Logo Design | DEEPCIPHER',
  description: 'Web design, brand identity, logo design, UI redesign, and design systems for ambitious brands.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
