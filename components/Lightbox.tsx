"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

type LightboxProps = {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Vista de imagen"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center text-cream"
        aria-label="Cerrar"
        onClick={onClose}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      {images.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center text-cream sm:left-6"
            aria-label="Imagen anterior"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
          <button
            type="button"
            className="absolute right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center text-cream sm:right-6"
            aria-label="Imagen siguiente"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </>
      ) : null}
      <div
        className="relative h-[80vh] w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}
