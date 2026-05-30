import type { Metadata } from 'next';
import ProcessClient from './process-client';

export const metadata: Metadata = {
  title: 'Process — DEEPCIPHER',
  description: 'Four phases. Zero guesswork. One outcome — a website that works.',
};

export default function ProcessPage() {
  return <ProcessClient />;
}
