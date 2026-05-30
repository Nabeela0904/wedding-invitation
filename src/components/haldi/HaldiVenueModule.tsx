"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT, getHaldiMapsUrl } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";

export default function HaldiVenueModule() {
  const mapsUrl = getHaldiMapsUrl();

  return (
    <section className="relative z-10 bg-cream px-5 pb-6 pt-4 sm:px-8">
      <motion.div
        className="haldi-glass mx-auto max-w-lg p-6 text-center sm:p-8"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.h2
          variants={fadeSlideUp}
          className="font-display text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.18em] text-gold"
        >
          {HALDI_EVENT.venueTitle}
        </motion.h2>
        <motion.a
          variants={fadeSlideUp}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scan or tap to open Haldi venue in Google Maps"
          className="relative mx-auto mt-8 inline-block overflow-hidden rounded-2xl border-2 border-marigold/35 bg-white/75 p-3 shadow-gold transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/50"
        >
          <div className="absolute inset-2 rounded-xl border border-marigold/20" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HALDI_EVENT.qrImage}
            alt="QR code for Haldi venue location on Google Maps"
            width={280}
            height={280}
            className="relative z-10 mx-auto max-w-full rounded-lg object-contain"
          />
        </motion.a>

        <motion.p
          variants={fadeSlideUp}
          className="mt-6 font-sans text-[10px] uppercase tracking-[0.28em] text-gold/55"
        >
          {HALDI_EVENT.venueSubtext}
        </motion.p>
        <motion.p
          variants={fadeSlideUp}
          className="mt-2 font-sans text-sm leading-relaxed text-gold/75"
        >
          {HALDI_EVENT.venueFull}
        </motion.p>
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-lg justify-end py-4 pl-3 pr-0 sm:py-5 sm:pl-6 sm:pr-0">
        <a
          href="/nikah"
          className="inline-flex translate-x-[4cm] items-center justify-center rounded-full border border-marigold/45 bg-gradient-to-r from-marigold to-saffron px-8 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-cream shadow-gold transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-gold-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/50 active:scale-[0.97]"
        >
          Nikah
        </a>
      </div>
    </section>
  );
}
