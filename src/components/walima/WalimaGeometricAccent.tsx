"use client";

import { motion } from "framer-motion";

export default function WalimaGeometricAccent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 py-3 lg:flex-row lg:gap-0 lg:py-0">
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-transparent via-amber-400/90 to-transparent sm:h-12 lg:hidden"
        animate={{ scaleY: [0.85, 1, 0.9, 1, 0.85], opacity: [0.65, 1, 0.75, 0.95, 0.65] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11 lg:h-9 lg:w-9"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div
          className="absolute inset-0 rounded-full bg-amber-200/45 blur-md lg:bg-amber-100/55"
          aria-hidden
        />
        <svg viewBox="0 0 80 80" className="relative h-full w-full drop-shadow-[0_0_10px_rgba(251,191,36,0.55)]">
          <circle cx="40" cy="40" r="28" fill="none" stroke="#FBBF24" strokeWidth="1.1" opacity="0.95" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#F59E0B" strokeWidth="0.9" opacity="0.9" />
          <circle cx="40" cy="40" r="6" fill="#FDE68A" opacity="0.85" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-semibold text-amber-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.65)] sm:text-2xl lg:px-1.5 lg:text-[1.65rem]">
        &amp;
      </span>
    </div>
  );
}
