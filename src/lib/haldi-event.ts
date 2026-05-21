export const HALDI_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  blessingLine: "With the heavenly blessings of our families",
  familiesLine: "The Ahmed & Meerani families",
  ceremonyLabel: "Rasm-e-Haldi",
  guestOfHonor: "Shoaib Faraz Ahmed",
  inviteHeadline: "You to join us in the Haldi celebrations of",
  tagline:
    "Join us for an evening filled with colours of joy, the rhythm of dhol, and the warmth of love and laughter.",
  message:
    "We are delighted that you are able to join us in celebrating what we hope will be one of the happiest evenings of our lives. The affection shown to us by so many since our engagement has been incredibly moving. We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to seeing you at the Haldi ceremony.",
  closingLine: "Looking forward to seeing you",
  dateLabel: "8th July, 2026",
  timeLabel: "5pm till late",
  venueName: "Noorunisa Enclave",
  venueDetail: "Meerani's residence",
  venueFull: "Noorunisa Enclave at Meerani's residence",
  countdownIso: "2026-07-08T17:00:00+05:30",
  mapsQuery: "Noorunisa Enclave Meerani residence",
  hashtag: "#ShoaibKiHaldi",
  thingsToKnow: [
    {
      title: "Dress Code",
      description:
        "Festive yellows, marigold, and traditional attire are warmly encouraged for the Haldi ceremony.",
    },
    {
      title: "Weather",
      description:
        "Expect a warm July evening — light, comfortable clothing is recommended for outdoor celebrations.",
    },
    {
      title: "Parking",
      description:
        "Parking will be available at Noorunisa Enclave for all guests arriving by car.",
    },
    {
      title: "Hashtag",
      description:
        "When sharing memories on social media, please use our celebration hashtag — #ShoaibKiHaldi",
    },
  ] as const,
} as const;

export type HaldiEvent = typeof HALDI_EVENT;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
