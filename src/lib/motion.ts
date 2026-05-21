import type { Transition, Variants } from "framer-motion";

/** Hero entrance spring: stiffness 80, damping 15 */
export const heroSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 15,
};

export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const fadeSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: heroSpring,
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: heroSpring,
  },
};
