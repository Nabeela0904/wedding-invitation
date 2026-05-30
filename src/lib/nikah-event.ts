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
  blessedPhrase: "In Sha Allah On",
  dateLabel: "Thursday the 9th July, 2026",
  timeVenueLabel: "5:00 PM, After Namaz-e-Asar At Big Mosque, Melvisharam",
  dinnerLabel: "Dinner: 7.00pm onwards",
  dinnerVenue: "Venue: VJR Mahal Chennai to Bengaluru Bypass road, Arcot",
  venueTitle: "VENUE & LOCATION",
  venues: [
    {
      label: "Nikah Ceremony",
      subtext: "Big Mosque, Melvisharam",
      mapsUrl: "https://maps.app.goo.gl/9e67Dq7Y2G1Z2X2S8",
      qrImage: "/nikah-ceremony-qr.png",
      qrAlt: "QR code for Nikah ceremony at Big Mosque, Melvisharam",
    },
    {
      label: "Dinner Reception",
      subtext: "VJR Mahal Chennai to Bengaluru Bypass road, Arcot",
      mapsUrl: "https://maps.app.goo.gl/uXvE7x98G8mFpZ7E9",
      qrImage: "/nikah-dinner-qr.png",
      qrAlt: "QR code for Nikah dinner at VJR Mahal, Bengaluru Bypass road, Arcot",
    },
  ] as const,
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
