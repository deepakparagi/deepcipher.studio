import type { Metadata } from 'next';
import ServicesClient from './services-client';

export const metadata: Metadata = {
  title: 'Capabilities & Services — Web Architecture & AI Engineering',
  description:
    'Bespoke web design, scalable design systems, Three.js 3D interaction, autonomous AI agents, and high-performance cloud backends.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
