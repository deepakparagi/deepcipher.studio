import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact DEEPCIPHER — Start a Build or Inquire',
  description:
    'Connect with DEEPCIPHER to architect your next digital flagship. Submit your project brief for a direct response within 24 hours.',
};

export default function ContactPage() {
  return <ContactClient />;
}
