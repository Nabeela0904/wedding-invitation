"use client";

import { motion } from "framer-motion";
import { WALIMA_EVENT } from "@/lib/walima-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import WalimaGeometricAccent from "./WalimaGeometricAccent";

export default function WalimaHeroSlide() {
  return (
    <motion.header
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,249,0.95) 0%, rgba(255,253,249,0.62) 55%, transparent 100%)",
        }}
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        lang="ar"
        dir="rtl"
        className="relative font-amiri text-[clamp(1.75rem,6vw,2.85rem)] leading-relaxed text-metallic-gold drop-shadow-[0_2px_16px_rgba(255,253,249,0.9)]"
      >
        {WALIMA_EVENT.bismillah}
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-wine/50 to-transparent"
        aria-hidden
      />

      <motion.p
        variants={fadeSlideUp}
        className="relative mt-8 font-display text-[clamp(1rem,3.2vw,1.45rem)] font-medium uppercase tracking-[0.14em] text-wine drop-shadow-[0_1px_12px_rgba(255,253,249,0.85)]"
      >
        {WALIMA_EVENT.hosts}
      </motion.p>

      <motion.p
        variants={fadeSlideUp}
        className="relative mx-auto mt-6 max-w-2xl font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-wine/75 sm:text-[11px]"
      >
        {WALIMA_EVENT.inviteLine}
      </motion.p>

      <div className="relative mt-12 grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <motion.div variants={fadeSlideUp} className="lg:text-right">
          <h1 className="font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-semibold uppercase leading-tight tracking-[0.1em] text-wine">
            {WALIMA_EVENT.groom.name}
          </h1>
        </motion.div>

        <motion.div variants={fadeSlideUp}>
          <WalimaGeometricAccent />
        </motion.div>

        <motion.div variants={fadeSlideUp} className="lg:text-left">
          <h1 className="font-display text-[clamp(1.25rem,3.8vw,1.85rem)] font-semibold uppercase leading-tight tracking-[0.1em] text-wine">
            {WALIMA_EVENT.bride.name}
          </h1>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-wine/60">
            {WALIMA_EVENT.bride.parents}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
