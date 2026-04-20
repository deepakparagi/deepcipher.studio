import type { Metadata } from 'next';
import StartProjectClient from './start-project-client';

export const metadata: Metadata = {
  title: 'Start a Project — DEEPCIPHER',
  description: 'Tell us about your project and we will send a proposal within 48 hours.',
};

export default function StartProjectPage() {
  return <StartProjectClient />;
}
