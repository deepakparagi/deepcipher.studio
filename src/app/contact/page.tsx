import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact DEEPCIPHER — Start Your Project',
  description: 'Get in touch to discuss your website design, brand identity, or logo design project.',
};

export default function ContactPage() {
  return <ContactClient />;
}
