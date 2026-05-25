export const HALDI_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  heroTitle: "Rasm-e-Haldi",
  heroConnector: "of",
  heroName: "Shoaib Faraz Ahmed",
  tagline:
    "Join us for an evening filled with colours of joy, the rhythm of dhol, and the warmth of love and laughter.",
  dateLabel: "8th July, 2026",
  timeLabel: "5pm till late",
  venueName: "Noorunisa Enclave",
  venueDetail: "Madanapalle",
  venueFull: "Meerani's residence",
  venueTitle: "VENUE & LOCATION",
  venueSubtext: "Scan to open directions on Google Maps",
  qrImage: "/haldi-venue-qr.png",
  countdownIso: "2026-07-08T17:00:00+05:30",
  mapsQuery:
    "Noorunisa Enclave, 17/2-5-2-5, Gandhi Rd, Madanapalle, Andhra Pradesh 517325",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Noorunisa+Enclave,+17%2F2-5-2-5,+Gandhi+Rd,+Madanapalle,+Andhra+Pradesh+517325",
} as const;

export type HaldiEvent = typeof HALDI_EVENT;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getHaldiMapsUrl(): string {
  return HALDI_EVENT.mapsUrl;
}
