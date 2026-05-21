"use client";

import { motion } from "framer-motion";

function EmeraldDrape({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className={`pointer-events-none absolute top-0 h-full w-[min(140px,28vw)] opacity-55 will-change-transform ${isLeft ? "left-0" : "right-0"}`}
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
            <circle cx="0" cy="0" r="9" fill="#064E3B" opacity="0.75" />
            <circle cx="14" cy="8" r="7" fill="#D4AF37" opacity="0.7" />
            <circle cx="-8" cy="10" r="6" fill="#FDFBF7" opacity="0.65" />
          </g>
        ))}
        <path
          d="M10 0 Q40 200 25 400 Q15 500 30 600 L0 600 L0 0 Z"
          fill={isLeft ? "rgba(253,251,247,0.32)" : "rgba(6,78,59,0.08)"}
        />
      </svg>
    </motion.div>
  );
}

function SheerCurtain({ index }: { index: number }) {
  const offsets = [
    { left: "8%", width: "22%", delay: 0 },
    { left: "38%", width: "18%", delay: 0.6 },
    { left: "62%", width: "20%", delay: 0.3 },
  ];
  const cfg = offsets[index]!;

  return (
    <motion.div
      className="pointer-events-none absolute top-0 h-full will-change-transform"
      style={{
        left: cfg.left,
        width: cfg.width,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(253,251,247,0.22), rgba(212,175,55,0.06))",
      }}
      initial={{ skewX: -1, opacity: 0.45 }}
      animate={{
        skewX: [-1.5, 1, -0.5, 1.5, -1.5],
        opacity: [0.4, 0.6, 0.45, 0.65, 0.4],
        x: [0, 6, -4, 5, 0],
      }}
      transition={{ duration: 5 + index * 0.5, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

export default function CinematicNikahScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        initial={{ scale: 1.08 }}
        animate={{ scale: [1.08, 1.14, 1.1, 1.12, 1.08], x: [0, -12, 8, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <picture className="block h-full w-full">
          <source srcSet="/nikah-cinematic-bg.webp" type="image/webp" />
          <img
            src="/nikah-cinematic-bg.png"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      <motion.div
        className="absolute inset-0 will-change-[opacity]"
        animate={{ opacity: [0.5, 0.65, 0.55, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(6,78,59,0.35) 0%, rgba(253,251,247,0.2) 40%, rgba(212,175,55,0.12) 100%)",
        }}
      />

      <motion.div
        className="absolute -left-[10%] top-0 h-full w-[60%] will-change-transform"
        style={{
          background: "linear-gradient(105deg, rgba(212,175,55,0.25) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.25, 0.45, 0.3, 0.4, 0.25], x: [0, 20, 10, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {[0, 1, 2].map((i) => (
        <SheerCurtain key={i} index={i} />
      ))}

      <EmeraldDrape side="left" />
      <EmeraldDrape side="right" />

      <div
        className="absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(253,251,247,0.78) 55%, #FDFBF7 100%)",
        }}
      />
    </div>
  );
}
