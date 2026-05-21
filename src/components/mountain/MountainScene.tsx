"use client";

import { motion, useScroll, useTransform } from "framer-motion";

function MountainLayer({
  d,
  fill,
  y,
  opacity = 1,
}: {
  d: string;
  fill: string;
  y: ReturnType<typeof useTransform<number, number>>;
  opacity?: number;
}) {
  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full will-change-transform"
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      style={{ y, opacity }}
      aria-hidden
    >
      <path d={d} fill={fill} />
    </motion.svg>
  );
}

export default function MountainScene() {
  const { scrollY } = useScroll();
  const skyShift = useTransform(scrollY, [0, 2000], [0, -80]);
  const layer1 = useTransform(scrollY, [0, 2000], [0, 120]);
  const layer2 = useTransform(scrollY, [0, 2000], [0, 220]);
  const layer3 = useTransform(scrollY, [0, 2000], [0, 340]);
  const layer4 = useTransform(scrollY, [0, 2000], [0, 460]);
  const mistOpacity = useTransform(scrollY, [0, 800, 2000], [0.55, 0.35, 0.2]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0"
        style={{
          y: skyShift,
          background:
            "linear-gradient(180deg, #a8bdd8 0%, #d4b8cc 38%, #f0ddd0 72%, #f8efe8 100%)",
        }}
      />

      {/* Sun glow */}
      <div
        className="absolute left-1/2 top-[8%] h-[min(280px,40vw)] w-[min(280px,40vw)] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,220,180,0.9) 0%, rgba(255,180,140,0.3) 45%, transparent 70%)",
        }}
      />

      <MountainLayer
        d="M0,420 L0,320 Q360,180 720,300 T1440,260 L1440,520 Z"
        fill="#8a7a9e"
        y={layer1}
        opacity={0.45}
      />
      <MountainLayer
        d="M0,460 L0,360 Q280,240 580,340 Q900,200 1440,380 L1440,520 Z"
        fill="#6b5d82"
        y={layer2}
        opacity={0.65}
      />
      <MountainLayer
        d="M0,500 L0,400 Q420,280 760,390 Q1100,260 1440,420 L1440,520 Z"
        fill="#4a3f62"
        y={layer3}
        opacity={0.85}
      />
      <MountainLayer
        d="M0,520 L0,440 Q500,360 900,460 Q1200,400 1440,480 L1440,520 Z"
        fill="#2f2840"
        y={layer4}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          opacity: mistOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(248,239,232,0.5) 40%, rgba(248,239,232,0.85) 100%)",
        }}
      />
    </div>
  );
}
