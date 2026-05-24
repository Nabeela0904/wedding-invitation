export const NIKAH_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "WITH THE BLESSINGS OF ALLAH, WE GRACIOUSLY INVITE YOU TO THE NIKAH CEREMONY OF",
  groom: {
    name: "SHOAIB FARAZ AHMED",
  },
  bride: {
    name: "ZEENATH BANU",
  },
  ceremonyDetails: [
    "Insh Allah,",
    "On Thursday the 09th of July 2026",
    "5:00 PM, After Nawias- e - Asar",
    "At Big Mosque, Melvisharam",
  ] as const,
  dinnerLabel: "Dinner: 7:00 PM onwards",
  venueTitle: "VENUE & LOCATION",
  venueSubtext: "Big Mosque, Melvisharam",
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
  mapsUrl: "https://maps.google.com/?q=Big+Mosque+Melvisharam",
  qrImage: "/nikah-venue-qr.png",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
