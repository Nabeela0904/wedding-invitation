"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, fadeSlideUpSoft, staggerContainer } from "@/lib/motion";

export default function MountainHero() {
  return (
    <section className="mountain-section">
      <motion.div
        className="flex flex-col items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeSlideUpSoft}
          lang="ar"
          dir="rtl"
          className="font-amiri text-[clamp(1.1rem,3.5vw,1.5rem)] text-mountain-accent"
        >
          {HALDI_EVENT.bismillah}
        </motion.p>

        <motion.div variants={fadeSlideUpSoft} className="mountain-divider mt-8" aria-hidden />

        <motion.p
          variants={fadeSlideUpSoft}
          className="mountain-label mt-10"
        >
          {HALDI_EVENT.ceremonyLabel}
        </motion.p>

        <motion.h1
          variants={fadeSlideUp}
          className="mt-4 font-display text-[clamp(2.75rem,12vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-mountain-ink"
        >
          {HALDI_EVENT.guestOfHonor.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 font-display text-lg italic text-mountain-muted sm:text-xl"
        >
          {HALDI_EVENT.dateLabel}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          className="h-10 w-px bg-mountain-accent/40"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
