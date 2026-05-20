"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { fadeSlideUp, fadeSlideUpSoft, staggerContainer, smoothEase } from "@/lib/motion";

export default function CinematicHero() {
  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
      <motion.div
        className="flex w-full max-w-4xl flex-col items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeSlideUpSoft}
          lang="ar"
          dir="rtl"
          className="font-amiri text-[clamp(1.25rem,4vw,1.75rem)] font-bold text-luxe-gold cinematic-title-glow"
        >
          {HALDI_EVENT.bismillah}
        </motion.p>

        <motion.div
          variants={fadeSlideUpSoft}
          className="mt-6 flex items-center gap-3"
          aria-hidden
        >
          <span className="cinematic-ornament w-16 sm:w-24" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.45em] text-luxe-gold/70">
            {HALDI_EVENT.seriesLabel}
          </span>
          <span className="cinematic-ornament w-16 sm:w-24" />
        </motion.div>

        <motion.div
          variants={fadeSlideUp}
          className="mt-10 inline-flex items-center gap-2 rounded border border-luxe-gold/30 bg-black/40 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-marigold shadow-[0_0_8px_#F59E0B]" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-luxe-cream">
            Now Inviting
          </span>
        </motion.div>

        <motion.p
          variants={fadeSlideUp}
          className="mt-8 font-display text-[clamp(1rem,3vw,1.35rem)] font-medium uppercase tracking-[0.35em] text-luxe-cream/80"
        >
          {HALDI_EVENT.ceremonyPrefix}
        </motion.p>

        <motion.h1
          variants={fadeSlideUp}
          className="cinematic-title-glow mt-2 max-w-[14ch] bg-gradient-to-b from-luxe-cream via-luxe-gold to-marigold bg-clip-text font-display text-[clamp(2.75rem,11vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-transparent"
        >
          {HALDI_EVENT.guestOfHonor}
        </motion.h1>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 font-sans text-sm tracking-wide text-luxe-cream/50"
        >
          Haldi Ceremony · July 2026
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: smoothEase }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxe-cream/40">
          Scroll to explore
        </span>
        <motion.div
          className="h-8 w-[1px] bg-gradient-to-b from-luxe-gold/80 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
