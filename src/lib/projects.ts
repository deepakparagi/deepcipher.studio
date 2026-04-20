export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  result: string;
  image: string;
  size: 'small' | 'large' | 'full';
  coverType: 'webapp-dark' | 'ai-ml' | 'brand' | 'ui-redesign';
  techStack: string[];
  pullQuote?: string;
  paragraphs?: string[];
  galleryImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  modules?: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 8,
    slug: 'shingri-developers',
    title: 'Shingri Developers',
    category: 'WEBSITE',
    year: '2026',
    tags: ['Next.js 15', 'Framer Motion', 'Three.js', 'PostgreSQL'],
    description: 'A benchmark in luxury real estate, Shingri Developers features a high-fidelity digital presence with interactive property exploration, real-time availability HUDs, and immersive architectural storytelling. Built for elite property developers to showcase world-class infrastructure.',
    result: 'Flagship Real Estate Platform',
    image: '/images/projects/shingri-hero.webp',
    size: 'full',
    coverType: 'brand',
    techStack: ['Next.js 15', 'TypeScript', 'Framer Motion', 'Three.js', 'Prisma', 'GSAP'],
    paragraphs: [
      'The SHINGRI DEVELOPERS platform defines a new standard in high-end real estate digital experiences. By integrating custom Three.js environments, we enabled prospective buyers to navigate floor plans and site maps in full 3D, directly within the browser.',
      'Beyond visuals, the site features a robust backend for managing property inventories, virtual tour scheduling, and an AI-driven valuation engine that provides real-time market insights to investors.',
      'Key modules include an Interactive 3D Property Navigator, AR Virtual Walkthroughs, and a seamless CRM integration for lead management — all wrapped in a "Quiet Luxury" interface that prioritizes typography and cinematic motion.'
    ],
    liveUrl: 'https://shingri-developers.vercel.app',
    modules: [
      {
        label: '3D NAVIGATOR',
        value: 'Three.js / WebGL',
        description: 'Bespoke 3D property explorer with floor-level navigation and dynamic sunlight simulation.'
      },
      {
        label: 'AR WALKTHROUGH',
        value: 'WebXR / 8th Wall',
        description: 'Immersive AR property viewing directly in the browser without app installation.'
      },
      {
        label: 'VALUATION HUD',
        value: 'AI Regression',
        description: 'Predictive market analytics dashboard providing real-time investment insights.'
      },
      {
        label: 'INVENTORY HUB',
        value: 'Real-time Sync',
        description: 'Dymanic property availability engine with direct CRM synchronization.'
      }
    ]
  },
  {
    id: 9,
    slug: 'gadag-info',
    title: 'Gadag Info',
    category: 'WEBSITE',
    year: '2025',
    tags: ['Next.js 14', 'Framer Motion', 'Instagram API', 'Community'],
    description: 'A massive community platform with over 115k followers, Gadag Info serves as a digital heritage hub dedicated to historical depiction, cultural news, and community engagement. Built with a focus on archival storytelling and high-traffic performance.',
    result: '115k+ Follower Digital Hub',
    image: '/images/projects/gadag-hero.webp',
    size: 'large',
    coverType: 'brand',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL'],
    paragraphs: [
      'Gadag Info is more than a platform; it is a digital guardian of heritage. By scaling to a community of 115,000 active followers, the project required a robust architecture capable of handling viral traffic surges while maintaining a premium, editorial aesthetic.',
      'The platform utilizes advanced Framer Motion techniques to create a "Living Timeline," allowing users to traverse centuries of history through interactive historical depictions and archival media. Key modules like the Community Pulse HUD provide real-time insights into regional digital trends.',
      'Our approach focused on "Cultural Retention Through Digital Innovation"—bringing ancient history into the 2026 digital landscape with cinematic motion, archival-grade image optimization, and a seamless community-driven content pipeline.'
    ],
    liveUrl: 'https://gadag-info-demo.vercel.app',
    modules: [
      {
        label: 'HERITAGE ARCHIVE',
        value: 'Historical Timeline',
        description: 'Interactive digital archive depicting centuries of cultural history with immersive media.'
      },
      {
        label: 'COMMUNITY PULSE',
        value: 'Engagement HUD',
        description: 'Real-time analytics dashboard tracking reach across a 115k+ follower network.'
      },
      {
        label: 'VIRTUAL LANDMARKS',
        value: 'Cinematic Tours',
        description: 'High-fidelity visual storytelling modules showcasing regional heritage sites.'
      },
      {
        label: 'GROWTH ENGINE',
        value: 'Scaling Intelligence',
        description: 'Automated news and event detection pipeline to maintain rapid community expansion.'
      }
    ]
  },
  {
    id: 7,
    slug: 'bipin-chikkatti-school',
    title: 'Bipin Chikkatti School',
    category: 'WEBSITE',
    year: '2025',
    tags: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'CMS'],
    description: 'A modern, premium digital presence for Bipin Chikkatti School. Features a dynamic admissions portal, event calendar, and an editorial design that reflects the institution\'s commitment to educational excellence.',
    result: 'Premium Institutional Web presence',
    image: '/images/projects/v2-school-custom.png',
    size: 'full',
    coverType: 'brand',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS'],
    liveUrl: 'https://school-demo.vercel.app',
    githubUrl: 'https://github.com/deepakparagi/bipin-school',
  },
  {
    id: 1,
    slug: 'ai-fitness-coach',
    title: 'AI Fitness Coach',
    category: 'WEB APP',
    year: '2025',
    tags: ['Next.js 14', 'TypeScript', 'OpenRouter API', 'Framer Motion'],
    description: 'An AI-powered fitness assistant built with Next.js that generates personalized 7-day workout and diet plans. Features AI image generation for exercises, voice playback via Web Speech API, and PDF export — all with a beautiful dark/light theme.',
    result: 'Live on Vercel · Full-stack AI',
    image: '/images/projects/v2-fitness-custom.png',
    size: 'large',
    coverType: 'webapp-dark',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'OpenRouter', 'jsPDF'],
    liveUrl: 'https://fitness-ai.vercel.app',
    githubUrl: 'https://github.com/deepakparagi/ai-fitness',
  },
  {
    id: 6,
    slug: 'music-streaming',
    title: 'Music Streaming Platform',
    category: 'WEBSITE',
    year: '2024',
    tags: ['HTML', 'CSS', 'JavaScript', 'Audio API'],
    description: 'A full music streaming web experience with playlist management, audio controls, and responsive design. Built to replicate the experience of major streaming platforms using vanilla web technologies.',
    result: 'Complete streaming UI',
    image: '/images/projects/v2-3.png',
    size: 'large',
    coverType: 'ui-redesign',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'],
    liveUrl: 'https://music-streams.vercel.app',
    githubUrl: 'https://github.com/deepakparagi/music-platform',
  },
  {
    id: 2,
    slug: 'sentimentai',
    title: 'SentimentAI',
    category: 'WEB APP',
    year: '2025',
    tags: ['React', 'FastAPI', 'DistilBERT', 'Redis', 'Three.js'],
    description: 'A production-grade movie intelligence and recommendation platform. Uses DistilBERT NLP to analyze review sentiment, smart recommendations via TF-IDF and cosine similarity, real-time analytics dashboard, JWT authentication, and admin panel.',
    result: 'Full-stack ML platform',
    image: '/images/projects/v2-sentiment-final-custom.png',
    size: 'large',
    coverType: 'ai-ml',
    techStack: ['React', 'FastAPI', 'DistilBERT', 'PostgreSQL', 'Redis', 'Three.js'],
    liveUrl: 'https://sentiment-ai-demo.vercel.app',
    githubUrl: 'https://github.com/deepakparagi/sentiment-ai',
  },
  {
    id: 3,
    slug: 'energy-prediction',
    title: 'Energy Prediction System',
    category: 'AI / ML',
    year: '2025',
    tags: ['Python', 'LSTM', 'Random Forest', 'ARIMA', 'Streamlit'],
    description: 'An intelligent energy monitoring system using ensemble ML models to predict 24-hour power usage, detect anomalies, and optimize consumption. Features real-time dashboards, appliance-level insights, and one-click PDF reports.',
    result: 'LSTM + ARIMA ensemble',
    image: '/images/projects/v2-energy-custom.jpg',
    size: 'small',
    coverType: 'ai-ml',
    techStack: ['Python', 'LSTM', 'Random Forest', 'ARIMA', 'Streamlit', 'Plotly'],
  },
  {
    id: 4,
    slug: 'signify-studio',
    title: 'Signify Studio',
    category: 'WEB APP',
    year: '2024',
    tags: ['HTML5 Canvas', 'CSS', 'JavaScript', 'LocalStorage'],
    description: 'A sleek digital signature creation web app. Draw, customize stroke weight and color, save to library, and download as PNG — all with responsive design and local persistence. No design skills required.',
    result: 'Zero-dependency Canvas app',
    image: '/images/projects/v2-signify-custom.png',
    size: 'small',
    coverType: 'webapp-dark',
    techStack: ['HTML5 Canvas', 'CSS', 'JavaScript', 'LocalStorage'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export const categories = [
  'ALL',
  'WEB APP',
  'WEBSITE',
  'AI / ML',
] as const;

export type Category = (typeof categories)[number];
