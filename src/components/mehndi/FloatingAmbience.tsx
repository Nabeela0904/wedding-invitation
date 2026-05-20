"use client";

import { motion } from "framer-motion";
import {
  IslamicStarSvg,
  LeafAccentSvg,
  MarigoldPetalSvg,
} from "./motifs";

type AmbienceType = "star" | "petal" | "leaf";

type AmbienceConfig = {
  id: number;
  type: AmbienceType;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  rotateStart: number;
};

const ITEMS: AmbienceConfig[] = [
  { id: 1, type: "star", left: "8%", top: "14%", size: 20, delay: 0, duration: 6.2, driftX: 12, driftY: -22, rotateStart: 0 },
  { id: 2, type: "petal", left: "18%", top: "72%", size: 24, delay: 1.4, duration: 7.5, driftX: -10, driftY: -28, rotateStart: 40 },
  { id: 3, type: "leaf", left: "12%", top: "42%", size: 18, delay: 0.6, duration: 8.1, driftX: 8, driftY: -18, rotateStart: -15 },
  { id: 4, type: "star", left: "28%", top: "8%", size: 16, delay: 2.1, duration: 5.8, driftX: -14, driftY: -24, rotateStart: 20 },
  { id: 5, type: "petal", left: "38%", top: "58%", size: 22, delay: 0.3, duration: 8.6, driftX: 10, driftY: -30, rotateStart: 90 },
  { id: 6, type: "leaf", left: "44%", top: "22%", size: 16, delay: 1.8, duration: 6.9, driftX: -8, driftY: -20, rotateStart: 25 },
  { id: 7, type: "star", left: "52%", top: "78%", size: 18, delay: 0.9, duration: 7.2, driftX: 14, driftY: -26, rotateStart: 45 },
  { id: 8, type: "petal", left: "62%", top: "12%", size: 26, delay: 2.6, duration: 5.5, driftX: -12, driftY: -32, rotateStart: 120 },
  { id: 9, type: "leaf", left: "68%", top: "48%", size: 20, delay: 1.1, duration: 8.4, driftX: 6, driftY: -16, rotateStart: -30 },
  { id: 10, type: "star", left: "76%", top: "28%", size: 22, delay: 0.2, duration: 6.6, driftX: -16, driftY: -22, rotateStart: 60 },
  { id: 11, type: "petal", left: "82%", top: "68%", size: 20, delay: 1.6, duration: 7.8, driftX: 10, driftY: -28, rotateStart: 200 },
  { id: 12, type: "leaf", left: "88%", top: "18%", size: 14, delay: 2.3, duration: 5.9, driftX: -6, driftY: -14, rotateStart: 10 },
  { id: 13, type: "star", left: "92%", top: "52%", size: 17, delay: 0.7, duration: 8.9, driftX: 12, driftY: -20, rotateStart: 80 },
  { id: 14, type: "petal", left: "6%", top: "88%", size: 18, delay: 2.9, duration: 6.4, driftX: -10, driftY: -24, rotateStart: 150 },
  { id: 15, type: "leaf", left: "58%", top: "6%", size: 15, delay: 1.3, duration: 7.1, driftX: 8, driftY: -18, rotateStart: -20 },
];

function AmbienceItem({ config }: { config: AmbienceConfig }) {
  const { type, left, top, size, delay, duration, driftX, driftY, rotateStart } =
    config;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{ opacity: 0.4, x: 0, y: 0, rotate: rotateStart }}
      animate={{
        opacity: [0.35, 0.7, 0.45, 0.65, 0.35],
        x: [0, driftX * 0.5, driftX, driftX * 0.7, 0],
        y: [0, driftY * 0.4, driftY, driftY * 0.6, 0],
        rotate: [
          rotateStart,
          rotateStart + 15,
          rotateStart + 30,
          rotateStart + 45,
          rotateStart + 60,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {type === "star" && <IslamicStarSvg size={size} />}
      {type === "petal" && <MarigoldPetalSvg size={size} />}
      {type === "leaf" && <LeafAccentSvg size={size} />}
    </motion.div>
  );
}

export default function FloatingAmbience() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {ITEMS.map((item) => (
        <AmbienceItem key={item.id} config={item} />
      ))}
    </div>
  );
}
