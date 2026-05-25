"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import LiveCountdown from "./LiveCountdown";

export default function DetailsCard() {
  return (
    <motion.section
      className="relative z-10 mx-auto w-full max-w-lg px-4 pb-20 sm:px-6"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="haldi-glass rounded-3xl p-6 sm:p-8">
        <h2 className="text-center font-display text-2xl font-semibold text-gold sm:text-3xl">
          Event Details
        </h2>
        <p className="mt-2 text-center font-sans text-sm text-gold/65">
          We would be honoured by your presence
        </p>

        <dl className="mt-8 space-y-5">
          <DetailRow label="Date" value={HALDI_EVENT.dateLabel} />
          <DetailRow label="Time" value={HALDI_EVENT.timeLabel} />
          <DetailRow label="Venue" value={HALDI_EVENT.venueFull} />
        </dl>

        <div className="mt-8 border-t border-marigold/20 pt-8">
          <h3 className="text-center font-display text-xl text-gold">Countdown</h3>
          <p className="mt-1 text-center font-sans text-xs text-gold/55">
            Until the Haldi ceremony begins
          </p>
          <div className="mt-5">
            <LiveCountdown />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-marigold/15 pb-5 last:border-0 last:pb-0 sm:flex-row sm:gap-4">
      <dt className="w-20 shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-saffron">
        {label}
      </dt>
      <dd className="font-sans text-sm leading-relaxed text-gold/85">{value}</dd>
    </div>
  );
}
