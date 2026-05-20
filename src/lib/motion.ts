import type { Variants } from "framer-motion";

/** Spring physics per spec: stiffness 80, damping 15 */
export const heroSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 15,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
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
