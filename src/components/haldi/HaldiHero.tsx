"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function HaldiHero() {
  return (
    <motion.header
      className="relative z-10 px-4 pb-6 pt-14 text-center sm:px-6 sm:pt-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeSlideUp}
        className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-saffron/90 sm:text-sm"
      >
        You are cordially invited to
      </motion.p>

      <motion.p
        variants={fadeSlideUp}
        className="mt-4 font-display text-lg text-gold/80 sm:text-xl"
      >
        The Haldi Ceremony of
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="mt-3 font-display text-4xl font-semibold leading-tight text-gold sm:text-5xl md:text-6xl"
      >
        {HALDI_EVENT.groomName}
      </motion.h1>

      <motion.div
        variants={fadeSlideUp}
        className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold to-transparent"
      />

      <motion.p
        variants={fadeSlideUp}
        className="mt-5 font-display text-2xl italic text-saffron sm:text-3xl"
      >
        {HALDI_EVENT.ceremonyTitle}
      </motion.p>

      <motion.p
        variants={fadeSlideUp}
        className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-gold/70 sm:text-base"
      >
        Join us for an evening filled with colours of joy, the rhythm of dhol,
        and the warmth of love and laughter.
      </motion.p>
    </motion.header>
  );
}
