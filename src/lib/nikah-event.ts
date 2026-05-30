export const NIKAH_EVENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  inviteLine:
    "WITH THE BLESSINGS OF ALLAH, WE GRACIOUSLY INVITE YOU TO THE NIKAH CEREMONY OF",
  groom: {
    name: "SHOAIB FARAZ AHAMED",
  },
  bride: {
    name: "ZEENATH BANU",
  },
  ceremonyDetails: [
    "In Sha Allah,",
    "On Thursday the 9th July, 2026",
    "5:00 PM, After Namaz-e-Asar",
    "At Big Mosque, Melvisharam",
  ] as const,
  dinnerLabel: "Dinner: 7.00pm onwards",
  dinnerVenue: "Venue: VJR Mahal Chennai to Bengaluru Bypass road, Arcot",
  venueTitle: "VENUE & LOCATION",
  venues: [
    {
      label: "Nikah Ceremony",
      subtext: "Big Mosque, Melvisharam",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Big+Mosque+Melvisharam",
      qrImage: "/nikah-ceremony-qr.png",
      qrAlt: "QR code for Nikah ceremony at Big Mosque, Melvisharam",
    },
    {
      label: "Dinner Reception",
      subtext: "VJR Mahal Chennai to Bengaluru Bypass road, Arcot",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=VJR+Mahal+Chennai+to+Bengaluru+Bypass+road+Arcot",
      qrImage: "/nikah-dinner-qr.png",
      qrAlt: "QR code for Nikah dinner at VJR Mahal, Bengaluru Bypass road, Arcot",
    },
  ] as const,
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
