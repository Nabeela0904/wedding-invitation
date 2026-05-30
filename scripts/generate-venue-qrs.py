#!/usr/bin/env python3
"""Generate scannable venue QR codes that open Google Maps location links."""

from __future__ import annotations

from pathlib import Path

import qrcode
from PIL import Image, ImageColor, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

HALDI_MAPS_URL = "https://maps.app.goo.gl/AocXatWp8qbQZGMF8"

VENUES = [
    {
        "filename": "haldi-venue-qr.png",
        "url": HALDI_MAPS_URL,
        "styled": True,
        "fill": "#1E293B",
        "finder": "#166534",
        "box_size": 16,
        "border": 4,
    },
    {
        "filename": "nikah-ceremony-qr.png",
        "url": "https://maps.app.goo.gl/9e67Dq7Y2G1Z2X2S8",
    },
    {
        "filename": "nikah-dinner-qr.png",
        "url": "https://maps.app.goo.gl/uXvE7x98G8mFpZ7E9",
    },
    {
        "filename": "walima-venue-qr.png",
        "url": "https://www.google.com/maps/search/?api=1&query=R+Convention+Centre+Madanapalle",
    },
]


def draw_maps_pin(size: int) -> Image.Image:
    pin = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(pin)
    cx = size // 2
    top = size * 0.12
    bottom = size * 0.9
    head_r = size * 0.22

    draw.ellipse(
        (cx - head_r, top, cx + head_r, top + head_r * 2),
        fill="#EA4335",
    )
    draw.polygon(
        [
            (cx, bottom),
            (cx - head_r * 0.95, top + head_r * 1.55),
            (cx + head_r * 0.95, top + head_r * 1.55),
        ],
        fill="#C5221F",
    )
    draw.ellipse(
        (cx - head_r * 0.34, top + head_r * 0.66, cx + head_r * 0.34, top + head_r * 1.34),
        fill="#FFFFFF",
    )
    return pin


def add_center_logo(qr_img: Image.Image, logo_scale: float = 0.2) -> Image.Image:
    qr = qr_img.convert("RGBA")
    size = qr.size[0]
    badge = int(size * logo_scale)
    pad = int(badge * 0.18)
    canvas = Image.new("RGBA", (badge, badge), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((0, 0, badge - 1, badge - 1), fill=(255, 255, 255, 255))
    pin = draw_maps_pin(int(badge * 0.62))
    canvas.alpha_composite(pin, ((badge - pin.size[0]) // 2, (badge - pin.size[1]) // 2))
    shadow = Image.new("RGBA", (badge + pad * 2, badge + pad * 2), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.ellipse(
        (pad + 2, pad + 4, pad + badge + 2, pad + badge + 4),
        fill=(0, 0, 0, 55),
    )
    shadow.alpha_composite(canvas, (pad, pad))
    pos = ((size - shadow.size[0]) // 2, (size - shadow.size[1]) // 2)
    qr.alpha_composite(shadow, pos)
    return qr.convert("RGB")


def module_color(row: int, col: int, modules: int, finder: str, fill: str) -> str:
    """Keep finder structure intact while applying corner and body colors."""

    def in_finder(r: int, c: int) -> bool:
        if r < 7 and c < 7:
            return True
        if r < 7 and c >= modules - 7:
            return True
        if r >= modules - 7 and c < 7:
            return True
        return False

    return finder if in_finder(row, col) else fill


def matrix_to_image(
    matrix: list[list[bool]],
    *,
    fill: str,
    finder: str,
    box_size: int,
    border: int,
) -> Image.Image:
    modules = len(matrix)
    size = (modules + border * 2) * box_size
    img = Image.new("RGB", (size, size), "#FFFFFF")
    draw = ImageDraw.Draw(img)
    fill_rgb = ImageColor.getrgb(fill)
    finder_rgb = ImageColor.getrgb(finder)

    for row, line in enumerate(matrix):
        for col, is_dark in enumerate(line):
            if not is_dark:
                continue
            color = finder_rgb if module_color(row, col, modules, finder, fill) == finder else fill_rgb
            x0 = (col + border) * box_size
            y0 = (row + border) * box_size
            draw.rectangle(
                (x0, y0, x0 + box_size - 1, y0 + box_size - 1),
                fill=color,
            )

    return img


def make_styled_qr(
    url: str,
    *,
    fill: str,
    finder: str,
    box_size: int = 16,
    border: int = 4,
) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=1,
        border=0,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = matrix_to_image(
        qr.get_matrix(),
        fill=fill,
        finder=finder,
        box_size=box_size,
        border=border,
    )
    return add_center_logo(img, logo_scale=0.18)


def make_qr(
    url: str,
    *,
    styled: bool = False,
    fill: str = "#111111",
    finder: str | None = None,
    box_size: int = 20,
    border: int = 4,
) -> Image.Image:
    if styled and finder:
        return make_styled_qr(
            url,
            fill=fill,
            finder=finder,
            box_size=box_size,
            border=border,
        )

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=box_size,
        border=border,
    )
    qr.add_data(url)
    qr.make(fit=True)
    return qr.make_image(fill_color=fill, back_color="#FFFFFF").convert("RGB")


def main() -> None:
    for venue in VENUES:
        path = PUBLIC / venue["filename"]
        image = make_qr(
            venue["url"],
            styled=venue.get("styled", False),
            fill=venue.get("fill", "#111111"),
            finder=venue.get("finder"),
            box_size=venue.get("box_size", 20),
            border=venue.get("border", 4),
        )
        image.save(path, format="PNG", optimize=True)
        print(f"Wrote {path} ({path.stat().st_size // 1024} KB) -> {venue['url']}")


if __name__ == "__main__":
    main()
