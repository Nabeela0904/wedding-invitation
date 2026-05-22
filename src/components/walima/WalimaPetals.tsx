"use client";

import { motion } from "framer-motion";

type ParticleConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  variant: "gold" | "champagne" | "sparkle";
};

const PARTICLES: ParticleConfig[] = [
  { id: 1, left: "6%", top: "12%", size: 16, delay: 0, duration: 4.2, variant: "gold" },
  { id: 2, left: "18%", top: "60%", size: 12, delay: 0.7, duration: 4.6, variant: "champagne" },
  { id: 3, left: "30%", top: "30%", size: 18, delay: 0.3, duration: 4, variant: "sparkle" },
  { id: 4, left: "44%", top: "8%", size: 14, delay: 1.2, duration: 4.8, variant: "gold" },
  { id: 5, left: "58%", top: "46%", size: 20, delay: 0.5, duration: 3.8, variant: "champagne" },
  { id: 6, left: "70%", top: "74%", size: 13, delay: 1, duration: 4.4, variant: "sparkle" },
  { id: 7, left: "82%", top: "20%", size: 15, delay: 0.2, duration: 4.3, variant: "gold" },
  { id: 8, left: "90%", top: "54%", size: 12, delay: 1.5, duration: 4.7, variant: "sparkle" },
];

function FloatingParticle({ config }: { config: ParticleConfig }) {
  const fill =
    config.variant === "gold" ? "#D4AF37" : config.variant === "champagne" ? "#F5E6D3" : "#064E3B";

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{
        left: config.left,
        top: config.top,
        filter: "drop-shadow(0 0 6px rgba(212,175,55,0.45))",
      }}
      animate={{
        opacity: [0.5, 0.85, 0.55, 0.8, 0.5],
        y: [0, -16, -8, -20, 0],
        x: [0, 6, -4, 8, 0],
        rotate: [0, 20, 40, 60, 80],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {config.variant === "sparkle" ? (
        <svg width={config.size} height={config.size} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2 L13 10 L22 12 L13 14 L12 22 L11 14 L2 12 L11 10 Z" fill="#D4AF37" opacity="0.85" />
        </svg>
      ) : (
        <svg width={config.size} height={config.size} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="10" fill={fill} opacity="0.75" stroke="#D4AF37" strokeWidth="0.8" />
          <ellipse cx="12" cy="12" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
        </svg>
      )}
    </motion.div>
  );
}

export default function WalimaPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <FloatingParticle key={p.id} config={p} />
      ))}
    </div>
  );
}
