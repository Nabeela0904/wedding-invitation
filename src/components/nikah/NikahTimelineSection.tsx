"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { formatCountdownUnit, useCountdown } from "@/lib/useCountdown";
import { cardReveal, fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function NikahTimelineSection() {
  const { timeLeft, mounted } = useCountdown(NIKAH_EVENT.countdownIso);

  return (
    <section className="relative bg-emerald px-5 py-24 text-ivory sm:px-8 sm:py-32">
      <motion.div
        className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ParallaxLayer offset={28}>
          <div className="border-l border-metallic-gold/40 pl-8 sm:pl-10">
            <div className="space-y-3">
              {NIKAH_EVENT.ceremonyDetails.map((line, index) => (
                <motion.p
                  key={line}
                  variants={fadeSlideUp}
                  className={`font-display leading-snug tracking-wide text-ivory ${
                    index === 0
                      ? "text-[clamp(1.1rem,2.8vw,1.35rem)] italic text-metallic-gold"
                      : "text-[clamp(1.15rem,3vw,1.65rem)]"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.div
              variants={fadeSlideUp}
              className="mt-10 inline-block border border-metallic-gold/30 px-6 py-4"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-metallic-gold/80">
                Dinner
              </p>
              <p className="mt-2 font-display text-lg tracking-wide">
                {NIKAH_EVENT.dinnerLabel.replace("Dinner: ", "")}
              </p>
            </motion.div>
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
                  <span className="mt-1 block font-sans text-[8px] uppercase tracking-[0.2em] text-ivory/45 sm:text-[9px]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
            {mounted && !timeLeft && (
              <p className="mt-6 font-display text-lg text-metallic-gold">
                The blessed Nikah has begun
              </p>
            )}
          </div>
        </ParallaxLayer>
      </motion.div>
    </section>
  );
}
