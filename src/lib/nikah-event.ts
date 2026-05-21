export const NIKAH_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "WITH THE BLESSINGS OF ALLAH, WE JOYFULLY INVITE YOU TO THE NIKAH CEREMONY OF",
  groom: {
    name: "SHOAIB FARAZ AHMED",
    parents: "S/O Mr & Mrs Meer Ahmed",
  },
  bride: {
    name: "ZEENATH BANU",
    parents: "D/O Mr & Mrs R. Vahid Khan",
  },
  eventTitle: "NIKAH CEREMONY",
  dateLabel: "Thursday, 09-07-2026",
  timeLabel: "After Asar Namaz",
  dinnerLabel: "Dinner: 7:00 PM onwards",
  venueTitle: "VENUE & LOCATION",
  venueSubtext: "Noorunisa Enclave at Meerani's residence",
  venueName: "Noorunisa Enclave",
  venueDetail: "Meerani's residence",
  locationPageTitle: "Find Your Way to the Nikah",
  locationPageSubtitle: "We cannot wait to welcome you with open hearts",
  parkingNote: "Ample parking is available at the venue for guests.",
  directionsNote:
    "For the smoothest journey, use Google Maps for live directions. Scan the QR code or tap the button below.",
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
  mapsUrl: "https://maps.google.com/?q=Noorunisa+Enclave",
  qrImage: "/nikah-venue-qr.png",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
