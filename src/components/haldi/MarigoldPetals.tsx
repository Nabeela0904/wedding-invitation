"use client";

import { motion } from "framer-motion";

type PetalConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftY: number;
  rotateStart: number;
  variant: "petal" | "particle";
};

/** 12 floating marigold petals & golden particles (10–15 range) */
const PETALS: PetalConfig[] = [
  { id: 1, left: "5%", top: "10%", size: 22, delay: 0, duration: 6.5, driftY: -18, rotateStart: 0, variant: "petal" },
  { id: 2, left: "12%", top: "55%", size: 16, delay: 1.1, duration: 7.2, driftY: -14, rotateStart: 45, variant: "particle" },
  { id: 3, left: "22%", top: "28%", size: 20, delay: 0.4, duration: 8, driftY: -16, rotateStart: 120, variant: "petal" },
  { id: 4, left: "35%", top: "78%", size: 18, delay: 2.2, duration: 6.8, driftY: -12, rotateStart: 200, variant: "petal" },
  { id: 5, left: "48%", top: "6%", size: 14, delay: 0.8, duration: 7.5, driftY: -15, rotateStart: 30, variant: "particle" },
  { id: 6, left: "55%", top: "42%", size: 24, delay: 1.6, duration: 6.2, driftY: -18, rotateStart: 75, variant: "petal" },
  { id: 7, left: "64%", top: "68%", size: 17, delay: 0.2, duration: 8.2, driftY: -13, rotateStart: 160, variant: "particle" },
  { id: 8, left: "72%", top: "18%", size: 21, delay: 2.5, duration: 7, driftY: -17, rotateStart: 250, variant: "petal" },
  { id: 9, left: "80%", top: "48%", size: 15, delay: 1.3, duration: 6.6, driftY: -14, rotateStart: 90, variant: "particle" },
  { id: 10, left: "88%", top: "82%", size: 19, delay: 0.6, duration: 7.8, driftY: -16, rotateStart: 310, variant: "petal" },
  { id: 11, left: "92%", top: "12%", size: 13, delay: 1.9, duration: 6.4, driftY: -12, rotateStart: 15, variant: "particle" },
  { id: 12, left: "8%", top: "88%", size: 23, delay: 2.8, duration: 7.4, driftY: -15, rotateStart: 180, variant: "petal" },
];

function MarigoldPetalSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#F59E0B" />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F97316"
        transform="rotate(72 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#D97706"
        transform="rotate(144 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#FBBF24"
        transform="rotate(216 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F59E0B"
        transform="rotate(288 18 18)"
      />
      <circle cx="18" cy="18" r="4" fill="#D97706" />
    </svg>
  );
}

function GoldenParticleSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="5" fill="#F59E0B" opacity="0.9" />
      <circle cx="12" cy="12" r="2" fill="#FFFBEB" />
    </svg>
  );
}

function FloatingPetal({ config }: { config: PetalConfig }) {
  const { left, top, size, delay, duration, driftY, rotateStart, variant } =
    config;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{ opacity: 0.45, y: 0, rotate: rotateStart }}
      animate={{
        opacity: [0.4, 0.65, 0.45, 0.6, 0.4],
        y: [0, driftY * 0.5, driftY, driftY * 0.65, 0],
        rotate: [rotateStart, rotateStart + 20, rotateStart + 40, rotateStart + 55, rotateStart + 70],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {variant === "petal" ? (
        <MarigoldPetalSvg size={size} />
      ) : (
        <GoldenParticleSvg size={size} />
      )}
    </motion.div>
  );
}

export default function MarigoldPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {PETALS.map((petal) => (
        <FloatingPetal key={petal.id} config={petal} />
      ))}
    </div>
  );
}
