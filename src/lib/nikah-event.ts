import { assetPath } from "./site-base-path";

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
  dinnerLabel: "Dinner: 7.00pm onwards",
  dinnerVenue: "Venue: VJR Mahal chennai to Bnglr Bypass road Arcot.",
  venueTitle: "VENUE & LOCATION",
  venues: [
    {
      label: "Nikah Ceremony",
      subtext: "Big Mosque, Melvisharam",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Big+Mosque+Melvisharam",
      qrImage: assetPath("/nikah-ceremony-qr.png"),
      qrAlt: "QR code for Nikah ceremony at Big Mosque, Melvisharam",
    },
    {
      label: "Dinner Reception",
      subtext: "VJR Mahal, Chennai to Bangalore Bypass road, Arcot",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=VJR+Mahal+Chennai+to+Bangalore+Bypass+road+Arcot",
      qrImage: assetPath("/nikah-dinner-qr.png"),
      qrAlt: "QR code for Nikah dinner at VJR Mahal, Arcot",
    },
  ] as const,
  closingLine:
    "YOUR PRESENCE AND BLESSINGS WILL MAKE THIS OCCASION EVEN MORE SPECIAL",
  countdownIso: "2026-07-09T17:00:00+05:30",
} as const;

export type NikahEvent = typeof NIKAH_EVENT;
