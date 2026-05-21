"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { heroSpring, smoothEase } from "@/lib/motion";

type LiveCountdownProps = {
  countdownIso: string;
  startedMessage?: string;
};

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Mins" },
  { key: "seconds" as const, label: "Secs" },
];

export default function LiveCountdown({
  countdownIso,
  startedMessage = "The Haldi celebration has begun!",
}: LiveCountdownProps) {
  const { timeLeft, mounted } = useCountdown(countdownIso);
  const eventStarted = mounted && !timeLeft;

  if (eventStarted) {
    return (
      <motion.p
        className="text-center font-display text-lg text-luxe-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: smoothEase }}
      >
        {startedMessage}
      </motion.p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {UNITS.map(({ key, label }, index) => (
        <CountdownUnit
          key={key}
          display={formatCountdownUnit(timeLeft?.[key])}
          label={label}
          index={index}
          mounted={mounted}
        />
      ))}
    </div>
  );
}

function CountdownUnit({
  display,
  label,
  index,
  mounted,
}: {
  display: string;
  label: string;
  index: number;
  mounted: boolean;
}) {
  return (
    <motion.div
      className="rounded-lg border border-luxe-gold/20 bg-black/40 px-1 py-3 text-center backdrop-blur-sm sm:py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...heroSpring, delay: 0.06 * index }}
      style={{ boxShadow: "inset 0 1px 0 rgba(212,175,55,0.12)" }}
    >
      <span className="relative block h-[1.75rem] overflow-hidden sm:h-[2rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={mounted ? display : "placeholder"}
            className="absolute inset-0 flex items-center justify-center font-display text-xl font-semibold tabular-nums text-luxe-gold sm:text-2xl"
            initial={mounted ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: smoothEase }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.2em] text-luxe-cream/45 sm:text-[10px]">
        {label}
      </span>
    </motion.div>
  );
}
