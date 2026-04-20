export interface Service {
  id: number;
  number: string;
  title: string;
  shortTitle: string;
  description: string[];
  deliverables: string[];
  duration: string;
  startingFrom: string;
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Web Design & Development',
    shortTitle: 'Web Design',
    description: [
      'Your website is your most powerful sales tool. We design and build websites that don\'t just look beautiful — they convert visitors into clients. Every layout decision is backed by user behavior data. Every interaction is designed to move someone closer to contacting you.',
      'We build in Next.js, Framer, or Webflow depending on your needs. Every site is responsive, fast, accessible, and built with your CMS requirements in mind. You\'ll be able to update content yourself — no developer needed.',
      'From single-page portfolio sites to complex multi-language platforms, we approach every project with the same obsessive attention to detail.',
    ],
    deliverables: [
      'Custom web design (desktop + mobile)',
      'Responsive development',
      'CMS setup & training',
      'SEO foundation',
      'Performance optimisation',
      'Analytics integration',
      'Post-launch support (30 days)',
      'Hosting consultation',
    ],
    duration: '6–10 WEEKS',
    startingFrom: '€4,500',
    icon: '◈',
    image: '/images/services/web_design.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Brand Identity & Logo Design',
    shortTitle: 'Brand Identity',
    description: [
      'Your brand identity is every visual decision that shapes how people perceive you before they read a single word. We design identities that are distinctive, systematic, and built to scale across every touchpoint.',
      'We start with strategy — understanding your positioning, audience, and competitive landscape. Then we design a visual system: logo, typography, color, photography direction, and usage guidelines that ensure consistency as your brand grows.',
      'Whether you\'re launching a new brand or redesigning an existing one, we deliver a complete identity kit that works everywhere — from a 16px favicon to a conference stage backdrop.',
    ],
    deliverables: [
      'Brand strategy & positioning',
      'Logo design (3 concepts)',
      'Visual identity system',
      'Typography selection',
      'Color palette',
      'Brand guidelines (PDF)',
      'Business card design',
      'Social media templates',
    ],
    duration: '4–6 WEEKS',
    startingFrom: '€3,000',
    icon: '◉',
    image: '/images/services/brand_identity.png',
  },
  {
    id: 3,
    number: '03',
    title: 'UI Redesign & Design Systems',
    shortTitle: 'UI Redesign',
    description: [
      'If your product works well but looks dated, a UI redesign can transform user perception without rebuilding your entire codebase. We modernise interfaces while preserving the UX patterns your users already understand.',
      'For teams that need consistency at scale, we build design systems — comprehensive component libraries with tokens, documentation, and implementation guidelines that accelerate every future design and engineering decision.',
      'We work within your existing tech stack and can deliver in Figma, Storybook, or both.',
    ],
    deliverables: [
      'UI audit & recommendations',
      'Design system architecture',
      'Component library (Figma)',
      'Design tokens',
      'Documentation',
      'Developer handoff specs',
      'Accessibility review',
      'Implementation support',
    ],
    duration: '4–8 WEEKS',
    startingFrom: '€3,500',
    icon: '◇',
    image: '/images/services/ui_ux.png',
  },
  {
    id: 4,
    number: '04',
    title: 'Brand Strategy & Consulting',
    shortTitle: 'Strategy',
    description: [
      'Before we touch a single pixel, we help you define what your brand stands for, who it speaks to, and how it should feel. Strategy is the foundation everything else is built on — skip it, and you\'re decorating without architecture.',
      'We conduct competitive analysis, audience research, and brand audits. We define your positioning, voice, and visual direction. We deliver a strategy document that becomes the reference point for every future brand decision.',
      'This service is often the first phase of a larger engagement, but it also works as a standalone for brands that need strategic clarity before committing to design.',
    ],
    deliverables: [
      'Competitive landscape analysis',
      'Target audience personas',
      'Brand positioning statement',
      'Brand voice & tone guide',
      'Visual direction moodboards',
      'Brand architecture',
      'Strategy presentation',
      'Recommendations document',
    ],
    duration: '2–3 WEEKS',
    startingFrom: '€2,000',
    icon: '◆',
    image: '/images/services/strategy.png',
  },
];
