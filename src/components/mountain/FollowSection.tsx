"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft } from "@/lib/motion";

export default function FollowSection() {
  return (
    <section className="mountain-section mountain-section--compact">
      <motion.div
        className="w-full max-w-md"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.h2
          variants={fadeSlideUpSoft}
          className="font-display text-2xl text-mountain-ink sm:text-3xl"
        >
          {HALDI_EVENT.instagramLabel}
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-3 font-sans text-sm text-mountain-muted"
        >
          {HALDI_EVENT.instagramPrompt}
        </motion.p>
        <motion.a
          variants={fadeSlideUpSoft}
          href={HALDI_EVENT.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-mountain-accent/30 bg-white/70 px-8 py-3 font-sans text-sm font-medium text-mountain-ink transition-colors hover:border-mountain-accent/50 hover:bg-white"
        >
          Open Instagram
        </motion.a>
      </motion.div>
    </section>
  );
}
