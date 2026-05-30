"use client";

import { useEffect } from "react";
import { getNikahMusicSrc, getWeddingMusicSrc } from "@/lib/wedding-asset-path";
import { markMusicForEventPage, wasUserPaused } from "@/lib/wedding-music-state";

function getBgMusic() {
  return document.getElementById("bg-music") as HTMLAudioElement | null;
}

function srcMatches(audio: HTMLAudioElement, src: string) {
  try {
    return new URL(audio.src).href === new URL(src, window.location.origin).href;
  } catch {
    return audio.src.includes("nikah.mpeg");
  }
}

export default function NikahPageMusic() {
  useEffect(() => {
    const audio = getBgMusic();
    if (!audio) return;

    const nikahSrc = getNikahMusicSrc();
    const defaultSrc = getWeddingMusicSrc();

    const playNikah = () => {
      if (wasUserPaused()) return;

      if (!srcMatches(audio, nikahSrc)) {
        audio.pause();
        audio.src = nikahSrc;
        audio.currentTime = 0;
        audio.load();
      }

      audio.volume = 0.35;
      markMusicForEventPage(0);
      void audio.play().catch(() => {});
    };

    playNikah();

    const onReady = () => playNikah();
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("loadeddata", onReady);
    document.addEventListener("click", onReady);
    document.addEventListener("touchstart", onReady, { passive: true });

    return () => {
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("loadeddata", onReady);
      document.removeEventListener("click", onReady);
      document.removeEventListener("touchstart", onReady);

      if (!srcMatches(audio, nikahSrc)) return;

      audio.pause();
      audio.src = defaultSrc;
      audio.currentTime = 0;
      audio.load();

      if (!wasUserPaused()) {
        void audio.play().catch(() => {});
      }
    };
  }, []);

  return null;
}
