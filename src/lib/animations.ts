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

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
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
