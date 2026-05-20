"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(target: number): TimeLeft | null {
  const difference = target - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
];

type EventCountdownProps = {
  countdownIso: string;
  label?: string;
};

export default function EventCountdown({
  countdownIso,
  label = "Until the celebration begins",
}: EventCountdownProps) {
  const target = new Date(countdownIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft(target),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!timeLeft) {
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
              {String(timeLeft[key]).padStart(2, "0")}
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
