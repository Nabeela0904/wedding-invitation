"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function HaldiHero() {
  return (
    <motion.header
      className="relative z-10 px-4 pb-10 pt-20 text-center sm:px-6 sm:pt-28 sm:pb-12"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeSlideUp}
        className="font-display text-[clamp(1.25rem,4vw,1.75rem)] font-medium tracking-wide text-gold/90"
      >
        {HALDI_EVENT.ceremonyTitle}
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="mt-3 bg-gradient-to-b from-gold via-saffron to-gold bg-clip-text font-display text-[clamp(2.5rem,9vw,4.25rem)] font-semibold leading-tight tracking-tight text-transparent"
      >
        {HALDI_EVENT.coupleNames}
      </motion.h1>

      <motion.div
        variants={fadeSlideUp}
        className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="mx-auto mt-6 max-w-md text-balance font-sans text-sm leading-relaxed text-gold/70 sm:text-base"
      >
        {HALDI_EVENT.tagline}
      </motion.p>
    </motion.header>
  );
}
