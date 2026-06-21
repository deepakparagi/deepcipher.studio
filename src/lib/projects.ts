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
  overview?: string;
  problem?: string;
  objective?: string;
  researchStrategy?: string;
  designProcess?: string;
  developmentProcess?: string;
  challenges?: string;
  solutions?: string;
  finalOutcome?: string;
  keyLearnings?: string;
  resultsNarrative?: string;
  roleResponsibilities?: string[];
}

export const categories = [
  'ALL',
  'CLIENT WORK',
  'INDEPENDENT PROJECTS',
  'EXPERIMENTAL CONCEPTS',
  'PRODUCT BUILDS',
] as const;

export type Category = (typeof categories)[number];

export const projects: Project[] = [
  {
    id: 3,
    slug: 'deepak-portfolio',
    title: 'DEEPAK PARAGI PORTFOLIO',
    client: 'Deepak Paragi',
    category: 'INDEPENDENT PROJECTS',
    year: '2026',
    tags: ['React', 'Vite', 'Three.js'],
    description: 'A modern, responsive personal portfolio website built with React and Vite.',
    challenge: 'Showcasing projects and skills through an immersive digital experience.',
    solution: 'Built a modern portfolio featuring 3D elements and smooth animations.',
    result: 'A compelling interactive resume and showcase.',
    image: '/Project cards images/Deepak_paragi portfolio.png',
    size: 'small',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    pullQuote: 'Creative Technologist & Software Engineer',
    liveUrl: 'https://deepakparagi.github.io/Deepak-Paragi-Portfolio',
    githubUrl: 'https://github.com/deepakparagi/Deepak-Paragi-Portfolio.git'
  },
  {
    id: 1,
    slug: 'shingri-developers',
    title: 'SHINGRI DEVELOPERS',
    client: 'Shingri Developers',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js 16', 'Tailwind CSS', 'Framer Motion'],
    description: 'A state-of-the-art, premium real estate web application built for Shingri Developers.',
    challenge: 'Elite property developers needed a digital presence that matched their luxury projects.',
    solution: 'We architected a "Liquid Luxury" platform featuring a custom 3D property navigator and immersive narrative.',
    result: 'A benchmark in luxury real estate digital presence.',
    image: '/Project cards images/Shingri_developers.png',
    size: 'full',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    pullQuote: 'Crafted with precision for Shingri Developers.',
    liveUrl: 'https://shingri-developers.vercel.app/',
    paragraphs: [
      'A state-of-the-art, premium real estate web application built for Shingri Developers. This platform is designed to evoke luxury, trust, and architectural excellence through a minimal yet high-impact user interface.',
      'The UI is a masterclass in Minimal Luxury. Every element is meticulously crafted to provide a "premium" feel. Primary: Monte Beige, Accent: Monte Gold, Foundational: Deep Black/Charcoal.',
      'The landing experience features a dynamic, full-bleed carousel with Parallax Depth and Animated Typography.'
    ],
    modules: [
      { label: 'AESTHETIC PALETTE', value: 'Monte Beige & Gold', description: 'Warm, sophisticated background that balances high-contrast elements to signify luxury.' },
      { label: 'HERO EXPERIENCE', value: 'Parallax Carousel', description: 'Dynamic full-bleed carousel with 3D depth effect and masked text reveal animations.' },
      { label: 'NAVIGATION', value: 'Glassmorphic UI', description: 'Sticky navbar that transitions to a dark, blurred glass effect upon scrolling.' }
    ]
  },
  {
    id: 4,
    slug: 'bipin-chikkatti-college',
    title: 'BIPIN CHIKKATTI COLLEGE',
    client: 'Chikkatti Group of Institutions',
    category: 'CLIENT WORK',
    year: '2024',
    tags: ['HTML5', 'CSS3', 'Vanilla JS'],
    description: 'A premium, elegant college website featuring a "Subtle Minimal Classic Old-Money Premium" aesthetic.',
    challenge: 'Create a timeless, sophisticated aesthetic inspired by Ivy League universities and luxury editorial design.',
    solution: 'Built a fully responsive, pure HTML/CSS/JS site with smooth scroll reveals and elegant transitions.',
    result: 'A sophisticated digital presence for a heritage academic institution.',
    image: '/Project cards images/BIPIN CHIKKATTI SCHOOL.png',
    size: 'large',
    techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    pullQuote: 'A timeless, sophisticated aesthetic inspired by Ivy League universities.',
    liveUrl: 'https://www.chikkattieducation.co.in/',
    paragraphs: [
      'This is the official website for Bipin Chikkatti College, part of the Chikkatti Group of Institutions founded by Prof. S. Y. Chikkatti in 1994. Located on a 7-acre lush green campus in Gadag, Karnataka.',
      'The website embodies a timeless, sophisticated aesthetic inspired by Ivy League university websites, Luxury editorial design, and Heritage academic institutions.',
      'Color Palette includes Cream/Off-white backgrounds, Deep charcoal/navy accents, and Muted gold highlights.'
    ]
  },
  {
    id: 2,
    slug: 'gadag-info',
    title: 'GADAG INFO',
    client: 'Gadag District',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js 14', 'Tailwind CSS', 'GSAP'],
    description: 'A premium, highly-performant Next.js editorial website for Gadag District.',
    challenge: 'A massive community platform required a digital heritage hub dedicated to historical depiction.',
    solution: 'Developed an archival storytelling engine using Next.js 14 and cinematic Framer Motion reveals.',
    result: '115k+ Follower Digital Hub',
    image: '/Project cards images/gadag_info.png',
    size: 'large',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    pullQuote: 'Celebrating Gadag\'s rich cultural heritage through 2026-standard web design.',
    liveUrl: 'https://gadag.vercel.app/',
    paragraphs: [
      'A premium, highly-performant Next.js editorial website for Gadag District with high-end, 2026-standard web design.',
      'Featuring custom cinematic animations, bilingual localization (English/Kannada), asymmetric grid layouts, sophisticated typography, and 4K visual assets celebrating Gadag\'s rich cultural heritage.'
    ]
  },
  {
    id: 6,
    slug: 'khans-fitness',
    title: 'KHAN\'S FITNESS',
    client: 'Khan\'s Fitness, Gadag-Betageri',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Premium AI-Powered Fitness Platform.',
    challenge: 'Establish a premium digital presence blending high-performance physical training with next-generation digital intelligence.',
    solution: 'Designed a platform integrating advanced AI tools, personalized fitness calculators, a custom workout coaching interface, and a luxury Burgundy design language.',
    result: 'A world-class experience across all devices.',
    image: '/Project cards images/Khans Fitness.png',
    size: 'large',
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'],
    pullQuote: 'Blending high-performance physical training with next-generation digital intelligence.',
    liveUrl: 'https://khans-fitness.vercel.app/',
    githubUrl: 'https://github.com/deepakparagi/Khans_Fitness.git',
    paragraphs: [
      'Khan\'s Fitness is a modern, state-of-the-art training facility located in Gadag-Betageri, Karnataka. This platform is designed and engineered to establish a premium digital presence for the brand.',
      'The application integrates advanced AI tools, personalized fitness calculators, a custom workout coaching interface, and a dual-theme system mapped to a custom luxury Burgundy design language.',
      'Centralized AI Fitness Lab Hub housing cutting-edge cognitive tools: BMI Calculator, Fitness Assessment Tool, Workout Generator, and Diet Planner.'
    ],
    modules: [
      { label: 'AI FITNESS LAB', value: 'Cognitive Tools', description: 'Centralized interface housing BMI, 1RM, and Target Heart Rate health calculators.' },
      { label: 'WORKOUT GENERATOR', value: 'Dynamic generation', description: 'Personalized training programs created dynamically.' },
      { label: 'KHAN AI COACH', value: 'Real-time Chat', description: 'Conversational interface for specialized guidance.' }
    ]
  },
  {
    id: 5,
    slug: 'cinepulse-ai',
    title: 'CINEPULSE AI',
    client: 'CinePulse AI Intelligence Network',
    category: 'PRODUCT BUILDS',
    year: '2026',
    tags: ['React', 'Flask', 'Machine Learning'],
    description: 'A high-fidelity, production-grade sentiment analysis platform designed for the cinematic industry.',
    challenge: 'Provide deep emotional insights into movie reviews with explainable AI metrics.',
    solution: 'Leveraged state-of-the-art machine learning (TF-IDF + Logistic Regression) and a premium "Bloomberg-Vercel" hybrid aesthetic.',
    result: 'Real-time cinematic intelligence with 92.4% validation accuracy.',
    image: '/Project cards images/Sentiment movie analysis.png',
    size: 'full',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Flask', 'Scikit-learn', 'SQLite'],
    pullQuote: 'Real-time cinematic intelligence. Built with ML, designed to feel cinematic.',
    liveUrl: 'https://cinepulse-ai-sentiment-analysis.vercel.app/',
    githubUrl: 'https://github.com/deepakparagi/cinepulse-ai-sentiment-analysis.git',
    paragraphs: [
      'CinePulse AI is a high-fidelity, production-grade sentiment analysis platform designed for the cinematic industry. Leveraging state-of-the-art machine learning (TF-IDF + Logistic Regression) and a premium "Bloomberg-Vercel" hybrid aesthetic.',
      'It provides deep emotional insights into movie reviews with explainable AI metrics, featuring a Neural Analyzer for real-time sentiment extraction with character-by-character neural visualization.',
      'The intelligence core utilizes a TF-IDF vectorization pipeline coupled with a Logistic Regression classifier, selected for its high interpretability and extremely low latency (< 45ms per review).'
    ],
    modules: [
      { label: 'NEURAL ANALYZER', value: 'Real-time extraction', description: 'Character-by-character neural visualization of sentiment.' },
      { label: 'EXPLAINABLE AI', value: 'Confidence scoring', description: 'Precision confidence scoring and thematic keyword extraction.' },
      { label: 'INTELLIGENCE DASHBOARD', value: 'World-class telemetry', description: 'Monitoring sentiment momentum, polarity ratios, and neural flux.' }
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
