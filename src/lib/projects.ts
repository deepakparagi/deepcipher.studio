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
    description: 'An immersive digital portfolio leveraging WebGL and bespoke typography to redefine personal branding.',
    challenge: 'Architecting an experience that balances technical rigor with avant-garde aesthetics, pushing the boundaries of web performance.',
    solution: 'Engineered a highly optimized React/Vite architecture integrated with custom Three.js shaders for fluid, cinematic navigation.',
    result: 'A landmark digital artifact demonstrating mastery over technical execution and luxury design principles.',
    image: '/Project cards images/Deepak_paragi portfolio.png',
    size: 'small',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    pullQuote: 'Defining the intersection of technical authority and uncompromising luxury.',
    liveUrl: 'https://deepakparagi.github.io/Deepak-Paragi-Portfolio',
    githubUrl: 'https://github.com/deepakparagi/Deepak-Paragi-Portfolio.git',
    overview: 'This project serves as a manifesto for digital excellence. We engineered a personal portfolio that operates not just as a resume, but as a premium digital experience, utilizing cutting-edge web technologies to create a memorable, high-performance interface.',
    problem: 'Standard portfolios often suffer from template fatigue and lack narrative depth. The objective was to break away from conventional layouts and establish a commanding digital presence.',
    objective: 'To construct a digital environment that visually communicates elite engineering capabilities and a sophisticated understanding of modern aesthetic trends.',
    designProcess: 'The design language relies on stark contrasts, fluid micro-interactions, and a bespoke typographic hierarchy, ensuring that the user is guided effortlessly through the narrative without friction.',
    developmentProcess: 'Built on a bleeding-edge Vite and React stack, the platform utilizes custom WebGL shaders to render organic, liquid-like visual elements that respond to user interaction in real time (<16ms frame rendering).',
    challenges: 'Balancing complex 3D rendering with strict performance budgets across mobile devices required extensive optimization of the animation loop and asset delivery pipelines.',
    solutions: 'Implemented dynamic lazy-loading, geometry instancing for 3D assets, and aggressive code splitting to guarantee a sub-second time-to-interactive (TTI) metric.',
    finalOutcome: 'A masterclass in creative engineering—an immersive, high-fidelity portfolio that establishes immediate trust and authority.',
    keyLearnings: 'Optimizing WebGL for low-end mobile devices while retaining high-fidelity visual output.',
    resultsNarrative: 'The portfolio has significantly increased engagement metrics, serving as a primary catalyst for premium client acquisition.',
    roleResponsibilities: ['Lead Architect', 'Creative Director', 'WebGL Developer', 'Motion Designer']
  },
  {
    id: 1,
    slug: 'shingri-developers',
    title: 'SHINGRI DEVELOPERS',
    client: 'Shingri Developers',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js 16', 'Tailwind CSS', 'Framer Motion'],
    description: 'A benchmark in luxury real estate digital presence, architected to evoke prestige and trust.',
    challenge: 'Translating the physical luxury of elite property developments into a frictionless, high-end digital ecosystem.',
    solution: 'Designed a "Liquid Luxury" platform featuring a custom 3D property navigator, deeply immersive narratives, and cinematic scroll architecture.',
    result: 'A monumental leap in digital real estate presentation, driving unprecedented client engagement.',
    image: '/Project cards images/Shingri_developers.png',
    size: 'full',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    pullQuote: 'Crafted with absolute precision. A digital testament to architectural excellence.',
    liveUrl: 'https://shingri-developers.vercel.app/',
    overview: 'Shingri Developers required a digital platform that mirrored the exclusivity and perfection of their real estate projects. We delivered a state-of-the-art web application that redefines how luxury properties are experienced online.',
    problem: 'The luxury real estate sector is saturated with dated, templated websites that fail to capture the true essence of premium living spaces.',
    objective: 'To create a digital flagship that positions Shingri Developers as the undisputed leader in luxury real estate, utilizing cutting-edge web performance and elite aesthetic paradigms.',
    designProcess: 'The UI is a masterclass in Minimal Luxury. We developed a proprietary color system (Monte Beige & Gold) set against deep charcoal foundational tones to evoke an "Old Money" aesthetic merged with modern minimalism.',
    developmentProcess: 'Leveraging Next.js 16, we built a highly resilient, server-rendered architecture that delivers instantaneous page loads while maintaining complex client-side animations via Framer Motion.',
    challenges: 'Ensuring 60fps performance on complex parallax and glassmorphic elements across legacy hardware and varied network conditions.',
    solutions: 'Employed sophisticated rendering techniques, including hardware-accelerated CSS transforms and selective hydration, to achieve flawless execution.',
    finalOutcome: 'An elite digital experience that perfectly encapsulates the prestige of Shingri Developers, featuring a dynamic full-bleed carousel and a custom property navigation system.',
    keyLearnings: 'Balancing heavy visual assets (4K imagery, video loops) with strict Core Web Vitals requirements.',
    resultsNarrative: 'Significant increase in high-net-worth lead generation and brand authority within the luxury real estate market.',
    roleResponsibilities: ['Frontend Engineering', 'UX/UI Design', 'Performance Optimization', 'Brand Strategy'],
    modules: [
      { label: 'AESTHETIC PALETTE', value: 'Monte Beige & Gold', description: 'Warm, sophisticated background that balances high-contrast elements to signify luxury.' },
      { label: 'HERO EXPERIENCE', value: 'Parallax Carousel', description: 'Dynamic full-bleed carousel with 3D depth effect and masked text reveal animations.' },
      { label: 'NAVIGATION', value: 'Glassmorphic UI', description: 'Sticky navbar that transitions to a dark, blurred glass effect upon scrolling.' }
    ]
  },
  {
    id: 4,
    slug: 'bipin-chikkatti-college',
    title: 'BIPIN CHIKKATTI INSTITUTIONS',
    client: 'Chikkatti Group of Institutions',
    category: 'CLIENT WORK',
    year: '2024',
    tags: ['HTML5', 'CSS3', 'Vanilla JS'],
    description: 'A sophisticated digital presence for a heritage academic institution, inspired by elite editorial design.',
    challenge: 'Modernizing a legacy institution\'s digital footprint while preserving its historical prestige and academic authority.',
    solution: 'Crafted a timeless, pure HTML/CSS architecture featuring smooth scroll reveals, elegant typography, and a "Subtle Minimal Classic" aesthetic.',
    result: 'A definitive, high-performance platform that establishes institutional credibility.',
    image: '/Project cards images/BIPIN CHIKKATTI SCHOOL.png',
    size: 'large',
    techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    pullQuote: 'A timeless, sophisticated aesthetic inspired by Ivy League universities.',
    liveUrl: 'https://www.chikkattieducation.co.in/',
    overview: 'The official digital platform for Bipin Chikkatti Institutions, situated on a 7-acre campus. We were tasked with bringing their digital presence up to a world-class standard, focusing on heritage, trust, and academic excellence.',
    problem: 'The institution\'s previous digital infrastructure was fragmented and failed to communicate the prestige and scale of their educational offerings.',
    objective: 'To design a platform that embodies an "Ivy League" aesthetic—utilizing muted gold highlights, deep navy accents, and sophisticated typography to build immediate trust.',
    designProcess: 'Drawing inspiration from luxury editorial design and heritage brands, we established a strict typographic hierarchy and a grid system that breathes, allowing the institution\'s legacy to take center stage.',
    developmentProcess: 'We opted for a highly optimized, dependency-free vanilla technology stack. This ensures maximum compatibility, lightning-fast load times, and absolute security.',
    challenges: 'Creating complex, buttery-smooth scroll animations and reveal effects without the overhead of heavy JavaScript libraries.',
    solutions: 'Utilized the Intersection Observer API and hardware-accelerated CSS transitions to achieve a premium feel with zero performance degradation.',
    finalOutcome: 'A distinguished, timeless website that honors the institution’s 1994 founding while providing a flawless modern user experience.',
    keyLearnings: 'The enduring power of pure, well-architected HTML/CSS in creating luxury digital experiences.',
    resultsNarrative: 'Dramatically improved prospective student engagement and streamlined the institution\'s digital communication channels.',
    roleResponsibilities: ['Lead Development', 'UI/UX Design', 'Interaction Design', 'Technical Strategy']
  },
  {
    id: 2,
    slug: 'gadag-info',
    title: 'GADAG INFO',
    client: 'Gadag District',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js 14', 'Tailwind CSS', 'GSAP'],
    description: 'A high-fidelity editorial hub celebrating regional heritage through world-class digital architecture.',
    challenge: 'Building a massive community platform capable of handling immense traffic while delivering a cinematic, heritage-focused narrative.',
    solution: 'Engineered an archival storytelling engine using Next.js 14, integrated with GSAP for complex, timeline-based animation sequences.',
    result: 'A 115k+ follower digital hub that sets a new standard for cultural platforms.',
    image: '/Project cards images/gadag_info.png',
    size: 'large',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    pullQuote: 'Celebrating cultural heritage through 2026-standard web design and cinematic architecture.',
    liveUrl: 'https://gadag.vercel.app/',
    overview: 'Gadag Info is the definitive digital heritage hub for the Gadag District. We engineered a platform that serves not just as an information directory, but as a cinematic celebration of regional culture and history.',
    problem: 'Community platforms often prioritize utility over aesthetics, resulting in sterile environments that fail to engage users emotionally.',
    objective: 'To construct a digital experience that rivals premium editorial publications (like Vogue or Bloomberg), customized for regional storytelling.',
    designProcess: 'Implemented asymmetric grid layouts, sophisticated bilingual typography (English/Kannada), and a high-contrast dark mode to make 4K historical assets striking and immersive.',
    developmentProcess: 'The platform is powered by Next.js 14, utilizing advanced caching strategies and Edge routing to deliver instantaneous navigation across hundreds of archival pages.',
    challenges: 'Seamlessly integrating heavy GSAP timeline animations with Next.js App Router dynamics without causing layout shifts or performance bottlenecks.',
    solutions: 'Developed a custom animation orchestration layer that pre-calculates layout dimensions and defers heavy animations until critical rendering paths are clear.',
    finalOutcome: 'A monumental community platform featuring 4K visual assets, cinematic reveals, and a flawless bilingual architecture.',
    keyLearnings: 'Advanced orchestration of GSAP within React Server Components.',
    resultsNarrative: 'Successfully scaled to support a massive community, becoming the central digital infrastructure for regional heritage.',
    roleResponsibilities: ['Lead Engineer', 'Animation Director', 'UX Architect', 'Localization Lead']
  },
  {
    id: 6,
    slug: 'khans-fitness',
    title: 'KHAN\'S FITNESS',
    client: 'Khan\'s Fitness, Gadag-Betageri',
    category: 'CLIENT WORK',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'A premium, AI-powered digital ecosystem for high-performance physical training.',
    challenge: 'Establishing a dominant digital presence that merges the visceral reality of physical training with next-generation digital intelligence.',
    solution: 'Architected a luxury-grade platform integrating centralized AI cognitive tools, dynamic workout generation, and a bespoke Burgundy design language.',
    result: 'A world-class fitness application that elevates the brand to an elite status.',
    image: '/Project cards images/Khans Fitness.png',
    size: 'large',
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'],
    pullQuote: 'The synthesis of brutal physical performance and supreme digital intelligence.',
    liveUrl: 'https://khans-fitness.vercel.app/',
    githubUrl: 'https://github.com/deepakparagi/Khans_Fitness.git',
    overview: 'Khan\'s Fitness required a platform that transcended the typical gym website. We built a comprehensive digital ecosystem that serves as a high-end AI fitness lab, offering users unprecedented access to cognitive training tools.',
    problem: 'The fitness industry lacks digital platforms that feel genuinely premium and technically sophisticated, usually relying on generic templates.',
    objective: 'To engineer an authoritative digital presence featuring custom AI calculators, real-time coaching interfaces, and an uncompromising luxury aesthetic.',
    designProcess: 'We developed a dual-theme system mapped to a custom luxury Burgundy design language, utilizing stark typography and brutalist UI elements to convey strength and precision.',
    developmentProcess: 'The platform leverages Next.js and TypeScript to construct a highly reliable, strongly-typed architecture capable of processing complex health calculations in real-time.',
    challenges: 'Designing intuitive, high-converting interfaces for complex data inputs (e.g., 1RM calculators, metabolic rate assessments) while maintaining the elite aesthetic.',
    solutions: 'Created bespoke, highly interactive form components with immediate micro-interaction feedback and dynamic data visualization.',
    finalOutcome: 'A dominant, AI-powered fitness platform that provides a world-class experience across all devices, establishing Khan\'s Fitness as a premier brand.',
    keyLearnings: 'Structuring complex state management for real-time health data processing within a highly animated UI.',
    resultsNarrative: 'The integration of the AI Fitness Lab has drastically increased user retention and premium membership conversions.',
    roleResponsibilities: ['Full-stack Development', 'AI Integration', 'UI/UX Design', 'Systems Architecture'],
    modules: [
      { label: 'AI FITNESS LAB', value: 'Cognitive Tools', description: 'Centralized interface housing precise BMI, 1RM, and Target Heart Rate health calculators.' },
      { label: 'WORKOUT GENERATOR', value: 'Dynamic generation', description: 'Intelligent, personalized training programs created dynamically based on user metrics.' },
      { label: 'KHAN AI COACH', value: 'Real-time Chat', description: 'Conversational interface engineered for specialized, authoritative guidance.' }
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
    description: 'A production-grade, high-fidelity sentiment analysis engine architected for the cinematic industry.',
    challenge: 'Engineering a platform capable of extracting deep emotional insights from text with absolute precision, while presenting complex data through a premium interface.',
    solution: 'Deployed a sophisticated TF-IDF + Logistic Regression machine learning pipeline within a "Bloomberg-Vercel" hybrid visual aesthetic.',
    result: 'Real-time cinematic intelligence achieving 92.4% validation accuracy with sub-50ms latency.',
    image: '/Project cards images/Sentiment movie analysis.png',
    size: 'full',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Flask', 'Scikit-learn', 'SQLite'],
    pullQuote: 'Real-time cinematic intelligence. Engineered with absolute precision, designed for supreme authority.',
    liveUrl: 'https://cinepulse-ai-sentiment-analysis.vercel.app/',
    githubUrl: 'https://github.com/deepakparagi/cinepulse-ai-sentiment-analysis.git',
    overview: 'CinePulse AI represents the pinnacle of specialized machine learning interfaces. We engineered a platform that not only processes complex sentiment analysis but presents it with the authority and clarity of a high-end financial terminal.',
    problem: 'Machine learning tools often possess powerful backends but feature neglected, utilitarian frontends that fail to inspire confidence in the data.',
    objective: 'To build a full-stack intelligence platform that marries a highly optimized Python backend with a flawless, cinematic React frontend.',
    designProcess: 'The UI adopts a "Bloomberg-Vercel" hybrid aesthetic—highly dense information architecture, monospaced typography for data points, and absolute minimalism to let the insights shine.',
    developmentProcess: 'The intelligence core utilizes a custom TF-IDF vectorization pipeline coupled with a Logistic Regression classifier, served via a highly concurrent Flask REST API.',
    challenges: 'Achieving real-time, character-by-character neural visualization on the frontend without lagging the main thread during API polling.',
    solutions: 'Implemented a custom WebSocket-like polling mechanism with aggressive debouncing and memoized rendering in React to ensure a buttery-smooth analytical experience.',
    finalOutcome: 'A formidable intelligence dashboard featuring explainable AI metrics, precision confidence scoring, and thematic keyword extraction.',
    keyLearnings: 'Bridging high-performance Python ML models with ultra-responsive React frontends under strict latency constraints.',
    resultsNarrative: 'The platform successfully processes thousands of queries with zero downtime, proving the viability of the hybrid architecture.',
    roleResponsibilities: ['Machine Learning Engineer', 'Frontend Architect', 'Backend Developer', 'Data Visualization Designer'],
    modules: [
      { label: 'NEURAL ANALYZER', value: 'Real-time extraction', description: 'Immediate, character-by-character neural visualization of sentiment flux.' },
      { label: 'EXPLAINABLE AI', value: 'Confidence scoring', description: 'Precision confidence scoring and advanced thematic keyword extraction.' },
      { label: 'INTELLIGENCE DASHBOARD', value: 'World-class telemetry', description: 'Monitoring sentiment momentum, polarity ratios, and real-time neural data.' }
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
