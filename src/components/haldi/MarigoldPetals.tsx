"use client";

import { motion } from "framer-motion";

type PetalConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
};

const PETALS: PetalConfig[] = [
  { id: 1, left: "6%", top: "12%", size: 22, delay: 0, duration: 7.2, drift: -18, rotation: 45 },
  { id: 2, left: "14%", top: "68%", size: 18, delay: 1.1, duration: 6.4, drift: 12, rotation: 120 },
  { id: 3, left: "22%", top: "34%", size: 26, delay: 0.4, duration: 7.8, drift: -10, rotation: 200 },
  { id: 4, left: "31%", top: "82%", size: 16, delay: 2.2, duration: 6.8, drift: 14, rotation: 75 },
  { id: 5, left: "42%", top: "18%", size: 20, delay: 0.8, duration: 7.5, drift: -16, rotation: 310 },
  { id: 6, left: "48%", top: "55%", size: 24, delay: 1.6, duration: 8, drift: 8, rotation: 160 },
  { id: 7, left: "58%", top: "28%", size: 17, delay: 0.2, duration: 6.6, drift: -12, rotation: 90 },
  { id: 8, left: "67%", top: "74%", size: 21, delay: 2.8, duration: 7.1, drift: 16, rotation: 240 },
  { id: 9, left: "76%", top: "42%", size: 19, delay: 1.3, duration: 6.9, drift: -8, rotation: 15 },
  { id: 10, left: "84%", top: "16%", size: 23, delay: 0.6, duration: 7.6, drift: 10, rotation: 280 },
  { id: 11, left: "90%", top: "62%", size: 15, delay: 2, duration: 6.5, drift: -14, rotation: 130 },
  { id: 12, left: "12%", top: "48%", size: 14, delay: 1.8, duration: 8.2, drift: 6, rotation: 350 },
  { id: 13, left: "55%", top: "88%", size: 18, delay: 0.9, duration: 7.3, drift: -6, rotation: 55 },
  { id: 14, left: "72%", top: "8%", size: 20, delay: 2.4, duration: 6.7, drift: 12, rotation: 190 },
  { id: 15, left: "38%", top: "6%", size: 16, delay: 1.5, duration: 7.9, drift: -10, rotation: 265 },
];

function MarigoldPetalSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="16" cy="8" rx="5" ry="9" fill="#F59E0B" opacity="0.9" />
      <ellipse cx="16" cy="8" rx="5" ry="9" fill="#F59E0B" opacity="0.85" transform="rotate(72 16 16)" />
      <ellipse cx="16" cy="8" rx="5" ry="9" fill="#D97706" opacity="0.9" transform="rotate(144 16 16)" />
      <ellipse cx="16" cy="8" rx="5" ry="9" fill="#FBBF24" opacity="0.88" transform="rotate(216 16 16)" />
      <ellipse cx="16" cy="8" rx="5" ry="9" fill="#F59E0B" opacity="0.9" transform="rotate(288 16 16)" />
      <circle cx="16" cy="16" r="4" fill="#D97706" />
    </svg>
  );
}

function Petal({ config }: { config: PetalConfig }) {
  const { left, top, size, delay, duration, drift, rotation } = config;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{ opacity: 0.35, y: 0, rotate: rotation }}
      animate={{
        opacity: [0.35, 0.65, 0.4, 0.6, 0.35],
        y: [0, -28, -12, -36, 0],
        rotate: [rotation, rotation + 24, rotation + 48, rotation + 72, rotation + 96],
        x: [0, drift * 0.5, drift, drift * 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <MarigoldPetalSvg size={size} />
    </motion.div>
  );
}

export default function MarigoldPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {PETALS.map((petal) => (
        <Petal key={petal.id} config={petal} />
      ))}
    </div>
  );
}
