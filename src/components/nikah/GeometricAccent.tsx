"use client";

import { motion } from "framer-motion";

export default function GeometricAccent() {
  return (
    <div className="relative flex items-center justify-center py-2 lg:px-1 lg:py-0">
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 lg:h-16 lg:w-16"
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
            strokeWidth="0.85"
            opacity="0.75"
          />
          <polygon
            points="60,22 98,60 60,98 22,60"
            fill="none"
            stroke="#065F46"
            strokeWidth="0.65"
            opacity="0.8"
          />
          <circle cx="60" cy="60" r="6" fill="#043028" opacity="0.9" />
        </svg>
      </motion.div>
    </div>
  );
}
