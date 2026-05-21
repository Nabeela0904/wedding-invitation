"use client";

import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import { cardReveal, fadeSlideUpSoft, staggerSection } from "@/lib/motion";

export default function InviteSection() {
  return (
    <section className="mountain-section">
      <motion.div
        variants={staggerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="w-full max-w-2xl"
      >
        <motion.h2
          variants={fadeSlideUpSoft}
          className="font-display text-[clamp(2.5rem,10vw,4rem)] font-medium tracking-[0.2em] text-mountain-ink"
        >
          INVITE
        </motion.h2>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-8 font-display text-lg text-mountain-muted sm:text-xl"
        >
          {HALDI_EVENT.inviteHeadline}
        </motion.p>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 font-display text-[clamp(2rem,7vw,3rem)] font-medium text-mountain-ink"
        >
          {HALDI_EVENT.guestOfHonor}
        </motion.p>

        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-4 font-display text-base italic text-mountain-muted sm:text-lg"
        >
          {HALDI_EVENT.hostLine}
        </motion.p>

        <motion.div
          variants={cardReveal}
          className="mountain-card mt-12 text-left"
        >
          <p className="font-sans text-sm leading-[1.85] text-mountain-muted sm:text-base">
            {HALDI_EVENT.message}
          </p>
          <p className="mt-8 font-display text-lg italic text-mountain-ink">
            {HALDI_EVENT.closingLine}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
