"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(target: number): TimeLeft | null {
  const difference = target - Date.now();

  if (difference <= 0) {
    return null;
  }

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

export default function CountdownTimer() {
  const target = new Date(HALDI_EVENT.countdownIso).getTime();
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
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {UNITS.map(({ key, label }, index) => (
        <motion.div
          key={key}
          className="rounded-xl border border-white/40 bg-white/30 px-1 py-3 text-center backdrop-blur-sm sm:px-2 sm:py-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.1 * index,
          }}
        >
          <span className="block font-display text-2xl font-semibold tabular-nums text-gold sm:text-3xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 block font-sans text-[10px] uppercase tracking-wider text-gold/60 sm:text-xs">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
