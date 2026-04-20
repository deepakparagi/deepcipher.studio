'use client';

import dynamic from 'next/dynamic';
import HomeClient from './home-client';

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });

export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}
