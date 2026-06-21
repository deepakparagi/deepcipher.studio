import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'DEEPCIPHER — Web Design & Brand Identity Studio',
  description:
    'Premium website design, brand identity, and logo design studio. We help ambitious brands launch websites that convert and identities that endure.',
};

export default function Home() {
  return <HomeClient />;
}
