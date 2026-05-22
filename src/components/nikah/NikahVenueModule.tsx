"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahVenueModule() {
  return (
    <section className="relative bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        className="nikah-glass mx-auto max-w-lg p-6 text-center sm:p-8"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ParallaxLayer offset={24}>
          <motion.h2
            variants={fadeSlideUp}
            className="font-display text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.18em] text-emerald"
          >
            {NIKAH_EVENT.venueTitle}
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-emerald/55"
          >
            {NIKAH_EVENT.venueSubtext}
          </motion.p>
        </ParallaxLayer>

        <motion.div
          variants={fadeSlideUp}
          className="relative mx-auto mt-10 inline-block overflow-hidden rounded-2xl border-2 border-emerald/30 bg-white/75 p-3 shadow-nikah-gold"
        >
          <div className="absolute inset-2 rounded-xl border border-metallic-gold/25" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NIKAH_EVENT.qrImage}
            alt="QR code for Nikah venue location"
            width={280}
            height={280}
            className="relative z-10 mx-auto max-w-full rounded-lg object-contain"
          />
        </motion.div>

        <motion.a
          variants={fadeSlideUp}
          href={NIKAH_EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-metallic-gold/45 bg-gradient-to-r from-emerald to-emerald-deep px-10 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory shadow-nikah-gold transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.03] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50 active:scale-[0.97]"
        >
          Open Location in Google Maps
        </motion.a>
      </motion.div>
    </section>
  );
}
