"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/music/gehra-hua-instrumental.mp3";
const STORAGE_KEY = "wedding-music-playing";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const syncPlaying = useCallback((isPlaying: boolean) => {
    setPlaying(isPlaying);
    sessionStorage.setItem(STORAGE_KEY, isPlaying ? "1" : "0");
  }, []);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      syncPlaying(true);
      return true;
    } catch {
      return false;
    }
  }, [syncPlaying]);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    syncPlaying(false);
  }, [syncPlaying]);

  const toggleMusic = useCallback(async () => {
    if (playing) {
      pauseMusic();
      return;
    }
    await playMusic();
  }, [pauseMusic, playMusic, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      audio.volume = 0.35;
      setReady(true);
    };
    const onEnded = () => syncPlaying(false);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("ended", onEnded);

    const resumeIfEnabled = () => {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        void playMusic();
      }
    };

    resumeIfEnabled();
    document.addEventListener("click", resumeIfEnabled, { once: true });
    document.addEventListener("touchstart", resumeIfEnabled, { once: true });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playMusic, syncPlaying]);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" aria-hidden />
      <button
        type="button"
        className="music-toggle"
        onClick={() => void toggleMusic()}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        title={ready ? "Gehra Hua — instrumental" : "Loading music…"}
      >
        <span className="music-toggle-icon" aria-hidden>
          {playing ? "❚❚" : "♪"}
        </span>
        <span className="music-toggle-label">{playing ? "Music on" : "Play music"}</span>
      </button>
    </>
  );
}
