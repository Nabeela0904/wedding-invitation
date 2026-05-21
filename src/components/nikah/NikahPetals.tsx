"use client";

import { motion } from "framer-motion";

type ParticleConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  variant: "gold" | "emerald";
};

const PARTICLES: ParticleConfig[] = [
  { id: 1, left: "6%", top: "12%", size: 10, delay: 0, duration: 6.5, variant: "gold" },
  { id: 2, left: "18%", top: "62%", size: 8, delay: 1.2, duration: 7, variant: "emerald" },
  { id: 3, left: "28%", top: "32%", size: 12, delay: 0.5, duration: 6.8, variant: "gold" },
  { id: 4, left: "42%", top: "8%", size: 9, delay: 2, duration: 7.4, variant: "emerald" },
  { id: 5, left: "55%", top: "48%", size: 11, delay: 0.8, duration: 6.2, variant: "gold" },
  { id: 6, left: "68%", top: "72%", size: 8, delay: 1.6, duration: 7.8, variant: "emerald" },
  { id: 7, left: "78%", top: "22%", size: 10, delay: 0.3, duration: 6.6, variant: "gold" },
  { id: 8, left: "88%", top: "58%", size: 9, delay: 2.4, duration: 7.2, variant: "emerald" },
  { id: 9, left: "12%", top: "84%", size: 7, delay: 1, duration: 6.4, variant: "gold" },
  { id: 10, left: "62%", top: "10%", size: 8, delay: 1.8, duration: 7, variant: "emerald" },
];

function FloatingParticle({ config }: { config: ParticleConfig }) {
  const fill = config.variant === "gold" ? "#D4AF37" : "#064E3B";

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left: config.left, top: config.top }}
      initial={{ opacity: 0.35, y: 0, rotate: 0 }}
      animate={{
        opacity: [0.3, 0.55, 0.35, 0.5, 0.3],
        y: [0, -12, -8, -14, 0],
        rotate: [0, 15, 30, 45, 60],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={config.size} height={config.size} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="5" fill={fill} opacity="0.85" />
        <circle cx="12" cy="12" r="2" fill="#FDFBF7" />
      </svg>
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
