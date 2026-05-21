"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, fadeSlideUpSoft, staggerContainer } from "@/lib/motion";

export default function MountainHero() {
  return (
    <section className="mountain-hero">
      <motion.div
        className="mountain-hero-inner"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeSlideUp}
          className="mountain-couple-name"
        >
          {HALDI_EVENT.groomName}
        </motion.h1>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mountain-weds"
        >
          {HALDI_EVENT.wedsLabel}
        </motion.p>

        <motion.h1
          variants={fadeSlideUp}
          className="mountain-couple-name"
        >
          {HALDI_EVENT.brideName}
        </motion.h1>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 font-display text-sm italic tracking-wide text-mountain-muted/80 sm:text-base"
        >
          {HALDI_EVENT.ceremonyLabel} · {HALDI_EVENT.dateLabel}
        </motion.p>
      </motion.div>

      <motion.div
        className="mountain-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          className="h-10 w-px bg-mountain-ink/30"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
