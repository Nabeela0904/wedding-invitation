"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getWeddingMusicSrc } from "@/lib/wedding-asset-path";
import {
  applySavedMusicTime,
  musicSrcMatches,
  saveMusicState,
  shouldAutoPlayMusic,
  wasUserPaused,
} from "@/lib/wedding-music-state";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const userPausedRef = useRef(wasUserPaused());
  const lastSavedAtRef = useRef(0);

  const persistMusicState = useCallback((playingNow: boolean, userPaused?: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    saveMusicState({
      playing: playingNow,
      currentTime: audio.currentTime,
      userPaused: typeof userPaused === "boolean" ? userPaused : userPausedRef.current,
    });
  }, []);

  const syncPlaying = useCallback(
    (isPlaying: boolean) => {
      setPlaying(isPlaying);
      persistMusicState(isPlaying);
    },
    [persistMusicState],
  );

  const playMusic = useCallback(
    (force = false) => {
      const audio = audioRef.current;
      if (!audio) return false;
      if (!force && (!shouldAutoPlayMusic() || userPausedRef.current)) return false;

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
    persistMusicState(false, true);
  }, [persistMusicState, syncPlaying]);

  const toggleMusic = useCallback(() => {
    if (playing) {
      pauseMusic();
      return;
    }

    userPausedRef.current = false;
    persistMusicState(false, false);
    playMusic(true);
  }, [pauseMusic, playMusic, playing, persistMusicState]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const src = getWeddingMusicSrc();
    audio.src = src;
    audio.autoplay = true;
    audio.load();

    const onCanPlay = () => {
      audio.volume = 0.35;
      setReady(true);
      applySavedMusicTime(audio);
      playMusic(true);
    };

    const onLoadedMetadata = () => {
      applySavedMusicTime(audio);
    };

    const onPlay = () => syncPlaying(true);

    const onPause = () => {
      if (userPausedRef.current) {
        syncPlaying(false);
      }
    };

    const onEnded = () => syncPlaying(false);
    const onError = () => syncPlaying(false);

    const onTimeUpdate = () => {
      if (audio.paused) return;

      const now = Date.now();
      if (now - lastSavedAtRef.current < 750) return;

      lastSavedAtRef.current = now;
      persistMusicState(true);
    };

    const persistBeforeLeave = () => {
      persistMusicState(!audio.paused && !audio.ended);
    };

    const tryAutoPlay = () => playMusic(true);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("loadeddata", tryAutoPlay);
    audio.addEventListener("canplay", tryAutoPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("timeupdate", onTimeUpdate);
    window.addEventListener("pagehide", persistBeforeLeave);

    tryAutoPlay();
    window.addEventListener("load", tryAutoPlay);

    document.addEventListener("click", tryAutoPlay, { once: true });
    document.addEventListener("touchstart", tryAutoPlay, { once: true, passive: true });
    document.addEventListener("keydown", tryAutoPlay, { once: true });

    return () => {
      persistBeforeLeave();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("loadeddata", tryAutoPlay);
      audio.removeEventListener("canplay", tryAutoPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      window.removeEventListener("pagehide", persistBeforeLeave);
      window.removeEventListener("load", tryAutoPlay);
    };
  }, [persistMusicState, playMusic, syncPlaying]);

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
