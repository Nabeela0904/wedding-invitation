"use client";

import { motion } from "framer-motion";

export default function WalimaGeometricAccent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 py-3 lg:py-0">
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-transparent via-wine/50 to-transparent sm:h-12 lg:hidden"
        animate={{ scaleY: [0.85, 1, 0.9, 1, 0.85], opacity: [0.5, 0.85, 0.6, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11 lg:hidden"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle cx="40" cy="40" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#722F37" strokeWidth="0.5" opacity="0.45" />
        </svg>
      </motion.div>
      <span className="font-display text-lg font-light text-metallic-gold sm:text-xl lg:px-1 lg:text-2xl">&amp;</span>
    </div>
  );
}
