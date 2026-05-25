#!/usr/bin/env python3
"""Generate scannable venue QR codes that open Google Maps location links."""

from __future__ import annotations

from pathlib import Path

import qrcode

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

VENUES = [
    {
        "filename": "haldi-venue-qr.png",
        "url": "https://www.google.com/maps/search/?api=1&query=Noorunisa+Enclave+Madanapalle+Meerani+residence",
    },
    {
        "filename": "nikah-ceremony-qr.png",
        "url": "https://www.google.com/maps/search/?api=1&query=Big+Mosque+Melvisharam",
    },
    {
        "filename": "nikah-dinner-qr.png",
        "url": "https://www.google.com/maps/search/?api=1&query=VJR+Mahal+Chennai+to+Bangalore+Bypass+road+Arcot",
    },
    {
        "filename": "walima-venue-qr.png",
        "url": "https://www.google.com/maps/search/?api=1&query=R+Convention+Centre+Madanapalle",
    },
]


def make_qr(url: str) -> qrcode.image.pil.PilImage:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=20,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    return qr.make_image(fill_color="#111111", back_color="#ffffff").convert("RGB")


def main() -> None:
    for venue in VENUES:
        path = PUBLIC / venue["filename"]
        image = make_qr(venue["url"])
        image.save(path, format="PNG", optimize=True)
        print(f"Wrote {path} ({path.stat().st_size // 1024} KB) -> {venue['url']}")

    # Backward-compatible aliases
    ceremony = PUBLIC / "nikah-ceremony-qr.png"
    alias = PUBLIC / "nikah-venue-qr.png"
    alias.write_bytes(ceremony.read_bytes())
    print(f"Wrote {alias} (alias)")


if __name__ == "__main__":
    main()
