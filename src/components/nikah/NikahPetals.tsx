"use client";

import { motion } from "framer-motion";

type ParticleConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  variant: "gold" | "emerald" | "sparkle";
};

const PARTICLES: ParticleConfig[] = [
  { id: 1, left: "5%", top: "10%", size: 18, delay: 0, duration: 4.2, variant: "gold" },
  { id: 2, left: "16%", top: "58%", size: 14, delay: 0.6, duration: 4.8, variant: "emerald" },
  { id: 3, left: "26%", top: "28%", size: 20, delay: 0.2, duration: 4.5, variant: "gold" },
  { id: 4, left: "40%", top: "6%", size: 16, delay: 1.1, duration: 5, variant: "sparkle" },
  { id: 5, left: "52%", top: "44%", size: 22, delay: 0.4, duration: 4, variant: "gold" },
  { id: 6, left: "66%", top: "70%", size: 15, delay: 0.9, duration: 4.6, variant: "emerald" },
  { id: 7, left: "76%", top: "18%", size: 17, delay: 0.15, duration: 4.3, variant: "sparkle" },
  { id: 8, left: "86%", top: "52%", size: 14, delay: 1.4, duration: 4.7, variant: "emerald" },
  { id: 9, left: "10%", top: "82%", size: 16, delay: 0.7, duration: 4.4, variant: "gold" },
  { id: 10, left: "58%", top: "8%", size: 15, delay: 1.2, duration: 4.9, variant: "sparkle" },
  { id: 11, left: "32%", top: "68%", size: 12, delay: 0.35, duration: 3.8, variant: "sparkle" },
  { id: 12, left: "72%", top: "38%", size: 19, delay: 0.55, duration: 4.1, variant: "gold" },
  { id: 13, left: "48%", top: "78%", size: 13, delay: 1, duration: 4.2, variant: "sparkle" },
  { id: 14, left: "92%", top: "28%", size: 14, delay: 0.25, duration: 4.5, variant: "emerald" },
  { id: 15, left: "22%", top: "46%", size: 11, delay: 1.6, duration: 3.6, variant: "sparkle" },
];

function SparkleSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
        fill="#D4AF37"
        animate={{ opacity: [0.4, 1, 0.5, 0.95, 0.4], scale: [0.85, 1.15, 0.9, 1.1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="1.5"
        fill="#FDFBF7"
        animate={{ opacity: [0.5, 1, 0.6, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function BubbleSvg({ size, variant }: { size: number; variant: "gold" | "emerald" }) {
  const stroke = variant === "gold" ? "#D4AF37" : "#064E3B";
  const fill = variant === "gold" ? "rgba(212,175,55,0.35)" : "rgba(6,78,59,0.28)";

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="11" fill={fill} stroke={stroke} strokeWidth="1.2" opacity="0.95" />
      <ellipse cx="12" cy="11" rx="3" ry="2" fill="rgba(255,255,255,0.55)" />
      <circle cx="16" cy="16" r="3" fill="rgba(253,251,247,0.7)" />
    </svg>
  );
}

function FloatingParticle({ config }: { config: ParticleConfig }) {
  const isSparkle = config.variant === "sparkle";

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{
        left: config.left,
        top: config.top,
        filter: isSparkle
          ? "drop-shadow(0 0 6px rgba(212,175,55,0.75))"
          : "drop-shadow(0 0 8px rgba(212,175,55,0.35))",
      }}
      initial={{ opacity: 0.6, y: 0, x: 0, rotate: 0, scale: 1 }}
      animate={{
        opacity: isSparkle ? [0.55, 1, 0.65, 0.95, 0.55] : [0.65, 0.9, 0.7, 0.85, 0.65],
        y: [0, -18, -10, -22, 0],
        x: [0, 8, -6, 10, 0],
        rotate: isSparkle ? [0, 45, 90, 135, 180] : [0, 12, -8, 15, 0],
        scale: isSparkle ? [0.9, 1.2, 1, 1.15, 0.9] : [1, 1.08, 0.96, 1.05, 1],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {isSparkle ? (
        <SparkleSvg size={config.size} />
      ) : (
        <BubbleSvg size={config.size} variant={config.variant as "gold" | "emerald"} />
      )}
    </motion.div>
  );
}

export default function NikahPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <FloatingParticle key={p.id} config={p} />
      ))}
    </div>
  );
}
