"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, smoothEase } from "@/lib/motion";

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

export default function MountainCountdownSection() {
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

  return (
    <section className="mountain-section">
      <motion.div
        className="mountain-card w-full max-w-lg"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          Countdown
        </motion.p>
        <motion.h2
          variants={fadeSlideUpSoft}
          className="mt-3 font-display text-2xl text-mountain-ink"
        >
          The countdown begins
        </motion.h2>

        {!timeLeft ? (
          <motion.p
            className="mt-6 font-display text-lg text-mountain-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            The celebration has begun!
          </motion.p>
        ) : (
          <motion.div
            variants={fadeSlideUpSoft}
            className="mt-8 grid grid-cols-4 gap-2 sm:gap-3"
          >
            {UNITS.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-xl border border-mountain-accent/15 bg-white/60 py-3"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={timeLeft[key]}
                    className="block font-display text-xl font-semibold tabular-nums text-mountain-ink sm:text-2xl"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                  >
                    {String(timeLeft[key]).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="mt-1 block text-[9px] uppercase tracking-wider text-mountain-muted">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-8 font-sans text-sm leading-relaxed text-mountain-muted"
        >
          {HALDI_EVENT.countdownClosing}
        </motion.p>
      </motion.div>
    </section>
  );
}
