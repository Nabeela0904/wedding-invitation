"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { cardReveal, fadeSlideUp } from "@/lib/motion";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

function CountdownDigit({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeSlideUp}
      className="rounded-xl border border-metallic-gold/30 bg-white/50 py-3 text-center backdrop-blur-sm sm:py-4"
    >
      <span className="block font-display text-xl font-semibold tabular-nums text-emerald sm:text-2xl">
        {value}
      </span>
      <span className="mt-1 block font-sans text-[9px] uppercase tracking-wider text-emerald/55 sm:text-[10px]">
        {label}
      </span>
    </motion.div>
  );
}

export default function NikahEventDetails() {
  const { timeLeft, mounted } = useCountdown(NIKAH_EVENT.countdownIso);

  return (
    <motion.section
      className="relative z-10 mx-auto w-full max-w-lg px-4 pb-10 sm:px-6"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="nikah-glass rounded-3xl p-6 sm:p-8">
        <h2 className="text-center font-display text-2xl font-semibold text-emerald sm:text-3xl">
          Event Details
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <DetailCard label="Date & Time" lines={[NIKAH_EVENT.dateLabel, NIKAH_EVENT.timeLabel]} />
          <DetailCard label="Dinner" lines={[NIKAH_EVENT.dinnerLabel]} />
        </div>

        <div className="mt-8">
          <p className="text-center font-sans text-xs uppercase tracking-[0.18em] text-emerald/60">
            Countdown to Nikah
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {UNITS.map(({ key, label }) => (
              <CountdownDigit
                key={key}
                label={label}
                value={
                  mounted && timeLeft
                    ? formatCountdownUnit(timeLeft[key])
                    : "--"
                }
              />
            ))}
          </div>
          {mounted && !timeLeft && (
            <p className="mt-4 text-center font-display text-lg text-metallic-gold">
              The blessed Nikah has begun!
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function DetailCard({ label, lines }: { label: string; lines: string[] }) {
  return (
    <motion.div
      variants={fadeSlideUp}
      className="rounded-2xl border border-metallic-gold/25 bg-white/40 p-4 text-center backdrop-blur-sm"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-metallic-gold">
        {label}
      </p>
      {lines.map((line) => (
        <p key={line} className="mt-2 font-display text-base font-medium text-emerald sm:text-lg">
          {line}
        </p>
      ))}
    </motion.div>
  );
}
