export function getDeployBase(): string {
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="wedding-base-path"]');
    if (meta?.getAttribute("content")) {
      const value = meta.getAttribute("content")!.trim();
      return value.endsWith("/") ? value : `${value}/`;
    }
  }

  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const knownRoots = ["wedding-invitation"];
    if (segments.length > 0 && knownRoots.includes(segments[0]!)) {
      return `/${segments[0]}/`;
    }
  }

  return "/";
}

export function weddingAssetPath(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, "");
  const base = getDeployBase();

  if (typeof window === "undefined") {
    return `${base}${clean}`.replace(/\/{2,}/g, "/");
  }

  return new URL(clean, `${window.location.origin}${base}`).href;
}

export const WEDDING_MUSIC_FILE = "music/whatsapp-audio.mp3";
export const NIKAH_MUSIC_FILE = "music/nikah.mpeg";

export function getWeddingMusicSrc(): string {
  return weddingAssetPath(WEDDING_MUSIC_FILE);
}

export function getNikahMusicSrc(): string {
  return weddingAssetPath(NIKAH_MUSIC_FILE);
}

export function getMusicSrcForPathname(pathname: string): string {
  if (/\/nikah(?:\.html)?\/?$/i.test(pathname)) {
    return getNikahMusicSrc();
  }

  return getWeddingMusicSrc();
}
