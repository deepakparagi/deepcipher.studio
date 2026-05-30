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
      "Websites that don't just exist — they perform. From bespoke marketing sites to full-scale e-commerce, every build is obsessed over at the pixel level and engineered to convert.",
      "We build in Next.js, Framer, or Webflow depending on your needs. Every site is responsive, fast, accessible, and built with your CMS requirements in mind. You'll be able to update content yourself — no developer needed.",
      "From single-page portfolio sites to complex multi-language platforms, we approach every project with the same obsessive attention to detail."
    ],
    deliverables: [
      'Next.js Development',
      'Framer Builds',
      'Webflow Integration',
      'UI Redesign',
      'E-Commerce Engines',
      'CMS Architecture',
      'Performance Optimisation',
      'SEO Foundation'
    ],
    duration: '6–10 WEEKS',
    startingFrom: '₹40,000',
    icon: '◈',
    image: '/images/services/web_design.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Brand Identity & Logo Design',
    shortTitle: 'Brand Identity',
    description: [
      "Identity systems built to be remembered. We craft logos, colour palettes, typography hierarchies, and brand guidelines that hold authority across every touchpoint — digital and print.",
      "We start with strategy — understanding your positioning, audience, and competitive landscape. Then we design a visual system: logo, typography, color, photography direction, and usage guidelines that ensure consistency as your brand grows.",
      "Whether you're launching a new brand or redesigning an existing one, we deliver a complete identity kit that works everywhere — from a 16px favicon to a conference stage backdrop."
    ],
    deliverables: [
      'Brand Strategy',
      'Logo Design',
      'Brand Guidelines',
      'Asset Library',
      'Stationery Assets',
      'Typography Hierarchy',
      'Colour Palettes',
      'Brand Book (PDF)'
    ],
    duration: '4–6 WEEKS',
    startingFrom: '₹25,000',
    icon: '◉',
    image: '/images/services/brand_identity.png',
  },
  {
    id: 3,
    number: '03',
    title: 'Brand Strategy & Consulting',
    shortTitle: 'Strategy',
    description: [
      "Before a single pixel is placed, we study your market. Positioning, messaging, and competitive intelligence — so your brand doesn't just look premium, it occupies premium ground.",
      "We conduct competitive analysis, audience research, and brand audits. We define your positioning, voice, and visual direction. We deliver a strategy document that becomes the reference point for every future brand decision.",
      "This service is often the first phase of a larger engagement, but it also works as a standalone for brands that need strategic clarity before committing to design."
    ],
    deliverables: [
      'Market Analysis',
      'Positioning Statement',
      'Core Messaging',
      'Creative Direction',
      'Competitor Audit',
      'Target Audience Personas',
      'Brand voice & tone guide',
      'Visual direction moodboards'
    ],
    duration: '2–3 WEEKS',
    startingFrom: '₹15,000',
    icon: '◆',
    image: '/images/services/strategy.png',
  },
  {
    id: 4,
    number: '04',
    title: 'SEO & Performance Optimisation',
    shortTitle: 'SEO & Performance',
    description: [
      "A beautiful site that no one finds is a silent luxury. We optimise for speed, structure, and search — so your business ranks where it belongs and loads before impatience sets in.",
      "We build robust SEO architecture into the core of your platform—focusing on indexability, speed diagnostics (Core Web Vitals), keyword hierarchy, and technical structure. Your brand won't just exist on the web; it will dominate the search index.",
      "From semantic HTML layouts to high-performance content delivery systems, we ensure your site is completely ready for organic traffic growth."
    ],
    deliverables: [
      'Technical SEO',
      'Core Web Vitals',
      'Local SEO Search',
      'Content Audit & Mapping',
      'Analytics Setup',
      'Google Search Console sync',
      'Structured data (JSON-LD)',
      'XML sitemap & robots setup'
    ],
    duration: '3–5 WEEKS',
    startingFrom: '₹20,000',
    icon: '◇',
    image: '/images/services/ui_ux.png',
  },
  {
    id: 5,
    number: '05',
    title: 'AI & Business Automation',
    shortTitle: 'AI & Automation',
    description: [
      "Intelligence, built in. We engineer AI-powered tools — chatbots, lead pipelines, automated dashboards, and workflow systems — that make your business run sharper while you sleep.",
      "We build secure, custom AI pipelines using large language models, API integrations, structured database synchronization, and agentic frameworks. Your operations will shift from passive execution to automated authority.",
      "From AI consulting and prompt architectures to full-stack automated operations (AIOps), we bring custom intelligence to your business."
    ],
    deliverables: [
      'AI Chatbots',
      'Lead Automation',
      'CRM Workflows',
      'AI Dashboards',
      'WhatsApp Bots',
      'LLM integration & fine-tuning',
      'Custom agent orchestrations',
      'Workflow automation (n8n)'
    ],
    duration: '4–8 WEEKS',
    startingFrom: '₹45,000',
    icon: '⬡',
    image: '/images/services/web_design.png',
  },
];
