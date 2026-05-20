import type { Transition, Variants } from "framer-motion";

/** Premium spring: mass 0.8, damping 18 */
export const premiumSpring: Transition = {
  type: "spring",
  mass: 0.8,
  damping: 18,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.12,
    },
  },
};

export const fadeSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: premiumSpring,
  },
};
