export const NIKAH_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "WITH THE BLESSINGS OF ALLAH, WE JOYFULLY INVITE YOU TO THE NIKAH CEREMONY OF",
  groom: {
    name: "R.S. Shoaib Faraz Ahmed",
    parents: "S/O Mr & Mrs Meer Ahmed",
  },
  bride: {
    name: "V. Zeenath Banu",
    parents: "D/O Mr & Mrs R. Vahid Khan",
  },
  dateLabel: "Thursday, 09-07-2026",
  timeLabel: "After Asar Namaz",
  dinnerLabel: "7:00 PM onwards",
  venueTitle: "Venue & Location",
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
  mapsUrl: "https://maps.google.com/?q=Meerani+Residence",
  qrImage: "/nikah-venue-qr.png",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
