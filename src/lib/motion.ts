import type { Transition, Variants } from "framer-motion";

/** Hero entrance spring: stiffness 80, damping 15 */
export const heroSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 15,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.18,
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
