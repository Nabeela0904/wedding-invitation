"use client";

import { motion } from "framer-motion";
import { useHaldiAudio } from "./useHaldiAudio";

const BAR_HEIGHTS = [0.35, 0.7, 0.5, 0.9];

export default function MusicPlayer() {
  const { isPlaying, isReady, togglePlayback } = useHaldiAudio();

  return (
    <motion.button
      type="button"
      onClick={togglePlayback}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-marigold/50 bg-white/25 shadow-gold-lg backdrop-blur-md will-change-transform sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      aria-label={isPlaying ? "Pause celebration music" : "Play celebration music"}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", mass: 0.8, damping: 18, delay: 0.6 }}
    >
      <span className="sr-only">Celebration music</span>

      {isPlaying && isReady ? (
        <span className="flex h-6 items-end justify-center gap-[3px]" aria-hidden>
          {BAR_HEIGHTS.map((peak, i) => (
            <motion.span
              key={i}
              className="block w-[3px] origin-bottom rounded-full bg-gradient-to-t from-saffron to-marigold will-change-transform"
              style={{ height: 20 }}
              animate={{
                scaleY: [0.35, peak, 0.45, peak * 0.85, 0.35],
              }}
              transition={{
                duration: 0.55 + i * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
        </span>
      ) : (
        <MusicNoteIcon />
      )}
    </motion.button>
  );
}

function MusicNoteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B45309"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
