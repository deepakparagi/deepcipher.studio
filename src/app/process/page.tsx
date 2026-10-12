import type { Metadata } from 'next';
import ProcessClient from './process-client';

export const metadata: Metadata = {
  title: 'Our Process — Intentional Engineering & Digital Craft',
  description:
    'From discovery and creative direction to full-stack implementation and launch. Four structured phases engineered for zero-bloat execution.',
};

export default function ProcessPage() {
  return <ProcessClient />;
}
