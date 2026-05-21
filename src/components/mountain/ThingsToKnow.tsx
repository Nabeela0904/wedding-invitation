"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, staggerSection } from "@/lib/motion";

export default function ThingsToKnow() {
  return (
    <section className="mountain-section py-24">
      <motion.div
        className="w-full max-w-2xl"
        variants={staggerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          Things to know
        </motion.p>
        <motion.h2
          variants={fadeSlideUpSoft}
          className="mt-3 font-display text-2xl text-mountain-ink sm:text-3xl"
        >
          To help you feel at ease
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-mountain-muted"
        >
          We&apos;ve gathered a few thoughtful details we&apos;d love for you to
          know before the Haldi ceremony.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {HALDI_EVENT.thingsToKnow.map((item) => (
            <motion.div
              key={item.title}
              variants={cardReveal}
              className="mountain-card text-left"
            >
              <h3 className="font-display text-lg text-mountain-accent">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-mountain-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
