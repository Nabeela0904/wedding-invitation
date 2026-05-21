"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { heroSpring, smoothEase } from "@/lib/motion";

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Mins" },
  { key: "seconds" as const, label: "Secs" },
];

export default function LiveCountdown() {
  const { timeLeft, mounted } = useCountdown(HALDI_EVENT.countdownIso);
  const eventStarted = mounted && !timeLeft;

  if (eventStarted) {
    return (
      <p className="text-center font-display text-lg text-marigold">
        The Haldi celebration has begun!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {UNITS.map(({ key, label }, index) => (
        <motion.div
          key={key}
          className="rounded-xl border border-marigold/25 bg-white/30 py-3 text-center backdrop-blur-sm sm:py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroSpring, delay: 0.06 * index }}
        >
          <span className="relative block h-[1.75rem] overflow-hidden sm:h-[2rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={mounted ? formatCountdownUnit(timeLeft?.[key]) : "ph"}
                className="flex h-full items-center justify-center font-display text-xl font-semibold tabular-nums text-gold sm:text-2xl"
                initial={mounted ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: smoothEase }}
              >
                {formatCountdownUnit(timeLeft?.[key])}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="mt-1 block font-sans text-[9px] uppercase tracking-wider text-gold/55 sm:text-[10px]">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
