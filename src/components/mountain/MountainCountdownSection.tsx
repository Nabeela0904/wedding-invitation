"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { cardReveal, fadeSlideUpSoft, smoothEase } from "@/lib/motion";

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Mins" },
  { key: "seconds" as const, label: "Secs" },
];

export default function MountainCountdownSection() {
  const { timeLeft, mounted } = useCountdown(HALDI_EVENT.countdownIso);
  const eventStarted = mounted && !timeLeft;

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

        {eventStarted ? (
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
            {UNITS.map(({ key, label }) => {
              const display = formatCountdownUnit(timeLeft?.[key]);
              return (
                <div
                  key={key}
                  className="rounded-xl border border-marigold/20 bg-white/60 py-3"
                >
                  <span className="relative block h-[1.75rem] overflow-hidden sm:h-[2rem]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={mounted ? display : "placeholder"}
                        className="flex h-full items-center justify-center font-display text-xl font-semibold tabular-nums text-mountain-ink sm:text-2xl"
                        initial={mounted ? { opacity: 0, y: 6 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: smoothEase }}
                      >
                        {display}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="mt-1 block text-[9px] uppercase tracking-wider text-mountain-muted">
                    {label}
                  </span>
                </div>
              );
            })}
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
