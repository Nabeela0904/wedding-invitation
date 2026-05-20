"use client";

import { motion } from "framer-motion";

type DustConfig = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftY: number;
  rotateStart: number;
  type: "star" | "dust";
};

const ITEMS: DustConfig[] = [
  { id: 1, left: "8%", top: "15%", size: 14, delay: 0, duration: 7, driftY: -12, rotateStart: 0, type: "star" },
  { id: 2, left: "18%", top: "62%", size: 8, delay: 1.2, duration: 8, driftY: -10, rotateStart: 45, type: "dust" },
  { id: 3, left: "28%", top: "32%", size: 12, delay: 0.5, duration: 6.5, driftY: -14, rotateStart: 90, type: "star" },
  { id: 4, left: "42%", top: "8%", size: 10, delay: 2, duration: 7.5, driftY: -11, rotateStart: 180, type: "dust" },
  { id: 5, left: "55%", top: "75%", size: 16, delay: 0.8, duration: 8.2, driftY: -13, rotateStart: 30, type: "star" },
  { id: 6, left: "68%", top: "22%", size: 9, delay: 1.6, duration: 6.8, driftY: -9, rotateStart: 120, type: "dust" },
  { id: 7, left: "78%", top: "48%", size: 13, delay: 0.3, duration: 7.8, driftY: -12, rotateStart: 200, type: "star" },
  { id: 8, left: "88%", top: "68%", size: 7, delay: 2.4, duration: 6.2, driftY: -10, rotateStart: 60, type: "dust" },
  { id: 9, left: "92%", top: "18%", size: 11, delay: 1.1, duration: 8.5, driftY: -11, rotateStart: 150, type: "star" },
  { id: 10, left: "5%", top: "85%", size: 10, delay: 2.8, duration: 7.2, driftY: -8, rotateStart: 270, type: "dust" },
  { id: 11, left: "48%", top: "42%", size: 6, delay: 1.9, duration: 6.6, driftY: -7, rotateStart: 320, type: "dust" },
  { id: 12, left: "62%", top: "88%", size: 12, delay: 0.6, duration: 7.4, driftY: -10, rotateStart: 40, type: "star" },
];

function EightPointStar({ size }: { size: number }) {
  const path =
    "M12 2 L14.2 8.8 L21 8.8 L15.6 13.2 L17.8 20 L12 16.4 L6.2 20 L8.4 13.2 L3 8.8 L9.8 8.8 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={path} fill="#D4AF37" opacity="0.85" />
    </svg>
  );
}

function DustMote({ size }: { size: number }) {
  return (
    <div
      className="rounded-full bg-luxe-gold will-change-transform"
      style={{ width: size, height: size, opacity: 0.6 }}
      aria-hidden
    />
  );
}

function FloatingMote({ item }: { item: DustConfig }) {
  const { left, top, size, delay, duration, driftY, rotateStart, type } = item;

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{ left, top }}
      initial={{ opacity: 0.2, y: 0, rotate: rotateStart }}
      animate={{
        opacity: [0.15, 0.45, 0.2, 0.4, 0.15],
        y: [0, driftY * 0.5, driftY, driftY * 0.6, 0],
        rotate: [rotateStart, rotateStart + 25, rotateStart + 50, rotateStart + 70],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {type === "star" ? <EightPointStar size={size} /> : <DustMote size={size} />}
    </motion.div>
  );
}

export default function GoldDust() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {ITEMS.map((item) => (
        <FloatingMote key={item.id} item={item} />
      ))}
    </div>
  );
}
