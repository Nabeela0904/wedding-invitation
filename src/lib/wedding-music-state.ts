export const MUSIC_PLAYING_KEY = "wedding-music-playing";
export const MUSIC_TIME_KEY = "wedding-music-time";
export const MUSIC_USER_PAUSED_KEY = "wedding-music-user-paused";

export function shouldAutoPlayMusic(): boolean {
  if (typeof window === "undefined") return true;

  try {
    return sessionStorage.getItem(MUSIC_PLAYING_KEY) !== "0";
  } catch {
    return true;
  }
}

export function wasUserPaused(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(MUSIC_USER_PAUSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function getSavedMusicTime(): number {
  if (typeof window === "undefined") return 0;

  try {
    const value = sessionStorage.getItem(MUSIC_TIME_KEY);
    if (!value) return 0;

    const time = Number.parseFloat(value);
    return Number.isFinite(time) && time >= 0 ? time : 0;
  } catch {
    return 0;
  }
}

export function saveMusicState(options: {
  playing: boolean;
  currentTime: number;
  userPaused?: boolean;
}): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(MUSIC_PLAYING_KEY, options.playing ? "1" : "0");
    sessionStorage.setItem(MUSIC_TIME_KEY, String(Math.max(0, options.currentTime)));

    if (typeof options.userPaused === "boolean") {
      sessionStorage.setItem(MUSIC_USER_PAUSED_KEY, options.userPaused ? "1" : "0");
    }
  } catch {
    // Ignore storage errors (private mode, etc.).
  }
}

export function applySavedMusicTime(audio: HTMLAudioElement): void {
  const saved = getSavedMusicTime();
  if (saved <= 0) return;

  try {
    const duration = audio.duration;
    if (Number.isFinite(duration) && duration > 0) {
      audio.currentTime = Math.min(saved, Math.max(duration - 0.05, 0));
      return;
    }

    audio.currentTime = saved;
  } catch {
    // Ignore seek errors until metadata is ready.
  }
}

export function musicSrcMatches(audio: HTMLAudioElement, src: string): boolean {
  if (!audio.src) return false;
  return audio.src === src || audio.src.endsWith(src.split("/").pop() ?? "");
}
