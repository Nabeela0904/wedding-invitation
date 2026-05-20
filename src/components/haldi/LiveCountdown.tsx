"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { heroSpring } from "@/lib/motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
];

function calculateTimeLeft(targetMs: number): TimeLeft | null {
  const difference = targetMs - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function LiveCountdown() {
  const targetMs = new Date(HALDI_EVENT.countdownIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft(targetMs),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetMs));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  if (!timeLeft) {
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
          className="rounded-xl border border-marigold/30 bg-white/25 px-1 py-3 text-center backdrop-blur-sm sm:py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroSpring, delay: 0.08 * index }}
        >
          <span className="block font-display text-xl font-semibold tabular-nums text-gold sm:text-2xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-0.5 block font-sans text-[9px] uppercase tracking-wider text-gold/60 sm:text-[10px]">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
