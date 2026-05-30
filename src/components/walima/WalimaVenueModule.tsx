"use client";

import { motion } from "framer-motion";
import { WALIMA_EVENT } from "@/lib/walima-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "@/components/nikah/ParallaxLayer";

export default function WalimaVenueModule() {
  return (
    <section className="relative bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        className="walima-glass mx-auto max-w-lg p-6 text-center sm:p-8"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ParallaxLayer offset={24}>
          <motion.h2
            variants={fadeSlideUp}
            className="font-display text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.18em] text-wine"
          >
            {WALIMA_EVENT.venueTitle}
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-wine/55"
          >
            {WALIMA_EVENT.venueSubtext}
          </motion.p>
        </ParallaxLayer>

        <motion.a
          variants={fadeSlideUp}
          href={WALIMA_EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scan or tap to open Walima venue in Google Maps"
          className="relative mx-auto mt-10 inline-block overflow-hidden rounded-2xl border-2 border-wine/30 bg-white/75 p-3 shadow-wine-glow transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50"
        >
          <div className="absolute inset-2 rounded-xl border border-metallic-gold/25" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={WALIMA_EVENT.qrImage}
            alt="Walima venue QR code with travel theme"
            width={280}
            height={280}
            className="relative z-10 mx-auto max-w-full rounded-lg object-contain"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
