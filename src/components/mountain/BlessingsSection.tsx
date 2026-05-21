"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft } from "@/lib/motion";

export default function BlessingsSection() {
  return (
    <section className="mountain-section">
      <motion.div
        className="mountain-card"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          Blessings
        </motion.p>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-4 font-display text-xl leading-relaxed text-mountain-ink sm:text-2xl"
        >
          {HALDI_EVENT.blessingLine}
        </motion.p>
        <motion.div variants={fadeSlideUpSoft} className="mountain-divider my-6" aria-hidden />
        <motion.p
          variants={fadeSlideUpSoft}
          className="font-display text-lg text-mountain-muted"
        >
          {HALDI_EVENT.familiesLine}
        </motion.p>
      </motion.div>
    </section>
  );
}
