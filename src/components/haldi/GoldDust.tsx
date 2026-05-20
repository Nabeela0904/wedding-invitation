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
  { id: 1, left: "6%", top: "12%", size: 22, delay: 0, duration: 7, driftY: -14, rotateStart: 0, type: "star" },
  { id: 2, left: "16%", top: "58%", size: 14, delay: 1.2, duration: 8, driftY: -12, rotateStart: 45, type: "dust" },
  { id: 3, left: "26%", top: "28%", size: 20, delay: 0.5, duration: 6.5, driftY: -16, rotateStart: 90, type: "star" },
  { id: 4, left: "40%", top: "6%", size: 16, delay: 2, duration: 7.5, driftY: -13, rotateStart: 180, type: "dust" },
  { id: 5, left: "52%", top: "72%", size: 24, delay: 0.8, duration: 8.2, driftY: -15, rotateStart: 30, type: "star" },
  { id: 6, left: "66%", top: "20%", size: 15, delay: 1.6, duration: 6.8, driftY: -11, rotateStart: 120, type: "dust" },
  { id: 7, left: "76%", top: "44%", size: 19, delay: 0.3, duration: 7.8, driftY: -14, rotateStart: 200, type: "star" },
  { id: 8, left: "86%", top: "64%", size: 13, delay: 2.4, duration: 6.2, driftY: -12, rotateStart: 60, type: "dust" },
  { id: 9, left: "90%", top: "14%", size: 18, delay: 1.1, duration: 8.5, driftY: -13, rotateStart: 150, type: "star" },
  { id: 10, left: "4%", top: "82%", size: 16, delay: 2.8, duration: 7.2, driftY: -10, rotateStart: 270, type: "dust" },
  { id: 11, left: "46%", top: "38%", size: 12, delay: 1.9, duration: 6.6, driftY: -9, rotateStart: 320, type: "dust" },
  { id: 12, left: "60%", top: "86%", size: 21, delay: 0.6, duration: 7.4, driftY: -12, rotateStart: 40, type: "star" },
  { id: 13, left: "32%", top: "78%", size: 17, delay: 1.4, duration: 7, driftY: -11, rotateStart: 95, type: "star" },
  { id: 14, left: "72%", top: "8%", size: 14, delay: 2.1, duration: 8, driftY: -10, rotateStart: 210, type: "dust" },
  { id: 15, left: "22%", top: "48%", size: 26, delay: 0.2, duration: 9, driftY: -15, rotateStart: 15, type: "star" },
];

function EightPointStar({ size }: { size: number }) {
  const path =
    "M12 2 L14.2 8.8 L21 8.8 L15.6 13.2 L17.8 20 L12 16.4 L6.2 20 L8.4 13.2 L3 8.8 L9.8 8.8 Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(212,175,55,0.9)) drop-shadow(0 0 14px rgba(245,158,11,0.5))",
      }}
    >
      <path d={path} fill="#F0D78C" />
      <path d={path} fill="#D4AF37" fillOpacity="0.85" />
      <circle cx="12" cy="12" r="2" fill="#FFFBEB" opacity="0.9" />
    </svg>
  );
}

function DustMote({ size }: { size: number }) {
  return (
    <div
      className="rounded-full bg-luxe-gold will-change-transform"
      style={{
        width: size,
        height: size,
        boxShadow:
          "0 0 10px rgba(212,175,55,0.85), 0 0 20px rgba(245,158,11,0.45)",
      }}
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
      initial={{ opacity: 0.5, y: 0, rotate: rotateStart }}
      animate={{
        opacity: [0.45, 0.85, 0.5, 0.8, 0.45],
        y: [0, driftY * 0.5, driftY, driftY * 0.6, 0],
        rotate: [rotateStart, rotateStart + 25, rotateStart + 50, rotateStart + 70],
        scale: type === "star" ? [1, 1.08, 1.04, 1.1, 1] : [1, 1.15, 1.05, 1.12, 1],
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
