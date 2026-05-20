"use client";

import { motion } from "framer-motion";

type BubbleConfig = {
  className: string;
  delay: number;
  duration: number;
  opacityRange: [number, number, number];
  scaleRange: [number, number, number];
};

const BUBBLES: BubbleConfig[] = [
  {
    className: "left-[-5%] top-[12%] h-[min(420px,55vw)] w-[min(420px,55vw)] bg-emerald-400/30",
    delay: 0,
    duration: 7,
    opacityRange: [0.45, 0.7, 0.45],
    scaleRange: [1, 1.12, 1],
  },
  {
    className: "right-[-8%] top-[28%] h-[min(380px,48vw)] w-[min(380px,48vw)] bg-luxe-gold/35",
    delay: 1,
    duration: 8,
    opacityRange: [0.4, 0.65, 0.4],
    scaleRange: [1.05, 1.18, 1.05],
  },
  {
    className: "bottom-[5%] left-[15%] h-[min(340px,44vw)] w-[min(340px,44vw)] bg-marigold/30",
    delay: 0.5,
    duration: 6,
    opacityRange: [0.38, 0.62, 0.38],
    scaleRange: [1, 1.1, 1],
  },
  {
    className: "right-[18%] top-[58%] h-[min(280px,36vw)] w-[min(280px,36vw)] bg-amber-400/25",
    delay: 1.75,
    duration: 9,
    opacityRange: [0.35, 0.58, 0.35],
    scaleRange: [1.02, 1.14, 1.02],
  },
  {
    className: "left-[42%] top-[2%] h-[min(220px,30vw)] w-[min(220px,30vw)] bg-luxe-gold/28",
    delay: 0.4,
    duration: 5.5,
    opacityRange: [0.32, 0.55, 0.32],
    scaleRange: [1, 1.08, 1],
  },
];

function AmbientBubble({ config }: { config: BubbleConfig }) {
  const { className, delay, duration, opacityRange, scaleRange } = config;

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl will-change-[opacity,transform] ${className}`}
      initial={{ opacity: opacityRange[0], scale: scaleRange[0] }}
      animate={{
        opacity: [...opacityRange, opacityRange[0]],
        scale: [...scaleRange, scaleRange[0]],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function CinematicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-midnight" />

      <motion.div
        className="absolute inset-[-15%] will-change-[opacity,transform]"
        animate={{
          opacity: [0.65, 0.85, 0.65],
          scale: [1.05, 1.1, 1.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 30%, rgba(15,61,50,0.55) 0%, transparent 58%), radial-gradient(ellipse 65% 55% at 85% 65%, rgba(212,175,55,0.28) 0%, transparent 52%), radial-gradient(ellipse 55% 45% at 8% 75%, rgba(245,158,11,0.22) 0%, transparent 48%)",
        }}
      />

      {BUBBLES.map((bubble, i) => (
        <AmbientBubble key={i} config={bubble} />
      ))}

      <div className="cinematic-vignette absolute inset-0" />
      <div className="cinematic-grain absolute inset-0" />
    </div>
  );
}
