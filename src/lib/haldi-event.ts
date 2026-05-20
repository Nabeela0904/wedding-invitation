export const HALDI_EVENT = {
  groomName: "Shoaib Faraz Ahmed",
  ceremonyTitle: "Rasm-e-Haldi",
  dateLabel: "Friday, 6th February 2026",
  timeLabel: "5:00 PM till late",
  venueName: "Noorunisa Enclave",
  venueDetail: "Meerani's residence",
  /** Countdown target — 5:00 PM IST on 6 Feb 2026 */
  countdownIso: "2026-02-06T17:00:00+05:30",
  mapsQuery: "Noorunisa Enclave Meerani residence",
} as const;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
