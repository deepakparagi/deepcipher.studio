export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: Category;
  year: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  size: 'small' | 'large' | 'full';
  techStack: string[];
  pullQuote?: string;
  paragraphs?: string[];
  galleryImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  modules?: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const categories = [
  'ALL',
  'WEB DESIGN',
  'REAL ESTATE',
  'CULTURE & HERITAGE',
  'BRAND IDENTITY',
  'AI & AUTOMATION',
] as const;

export type Category = (typeof categories)[number];

export const projects: Project[] = [
  {
    id: 1,
    slug: 'shingri-developers',
    title: 'SHINGRI DEVELOPERS',
    client: 'Shingri Developers',
    category: 'REAL ESTATE',
    year: '2026',
    tags: ['Next.js 15', 'Three.js', 'Prisma', 'GSAP'],
    description: 'Flagship Real Estate Platform',
    challenge: 'Elite property developers needed a digital presence that matched their ₹50Cr+ projects. Standard real estate websites lacked the immersive, high-fidelity experiences required to showcase luxury infrastructure.',
    solution: 'We architected a "Liquid Luxury" platform featuring a custom 3D property navigator, real-time availability HUDs, and an immersive editorial narrative that transforms complex data into cinematic storytelling.',
    result: 'A benchmark in luxury real estate digital presence',
    image: '/images/projects/shingri-developers.svg',
    size: 'full',
    techStack: ['Next.js 15', 'TypeScript', 'Three.js', 'Prisma', 'GSAP', 'Tailwind CSS'],
    pullQuote: 'A benchmark in luxury real estate digital presence',
    stats: [
      { label: 'DEEPCIPHER Audit Score', value: '8.1/10' },
      { label: 'Project Value Tier', value: '₹1L+' },
      { label: 'Positioning', value: 'World-class' }
    ],
    paragraphs: [
      'The SHINGRI DEVELOPERS platform defines a new standard in high-end real estate digital experiences. By integrating custom Three.js environments, we enabled prospective buyers to navigate floor plans and site maps in full 3D, directly within the browser.',
      'Beyond visuals, the site features a robust backend for managing property inventories, virtual tour scheduling, and an AI-driven valuation engine that provides real-time market insights to investors.',
      'Key modules include an Interactive 3D Property Navigator, AR Virtual Walkthroughs, and a seamless CRM integration for lead management — all wrapped in a "Quiet Luxury" interface that prioritizes typography and cinematic motion.'
    ],
    modules: [
      { label: '3D NAVIGATOR', value: 'Three.js / WebGL', description: 'Bespoke 3D property explorer with floor-level navigation and dynamic sunlight simulation.' },
      { label: 'AR WALKTHROUGH', value: 'WebXR / 8th Wall', description: 'Immersive AR property viewing directly in the browser without app installation.' },
      { label: 'VALUATION HUD', value: 'AI Regression', description: 'Predictive market analytics dashboard providing real-time investment insights.' },
      { label: 'INVENTORY HUB', value: 'Real-time Sync', description: 'Dymanic property availability engine with direct CRM synchronization.' }
    ]
  },
  {
    id: 2,
    slug: 'gadag-info',
    title: 'GADAG INFO',
    client: 'Gadag Info Community',
    category: 'CULTURE & HERITAGE',
    year: '2024',
    tags: ['Next.js 14', 'Instagram API', 'Framer Motion'],
    description: 'Cultural Heritage Platform',
    challenge: 'A massive community platform with over 115k followers required a digital heritage hub dedicated to historical depiction and cultural news that could handle viral traffic while maintaining premium aesthetics.',
    solution: 'We developed an archival storytelling engine that uses Next.js 14 performance optimizations and cinematic Framer Motion reveals to bring Gadag’s rich history into the 2026 digital landscape.',
    result: '115k+ Follower Digital Hub',
    image: '/images/projects/gadag-info.svg',
    size: 'large',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL'],
    pullQuote: 'Preserving heritage through high-fidelity digital innovation.',
    stats: [
      { label: 'Follower Reach', value: '115k+' },
      { label: 'Performance Score', value: '98/100' },
      { label: 'Positioning', value: 'Heritage Hub' }
    ],
    modules: [
      { label: 'HERITAGE ARCHIVE', value: 'Historical Timeline', description: 'Interactive digital archive depicting centuries of cultural history with immersive media.' },
      { label: 'COMMUNITY PULSE', value: 'Engagement HUD', description: 'Real-time analytics dashboard tracking reach across a 115k+ follower network.' },
      { label: 'VIRTUAL LANDMARKS', value: 'Cinematic Tours', description: 'High-fidelity visual storytelling modules showcasing regional heritage sites.' },
      { label: 'GROWTH ENGINE', value: 'Scaling Intelligence', description: 'Automated news and event detection pipeline to maintain rapid community expansion.' }
    ]
  },
  {
    id: 3,
    slug: 'deepcipher-studio',
    title: 'DEEPCIPHER STUDIO',
    client: 'Agency Internal',
    category: 'BRAND IDENTITY',
    year: '2026',
    tags: ['Next.js 15', 'Three.js', 'GSAP'],
    description: 'Agency Website / Brand Identity',
    challenge: 'As a premium studio, our own digital presence needed to reflect the "Editorial Luxury" standard and technical sophistication we provide to our high-end clients.',
    solution: 'A world-class agency platform built with architectural precision, featuring a 2nd-generation Liquid Narrative engine and bespoke typography.',
    result: 'Industry-leading agency positioning.',
    image: '/images/projects/deepcipher-studio.svg',
    size: 'full',
    techStack: ['Next.js 15', 'TypeScript', 'Three.js', 'GSAP', 'Lenis'],
    pullQuote: 'Capturing structural harmony through liquid motion and architectural editorial balance.',
    stats: [
      { label: 'Award Score', value: 'Awwwards SOTD' },
      { label: 'Project Tier', value: 'Enterprise' },
      { label: 'Positioning', value: 'Elite Studio' }
    ],
    paragraphs: [
      'The DEEPCIPHER STUDIO site acts as both our flagship portfolio and our core technology playground. By building on Next.js 15 and custom WebGL shaders, we enabled organic fluid distortion states that respond directly to cursor vectors.',
      'Our visual identity focuses on an extreme juxtaposition of technical monospace structures and delicate, classic editorial serif typography. This creates a unique brand signature that conveys both precision and absolute luxury.',
      'Every interaction on this platform has been designed to reward curiosity—from magnetic buttons that react smoothly to proximity to custom scrolling canvas triggers.'
    ],
    modules: [
      { label: 'LIQUID ENGINE', value: 'GSAP / Shaders', description: 'Proprietary motion engine for silk-like cinematic transitions.' },
      { label: 'TYPE ARCHITECTURE', value: 'Variable Fonts', description: 'Custom optical sizing and typographic scales for elite editorial layouts.' }
    ]
  },
  {
    id: 4,
    slug: 'bipin-chikkatti-school',
    title: 'BIPIN CHIKKATTI SCHOOL',
    client: 'Bipin Chikkatti School Gadag',
    category: 'WEB DESIGN',
    year: '2025',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    description: 'A premium digital identity for a distinguished Gadag institution.',
    challenge: 'Bipin Chikkatti School needed a modern, trustworthy website that reflected the institution\'s academic excellence and community standing in Gadag — replacing an outdated web presence that failed to communicate their vision.',
    solution: 'We designed a warm, authoritative website with clean information architecture, smooth scroll animations, and a visual language that balances institutional gravitas with approachable warmth for parents and students.',
    result: 'Modern School Identity Platform',
    image: '/images/projects/bipin-chikkatti-school.png',
    size: 'small',
    techStack: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    pullQuote: 'Where academic tradition meets digital precision.',
    stats: [
      { label: 'Load Speed', value: '< 1.2s' },
      { label: 'Parent Engagement', value: '+180%' },
      { label: 'Positioning', value: 'Education' }
    ],
    paragraphs: [
      'For Bipin Chikkatti School, we crafted a digital experience that mirrors the institution\'s commitment to excellence — clean typography, structured layouts, and a warm color palette that invites exploration.',
      'The site architecture prioritizes parent and student journeys: admissions flow, academic programs, faculty profiles, and event calendars are all accessible within two clicks from any page.',
      'Performance was non-negotiable. Edge-cached static generation ensures the site loads instantly across Gadag\'s varied network conditions, while subtle Framer Motion animations add polish without sacrificing speed.'
    ],
    modules: [
      { label: 'INFO ARCHITECTURE', value: 'Parent-First UX', description: 'Navigation designed around parent decision journeys — admissions, academics, campus life.' },
      { label: 'PERFORMANCE CORE', value: 'Edge Static Gen', description: 'ISR-powered pages cached at the edge for instant loads on any network.' }
    ]
  },
  {
    id: 5,
    slug: 'sentiment-ai',
    title: 'SENTIMENT AI',
    client: 'MovieIntelligence',
    category: 'WEB DESIGN',
    year: '2025',
    tags: ['React', 'FastAPI', 'DistilBERT'],
    description: 'Real-time cinematic intelligence. Built with ML, designed to feel cinematic.',
    challenge: 'Visualizing thousands of movie review sentiments required a production-grade ML dashboard that felt intuitive, fast, and cinematic rather than a clinical spreadsheet.',
    solution: 'Developed a custom analytics engine using DistilBERT NLP and a Three.js sentiment cloud for immersive data exploration, styled like a luxury dark interface.',
    result: 'Real-time cinematic insights.',
    image: '/images/projects/sentiment-ai.svg',
    size: 'large',
    techStack: ['React', 'FastAPI', 'DistilBERT', 'Three.js', 'PostgreSQL'],
    pullQuote: 'Capturing structural harmony through liquid motion and architectural editorial balance.',
    galleryImages: [
      '/images/projects/v2-sentiment-custom.jpg',
      '/images/projects/v2-sentiment-final-custom.png',
      '/images/projects/v2-sentiment-custom.jpg'
    ],
    stats: [
      { label: 'Model Accuracy', value: '94.2%' },
      { label: 'Data Nodes', value: '1M+' },
      { label: 'Positioning', value: 'ML Analytics' }
    ],
    paragraphs: [
      'Sentiment AI bridges the gap between deep machine learning and premium, human-centric design. By translating natural language movie reviews into real-time visual coordinate spaces, we created an interface that feels like a luxury terminal.',
      'Using FastAPI and PostgreSQL, the platform processes hundreds of incoming reviews per second, categorizing them via DistilBERT NLP models and plotting them onto a 3D semantic web.',
      'Users can click through clusters of opinions, explore critical and audience review discrepancies in full 3D, and generate instant automated sentiment summaries — all within a highly polished onyx dashboard.'
    ],
    modules: [
      { label: 'NLP HUB', value: 'DistilBERT API', description: 'High-throughput movie review sentiment classifier working in real-time.' },
      { label: '3D CLOUD', value: 'Three.js / WebGL', description: 'Interactive 3D semantic cloud mapping movie opinions dynamically.' },
      { label: 'ANALYTICS HUD', value: 'Dynamic Charts', description: 'Precision data reporting panels tracking regional audience reactions.' },
      { label: 'INGESTION ENGINE', value: 'FastAPI Stream', description: 'Ultra-fast API streaming architecture capable of 500+ requests/sec.' }
    ]
  },
  {
    id: 6,
    slug: 'gridsystems',
    title: 'GRIDSYSTEMS (FLUX)',
    client: 'Flux Energy',
    category: 'AI & AUTOMATION',
    year: '2025',
    tags: ['Next.js', 'LSTM', 'Python'],
    description: 'Intelligent Grid & Power Automation Hub',
    challenge: 'Predicting and automating 24-hour power usage surges required a high-performance grid hub that visualizes complex LSTM ensemble models with zero latency.',
    solution: 'Built a high-fidelity prediction HUD with real-time WebSockets anomaly detection and automated load-balancing agent triggers.',
    result: 'Optimized grid efficiency.',
    image: '/images/projects/gridsystems.svg',
    size: 'small',
    techStack: ['Next.js 15', 'LSTM', 'Random Forest', 'Python', 'Tailwind CSS'],
    pullQuote: 'Orchestrating machine power grids with absolute computational precision.',
    stats: [
      { label: 'Surges Automated', value: '99.8%' },
      { label: 'Grid Saving', value: '18%' },
      { label: 'Positioning', value: 'Energy AI' }
    ],
    paragraphs: [
      'For Flux Energy, we developed an intelligent monitoring console that connects directly to local smart grids to predict power demands up to 24 hours in advance.',
      'We integrated real-time WebSockets streams that feed sensor logs directly into a custom high-performance dashboard, highlighting anomalous spikes and automatically rerouting power paths.',
      'The platform visualizes machine learning predictions from LSTM ensemble networks in high-contrast Plotly graphics, giving energy operators absolute clarity and control.'
    ],
    modules: [
      { label: 'PREDICTION HUD', value: 'LSTM Neural Nets', description: 'Advanced power load prediction models tracking surges dynamically.' },
      { label: 'ANOMALY ALERTER', value: 'WebSockets Stream', description: 'Real-time alert dispatching and power load-balancing routing triggers.' }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}
