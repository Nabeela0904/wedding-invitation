"use client";

import { motion } from "framer-motion";
import { StarCrescentMotif } from "./motifs";
import { fadeSlideUp } from "@/lib/motion";

type HaldiArchFrameProps = {
  children: React.ReactNode;
};

function CornerAccent({ className }: { className: string }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <StarCrescentMotif className="h-10 w-10 sm:h-12 sm:w-12" />
    </div>
  );
}

export default function HaldiArchFrame({ children }: HaldiArchFrameProps) {
  return (
    <motion.div
      className="relative z-10 mx-auto w-full max-w-xl px-4 sm:px-6"
      variants={fadeSlideUp}
      initial="hidden"
      animate="visible"
    >
      <div className="relative rounded-[2rem] border-2 border-marigold/55 bg-gradient-to-b from-marigold/12 to-transparent p-[5px] shadow-gold-lg">
        <div className="relative rounded-[1.65rem] border border-deep-gold/80 bg-cream/25 p-[3px]">
          <CornerAccent className="-left-3 -top-3 sm:-left-4 sm:-top-4" />
          <CornerAccent className="-right-3 -top-3 sm:-right-4 sm:-top-4" />
          <CornerAccent className="-bottom-3 -left-3 sm:-bottom-4 sm:-left-4" />
          <CornerAccent className="-bottom-3 -right-3 sm:-bottom-4 sm:-right-4" />

          <div
            className="relative overflow-hidden border-2 border-marigold/40 bg-white/15 px-5 pb-8 pt-16 shadow-inner backdrop-blur-md sm:px-8 sm:pb-10 sm:pt-20"
            style={{
              borderRadius: "48% 48% 1.25rem 1.25rem / 22% 22% 1.25rem 1.25rem",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,248,235,0.14) 45%, rgba(255,255,255,0.1) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.55), 0 0 0 1px rgba(245,158,11,0.2), 0 24px 56px rgba(180,120,40,0.14)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-4 top-3 h-[42%] border-2 border-marigold/30"
              style={{
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                background:
                  "linear-gradient(180deg, rgba(245,158,11,0.1), transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-8 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-marigold/55 to-transparent"
              aria-hidden
            />
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
