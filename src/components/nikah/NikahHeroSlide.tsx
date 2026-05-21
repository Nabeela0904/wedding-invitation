"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import GeometricAccent from "./GeometricAccent";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahHeroSlide() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-warm-ivory px-5 py-28 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
              <path d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%231C1C22' stroke-width='0.5'/>
            </svg>
          `)}")`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <ParallaxLayer offset={24}>
          <motion.p
            variants={fadeSlideUp}
            lang="ar"
            dir="rtl"
            className="font-amiri text-[clamp(2rem,7vw,3.25rem)] leading-relaxed text-metallic-gold"
          >
            {NIKAH_EVENT.bismillah}
          </motion.p>
        </ParallaxLayer>

        <motion.div
          variants={fadeSlideUp}
          className="mx-auto mt-8 h-px w-20 bg-metallic-gold/60"
          aria-hidden
        />

        <motion.p
          variants={fadeSlideUp}
          className="mx-auto mt-10 max-w-2xl font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-charcoal/60 sm:text-[11px]"
        >
          {NIKAH_EVENT.inviteLine}
        </motion.p>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <ParallaxLayer offset={32} className="lg:text-right">
            <motion.div variants={fadeSlideUp}>
              <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.35rem)] font-medium uppercase leading-tight tracking-[0.12em] text-charcoal">
                {NIKAH_EVENT.groom.name}
              </h1>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-charcoal/50">
                {NIKAH_EVENT.groom.parents}
              </p>
            </motion.div>
          </ParallaxLayer>

          <motion.div variants={fadeSlideUp}>
            <GeometricAccent />
          </motion.div>

          <ParallaxLayer offset={32} className="lg:text-left">
            <motion.div variants={fadeSlideUp}>
              <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.35rem)] font-medium uppercase leading-tight tracking-[0.12em] text-charcoal">
                {NIKAH_EVENT.bride.name}
              </h1>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-charcoal/50">
                {NIKAH_EVENT.bride.parents}
              </p>
            </motion.div>
          </ParallaxLayer>
        </div>
      </motion.div>
    </section>
  );
}
