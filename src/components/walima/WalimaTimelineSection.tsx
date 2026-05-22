"use client";

import { motion } from "framer-motion";
import { WALIMA_EVENT } from "@/lib/walima-event";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "@/components/nikah/ParallaxLayer";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function WalimaTimelineSection() {
  const { timeLeft, mounted } = useCountdown(WALIMA_EVENT.countdownIso);

  return (
    <section className="relative bg-wine px-5 py-24 text-cream sm:px-8 sm:py-32">
      <motion.div
        className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ParallaxLayer offset={28}>
          <div className="border-l border-metallic-gold/40 pl-8 sm:pl-10">
            <motion.p
              variants={fadeSlideUp}
              className="font-sans text-[10px] uppercase tracking-[0.35em] text-metallic-gold"
            >
              {WALIMA_EVENT.blessedPhrase}
            </motion.p>
            <motion.p
              variants={fadeSlideUp}
              className="mt-6 font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-snug tracking-wide text-cream"
            >
              {WALIMA_EVENT.dateLabel}
            </motion.p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={20}>
          <div>
            <motion.p
              variants={fadeSlideUp}
              className="font-sans text-[10px] uppercase tracking-[0.35em] text-metallic-gold/80"
            >
              Countdown
            </motion.p>
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
              {UNITS.map(({ key, label }) => (
                <motion.div
                  key={key}
                  variants={fadeSlideUp}
                  className="border border-metallic-gold/25 py-4 text-center"
                >
                  <span className="block font-display text-xl font-medium tabular-nums sm:text-2xl">
                    {mounted && timeLeft
                      ? formatCountdownUnit(timeLeft[key])
                      : "--"}
                  </span>
                  <span className="mt-1 block font-sans text-[8px] uppercase tracking-[0.2em] text-cream/45 sm:text-[9px]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
            {mounted && !timeLeft && (
              <p className="mt-6 font-display text-lg text-metallic-gold">
                The Walima celebration has begun
              </p>
            )}
          </div>
        </ParallaxLayer>
      </motion.div>
    </section>
  );
}
