"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahVenueModule() {
  return (
    <section className="relative bg-cream px-5 pb-6 pt-24 sm:px-8 sm:pt-32">
      <motion.div
        className="nikah-glass mx-auto max-w-4xl p-6 text-center sm:p-8"
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
            className="mx-auto mt-3 max-w-xl font-sans text-[10px] uppercase tracking-[0.28em] text-emerald/55"
          >
            Scan to navigate on Google Maps
          </motion.p>
        </ParallaxLayer>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {NIKAH_EVENT.venues.map((venue) => (
            <motion.div
              key={venue.label}
              variants={fadeSlideUp}
              className="flex flex-col items-center"
            >
              <p className="font-display text-[clamp(1rem,2.6vw,1.2rem)] uppercase tracking-[0.14em] text-emerald">
                {venue.label}
              </p>
              <p className="mt-2 max-w-[16rem] font-sans text-[10px] uppercase tracking-[0.22em] text-emerald/55">
                {venue.subtext}
              </p>

              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Scan or tap to open ${venue.label} in Google Maps`}
                className="relative mx-auto mt-6 inline-block overflow-hidden rounded-2xl border-2 border-emerald/30 bg-white/75 p-3 shadow-nikah-gold transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50"
              >
                <div
                  className="absolute inset-2 rounded-xl border border-metallic-gold/25"
                  aria-hidden
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={venue.qrImage}
                  alt={venue.qrAlt}
                  width={260}
                  height={260}
                  className="relative z-10 mx-auto max-w-full rounded-lg object-contain"
                />
              </a>

              {venue.label === "Nikah Ceremony" && (
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-metallic-gold/45 bg-gradient-to-r from-emerald to-emerald-deep px-8 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory shadow-nikah-gold transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.03] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50 active:scale-[0.97] sm:px-10 sm:py-3.5 sm:text-[11px]"
                >
                  Open Location in Google Maps
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-4xl justify-end py-4 pl-3 pr-0 sm:py-5 sm:pl-6 sm:pr-0">
        <a
          href="/walima"
          className="inline-flex translate-x-[4cm] items-center justify-center rounded-full border border-metallic-gold/45 bg-gradient-to-r from-emerald to-emerald-deep px-8 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory shadow-nikah-gold transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50 active:scale-[0.97]"
        >
          Walima
        </a>
      </div>
    </section>
  );
}
