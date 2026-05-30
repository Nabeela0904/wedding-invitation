export const WALIMA_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "Join us in the evening for celebrating togetherness! Love at the Walima ceremony of",
  groom: {
    name: "SHOAIB FARAZ AHAMED",
  },
  bride: {
    name: "ZEENATH BANU",
  },
  blessedPhrase: "In Sha Allah On",
  dateLabel: "Saturday 11th July, 2026",
  timeVenueLabel: "6:00PM, At R convention centre, Madanapalle",
  dinnerLabel: "Dinner: 8.00pm onwards",
  dinnerVenue: "Venue: R convention centre, Madanapalle",
  venueTitle: "VENUE & LOCATION",
  venueSubtext: "R convention centre, Madanapalle",
  countdownIso: "2026-07-11T18:00:00+05:30",
  mapsUrl: "https://maps.app.goo.gl/LjakV6TfwYmR3PAw6",
  qrImage: "/walima-venue-qr.png",
} as const;

export type WalimaEvent = typeof WALIMA_EVENT;
