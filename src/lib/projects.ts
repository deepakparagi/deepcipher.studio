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
    image: '/images/projects/shingri-hero.webp',
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
    image: '/images/projects/gadag-hero.webp',
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
    year: '2025',
    tags: ['Next.js 15', 'Three.js', 'GSAP'],
    description: 'Agency Website / Brand Identity',
    challenge: 'As a premium studio, our own digital presence needed to reflect the "Editorial Luxury" standard and technical sophistication we provide to our high-end clients.',
    solution: 'A world-class agency platform built with architectural precision, featuring a 2nd-generation Liquid Narrative engine and bespoke typography.',
    result: 'Industry-leading agency positioning.',
    image: '/images/projects/dc-hero.webp',
    size: 'full',
    techStack: ['Next.js 15', 'TypeScript', 'Three.js', 'GSAP', 'Lenis'],
    stats: [
      { label: 'Award Score', value: 'Awwwards SOTD' },
      { label: 'Project Tier', value: 'Enterprise' },
      { label: 'Positioning', value: 'Elite Studio' }
    ],
    modules: [
      { label: 'LIQUID ENGINE', value: 'GSAP / Shaders', description: 'Proprietary motion engine for silk-like cinematic transitions.' },
      { label: 'TYPE ARCHITECTURE', value: 'Variable Fonts', description: 'Custom optical sizing and typographic scales for elite editorial layouts.' }
    ]
  },
  {
    id: 4,
    slug: 'ai-fitness-coach',
    title: 'AI FITNESS COACH',
    client: 'HealthTech Inc.',
    category: 'WEB DESIGN',
    year: '2025',
    tags: ['Next.js 14', 'OpenRouter API', 'Framer Motion'],
    description: 'AI-Powered Assistant',
    challenge: 'Generating personalized fitness plans required a seamless union of complex AI logic and a high-fidelity visual interface.',
    solution: 'Integrated OpenRouter LLMs with a custom "Mission Control" dashboard that generates 7-day plans with real-time voice and PDF support.',
    result: 'Full-stack AI transformation.',
    image: '/images/projects/v2-fitness-custom.png',
    size: 'small',
    techStack: ['Next.js 14', 'TypeScript', 'OpenRouter', 'jsPDF', 'Framer Motion'],
    stats: [
      { label: 'Generation Speed', value: '< 2s' },
      { label: 'User Retention', value: '92%' },
      { label: 'Positioning', value: 'AI Assistant' }
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
    description: 'Movie Intelligence Platform',
    challenge: 'Visualizing thousands of movie review sentiments required a production-grade ML dashboard that felt intuitive and fast.',
    solution: 'Developed a custom analytics engine using DistilBERT NLP and a Three.js sentiment cloud for immersive data exploration.',
    result: 'Real-time cinematic insights.',
    image: '/images/projects/v2-sentiment-final-custom.png',
    size: 'large',
    techStack: ['React', 'FastAPI', 'DistilBERT', 'Three.js', 'PostgreSQL'],
    stats: [
      { label: 'Model Accuracy', value: '94.2%' },
      { label: 'Data Nodes', value: '1M+' },
      { label: 'Positioning', value: 'ML Analytics' }
    ]
  },
  {
    id: 6,
    slug: 'energy-prediction',
    title: 'ENERGY PREDICTION',
    client: 'GridSystems',
    category: 'WEB DESIGN',
    year: '2025',
    tags: ['Python', 'LSTM', 'Streamlit'],
    description: 'Intelligent Energy Monitor',
    challenge: 'Predicting 24-hour power usage surges required a high-performance grid that visualizes complex LSTM ensemble models.',
    solution: 'Built an interactive prediction HUD with real-time anomaly detection and deep-reporting capabilities.',
    result: 'Optimized grid efficiency.',
    image: '/images/projects/v2-energy-custom.jpg',
    size: 'small',
    techStack: ['Python', 'LSTM', 'Random Forest', 'Streamlit', 'Plotly'],
    stats: [
      { label: 'Prediction Delta', value: '< 1.5%' },
      { label: 'Grid Saving', value: '18%' },
      { label: 'Positioning', value: 'Energy AI' }
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
