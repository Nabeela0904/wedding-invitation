"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahVenueModule() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative bg-ivory px-5 py-24 sm:px-8 sm:py-32">
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
            className="font-display text-2xl font-semibold text-emerald sm:text-3xl"
          >
            {NIKAH_EVENT.venueTitle}
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            className="mt-3 font-sans text-xs uppercase tracking-[0.22em] text-emerald/60"
          >
            {NIKAH_EVENT.venueSubtext}
          </motion.p>
        </ParallaxLayer>

        <motion.button
          type="button"
          variants={fadeSlideUp}
          className="group relative mx-auto mt-10 block rounded-2xl border-2 border-metallic-gold/60 bg-white/60 p-3 shadow-nikah-gold transition-transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50"
          onClick={() => setRevealed((v) => !v)}
          onMouseEnter={() => setRevealed(true)}
          onMouseLeave={() => setRevealed(false)}
          aria-label="Venue QR code — tap or hover to open Google Maps"
        >
          <div className="absolute inset-2 rounded-xl border border-metallic-gold/30" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NIKAH_EVENT.qrImage}
            alt="QR code for venue location"
            width={240}
            height={240}
            className="relative z-10 mx-auto rounded-lg"
          />
        </motion.button>

        <AnimatePresence>
          {revealed && (
            <motion.a
              href={NIKAH_EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-metallic-gold/50 bg-gradient-to-r from-emerald to-emerald-deep px-8 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-ivory shadow-nikah-gold will-change-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Open in Google Maps
            </motion.a>
          )}
        </AnimatePresence>

        <motion.p
          variants={fadeSlideUp}
          className="mx-auto mt-10 max-w-sm font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-emerald/70 sm:text-xs"
        >
          {NIKAH_EVENT.closingLine}
        </motion.p>
      </motion.div>
    </section>
  );
}
