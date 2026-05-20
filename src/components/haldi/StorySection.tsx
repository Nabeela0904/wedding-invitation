"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft } from "@/lib/motion";

export default function StorySection() {
  return (
    <section className="relative z-10 flex min-h-[55vh] items-center justify-center px-6 py-20 sm:py-28">
      <motion.div
        className="max-w-2xl text-center"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p
          variants={fadeSlideUpSoft}
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-marigold/80"
        >
          The Celebration
        </motion.p>
        <motion.h2
          variants={fadeSlideUpSoft}
          className="mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-snug text-luxe-cream"
        >
          An evening woven with joy, rhythm, and love
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 text-balance font-sans text-base leading-relaxed text-luxe-cream/65 sm:text-lg"
        >
          {HALDI_EVENT.tagline}
        </motion.p>
        <motion.div
          variants={fadeSlideUpSoft}
          className="mx-auto mt-10 h-px w-32 cinematic-ornament"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
