"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT, getGoogleMapsUrl } from "@/lib/haldi-event";
import CountdownTimer from "./CountdownTimer";
import RsvpForm from "./RsvpForm";
import { fadeSlideUp } from "@/lib/motion";

export default function DetailsCard() {
  const mapsUrl = getGoogleMapsUrl(HALDI_EVENT.mapsQuery);

  return (
    <motion.section
      className="relative z-10 mx-auto w-full max-w-lg px-4 pb-16 sm:px-6"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="rounded-3xl border border-marigold/25 bg-white/20 p-6 shadow-gold-lg backdrop-blur-xl sm:p-8">
        <h2 className="text-center font-display text-2xl font-semibold text-gold sm:text-3xl">
          Event Details
        </h2>
        <p className="mt-2 text-center font-sans text-sm text-gold/65">
          Mark your calendar — we would be honoured by your presence
        </p>

        <dl className="mt-8 space-y-5">
          <div className="flex gap-4 border-b border-marigold/15 pb-5">
            <dt className="w-16 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
              Date
            </dt>
            <dd className="font-sans text-sm leading-relaxed text-gold/85">
              {HALDI_EVENT.dateLabel}
            </dd>
          </div>
          <div className="flex gap-4 border-b border-marigold/15 pb-5">
            <dt className="w-16 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
              Time
            </dt>
            <dd className="font-sans text-sm leading-relaxed text-gold/85">
              {HALDI_EVENT.timeLabel}
            </dd>
          </div>
          <div className="flex gap-4 pb-2">
            <dt className="w-16 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
              Venue
            </dt>
            <dd className="font-sans text-sm leading-relaxed text-gold/85">
              <span className="block font-medium text-gold">
                {HALDI_EVENT.venueName}
              </span>
              <span className="block text-gold/70">{HALDI_EVENT.venueDetail}</span>
            </dd>
          </div>
        </dl>

        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-marigold/30 bg-white/40 px-4 py-3 font-sans text-sm font-medium text-gold transition-colors hover:bg-white/60"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <MapPinIcon />
          View on Google Maps
        </motion.a>

        <div className="mt-10">
          <h3 className="text-center font-display text-xl text-gold">
            Countdown
          </h3>
          <p className="mt-1 text-center font-sans text-xs text-gold/60">
            Until the Haldi celebration begins
          </p>
          <div className="mt-5">
            <CountdownTimer />
          </div>
        </div>

        <div className="mt-10 border-t border-marigold/20 pt-8">
          <h3 className="text-center font-display text-xl text-gold">RSVP</h3>
          <p className="mt-1 mb-6 text-center font-sans text-xs text-gold/60">
            Please let us know if you can join us
          </p>
          <RsvpForm />
        </div>
      </div>
    </motion.section>
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
