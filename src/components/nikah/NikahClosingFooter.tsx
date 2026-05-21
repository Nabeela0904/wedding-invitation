"use client";

import { motion } from "framer-motion";
import { NIKAH_EVENT } from "@/lib/nikah-event";
import { fadeSlideUp } from "@/lib/motion";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahClosingFooter() {
  return (
    <footer className="relative bg-emerald-deep px-5 py-28 text-center sm:px-8 sm:py-36">
      <ParallaxLayer offset={20}>
        <motion.p
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl font-sans text-[11px] font-medium uppercase leading-[2] tracking-[0.22em] text-ivory/80 sm:text-xs"
        >
          {NIKAH_EVENT.closingLine}
        </motion.p>
      </ParallaxLayer>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-12 h-px w-16 bg-metallic-gold/40"
        aria-hidden
      />
    </footer>
  );
}
