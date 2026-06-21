import type { Transition, Variants } from 'framer-motion';

/* ========================================
   Core Easings
   ======================================== */

export type BezierEase = [number, number, number, number];
export type SpringEase = { type: 'spring'; stiffness: number; damping: number; mass?: number };
export type EaseType = BezierEase | SpringEase | string;

export const ease = {
  out: [0.16, 1, 0.3, 1] as BezierEase,
  in: [0.42, 0, 0.58, 1] as BezierEase,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as SpringEase,
  cinematic: [0.76, 0, 0.24, 1] as BezierEase,
  gentle: [0.25, 0.1, 0.25, 1] as BezierEase,
};

/* ========================================
   Reveal Variants
   ======================================== */

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ease.out,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.gentle },
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ========================================
   Stagger Container
   ======================================== */

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ========================================
   Page Transitions
   ======================================== */

export const pageTransition: Transition = {
  duration: 0.5,
  ease: ease.cinematic,
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: ease.in },
  },
};

/* ========================================
   Character/Word Reveal
   ======================================== */

export const charRevealVariants: Variants = {
  hidden: {
    y: '115%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: ease.out,
    },
  },
};

export const wordRevealVariants: Variants = {
  hidden: {
    y: '115%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: ease.out,
    },
  },
};

/* ========================================
   Scroll Animations
   ======================================== */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' }
  }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3
    }
  }
};
