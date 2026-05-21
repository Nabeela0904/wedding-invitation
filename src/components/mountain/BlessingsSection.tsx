"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, staggerSection } from "@/lib/motion";

export default function BlessingsSection() {
  return (
    <section className="mountain-section mountain-section--compact">
      <motion.div
        className="w-full max-w-xl"
        variants={staggerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p
          variants={fadeSlideUpSoft}
          lang="ar"
          dir="rtl"
          className="font-amiri text-[clamp(1.15rem,3.5vw,1.6rem)] text-mountain-accent"
        >
          {HALDI_EVENT.bismillah}
        </motion.p>

        <motion.div variants={fadeSlideUpSoft} className="mountain-divider my-8" aria-hidden />

        <motion.p
          variants={fadeSlideUpSoft}
          className="font-display text-lg text-mountain-muted sm:text-xl"
        >
          {HALDI_EVENT.blessingIntro}
        </motion.p>

        <div className="mt-6 space-y-3">
          {HALDI_EVENT.blessingParents.map((line) => (
            <motion.p
              key={line}
              variants={fadeSlideUpSoft}
              className="font-display text-xl text-mountain-ink sm:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
