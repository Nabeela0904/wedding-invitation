"use client";

import { motion } from "framer-motion";

export default function WalimaGeometricAccent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-0.5 py-2 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
      <motion.div
        className="h-9 w-px bg-gradient-to-b from-transparent via-[#BE123C]/90 to-transparent sm:h-10 lg:hidden"
        animate={{ scaleY: [0.85, 1, 0.9, 1, 0.85], opacity: [0.8, 1, 0.85, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10 lg:h-8 lg:w-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div
          className="absolute inset-[-2px] rounded-full bg-[#BE123C]/35 blur-md"
          aria-hidden
        />
        <svg
          viewBox="0 0 80 80"
          className="relative h-full w-full drop-shadow-[0_0_14px_rgba(159,18,57,0.55)]"
        >
          <circle cx="40" cy="40" r="28" fill="none" stroke="#BE123C" strokeWidth="1.35" opacity="0.95" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#9F1239" strokeWidth="1.15" opacity="0.95" />
          <circle cx="40" cy="40" r="7" fill="#722F37" opacity="0.9" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-bold text-[#9F1239] drop-shadow-[0_0_14px_rgba(190,18,60,0.5)] sm:text-2xl lg:px-0.5 lg:text-[1.7rem]">
        &amp;
      </span>
    </div>
  );
}
