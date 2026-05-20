"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function HaldiHero() {
  return (
    <motion.header
      className="relative z-10 px-4 pb-8 pt-16 text-center sm:px-6 sm:pt-24 sm:pb-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeSlideUp}
        className="font-display text-[clamp(1.5rem,5vw,2.25rem)] font-medium leading-snug tracking-wide text-gold"
      >
        {HALDI_EVENT.ceremonyPrefix}
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="mt-3 font-display text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-tight text-gold"
      >
        {HALDI_EVENT.guestOfHonor}
      </motion.h1>

      <motion.div
        variants={fadeSlideUp}
        className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-gold/75 sm:text-base"
      >
        {HALDI_EVENT.tagline}
      </motion.p>
    </motion.header>
  );
}
