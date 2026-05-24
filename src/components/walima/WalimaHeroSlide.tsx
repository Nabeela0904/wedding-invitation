"use client";

import { motion } from "framer-motion";
import { WALIMA_EVENT } from "@/lib/walima-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import WalimaGeometricAccent from "./WalimaGeometricAccent";

const heroTextShadow =
  "drop-shadow-[0_1px_2px_rgba(255,255,255,0.98)] drop-shadow-[0_2px_12px_rgba(255,255,255,0.92)]";

export default function WalimaHeroSlide() {
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
        className={`relative font-amiri text-[clamp(1.75rem,6vw,2.85rem)] font-bold leading-relaxed text-[#D97706] ${heroTextShadow}`}
      >
        {WALIMA_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#BE123C]/70 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className={`relative mx-auto mt-8 max-w-2xl font-display text-[clamp(1rem,3vw,1.35rem)] font-semibold normal-case leading-relaxed tracking-wide text-[#9F1239] sm:text-[1.15rem] ${heroTextShadow}`}
      >
        {WALIMA_EVENT.inviteLine}
      </motion.p>

      <div className="relative mt-12 grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <motion.div variants={fadeSlideUp} className="lg:text-right">
          <h1
            className={`font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-bold uppercase leading-tight tracking-[0.1em] text-[#9F1239] ${heroTextShadow}`}
          >
            {WALIMA_EVENT.groom.name}
          </h1>
        </motion.div>

        <motion.div variants={fadeSlideUp}>
          <WalimaGeometricAccent />
        </motion.div>

        <motion.div variants={fadeSlideUp} className="lg:text-left">
          <h1
            className={`font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-bold uppercase leading-tight tracking-[0.1em] text-[#9F1239] ${heroTextShadow}`}
          >
            {WALIMA_EVENT.bride.name}
          </h1>
        </motion.div>
      </div>
    </motion.header>
  );
}
