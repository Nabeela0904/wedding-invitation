"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import {
  fadeSlideUp,
  fadeSlideUpSoft,
  staggerContainer,
} from "@/lib/motion";

export default function HaldiHero() {
  return (
    <motion.header
      className="relative z-10 px-4 pb-10 pt-[4.5rem] text-center sm:px-6 sm:pt-28 sm:pb-12"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeSlideUpSoft}
        className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-saffron/90 sm:text-xs"
      >
        You are cordially invited
      </motion.p>

      <motion.p
        variants={fadeSlideUp}
        className="mt-5 font-display text-[clamp(1.35rem,4.5vw,2rem)] font-medium leading-snug tracking-[0.12em] text-gold/90"
      >
        {HALDI_EVENT.ceremonyPrefix}
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="mt-2 bg-gradient-to-b from-gold via-saffron to-gold bg-clip-text font-display text-[clamp(2.1rem,7.5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-transparent"
      >
        {HALDI_EVENT.guestOfHonor}
      </motion.h1>

      <motion.div variants={fadeSlideUpSoft} className="mt-7 flex items-center justify-center gap-3" aria-hidden>
        <span className="haldi-ornament max-w-[60px]" />
        <span className="h-1.5 w-1.5 rotate-45 rounded-sm bg-marigold/70" />
        <span className="haldi-ornament max-w-[60px]" />
      </motion.div>

      <motion.p
        variants={fadeSlideUpSoft}
        className="mx-auto mt-7 max-w-md text-balance font-sans text-sm leading-relaxed text-gold/70 sm:text-[0.95rem]"
      >
        {HALDI_EVENT.tagline}
      </motion.p>
    </motion.header>
  );
}
