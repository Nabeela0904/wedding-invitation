"use client";

import { motion } from "framer-motion";
import { IslamicStarSvg, MarigoldPetalSvg } from "./motifs";

type AmbientType = "star" | "petal";

type AmbientItem = {
  id: number;
  type: AmbientType;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  rotateStart: number;
};

/** Exactly 12 ambient SVGs — stars and marigold petals */
const AMBIENT_ITEMS: AmbientItem[] = [
  { id: 1, type: "star", left: "6%", top: "12%", size: 22, delay: 0, duration: 6.4, driftX: 10, driftY: -15, rotateStart: 0 },
  { id: 2, type: "petal", left: "14%", top: "68%", size: 26, delay: 1.2, duration: 7.8, driftX: -8, driftY: -12, rotateStart: 45 },
  { id: 3, type: "star", left: "22%", top: "38%", size: 18, delay: 0.5, duration: 8.2, driftX: 12, driftY: -14, rotateStart: 20 },
  { id: 4, type: "petal", left: "32%", top: "8%", size: 24, delay: 2.1, duration: 6.1, driftX: -10, driftY: -15, rotateStart: 120 },
  { id: 5, type: "star", left: "42%", top: "78%", size: 20, delay: 0.8, duration: 7.5, driftX: 8, driftY: -13, rotateStart: 60 },
  { id: 6, type: "petal", left: "50%", top: "22%", size: 22, delay: 1.6, duration: 8.9, driftX: -12, driftY: -15, rotateStart: 200 },
  { id: 7, type: "star", left: "58%", top: "52%", size: 16, delay: 0.3, duration: 6.8, driftX: 14, driftY: -12, rotateStart: 80 },
  { id: 8, type: "petal", left: "66%", top: "14%", size: 28, delay: 2.4, duration: 7.2, driftX: -6, driftY: -14, rotateStart: 30 },
  { id: 9, type: "star", left: "74%", top: "62%", size: 19, delay: 1.1, duration: 8.5, driftX: 10, driftY: -15, rotateStart: 140 },
  { id: 10, type: "petal", left: "82%", top: "32%", size: 21, delay: 0.6, duration: 6.6, driftX: -14, driftY: -13, rotateStart: 90 },
  { id: 11, type: "star", left: "90%", top: "48%", size: 17, delay: 1.9, duration: 7.9, driftX: 8, driftY: -15, rotateStart: 25 },
  { id: 12, type: "petal", left: "4%", top: "88%", size: 20, delay: 2.7, duration: 6.3, driftX: -8, driftY: -12, rotateStart: 160 },
];

function FloatingItem({ item }: { item: AmbientItem }) {
  const { type, left, top, size, delay, duration, driftX, driftY, rotateStart } =
    item;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{
        opacity: 0.4,
        x: 0,
        y: 0,
        rotate: rotateStart,
      }}
      animate={{
        opacity: [0.35, 0.72, 0.42, 0.68, 0.35],
        x: [0, driftX * 0.45, driftX, driftX * 0.6, 0],
        y: [0, driftY * 0.35, driftY, driftY * 0.5, 0],
        rotate: [
          rotateStart,
          rotateStart + 12,
          rotateStart + 28,
          rotateStart + 40,
          rotateStart + 55,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {type === "star" ? (
        <IslamicStarSvg size={size} />
      ) : (
        <MarigoldPetalSvg size={size} />
      )}
    </motion.div>
  );
}

export default function AmbientPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {AMBIENT_ITEMS.map((item) => (
        <FloatingItem key={item.id} item={item} />
      ))}
    </div>
  );
}
