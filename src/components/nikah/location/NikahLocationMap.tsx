"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";

export default function NikahLocationMap() {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(NIKAH_EVENT.venueSubtext)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      className="nikah-glass overflow-hidden rounded-3xl"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.div variants={fadeSlideUp} className="border-b border-emerald/10 px-5 py-4 sm:px-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-emerald/55">
          Interactive Map
        </p>
        <p className="mt-1 font-display text-lg text-emerald">{NIKAH_EVENT.venueSubtext}</p>
      </motion.div>

      <motion.div variants={fadeSlideUp} className="relative aspect-[4/3] w-full bg-emerald/5 sm:aspect-[16/10]">
        <iframe
          title="Nikah venue location map"
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-metallic-gold/20"
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}
