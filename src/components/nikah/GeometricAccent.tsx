"use client";

import { motion } from "framer-motion";

export default function GeometricAccent() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-0 py-0.5 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
      <motion.div
        className="h-9 w-px bg-gradient-to-b from-transparent via-emerald-deep/90 to-transparent sm:h-10 lg:hidden"
        animate={{ scaleY: [0.85, 1, 0.9, 1, 0.85], opacity: [0.8, 1, 0.85, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10 lg:h-8 lg:w-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div
          className="absolute inset-[-2px] rounded-full bg-emerald-deep/25 blur-md"
          aria-hidden
        />
        <svg
          viewBox="0 0 120 120"
          className="relative h-full w-full drop-shadow-[0_0_10px_rgba(4,48,40,0.45)]"
        >
          <polygon
            points="60,8 112,60 60,112 8,60"
            fill="none"
            stroke="#043028"
            strokeWidth="1.1"
            opacity="0.95"
          />
          <polygon
            points="60,22 98,60 60,98 22,60"
            fill="none"
            stroke="#064E3B"
            strokeWidth="0.95"
            opacity="0.9"
          />
          <circle cx="60" cy="60" r="7" fill="#043028" opacity="0.92" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-bold text-[#022018] sm:text-2xl lg:px-0.5 lg:text-[1.7rem]">
        &amp;
      </span>
    </div>
  );
}
