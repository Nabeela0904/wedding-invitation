"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function HaldiHero() {
  return (
    <motion.header
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,249,0.92) 0%, rgba(255,253,249,0.55) 55%, transparent 100%)",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative font-display text-[clamp(1.25rem,4vw,1.75rem)] font-medium tracking-wide text-gold drop-shadow-[0_1px_12px_rgba(255,253,249,0.9)]"
      >
        {HALDI_EVENT.ceremonyTitle}
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="relative mt-3 bg-gradient-to-b from-gold via-saffron to-deep-gold bg-clip-text font-display text-[clamp(2.5rem,9vw,4.25rem)] font-semibold leading-tight tracking-tight text-transparent drop-shadow-[0_2px_24px_rgba(255,253,249,0.85)]"
      >
        {HALDI_EVENT.coupleNames}
      </motion.h1>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 max-w-md text-balance font-sans text-sm leading-relaxed text-gold/80 drop-shadow-[0_1px_10px_rgba(255,253,249,0.85)] sm:text-base"
      >
        {HALDI_EVENT.tagline}
      </motion.p>
    </motion.header>
  );
}
