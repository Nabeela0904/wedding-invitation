"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT, getGoogleMapsUrl } from "@/lib/haldi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import HaldiArchFrame from "./HaldiArchFrame";
import LiveCountdown from "./LiveCountdown";
import RsvpForm from "./RsvpForm";

export default function HaldiInvitation() {
  const mapsUrl = getGoogleMapsUrl(HALDI_EVENT.mapsQuery);

  return (
    <div className="relative z-10 pb-24 pt-14 sm:pt-20">
      <HaldiArchFrame>
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.p
            variants={fadeSlideUp}
            lang="ar"
            dir="rtl"
            className="font-amiri text-[clamp(1.45rem,5vw,2rem)] font-bold leading-relaxed text-deep-gold"
          >
            {HALDI_EVENT.bismillah}
          </motion.p>

          <motion.div
            variants={fadeSlideUp}
            className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-marigold/60 to-transparent"
            aria-hidden
          />

          <motion.p
            variants={fadeSlideUp}
            className="font-sans text-sm font-medium tracking-wide text-deep-gold/85 sm:text-base"
          >
            {HALDI_EVENT.welcomeLine}
          </motion.p>

          <motion.h1
            variants={fadeSlideUp}
            className="mt-3 font-display text-[clamp(1.35rem,4.5vw,1.75rem)] font-semibold leading-snug text-deep-gold"
          >
            {HALDI_EVENT.eventTitle}
          </motion.h1>

          <motion.p
            variants={fadeSlideUp}
            className="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-deep-gold/75 sm:text-[0.95rem]"
          >
            {HALDI_EVENT.description}
          </motion.p>

          <motion.dl
            variants={fadeSlideUp}
            className="mx-auto mt-8 space-y-3 rounded-xl border-2 border-marigold/25 bg-white/20 px-4 py-5 text-left backdrop-blur-sm sm:px-5"
          >
            <DetailRow label="Date" value={HALDI_EVENT.dateLabel} />
            <DetailRow label="Location" value={HALDI_EVENT.locationLabel} />
            <DetailRow label="Time" value={HALDI_EVENT.timeLabel} />
          </motion.dl>

          <motion.a
            variants={fadeSlideUp}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-marigold/35 bg-white/30 px-4 py-3 font-sans text-sm font-medium text-deep-gold will-change-transform"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPinIcon />
            View on Google Maps
          </motion.a>

          <motion.section variants={fadeSlideUp} className="mt-8" aria-labelledby="countdown-heading">
            <h2
              id="countdown-heading"
              className="font-display text-lg text-deep-gold"
            >
              Countdown
            </h2>
            <p className="mt-1 font-sans text-xs text-deep-gold/55">
              Until 8th July, 2026 at 5:00 PM
            </p>
            <div className="mt-4">
              <LiveCountdown />
            </div>
          </motion.section>

          <motion.section
            variants={fadeSlideUp}
            className="mt-8 border-t-2 border-marigold/20 pt-8"
            aria-labelledby="rsvp-heading"
          >
            <h2 id="rsvp-heading" className="font-display text-lg text-deep-gold">
              RSVP
            </h2>
            <p className="mt-1 mb-5 font-sans text-xs text-deep-gold/60">
              Kindly confirm your presence
            </p>
            <RsvpForm />
          </motion.section>
        </motion.article>
      </HaldiArchFrame>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="w-24 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
        {label}
      </dt>
      <dd className="font-sans text-sm text-deep-gold/90">{value}</dd>
    </div>
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
