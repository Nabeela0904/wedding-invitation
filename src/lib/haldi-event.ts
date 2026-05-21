export const HALDI_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  groomName: "Shoaib",
  brideName: "Zeenath",
  wedsLabel: "weds",
  ceremonyLabel: "Rasm-e-Haldi",
  guestOfHonor: "Shoaib Faraz Ahmed",
  blessingIntro: "With the heavenly blessings of",
  blessingParents: [
    "Mrs. Ahmed & Mr. Faraz Ahmed",
    "The Meerani family",
  ] as const,
  inviteHeadline: "You to join us in the Haldi celebrations of",
  hostLine: "Son of Mrs. Ahmed & Mr. Faraz Ahmed",
  message:
    "We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to see you at the Haldi ceremony.",
  closingLine: "Looking forward to see you",
  rsvpPrompt: "Click below to RSVP",
  dateLabel: "8th July, 2026",
  timeLabel: "5pm till late",
  venueName: "Noorunisa Enclave",
  venueDetail: "Meerani's residence",
  venueFull: "Noorunisa Enclave at Meerani's residence",
  countdownIso: "2026-07-08T17:00:00+05:30",
  mapsQuery: "Noorunisa Enclave Meerani residence",
  instagramLabel: "Follow the action",
  instagramPrompt: "Click the link to open Instagram",
  instagramUrl: "https://www.instagram.com/",
  countdownClosing:
    "The Ahmed family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.",
  thingsToKnowIntro:
    "To help you feel at ease and enjoy every moment of the celebrations, we've gathered a few thoughtful details we'd love for you to know before the big day.",
  thingsToKnow: [
    {
      title: "Hashtag",
      description:
        "While posting photos on social media please use the hashtag — #ShoaibKiHaldi",
    },
    {
      title: "Weather",
      description:
        "It will be a warm July evening with pleasant temperatures at the venue — light festive attire is recommended.",
    },
    {
      title: "Dress Code",
      description:
        "Festive yellows, marigold, and traditional Haldi colours are warmly encouraged.",
    },
    {
      title: "Parking",
      description:
        "Parking for all our guests will be available at Noorunisa Enclave.",
    },
  ] as const,
} as const;

export type HaldiEvent = typeof HALDI_EVENT;

export function getGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
