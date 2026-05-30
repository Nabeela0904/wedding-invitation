export const MEHNDI_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "You are cordially invited to attend Rasm-e-haldi of Shoaib Faraz Ahamed",
  message:
    "Join us for an evening filled with colours of joy, the rhythm of dhol, and the warmth of love and laughter.",
  dateLabel: "8th July, 2026",
  timeLabel: "5pm till late",
  venueLabel: "Noorunisa Enclave at Meerani's residence",
  countdownIso: "2026-07-08T17:00:00+05:30",
  mapsQuery: "Noorunisa Enclave Meerani residence",
} as const;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
