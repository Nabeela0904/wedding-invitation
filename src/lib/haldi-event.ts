export const HALDI_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  welcomeLine: "You are cordially invited to attend",
  eventTitle: "Rasm-e-Haldi of Shoaib Faraz Ahmed",
  description:
    "Join us for an evening filled with colours of joy, the rhythm of dhol, and the warmth of love and laughter.",
  dateLabel: "8th July, 2026",
  locationLabel: "Noorunisa Enclave at Meerani's residence",
  timeLabel: "5pm till late",
  /** Countdown target — 5:00 PM IST, 8 July 2026 */
  countdownIso: "2026-07-08T17:00:00+05:30",
  mapsQuery: "Noorunisa Enclave Meerani residence",
} as const;

export type HaldiEvent = typeof HALDI_EVENT;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
