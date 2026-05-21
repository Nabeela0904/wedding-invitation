"use client";

import { motion } from "framer-motion";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Mins" },
  { key: "seconds" as const, label: "Secs" },
];

type EventCountdownProps = {
  countdownIso: string;
  label?: string;
};

export default function EventCountdown({
  countdownIso,
  label = "Until the celebration begins",
}: EventCountdownProps) {
  const { timeLeft, mounted } = useCountdown(countdownIso);
  const eventStarted = mounted && !timeLeft;

  if (eventStarted) {
    return (
      <p className="text-center font-display text-lg text-marigold">
        The celebration has begun!
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-center font-sans text-xs text-gold/60">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {UNITS.map(({ key, label: unitLabel }, index) => (
          <motion.div
            key={key}
            className="rounded-lg border border-white/40 bg-white/25 px-1 py-2.5 text-center backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.08 * index,
            }}
          >
            <span className="block font-display text-xl font-semibold tabular-nums text-gold sm:text-2xl">
              {formatCountdownUnit(timeLeft?.[key])}
            </span>
            <span className="mt-0.5 block font-sans text-[9px] uppercase tracking-wider text-gold/55">
              {unitLabel}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
