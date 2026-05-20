"use client";

import { motion, type Variants } from "framer-motion";
import { HALDI_EVENT, getGoogleMapsUrl } from "@/lib/haldi-event";
import {
  cardReveal,
  fadeSlideUpSoft,
  staggerSection,
} from "@/lib/motion";
import MehrabAccent from "./MehrabAccent";
import LiveCountdown from "./LiveCountdown";
import RsvpForm from "./RsvpForm";

function SceneLabel({ episode, title }: { episode: string; title: string }) {
  return (
    <div className="mb-6 text-center">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.45em] text-marigold/90">
        {episode}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-luxe-cream sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function DetailsCard() {
  const mapsUrl = getGoogleMapsUrl(HALDI_EVENT.mapsQuery);

  return (
    <motion.section
      className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-24 sm:px-6"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
    >
      <div className="cinematic-glass relative overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-10">
        <MehrabAccent />

        <motion.div
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeSlideUpSoft}>
            <SceneLabel episode="Chapter I" title="Event Details" />
            <p className="-mt-4 mb-8 text-center font-sans text-sm text-luxe-cream/50">
              We would be honoured by your presence
            </p>
          </motion.div>

          <motion.div variants={staggerSection} className="space-y-3">
            <DetailRow variants={fadeSlideUpSoft} label="Date" value={HALDI_EVENT.dateLabel} />
            <DetailRow variants={fadeSlideUpSoft} label="Time" value={HALDI_EVENT.timeLabel} />
            <DetailRow
              variants={fadeSlideUpSoft}
              label="Venue"
              value={HALDI_EVENT.venueFull}
            />
          </motion.div>

          <motion.div variants={fadeSlideUpSoft} className="mt-6">
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-luxe-gold/30 bg-black/30 px-4 py-3.5 font-sans text-sm font-medium text-luxe-cream will-change-transform transition-colors hover:border-luxe-gold/50 hover:bg-black/45"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPinIcon />
              View on Google Maps
            </motion.a>
          </motion.div>

          <motion.div variants={fadeSlideUpSoft} className="mt-12">
            <div className="cinematic-ornament mb-8" aria-hidden />
            <SceneLabel episode="Chapter II" title="Countdown" />
            <p className="-mt-4 mb-6 text-center font-sans text-xs tracking-wide text-luxe-cream/45">
              Until the Haldi ceremony begins
            </p>
            <LiveCountdown />
          </motion.div>

          <motion.div variants={fadeSlideUpSoft} className="mt-12">
            <div className="cinematic-ornament mb-8" aria-hidden />
            <SceneLabel episode="Chapter III" title="RSVP" />
            <p className="-mt-4 mb-6 text-center font-sans text-xs text-luxe-cream/45">
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
      className="flex flex-col gap-1 rounded-lg border border-luxe-gold/10 bg-black/25 px-4 py-4 sm:flex-row sm:items-center sm:gap-6"
    >
      <span className="w-20 shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-marigold">
        {label}
      </span>
      <span className="font-sans text-sm leading-relaxed text-luxe-cream/90">
        {value}
      </span>
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
