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
  eventTitle: "NIKAH CEREMONY",
  dateLabel: "Thursday, 09-07-2026",
  timeLabel: "After Asar Namaz",
  dinnerLabel: "Dinner: 7:00 PM onwards",
  venueTitle: "VENUE & LOCATION",
  venueSubtext: "Noorunisa Enclave at Meerani's residence",
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
  mapsUrl: "https://maps.google.com/?q=Noorunisa+Enclave",
  qrImage: "/nikah-venue-qr.png",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
