"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getWeddingMusicSrc } from "@/lib/wedding-asset-path";
import {
  applySavedMusicTime,
  getSavedMusicTime,
  isEventPagePath,
  markMusicForEventPage,
  markUserPaused,
  markUserPlaying,
  musicSrcMatches,
  saveMusicState,
  shouldAutoPlayMusic,
  wasUserPaused,
} from "@/lib/wedding-music-state";

export default function BackgroundMusic() {
  const pathname = usePathname();
  const isEventPage = isEventPagePath(pathname);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const userPausedRef = useRef(wasUserPaused());
  const lastSavedAtRef = useRef(0);

  const playMusic = useCallback((force = false) => {
    const audio = audioRef.current;
    if (!audio) return false;
    if (!force && !shouldAutoPlayMusic()) return false;

    const src = getWeddingMusicSrc();
    if (!musicSrcMatches(audio, src)) {
      audio.src = src;
      audio.load();
    }

    applySavedMusicTime(audio);
    audio.volume = 0.35;

    const playPromise = audio.play();
    if (!playPromise) return false;

    playPromise
      .then(() => {
        userPausedRef.current = false;
        setPlaying(true);
        markUserPlaying(audio.currentTime);
      })
      .catch(() => {
        setPlaying(false);
      });

    return true;
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    userPausedRef.current = true;
    audio.pause();
    setPlaying(false);
    markUserPaused(audio.currentTime);
  }, []);

  const toggleMusic = useCallback(() => {
    if (playing) {
      pauseMusic();
      return;
    }

    userPausedRef.current = false;
    playMusic(true);
  }, [pauseMusic, playMusic, playing]);

  useEffect(() => {
    if (!isEventPage) return;

    userPausedRef.current = false;
    markMusicForEventPage(getSavedMusicTime());
  }, [isEventPage]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = getWeddingMusicSrc();
    audio.volume = 0.35;
    audio.load();

    const onCanPlay = () => {
      setReady(true);
      applySavedMusicTime(audio);
      playMusic(true);
    };

    const onLoadedMetadata = () => {
      applySavedMusicTime(audio);
    };

    const onPlay = () => {
      userPausedRef.current = false;
      setPlaying(true);
      markUserPlaying(audio.currentTime);
    };

    const onPause = () => {
      if (userPausedRef.current) {
        setPlaying(false);
      }
    };

    const onTimeUpdate = () => {
      if (audio.paused || userPausedRef.current) return;

      const now = Date.now();
      if (now - lastSavedAtRef.current < 750) return;

      lastSavedAtRef.current = now;
      saveMusicState({
        currentTime: audio.currentTime,
        playing: true,
      });
    };

    const persistBeforeLeave = () => {
      if (userPausedRef.current) return;

      saveMusicState({
        playing: !audio.paused && !audio.ended && audio.currentTime > 0,
        currentTime: audio.currentTime,
      });
    };

    const tryAutoPlay = () => {
      if (!isEventPage && userPausedRef.current) return;
      if (!audio.paused) return;
      playMusic(true);
    };

    const tryAutoPlayFromInteraction = () => {
      if (isEventPage) {
        userPausedRef.current = false;
        markMusicForEventPage(audio.currentTime);
      }
      tryAutoPlay();
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("loadeddata", tryAutoPlay);
    audio.addEventListener("canplay", tryAutoPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    window.addEventListener("pagehide", persistBeforeLeave);

    tryAutoPlay();

    if (isEventPage) {
      document.addEventListener("click", tryAutoPlayFromInteraction);
      document.addEventListener("touchstart", tryAutoPlayFromInteraction, { passive: true });
      document.addEventListener("keydown", tryAutoPlayFromInteraction);
    } else {
      document.addEventListener("click", tryAutoPlay, { once: true });
      document.addEventListener("touchstart", tryAutoPlay, { once: true, passive: true });
      document.addEventListener("keydown", tryAutoPlay, { once: true });
    }

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("loadeddata", tryAutoPlay);
      audio.removeEventListener("canplay", tryAutoPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      window.removeEventListener("pagehide", persistBeforeLeave);
      document.removeEventListener("click", tryAutoPlayFromInteraction);
      document.removeEventListener("touchstart", tryAutoPlayFromInteraction);
      document.removeEventListener("keydown", tryAutoPlayFromInteraction);
      document.removeEventListener("click", tryAutoPlay);
      document.removeEventListener("touchstart", tryAutoPlay);
      document.removeEventListener("keydown", tryAutoPlay);
    };
  }, [isEventPage, playMusic]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay playsInline aria-hidden />
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
