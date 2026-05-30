#!/usr/bin/env python3
"""Generate Nikah ceremony and dinner venue QR codes for the invitation site."""

from __future__ import annotations

import importlib.util
from pathlib import Path

import qrcode
from PIL import Image, ImageColor, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

CEREMONY_URL = "https://maps.app.goo.gl/uX3LhR2vL9pW8z7A9"
DINNER_URL = "https://maps.app.goo.gl/uXvE7x98G8mFpZ7E9"


def load_venue_generator():
    spec = importlib.util.spec_from_file_location(
        "venue_qrs",
        ROOT / "scripts" / "generate-venue-qrs.py",
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


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


def add_center_logo(qr_img: Image.Image, logo_scale: float = 0.22) -> Image.Image:
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


def make_qr(
    url: str,
    fill: str,
    finder: str | None = None,
    box_size: int = 12,
    border: int = 2,
) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=box_size,
        border=border,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=fill, back_color="white").convert("RGB")

    if finder:
        px = img.load()
        w, h = img.size
        module = box_size
        border_modules = border
        finder_rgb = ImageColor.getrgb(finder)

        def paint_finder(col: int, row: int) -> None:
            for y in range(row * module, (row + 7) * module):
                for x in range(col * module, (col + 7) * module):
                    if 0 <= x < w and 0 <= y < h:
                        px[x, y] = finder_rgb

        paint_finder(border_modules, border_modules)
        paint_finder((w // module) - border_modules - 7, border_modules)
        paint_finder(border_modules, (h // module) - border_modules - 7)

    return add_center_logo(img)


def save(path: Path, image: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG")
    print(f"Wrote {path} ({path.stat().st_size // 1024} KB)")


def main() -> None:
    venue = load_venue_generator()
    ceremony = make_qr(CEREMONY_URL, fill="#111111")
    dinner = venue.make_qr(
        DINNER_URL,
        styled=True,
        fill="#4A1F3D",
        finder="#0F766E",
        box_size=16,
        border=4,
    )

    save(PUBLIC / "nikah-ceremony-qr.png", ceremony)
    save(PUBLIC / "nikah-dinner-qr.png", dinner)


if __name__ == "__main__":
    main()
