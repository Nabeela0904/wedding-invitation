"use client";

import { motion } from "framer-motion";

type PetalConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  rotateStart: number;
  variant: "petal" | "particle";
};

const LEFT_SLOTS = [4, 11, 18, 26, 34, 42, 50, 58, 66, 74, 82, 90, 8, 22, 38, 54, 70, 86, 15, 46, 62, 78, 30, 94];
const TOP_SLOTS = [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 6, 18, 36, 48, 60, 72, 84, 96, 12, 42, 54, 66, 78, 30];

const PETALS: PetalConfig[] = TOP_SLOTS.map((top, index) => {
  const left = LEFT_SLOTS[index % LEFT_SLOTS.length]!;
  const isPetal = index % 2 === 0;

  return {
    id: index + 1,
    left: `${left}%`,
    top: `${top}%`,
    size: isPetal ? 18 + (index % 4) * 3 : 12 + (index % 3) * 2,
    delay: (index * 0.28) % 3.4,
    duration: 5.6 + (index % 6) * 0.75,
    driftX: (index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 3),
    driftY: -(9 + (index % 5) * 3),
    rotateStart: (index * 41) % 360,
    variant: isPetal ? "petal" : "particle",
  };
});

function MarigoldPetalSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#F59E0B" />
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#FF6500" transform="rotate(72 18 18)" />
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#D97706" transform="rotate(144 18 18)" />
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#FBBF24" transform="rotate(216 18 18)" />
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#F59E0B" transform="rotate(288 18 18)" />
      <circle cx="18" cy="18" r="4" fill="#D97706" />
    </svg>
  );
}

function GoldenParticleSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="5" fill="#FF6500" opacity="0.85" />
      <circle cx="12" cy="12" r="2" fill="#FFFBEB" />
    </svg>
  );
}

function FloatingPetal({ config }: { config: PetalConfig }) {
  const { left, top, size, delay, duration, driftX, driftY, rotateStart, variant } = config;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{ opacity: 0.5, x: 0, y: 0, rotate: rotateStart }}
      animate={{
        opacity: [0.45, 0.78, 0.5, 0.72, 0.45],
        x: [0, driftX * 0.45, driftX, driftX * 0.6, 0],
        y: [0, driftY * 0.5, driftY, driftY * 0.65, 0],
        rotate: [rotateStart, rotateStart + 24, rotateStart + 48, rotateStart + 62, rotateStart + 80],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
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
      className="pointer-events-none absolute inset-0 z-[1] min-h-full overflow-hidden"
      aria-hidden
    >
      {PETALS.map((petal) => (
        <FloatingPetal key={petal.id} config={petal} />
      ))}
    </div>
  );
}
