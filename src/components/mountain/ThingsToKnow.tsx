"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, staggerSection } from "@/lib/motion";

export default function ThingsToKnow() {
  return (
    <section className="mountain-section mountain-section--stacked">
      <motion.div
        className="w-full max-w-2xl"
        variants={staggerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.h2
          variants={fadeSlideUpSoft}
          className="font-display text-[clamp(1.75rem,5vw,2.5rem)] text-mountain-ink"
        >
          Things to know
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-mountain-muted sm:text-base"
        >
          {HALDI_EVENT.thingsToKnowIntro}
        </motion.p>

        <div className="mt-12 space-y-10">
          {HALDI_EVENT.thingsToKnow.map((item) => (
            <motion.div
              key={item.title}
              variants={cardReveal}
              className="mountain-know-item text-left"
            >
              <h3 className="font-display text-2xl text-mountain-accent sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mountain-muted sm:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
