"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT, getGoogleMapsUrl } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, staggerSection } from "@/lib/motion";

export default function EventDetailsSection() {
  const mapsUrl = getGoogleMapsUrl(HALDI_EVENT.mapsQuery);

  return (
    <section className="mountain-section">
      <motion.div
        className="mountain-card w-full max-w-md"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          When &amp; Where
        </motion.p>
        <motion.div variants={staggerSection} className="mt-6 space-y-4 text-left">
          <DetailRow label="Date" value={HALDI_EVENT.dateLabel} />
          <DetailRow label="Time" value={HALDI_EVENT.timeLabel} />
          <DetailRow label="Venue" value={HALDI_EVENT.venueFull} />
        </motion.div>
        <motion.a
          variants={fadeSlideUpSoft}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-marigold/30 bg-white/50 px-5 py-3 font-sans text-sm font-medium text-gold transition-colors hover:bg-white/70"
        >
          View on Google Maps
        </motion.a>
      </motion.div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={fadeSlideUpSoft} className="border-b border-marigold/15 pb-4 last:border-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-saffron">
        {label}
      </p>
      <p className="mt-1 font-sans text-sm text-mountain-ink">{value}</p>
    </motion.div>
  );
}
