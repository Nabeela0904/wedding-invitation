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
        className="max-w-2xl"
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          Invite
        </motion.p>
        <motion.h2
          variants={fadeSlideUpSoft}
          className="mt-4 font-display text-[clamp(2rem,8vw,3.5rem)] font-medium leading-tight text-mountain-ink"
        >
          INVITE
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-6 font-display text-lg text-mountain-muted sm:text-xl"
        >
          {HALDI_EVENT.inviteHeadline}
        </motion.p>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-4 font-display text-3xl font-medium text-mountain-accent sm:text-4xl"
        >
          {HALDI_EVENT.guestOfHonor}
        </motion.p>

        <motion.div
          variants={cardReveal}
          className="mountain-card mt-10 text-left"
        >
          <p className="font-sans text-sm leading-relaxed text-mountain-muted sm:text-base">
            {HALDI_EVENT.message}
          </p>
          <p className="mt-6 font-display text-lg italic text-mountain-ink">
            {HALDI_EVENT.closingLine}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
