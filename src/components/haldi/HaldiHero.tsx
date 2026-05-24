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
        className="pointer-events-none absolute inset-x-0 top-0 h-[52%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,249,0.97) 0%, rgba(255,248,235,0.78) 50%, rgba(255,253,249,0.35) 100%)",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        lang="ar"
        dir="rtl"
        className="relative font-amiri text-[clamp(1.75rem,6vw,2.85rem)] font-bold leading-relaxed text-[#EA580C] drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]"
      >
        {HALDI_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
        aria-hidden
      />

      <motion.div
        variants={fadeSlideUp}
        className="relative w-full max-w-xl px-2 text-center sm:px-4"
      >
        <h1 className="sr-only">
          {HALDI_EVENT.heroTitle} {HALDI_EVENT.heroConnector} {HALDI_EVENT.heroName}
        </h1>
        <p
          aria-hidden
          className="font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight tracking-tight text-[#F97316] drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]"
        >
          {HALDI_EVENT.heroTitle}
        </p>
        <p
          aria-hidden
          className="my-2 font-display text-[clamp(1.1rem,3.5vw,1.5rem)] font-semibold italic tracking-[0.2em] text-[#FB923C] drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]"
        >
          {HALDI_EVENT.heroConnector}
        </p>
        <p
          aria-hidden
          className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight tracking-wide text-[#EA580C] drop-shadow-[0_1px_10px_rgba(255,255,255,0.92)]"
        >
          {HALDI_EVENT.heroName}
        </p>
      </motion.div>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 max-w-md text-balance font-sans text-sm font-semibold leading-relaxed text-[#C2410C] drop-shadow-[0_1px_8px_rgba(255,255,255,0.88)] sm:text-base"
      >
        {HALDI_EVENT.tagline}
      </motion.p>
    </motion.header>
  );
}
