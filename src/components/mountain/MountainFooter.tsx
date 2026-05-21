"use client";

import { motion } from "framer-motion";
import { fadeSlideUpSoft } from "@/lib/motion";

export default function MountainFooter() {
  return (
    <motion.footer
      className="relative z-10 px-6 py-16 text-center"
      variants={fadeSlideUpSoft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mountain-divider mx-auto mb-6 max-w-[100px]" aria-hidden />
      <p className="font-sans text-xs text-mountain-muted/70">
        With love — Shoaib Faraz Ahmed
      </p>
      <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-mountain-muted/50">
        Rasm-e-Haldi · 2026
      </p>
    </motion.footer>
  );
}
