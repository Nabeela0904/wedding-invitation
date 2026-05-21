"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

export default function NikahHero() {
  return (
    <motion.header
      className="relative z-10 px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeSlideUp}
        lang="ar"
        dir="rtl"
        className="font-amiri text-[clamp(1.75rem,6vw,2.75rem)] leading-relaxed text-emerald"
      >
        {NIKAH_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-metallic-gold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="mx-auto mt-8 max-w-2xl font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-emerald/75 sm:text-xs"
      >
        {NIKAH_EVENT.inviteLine}
      </motion.p>

      <motion.div variants={fadeSlideUp} className="mt-10 space-y-8">
        <div>
          <h1 className="font-display text-[clamp(1.35rem,4.5vw,2rem)] font-semibold leading-snug text-emerald">
            {NIKAH_EVENT.groom.name}
          </h1>
          <p className="mt-2 font-sans text-sm text-emerald/65">
            {NIKAH_EVENT.groom.parents}
          </p>
        </div>

        <p className="font-display text-3xl font-light text-metallic-gold sm:text-4xl">
          &amp;
        </p>

        <div>
          <h1 className="font-display text-[clamp(1.35rem,4.5vw,2rem)] font-semibold leading-snug text-emerald">
            {NIKAH_EVENT.bride.name}
          </h1>
          <p className="mt-2 font-sans text-sm text-emerald/65">
            {NIKAH_EVENT.bride.parents}
          </p>
        </div>
      </motion.div>
    </motion.header>
  );
}
