"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HaldiAudioState = {
  isPlaying: boolean;
  isReady: boolean;
  hasStarted: boolean;
  togglePlayback: () => void;
  startFromGesture: () => void;
};

/** Procedural sitar drone + dhol tabla loop — no external audio files */
export function useHaldiAudio(): HaldiAudioState {
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const stepRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const playDholHit = useCallback(
    (ctx: AudioContext, master: GainNode, time: number, accent: boolean) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = accent ? "triangle" : "sine";
      osc.frequency.setValueAtTime(accent ? 95 : 140, time);
      osc.frequency.exponentialRampToValueAtTime(accent ? 55 : 80, time + 0.08);
      gain.gain.setValueAtTime(accent ? 0.22 : 0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + (accent ? 0.28 : 0.18));
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + 0.35);
    },
    [],
  );

  const stopLoop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const ctx = ctxRef.current;
    if (ctx && ctx.state !== "closed") {
      void ctx.close();
    }
    ctxRef.current = null;
    setIsPlaying(false);
  }, []);

  const startFromGesture = useCallback(() => {
    if (startedRef.current && ctxRef.current) {
      if (ctxRef.current.state === "suspended") {
        void ctxRef.current.resume();
      }
      setIsPlaying(true);
      return;
    }
    if (startedRef.current) return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    startedRef.current = true;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);

    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    drone.type = "sawtooth";
    drone.frequency.value = 196;
    droneGain.gain.value = 0.04;
    filter.type = "lowpass";
    filter.frequency.value = 520;
    drone.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(master);
    drone.start();

    const pattern = [1, 0, 0, 1, 0, 1, 0, 0];
    const schedule = () => {
      const accent = pattern[stepRef.current % pattern.length] === 1;
      playDholHit(ctx, master, ctx.currentTime, accent);
      stepRef.current += 1;
    };
    schedule();
    timerRef.current = window.setInterval(schedule, 420);

    ctxRef.current = ctx;
    setHasStarted(true);
    setIsReady(true);
    setIsPlaying(true);
  }, [playDholHit]);

  const togglePlayback = useCallback(() => {
    if (!startedRef.current) {
      startFromGesture();
      return;
    }
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (isPlaying) {
      void ctx.suspend();
      setIsPlaying(false);
    } else {
      void ctx.resume();
      setIsPlaying(true);
    }
  }, [isPlaying, startFromGesture]);

  useEffect(() => {
    const onFirstInteraction = () => startFromGesture();
    document.addEventListener("pointerdown", onFirstInteraction, { once: true });
    document.addEventListener("keydown", onFirstInteraction, { once: true });
    return () => {
      document.removeEventListener("pointerdown", onFirstInteraction);
      document.removeEventListener("keydown", onFirstInteraction);
      stopLoop();
    };
  }, [startFromGesture, stopLoop]);

  return {
    isPlaying,
    isReady,
    hasStarted,
    togglePlayback,
    startFromGesture,
  };
}
