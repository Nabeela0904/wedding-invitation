"use client";

import { motion } from "framer-motion";

const GLOWS = [
  { className: "left-[-10%] top-[8%] h-[280px] w-[280px] bg-marigold/25", delay: 0 },
  { className: "right-[-8%] top-[35%] h-[320px] w-[320px] bg-saffron/20", delay: 1.2 },
  { className: "bottom-[12%] left-[20%] h-[240px] w-[240px] bg-marigold/15", delay: 0.6 },
] as const;

export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {GLOWS.map((glow, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl will-change-[opacity,transform] ${glow.className}`}
          initial={{ opacity: 0.35, scale: 1 }}
          animate={{
            opacity: [0.28, 0.48, 0.32, 0.44, 0.28],
            scale: [1, 1.06, 1.02, 1.08, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            delay: glow.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
