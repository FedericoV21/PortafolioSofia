"""Detect and crop photo regions from presentation slides using gap projection."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

SRC = Path(r"C:\Users\Fede\Desktop\GinkGo Devs\Proyectos\PortafolioSofia\tmp-slides")
OUT = Path(r"C:\Users\Fede\Desktop\GinkGo Devs\Proyectos\PortafolioSofia\public\images")
DEBUG = Path(r"C:\Users\Fede\Desktop\GinkGo Devs\Proyectos\PortafolioSofia\tmp-slides\debug")


def is_cream(arr: np.ndarray) -> np.ndarray:
    r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
    bright = (r > 220) & (g > 210) & (b > 190)
    close = (np.abs(r - g) < 28) & (np.abs(g - b) < 38)
    return bright & close


def spans(mask_1d: np.ndarray, min_len: int) -> list[tuple[int, int]]:
    out: list[tuple[int, int]] = []
    start = None
    for i, v in enumerate(mask_1d):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start >= min_len:
                out.append((start, i))
            start = None
    if start is not None and len(mask_1d) - start >= min_len:
        out.append((start, len(mask_1d)))
    return out


def detect_boxes(
    path: Path,
    top: int = 72,
    bottom: int = 30,
    min_w: int = 90,
    min_h: int = 80,
    row_ratio: float = 0.08,
    col_ratio: float = 0.08,
) -> list[tuple[int, int, int, int]]:
    img = Image.open(path).convert("RGB")
    arr = np.array(img)
    photo = ~is_cream(arr)
    photo[:top, :] = False
    photo[-bottom:, :] = False

    h, w = photo.shape
    row_density = photo.mean(axis=1)
    row_active = row_density > row_ratio
    rows = spans(row_active, min_h)

    boxes: list[tuple[int, int, int, int]] = []
    for y0, y1 in rows:
        band = photo[y0:y1]
        col_density = band.mean(axis=0)
        col_active = col_density > col_ratio
        cols = spans(col_active, min_w)
        for x0, x1 in cols:
            cell = photo[y0:y1, x0:x1]
            ys, xs = np.where(cell)
            if len(ys) < 400:
                continue
            bx0 = x0 + int(xs.min())
            bx1 = x0 + int(xs.max()) + 1
            by0 = y0 + int(ys.min())
            by1 = y0 + int(ys.max()) + 1
            if bx1 - bx0 >= min_w and by1 - by0 >= min_h:
                boxes.append((bx0, by0, bx1, by1))

    boxes.sort(key=lambda b: (round(b[1] / 50), b[0]))
    return boxes


def crop(img: Image.Image, box: tuple[int, int, int, int], dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    piece = img.crop(box)
    piece.save(dest, quality=94)
    print(f"  {dest.name} {piece.size}")


def debug_boxes(path: Path, boxes: list[tuple[int, int, int, int]]) -> None:
    DEBUG.mkdir(parents=True, exist_ok=True)
    img = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(img)
    for i, (x0, y0, x1, y1) in enumerate(boxes, 1):
        draw.rectangle((x0, y0, x1 - 1, y1 - 1), outline=(220, 40, 40), width=2)
        draw.text((x0 + 6, y0 + 6), str(i), fill=(220, 40, 40))
    img.save(DEBUG / f"{path.stem}-boxes.jpg", quality=85)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    jobs: list[tuple[str, list[str]]] = [
        ("home.jpg", ["hero.jpg"]),
        ("about.jpg", ["sofia.jpg"]),
        (
            "foto-index.jpg",
            [
                "fotografia/mercado-cover.jpg",
                "fotografia/rana-cover.jpg",
                "fotografia/yoga-cover.jpg",
                "fotografia/teatro-cover.jpg",
            ],
        ),
        (
            "mercado.jpg",
            [
                "fotografia/mercado-1.jpg",
                "fotografia/mercado-2.jpg",
                "fotografia/mercado-3.jpg",
                "fotografia/mercado-4.jpg",
            ],
        ),
        ("rana.jpg", [f"fotografia/rana-{i}.jpg" for i in range(1, 7)]),
        ("yoga.jpg", [f"fotografia/yoga-{i}.jpg" for i in range(1, 6)]),
        ("teatro.jpg", [f"fotografia/teatro-{i}.jpg" for i in range(1, 6)]),
        ("videos.jpg", [f"video/reel-{i}.jpg" for i in range(1, 5)]),
        ("creativos.jpg", ["video/creativo-1.jpg", "video/creativo-2.jpg"]),
    ]

    for filename, names in jobs:
        path = SRC / filename
        boxes = detect_boxes(path)
        print(f"{filename}: {len(boxes)} boxes (want {len(names)}) {boxes}")
        debug_boxes(path, boxes)
        img = Image.open(path)
        for box, name in zip(boxes, names):
            crop(img, box, OUT / name)

    print("done")


if __name__ == "__main__":
    main()
