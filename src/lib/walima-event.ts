export const WALIMA_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "Join us in the evening for celebrating togetherness! Love at the Walima ceremony of",
  groom: {
    name: "SHOAIB FARAZ AHMED",
  },
  bride: {
    name: "ZEENATH BANU",
  },
  blessedPhrase: "In Sha Allah On",
  dateLabel: "Sunday 11th July, 2026",
  venueTitle: "VENUE & LOCATION",
  countdownIso: "2026-07-11T19:00:00+05:30",
  mapsUrl: "https://maps.google.com/?q=Noorunisa+Enclave",
  qrImage: "/walima-qr.jpg",
} as const;

export type WalimaEvent = typeof WALIMA_EVENT;
