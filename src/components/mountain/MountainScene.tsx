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
      className="absolute bottom-0 left-0 h-[min(58vh,520px)] w-full will-change-transform sm:h-[min(62vh,560px)]"
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
  const skyShift = useTransform(scrollY, [0, 2400], [0, -100]);
  const layer1 = useTransform(scrollY, [0, 2400], [0, 140]);
  const layer2 = useTransform(scrollY, [0, 2400], [0, 260]);
  const layer3 = useTransform(scrollY, [0, 2400], [0, 400]);
  const layer4 = useTransform(scrollY, [0, 2400], [0, 520]);
  const mistOpacity = useTransform(scrollY, [0, 1000, 2400], [0.5, 0.32, 0.18]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0"
        style={{
          y: skyShift,
          background:
            "linear-gradient(180deg, #9eb5d4 0%, #d8b8cc 32%, #edd9cb 68%, #f7f0ea 100%)",
        }}
      />

      <div
        className="absolute left-1/2 top-[6%] h-[min(300px,42vw)] w-[min(300px,42vw)] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,225,195,0.95) 0%, rgba(255,190,150,0.35) 40%, transparent 72%)",
        }}
      />

      <MountainLayer
        d="M0,400 L0,300 Q360,160 720,280 T1440,240 L1440,520 Z"
        fill="#9a8aad"
        y={layer1}
        opacity={0.5}
      />
      <MountainLayer
        d="M0,440 L0,340 Q280,220 580,320 Q900,180 1440,360 L1440,520 Z"
        fill="#736682"
        y={layer2}
        opacity={0.72}
      />
      <MountainLayer
        d="M0,480 L0,380 Q420,260 760,370 Q1100,240 1440,400 L1440,520 Z"
        fill="#524768"
        y={layer3}
        opacity={0.88}
      />
      <MountainLayer
        d="M0,520 L0,430 Q500,350 900,450 Q1200,390 1440,470 L1440,520 Z"
        fill="#352d48"
        y={layer4}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[50%]"
        style={{
          opacity: mistOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(247,240,234,0.45) 35%, rgba(247,240,234,0.9) 100%)",
        }}
      />
    </div>
  );
}
