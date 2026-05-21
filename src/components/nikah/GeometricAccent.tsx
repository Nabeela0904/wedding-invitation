"use client";

import { motion } from "framer-motion";

export default function GeometricAccent() {
  return (
    <div className="relative flex items-center justify-center py-6 lg:py-0">
      <motion.div
        className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
          <polygon
            points="60,8 112,60 60,112 8,60"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.75"
            opacity="0.55"
          />
          <polygon
            points="60,22 98,60 60,98 22,60"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <circle cx="60" cy="60" r="6" fill="#D4AF37" opacity="0.7" />
        </svg>
      </motion.div>
      <span className="relative z-10 font-display text-3xl font-light text-metallic-gold sm:text-4xl">
        &amp;
      </span>
    </div>
  );
}
