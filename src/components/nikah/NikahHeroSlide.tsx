"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import GeometricAccent from "./GeometricAccent";

export default function NikahHeroSlide() {
  return (
    <motion.header
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[48%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,251,247,0.94) 0%, rgba(253,251,247,0.6) 55%, transparent 100%)",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        lang="ar"
        dir="rtl"
        className="relative font-amiri text-[clamp(1.75rem,6vw,2.85rem)] font-semibold leading-relaxed text-[#E5C04A] drop-shadow-[0_1px_3px_rgba(0,0,0,0.15),0_2px_16px_rgba(253,251,247,0.95)]"
      >
        {NIKAH_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-metallic-gold/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative mx-auto mt-8 max-w-2xl font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald drop-shadow-[0_1px_10px_rgba(253,251,247,0.85)] sm:text-[11px]"
      >
        {NIKAH_EVENT.inviteLine}
      </motion.p>

      <div className="relative mt-12 grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <motion.div variants={fadeSlideUp} className="lg:text-right">
          <h1 className="font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-semibold uppercase leading-tight tracking-[0.1em] text-emerald drop-shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_12px_rgba(253,251,247,0.9)]">
            {NIKAH_EVENT.groom.name}
          </h1>
          <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-emerald/90">
            {NIKAH_EVENT.groom.parents}
          </p>
        </motion.div>

        <motion.div variants={fadeSlideUp}>
          <GeometricAccent />
        </motion.div>

        <motion.div variants={fadeSlideUp} className="lg:text-left">
          <h1 className="font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-semibold uppercase leading-tight tracking-[0.1em] text-emerald drop-shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_12px_rgba(253,251,247,0.9)]">
            {NIKAH_EVENT.bride.name}
          </h1>
          <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-emerald/90">
            {NIKAH_EVENT.bride.parents}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
