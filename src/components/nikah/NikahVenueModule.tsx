"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahVenueModule() {
  return (
    <section className="relative bg-warm-ivory px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        className="mx-auto max-w-lg text-center"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ParallaxLayer offset={24}>
          <motion.h2
            variants={fadeSlideUp}
            className="font-display text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.18em] text-charcoal"
          >
            {NIKAH_EVENT.venueTitle}
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            className="mt-4 font-sans text-xs uppercase tracking-[0.22em] text-charcoal/55"
          >
            {NIKAH_EVENT.venueSubtext}
          </motion.p>
        </ParallaxLayer>

        <motion.div
          variants={fadeSlideUp}
          className="relative mx-auto mt-12 inline-block p-4"
        >
          <div
            className="absolute inset-0 rounded-sm border border-metallic-gold/50 bg-metallic-gold/[0.04]"
            aria-hidden
          />
          <div className="absolute inset-2 rounded-sm border border-metallic-gold/25" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NIKAH_EVENT.qrImage}
            alt="QR code for venue location"
            width={240}
            height={240}
            className="relative z-10 mx-auto mix-blend-multiply opacity-95"
          />
        </motion.div>

        <motion.a
          variants={fadeSlideUp}
          href={NIKAH_EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-none border border-metallic-gold/60 bg-charcoal px-10 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-warm-ivory shadow-raabta-glow transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.03] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50 active:scale-[0.97]"
        >
          Open in Google Maps
        </motion.a>
      </motion.div>
    </section>
  );
}
