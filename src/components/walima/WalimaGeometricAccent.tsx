"use client";

import { motion } from "framer-motion";

export default function WalimaGeometricAccent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 py-2 lg:flex-row lg:gap-0 lg:px-1 lg:py-0">
      <motion.div
        className="h-12 w-px bg-gradient-to-b from-transparent via-[#4A1520]/85 to-transparent sm:h-14 lg:hidden"
        animate={{ scaleY: [0.85, 1, 0.9, 1, 0.85], opacity: [0.65, 0.95, 0.75, 0.9, 0.65] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14 lg:h-11 lg:w-11"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle cx="40" cy="40" r="28" fill="none" stroke="#881337" strokeWidth="0.75" opacity="0.85" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#4A1520" strokeWidth="0.65" opacity="0.9" />
          <circle cx="40" cy="40" r="5" fill="#4A1520" opacity="0.88" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-bold text-[#4A1520] sm:text-2xl lg:text-[1.65rem]">&amp;</span>
    </div>
  );
}
