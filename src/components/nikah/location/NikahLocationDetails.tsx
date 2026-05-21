"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";

export default function NikahLocationDetails() {
  return (
    <motion.div
      className="flex flex-col gap-5"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.div variants={fadeSlideUp} className="nikah-glass rounded-3xl p-6 text-center sm:p-8">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-emerald/55">
          Scan to Navigate
        </p>
        <div className="relative mx-auto mt-6 inline-block rounded-2xl border-2 border-metallic-gold/50 bg-white/60 p-4 shadow-nikah-gold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={NIKAH_EVENT.qrImage}
            alt="QR code for Nikah venue"
            width={220}
            height={220}
            className="mx-auto rounded-lg"
          />
        </div>
        <p className="mt-5 font-sans text-xs leading-relaxed text-emerald/65">
          {NIKAH_EVENT.directionsNote}
        </p>
      </motion.div>

      <motion.div variants={fadeSlideUp} className="nikah-glass rounded-3xl p-6 sm:p-7">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-metallic-gold">
          Event Day
        </p>
        <dl className="mt-5 space-y-4">
          <div className="flex justify-between gap-4 border-b border-emerald/10 pb-4">
            <dt className="font-sans text-xs uppercase tracking-wider text-emerald/50">Date</dt>
            <dd className="text-right font-display text-base text-emerald">{NIKAH_EVENT.dateLabel}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-emerald/10 pb-4">
            <dt className="font-sans text-xs uppercase tracking-wider text-emerald/50">Nikah</dt>
            <dd className="text-right font-display text-base text-emerald">{NIKAH_EVENT.timeLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-sans text-xs uppercase tracking-wider text-emerald/50">Dinner</dt>
            <dd className="text-right font-display text-base text-emerald">
              {NIKAH_EVENT.dinnerLabel.replace("Dinner: ", "")}
            </dd>
          </div>
        </dl>
      </motion.div>

      <motion.div variants={fadeSlideUp} className="rounded-3xl border border-metallic-gold/25 bg-emerald/[0.04] p-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-emerald/55">
          Good to Know
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-emerald/75">
          {NIKAH_EVENT.parkingNote}
        </p>
      </motion.div>

      <motion.div variants={fadeSlideUp} className="flex flex-col gap-3 sm:flex-row">
        <a
          href={NIKAH_EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center rounded-full border border-metallic-gold/50 bg-gradient-to-r from-emerald to-emerald-deep px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory shadow-nikah-gold transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.02] hover:shadow-raabta-glow active:scale-[0.98]"
        >
          Open in Google Maps
        </a>
        <Link
          href="/nikah"
          className="flex flex-1 items-center justify-center rounded-full border border-emerald/25 bg-white/70 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald transition-[transform,background-color] duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
        >
          Back to Invitation
        </Link>
      </motion.div>
    </motion.div>
  );
}
