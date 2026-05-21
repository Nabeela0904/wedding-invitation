"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function NikahLocationHero() {
  return (
    <motion.header
      className="relative overflow-hidden bg-gradient-to-b from-emerald-deep via-emerald to-emerald/95 px-5 pb-20 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-32"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
              <path d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23D4AF37' stroke-width='0.6'/>
            </svg>
          `)}")`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative font-sans text-[10px] uppercase tracking-[0.4em] text-metallic-gold"
      >
        {NIKAH_EVENT.venueTitle}
      </motion.p>

      <motion.h1
        variants={fadeSlideUp}
        className="relative mt-5 font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-tight tracking-wide text-ivory"
      >
        {NIKAH_EVENT.locationPageTitle}
      </motion.h1>

      <motion.p
        variants={fadeSlideUp}
        className="relative mx-auto mt-4 max-w-md font-sans text-sm text-ivory/70"
      >
        {NIKAH_EVENT.locationPageSubtitle}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-8 h-px w-20 bg-metallic-gold/50"
        aria-hidden
      />

      <motion.div variants={fadeSlideUp} className="relative mx-auto mt-10 max-w-lg">
        <p className="font-display text-2xl font-semibold text-metallic-gold sm:text-3xl">
          {NIKAH_EVENT.venueName}
        </p>
        <p className="mt-2 font-sans text-sm uppercase tracking-[0.2em] text-ivory/75">
          {NIKAH_EVENT.venueDetail}
        </p>
      </motion.div>
    </motion.header>
  );
}
