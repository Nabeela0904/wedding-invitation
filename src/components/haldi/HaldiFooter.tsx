"use client";

import { motion } from "framer-motion";
import { fadeSlideUpSoft } from "@/lib/motion";

export default function HaldiFooter() {
  return (
    <motion.footer
      className="relative z-10 border-t border-luxe-gold/10 px-6 py-14 text-center"
      variants={fadeSlideUpSoft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="cinematic-ornament mx-auto mb-6 max-w-[160px]" aria-hidden />
      <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-luxe-cream/35">
        End of Invitation
      </p>
      <p className="mt-3 font-display text-sm text-luxe-cream/55">
        With love &amp; gratitude — Shoaib Faraz Ahmed
      </p>
    </motion.footer>
  );
}
