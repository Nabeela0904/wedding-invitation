"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getWeddingMusicSrc } from "@/lib/wedding-asset-path";

const STORAGE_KEY = "wedding-music-playing";

function shouldAutoPlayMusic() {
  return sessionStorage.getItem(STORAGE_KEY) !== "0";
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const userPausedRef = useRef(false);

  const syncPlaying = useCallback((isPlaying: boolean) => {
    setPlaying(isPlaying);
    sessionStorage.setItem(STORAGE_KEY, isPlaying ? "1" : "0");
  }, []);

  const playMusic = useCallback(
    (force = false) => {
      const audio = audioRef.current;
      if (!audio) return false;
      if (!force && (!shouldAutoPlayMusic() || userPausedRef.current)) return false;

      audio.src = getWeddingMusicSrc();
      audio.volume = 0.35;

      const playPromise = audio.play();
      if (!playPromise) return false;

      playPromise
        .then(() => syncPlaying(true))
        .catch(() => syncPlaying(false));

      return true;
    },
    [syncPlaying],
  );

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    userPausedRef.current = true;
    audio.pause();
    syncPlaying(false);
  }, [syncPlaying]);

  const toggleMusic = useCallback(() => {
    if (playing) {
      pauseMusic();
      return;
    }
    userPausedRef.current = false;
    playMusic(true);
  }, [pauseMusic, playMusic, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = getWeddingMusicSrc();
    audio.autoplay = true;
    audio.load();

    const onCanPlay = () => {
      audio.volume = 0.35;
      setReady(true);
      playMusic(true);
    };
    const onPlay = () => syncPlaying(true);
    const onPause = () => {
      if (userPausedRef.current) {
        syncPlaying(false);
      }
    };
    const onEnded = () => syncPlaying(false);
    const onError = () => syncPlaying(false);

    const tryAutoPlay = () => playMusic(true);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadeddata", tryAutoPlay);
    audio.addEventListener("canplay", tryAutoPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    tryAutoPlay();
    window.addEventListener("load", tryAutoPlay);

    document.addEventListener("click", tryAutoPlay, { once: true });
    document.addEventListener("touchstart", tryAutoPlay, { once: true, passive: true });
    document.addEventListener("keydown", tryAutoPlay, { once: true });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadeddata", tryAutoPlay);
      audio.removeEventListener("canplay", tryAutoPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      window.removeEventListener("load", tryAutoPlay);
    };
  }, [playMusic, syncPlaying]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay aria-hidden />
      <button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        title={ready ? "Wedding background music" : "Loading music…"}
      >
        <span className="music-toggle-icon" aria-hidden>
          {playing ? "❚❚" : "♪"}
        </span>
        <span className="music-toggle-label">{playing ? "Pause music" : "Play music"}</span>
      </button>
    </>
  );
}
