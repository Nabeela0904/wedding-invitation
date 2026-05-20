"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { premiumSpring } from "@/lib/motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
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
        The celebration has begun!
      </p>
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-3">
      {UNITS.map(({ key, label }, index) => (
        <motion.div
          key={key}
          className="min-w-[4.25rem] flex-1 rounded-xl border-2 border-marigold/35 bg-white/20 px-2 py-3 text-center backdrop-blur-sm sm:min-w-[4.75rem] sm:px-3 sm:py-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...premiumSpring, delay: 0.15 * index }}
        >
          <span className="block font-display text-2xl font-semibold tabular-nums text-deep-gold sm:text-3xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 block font-sans text-[10px] font-medium uppercase tracking-widest text-deep-gold/65">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
