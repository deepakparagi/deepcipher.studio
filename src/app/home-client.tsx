'use client';

import dynamic from 'next/dynamic';
import { useCursor } from '@/components/ui/CursorProvider';
import WorkMarquee from '@/components/sections/WorkMarquee';
import SelectedProjects from '@/components/sections/SelectedProjects';
import ServicesV2 from '@/components/sections/ServicesV2';
import ProcessTeaser from '@/components/sections/ProcessTeaser';

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const CTAv2 = dynamic(() => import('@/components/sections/CTAv2'), { ssr: false });

/* ========================================
   Home Client Orchestrator
   ======================================== */

const marquee1Items = [
  'WEBSITE DESIGN', 'BRAND IDENTITY', 'LOGO DESIGN', 'UI REDESIGN', 
  'WEB DEVELOPMENT', 'DESIGN SYSTEMS', 'BRAND STRATEGY', 'DIGITAL EXPERIENCES'
];

const marquee2Items = [
  'NEXT.JS', 'FRAMER', 'WEBFLOW', 'FIGMA', 
  'THREE.JS', 'GSAP', 'TYPESCRIPT', 'TAILWIND', 'SANITY CMS', 'SHOPIFY'
];

export default function HomeClient() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <>
      <Hero />
      <WorkMarquee variant="light" items={marquee1Items} direction="left" />
      <WorkMarquee variant="dark" items={marquee2Items} direction="right" />
      <SelectedProjects />
      <ServicesV2 />
      <ProcessTeaser />
      <CTAv2 />
    </>
  );
}
