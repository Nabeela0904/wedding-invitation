export const MUSIC_PLAYING_KEY = "wedding-music-playing";
export const MUSIC_TIME_KEY = "wedding-music-time";
export const MUSIC_USER_PAUSED_KEY = "wedding-music-user-paused";

export const EVENT_PAGES = ["/haldi", "/nikah", "/walima"] as const;

export function isEventPagePath(pathname: string): boolean {
  return EVENT_PAGES.some(
    (page) => pathname === page || pathname.endsWith(page),
  );
}

export function shouldAutoPlayMusic(): boolean {
  return !wasUserPaused();
}

export function wasUserPaused(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(MUSIC_USER_PAUSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function shouldResumeMusic(): boolean {
  if (wasUserPaused()) return false;

  try {
    return sessionStorage.getItem(MUSIC_PLAYING_KEY) === "1";
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
  playing?: boolean;
  currentTime?: number;
  userPaused?: boolean;
}): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof options.playing === "boolean") {
      sessionStorage.setItem(MUSIC_PLAYING_KEY, options.playing ? "1" : "0");
    }

    if (typeof options.currentTime === "number" && Number.isFinite(options.currentTime)) {
      sessionStorage.setItem(MUSIC_TIME_KEY, String(Math.max(0, options.currentTime)));
    }

    if (typeof options.userPaused === "boolean") {
      sessionStorage.setItem(MUSIC_USER_PAUSED_KEY, options.userPaused ? "1" : "0");
    }
  } catch {
    // Ignore storage errors (private mode, etc.).
  }
}

export function markUserPlaying(currentTime = 0): void {
  saveMusicState({
    playing: true,
    currentTime,
    userPaused: false,
  });
}

export function markUserPaused(currentTime = 0): void {
  saveMusicState({
    playing: false,
    currentTime,
    userPaused: true,
  });
}

export function markMusicForEventPage(currentTime = getSavedMusicTime()): void {
  saveMusicState({
    playing: true,
    currentTime,
    userPaused: false,
  });
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

  try {
    return new URL(audio.src).href === new URL(src, window.location.origin).href;
  } catch {
    return audio.src.includes("whatsapp-audio.mp3");
  }
}
