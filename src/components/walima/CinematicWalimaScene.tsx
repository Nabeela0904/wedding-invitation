"use client";

import { motion } from "framer-motion";

function ChampagneDrape({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className={`pointer-events-none absolute top-0 h-full w-[min(140px,28vw)] opacity-50 will-change-transform ${isLeft ? "left-0" : "right-0"}`}
      initial={{ rotate: isLeft ? -2 : 2 }}
      animate={{
        rotate: isLeft ? [-2, 1, -1.5, 0.5, -2] : [2, -1, 1.5, -0.5, 2],
        x: isLeft ? [0, 4, -2, 3, 0] : [0, -4, 2, -3, 0],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg viewBox="0 0 120 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i} transform={`translate(${20 + (i % 2) * 30}, ${40 + i * 65})`}>
            <circle cx="0" cy="0" r="9" fill="#D4AF37" opacity="0.7" />
            <circle cx="14" cy="8" r="7" fill="#064E3B" opacity="0.55" />
            <circle cx="-8" cy="10" r="6" fill="#F5E6D3" opacity="0.8" />
          </g>
        ))}
        <path
          d="M10 0 Q40 200 25 400 Q15 500 30 600 L0 600 L0 0 Z"
          fill={isLeft ? "rgba(245,230,211,0.35)" : "rgba(253,251,247,0.28)"}
        />
      </svg>
    </motion.div>
  );
}

export default function CinematicWalimaScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        initial={{ scale: 1.08 }}
        animate={{ scale: [1.08, 1.14, 1.1, 1.12, 1.08], x: [0, -12, 8, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <picture className="block h-full w-full">
          <source srcSet="/walima-cinematic-bg.webp" type="image/webp" />
          <img
            src="/walima-cinematic-bg.png"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      <motion.div
        className="absolute inset-0 will-change-[opacity]"
        animate={{ opacity: [0.45, 0.6, 0.5, 0.65, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(245,230,211,0.4) 0%, rgba(253,251,247,0.25) 45%, rgba(6,78,59,0.12) 100%)",
        }}
      />

      <motion.div
        className="absolute -left-[10%] top-0 h-full w-[60%] will-change-transform"
        style={{
          background: "linear-gradient(105deg, rgba(212,175,55,0.28) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.25, 0.45, 0.3, 0.4, 0.25], x: [0, 20, 10, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <ChampagneDrape side="left" />
      <ChampagneDrape side="right" />

      <div
        className="absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(251,243,232,0.78) 55%, #FBF3E8 100%)",
        }}
      />
    </div>
  );
}
