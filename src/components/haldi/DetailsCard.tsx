"use client";

import { motion, type Variants } from "framer-motion";
import { HALDI_EVENT, getGoogleMapsUrl } from "@/lib/haldi-event";
import {
  cardReveal,
  fadeSlideUpSoft,
  staggerSection,
} from "@/lib/motion";
import LiveCountdown from "./LiveCountdown";
import RsvpForm from "./RsvpForm";

export default function DetailsCard() {
  const mapsUrl = getGoogleMapsUrl(HALDI_EVENT.mapsQuery);

  return (
    <motion.section
      className="relative z-10 mx-auto w-full max-w-lg px-4 pb-20 sm:px-6"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
    >
      <div className="haldi-glass relative overflow-hidden p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent"
          aria-hidden
        />

        <motion.div variants={staggerSection} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeSlideUpSoft}>
            <h2 className="text-center font-display text-2xl font-semibold text-gold sm:text-3xl">
              Event Details
            </h2>
            <p className="mt-2 text-center font-sans text-sm text-gold/60">
              We would be honoured by your presence
            </p>
          </motion.div>

          <motion.div variants={staggerSection} className="mt-8 space-y-3">
            <DetailRow variants={fadeSlideUpSoft} label="Date" value={HALDI_EVENT.dateLabel} />
            <DetailRow variants={fadeSlideUpSoft} label="Time" value={HALDI_EVENT.timeLabel} />
            <DetailRow
              variants={fadeSlideUpSoft}
              label="Venue"
              value={`${HALDI_EVENT.venueName} — ${HALDI_EVENT.venueDetail}`}
            />
          </motion.div>

          <motion.div variants={fadeSlideUpSoft}>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-marigold/30 bg-white/40 px-4 py-3.5 font-sans text-sm font-medium text-gold will-change-transform backdrop-blur-sm"
              whileHover={{ scale: 1.015, opacity: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <MapPinIcon />
              View on Google Maps
            </motion.a>
          </motion.div>

          <motion.div variants={fadeSlideUpSoft} className="mt-9">
            <div className="haldi-ornament mb-6" aria-hidden />
            <h3 className="text-center font-display text-xl text-gold">Countdown</h3>
            <p className="mt-1 text-center font-sans text-xs tracking-wide text-gold/50">
              Until the Haldi ceremony begins
            </p>
            <div className="mt-5">
              <LiveCountdown />
            </div>
          </motion.div>

          <motion.div variants={fadeSlideUpSoft} className="mt-9">
            <div className="haldi-ornament mb-6" aria-hidden />
            <h3 className="text-center font-display text-xl text-gold">RSVP</h3>
            <p className="mt-1 mb-5 text-center font-sans text-xs text-gold/50">
              Kindly confirm your attendance
            </p>
            <RsvpForm />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function DetailRow({
  label,
  value,
  variants,
}: {
  label: string;
  value: string;
  variants?: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="flex flex-col gap-1 rounded-xl border border-marigold/10 bg-white/25 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4"
    >
      <span className="w-20 shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-saffron">
        {label}
      </span>
      <span className="font-sans text-sm leading-relaxed text-gold/88">{value}</span>
    </motion.div>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
