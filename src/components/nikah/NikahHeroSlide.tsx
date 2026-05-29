"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import GeometricAccent from "./GeometricAccent";

const heroTextShadow =
  "drop-shadow-[0_1px_2px_rgba(255,255,255,0.98)] drop-shadow-[0_2px_12px_rgba(255,255,255,0.92)]";

export default function NikahHeroSlide() {
  return (
    <motion.header
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,249,0.98) 0%, rgba(255,248,235,0.88) 48%, rgba(255,253,249,0.45) 100%)",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        lang="ar"
        dir="rtl"
        className={`relative font-amiri text-[clamp(1.75rem,6vw,2.85rem)] font-bold leading-relaxed text-[#B45309] ${heroTextShadow}`}
      >
        {NIKAH_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#B45309]/80 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className={`relative mx-auto mt-8 max-w-2xl font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[#047857] sm:text-[11px] ${heroTextShadow}`}
      >
        {NIKAH_EVENT.inviteLine}
      </motion.p>

      <div className="relative mt-12 grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <motion.div variants={fadeSlideUp} className="lg:text-right">
          <h1
            className={`font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-bold uppercase leading-tight tracking-[0.1em] text-[#065F46] ${heroTextShadow}`}
          >
            {NIKAH_EVENT.groom.name}
          </h1>
        </motion.div>

        <motion.div variants={fadeSlideUp}>
          <GeometricAccent />
        </motion.div>

        <motion.div variants={fadeSlideUp} className="lg:text-left">
          <h1
            className={`font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-bold uppercase leading-tight tracking-[0.1em] text-[#065F46] ${heroTextShadow}`}
          >
            {NIKAH_EVENT.bride.name}
          </h1>
        </motion.div>
      </div>
    </motion.header>
  );
}
