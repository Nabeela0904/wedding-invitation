"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahVenueModule() {
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
            className="font-display text-[clamp(1.5rem,4vw,2rem)] uppercase tracking-[0.18em] text-emerald"
          >
            {NIKAH_EVENT.venueTitle}
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            className="mt-4 font-sans text-xs uppercase tracking-[0.22em] text-emerald/60"
          >
            {NIKAH_EVENT.venueSubtext}
          </motion.p>
        </ParallaxLayer>

        <motion.div
          variants={fadeSlideUp}
          className="relative mx-auto mt-10 inline-block rounded-2xl border-2 border-metallic-gold/50 bg-white/50 p-4 shadow-nikah-gold"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NIKAH_EVENT.qrImage}
            alt="QR code for venue location"
            width={240}
            height={240}
            className="relative z-10 mx-auto rounded-lg"
          />
        </motion.div>

        <motion.a
          variants={fadeSlideUp}
          href={NIKAH_EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-metallic-gold/50 bg-gradient-to-r from-emerald to-emerald-deep px-10 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory shadow-nikah-gold transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.03] hover:shadow-raabta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metallic-gold/50 active:scale-[0.97]"
        >
          Open in Google Maps
        </motion.a>

        <motion.div variants={fadeSlideUp}>
          <Link
            href="/nikah/location"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald/25 bg-white/70 px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald transition-[transform,background-color] duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
          >
            View Full Location Page
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
