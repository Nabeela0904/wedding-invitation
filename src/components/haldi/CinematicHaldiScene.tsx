"use client";

import { motion } from "framer-motion";
import { assetPath } from "@/lib/site-base-path";

function FloralDrape({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className={`pointer-events-none absolute top-0 h-full w-[min(140px,28vw)] opacity-60 will-change-transform ${isLeft ? "left-0" : "right-0"}`}
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
            <circle cx="0" cy="0" r="9" fill="#F59E0B" opacity="0.85" />
            <circle cx="14" cy="8" r="7" fill="#EA580C" opacity="0.8" />
            <circle cx="-8" cy="10" r="6" fill="#FBBF24" opacity="0.75" />
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={`j${i}`} transform={`translate(${55 + (i % 3) * 8}, ${70 + i * 58})`}>
            <circle cx="0" cy="0" r="5" fill="#FFFBEB" opacity="0.9" />
            <circle cx="4" cy="3" r="4" fill="#FEF3C7" opacity="0.7" />
          </g>
        ))}
        <path
          d="M10 0 Q40 200 25 400 Q15 500 30 600 L0 600 L0 0 Z"
          fill={isLeft ? "rgba(255,253,245,0.35)" : "rgba(255,248,235,0.32)"}
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
          "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,248,235,0.28), rgba(255,255,255,0.06))",
      }}
      initial={{ skewX: -1, opacity: 0.5 }}
      animate={{
        skewX: [-1.5, 1, -0.5, 1.5, -1.5],
        opacity: [0.45, 0.65, 0.5, 0.7, 0.45],
        x: [0, 6, -4, 5, 0],
      }}
      transition={{ duration: 5 + index * 0.5, delay: cfg.delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

export default function CinematicHaldiScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        initial={{ scale: 1.08 }}
        animate={{ scale: [1.08, 1.14, 1.1, 1.12, 1.08], x: [0, -12, 8, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <picture className="block h-full w-full">
          <source srcSet={assetPath("/haldi-cinematic-bg.webp")} type="image/webp" />
          <img
            src={assetPath("/haldi-cinematic-bg.png")}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      <motion.div
        className="absolute inset-0 will-change-[opacity]"
        animate={{ opacity: [0.55, 0.7, 0.6, 0.75, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,220,150,0.45) 0%, rgba(255,248,235,0.25) 40%, rgba(245,158,11,0.15) 100%)",
        }}
      />

      <motion.div
        className="absolute -left-[10%] top-0 h-full w-[60%] will-change-transform"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,230,180,0.35) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.3, 0.55, 0.35, 0.5, 0.3], x: [0, 20, 10, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {[0, 1, 2].map((i) => (
        <SheerCurtain key={i} index={i} />
      ))}

      <FloralDrape side="left" />
      <FloralDrape side="right" />

      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,253,249,0.75) 55%, #FFFDF9 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(255,253,249,0.4) 100%)",
        }}
      />
    </div>
  );
}
