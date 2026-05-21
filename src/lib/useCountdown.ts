"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetMs: number): TimeLeft | null {
  const difference = targetMs - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/** Avoid hydration mismatch — only compute live time after client mount */
export function useCountdown(countdownIso: string) {
  const targetMs = new Date(countdownIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetMs));

    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetMs));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetMs]);

  return { timeLeft, mounted };
}

export function formatCountdownUnit(value: number | undefined): string {
  if (value === undefined) return "--";
  return String(value).padStart(2, "0");
}
