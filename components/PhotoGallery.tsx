"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

type PhotoGalleryProps = {
  images: { src: string; alt: string }[];
  layout?: "grid" | "yoga" | "mercado";
};

export function PhotoGallery({ images, layout = "grid" }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const classFor = (index: number) => {
    if (layout === "yoga" || layout === "mercado") {
      if (index < 2) return "md:col-span-3 aspect-[16/10]";
      return "aspect-[4/3]";
    }
    return "aspect-[4/3]";
  };

  return (
    <>
      <ul
        className={
          layout === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-4 sm:grid-cols-2 md:grid-cols-6"
        }
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            className={layout === "grid" ? "" : index < 2 ? "md:col-span-3" : "md:col-span-2"}
          >
            <button
              type="button"
              className={`group relative block w-full cursor-pointer overflow-hidden bg-ink/5 ${classFor(index)}`}
              onClick={() => setOpenIndex(index)}
              aria-label={`Abrir ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </button>
          </li>
        ))}
      </ul>
      {openIndex !== null ? (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((current) =>
              current === null ? 0 : (current + images.length - 1) % images.length,
            )
          }
          onNext={() =>
            setOpenIndex((current) =>
              current === null ? 0 : (current + 1) % images.length,
            )
          }
        />
      ) : null}
    </>
  );
}
