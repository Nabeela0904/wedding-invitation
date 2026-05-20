"use client";

import { motion } from "framer-motion";
import { MEHNDI_EVENT, getGoogleMapsUrl } from "@/lib/mehndi-event";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import MehndiArchFrame from "./MehndiArchFrame";
import EventCountdown from "./EventCountdown";
import RsvpForm from "@/components/haldi/RsvpForm";

export default function MehndiInvitation() {
  const mapsUrl = getGoogleMapsUrl(MEHNDI_EVENT.mapsQuery);

  return (
    <div className="relative z-10 pb-16 pt-14 sm:pt-20">
      <MehndiArchFrame>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.p
            variants={fadeSlideUp}
            lang="ar"
            dir="rtl"
            className="font-serif text-[clamp(1.4rem,4.5vw,1.9rem)] font-bold leading-relaxed tracking-wide text-gold"
          >
            {MEHNDI_EVENT.bismillah}
          </motion.p>

          <motion.div
            variants={fadeSlideUp}
            className="mx-auto my-5 h-px w-20 bg-gradient-to-r from-transparent via-marigold/60 to-transparent"
          />

          <motion.p
            variants={fadeSlideUp}
            className="font-display text-lg font-medium leading-snug text-gold sm:text-xl"
          >
            {MEHNDI_EVENT.inviteLine}
          </motion.p>

          <motion.p
            variants={fadeSlideUp}
            className="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-gold/75 sm:text-[0.95rem]"
          >
            {MEHNDI_EVENT.message}
          </motion.p>

          <motion.div
            variants={fadeSlideUp}
            className="mx-auto mt-8 space-y-3 rounded-xl border border-marigold/20 bg-white/15 px-4 py-5 text-left backdrop-blur-sm sm:px-5"
          >
            <DetailRow label="Date" value={MEHNDI_EVENT.dateLabel} />
            <DetailRow label="Time" value={MEHNDI_EVENT.timeLabel} />
            <DetailRow label="Location" value={MEHNDI_EVENT.venueLabel} />
          </motion.div>

          <motion.a
            variants={fadeSlideUp}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-marigold/35 bg-white/30 px-4 py-3 font-sans text-sm font-medium text-gold"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPinIcon />
            View on Google Maps
          </motion.a>

          <motion.div variants={fadeSlideUp} className="mt-8">
            <h3 className="font-display text-lg text-gold">Countdown</h3>
            <div className="mt-4">
              <EventCountdown
                countdownIso={MEHNDI_EVENT.countdownIso}
                label="Until Rasm-e-haldi begins"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeSlideUp}
            className="mt-8 border-t border-marigold/20 pt-8"
          >
            <h3 className="font-display text-lg text-gold">RSVP</h3>
            <p className="mt-1 mb-5 font-sans text-xs text-gold/60">
              Please confirm your presence
            </p>
            <RsvpForm />
          </motion.div>
        </motion.div>
      </MehndiArchFrame>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-20 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
        {label}
      </span>
      <span className="font-sans text-sm text-gold/90">{value}</span>
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
