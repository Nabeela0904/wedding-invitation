"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { heroSpring, smoothEase } from "@/lib/motion";

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

function CountdownDigit({ value }: { value: string }) {
  return (
    <span className="relative block h-[1.75rem] overflow-hidden sm:h-[2rem]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center font-display text-xl font-semibold tabular-nums text-luxe-gold sm:text-2xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: smoothEase }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountdownUnit({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  const padded = String(value).padStart(2, "0");

  return (
    <motion.div
      className="rounded-lg border border-luxe-gold/20 bg-black/40 px-1 py-3 text-center backdrop-blur-sm sm:py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...heroSpring, delay: 0.06 * index }}
      style={{ boxShadow: "inset 0 1px 0 rgba(212,175,55,0.12)" }}
    >
      <CountdownDigit value={padded} />
      <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.2em] text-luxe-cream/45 sm:text-[10px]">
        {label}
      </span>
    </motion.div>
  );
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
      <motion.p
        className="text-center font-display text-lg text-luxe-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: smoothEase }}
      >
        The Haldi celebration has begun!
      </motion.p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {UNITS.map(({ key, label }, index) => (
        <CountdownUnit
          key={key}
          value={timeLeft[key]}
          label={label}
          index={index}
        />
      ))}
    </div>
  );
}
