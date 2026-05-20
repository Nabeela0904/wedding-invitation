"use client";

import { motion } from "framer-motion";
import { fadeSlideUpSoft } from "@/lib/motion";

export default function HaldiFooter() {
  return (
    <motion.footer
      className="relative z-10 pb-12 pt-2 text-center"
      variants={fadeSlideUpSoft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="haldi-ornament mx-auto mb-4 max-w-[120px]" aria-hidden />
      <p className="font-sans text-xs tracking-wide text-gold/45">
        With love &amp; gratitude — Shoaib Faraz Ahmed
      </p>
    </motion.footer>
  );
}
