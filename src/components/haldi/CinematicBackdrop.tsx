"use client";

import { motion } from "framer-motion";

export default function CinematicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-midnight" />

      <motion.div
        className="absolute inset-[-20%] will-change-transform"
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{
          scale: [1.08, 1.14, 1.1],
          opacity: [0.45, 0.55, 0.45],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(15,61,50,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(212,175,55,0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(245,158,11,0.08) 0%, transparent 45%)",
        }}
      />

      <div className="cinematic-vignette absolute inset-0" />
      <div className="cinematic-grain absolute inset-0" />
    </div>
  );
}
