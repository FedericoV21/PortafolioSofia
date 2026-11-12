"use client";

import { useCallback, useEffect, useState } from "react";
import type { Film } from "@/lib/site";

type VideoDialogProps = {
  films: Film[];
  index: number;
  category: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export function VideoDialog({
  films,
  index,
  category,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: VideoDialogProps) {
  const current = films[index];
  const [autoPlay, setAutoPlay] = useState(true);

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAutoPlay(!reduced);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  if (!current) return null;

  const total = String(films.length).padStart(2, "0");
  const page = String(index + 1).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-[#050505] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between gap-4 px-4 sm:h-[88px] sm:px-5">
        <div className="min-w-0">
          <p className="font-display truncate text-[13px] tracking-[0.04em] uppercase">
            {current.title}
          </p>
          <p className="mt-0.5 text-[7px] font-medium tracking-[0.16em] text-white/70 uppercase">
            {category}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <span className="font-display text-[10px] tracking-[0.12em] uppercase">Cerrar</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center [container-type:size]">
        <video
          key={current.src}
          src={current.src}
          poster={current.poster}
          controls
          playsInline
          autoPlay={autoPlay}
          preload="auto"
          className="bg-black"
          style={{
            aspectRatio: `${current.width} / ${current.height}`,
            width: `min(100cqw, calc(100cqh * ${current.width} / ${current.height}))`,
            height: `min(100cqh, calc(100cqw * ${current.height} / ${current.width}))`,
          }}
        />
      </div>

      {films.length > 1 ? (
        <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:h-[88px] sm:px-5">
          <button
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2"
            onClick={onPrev}
            aria-label="Video anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="font-display text-[9px] tracking-[0.12em] uppercase">Anterior</span>
          </button>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[8px] font-medium tracking-[0.2em]">
              {page} / {total}
            </p>
            <div className="flex items-center gap-1.5">
              {films.map((film, filmIndex) => (
                <button
                  key={film.src}
                  type="button"
                  aria-label={`Ir a ${film.title}`}
                  aria-current={filmIndex === index ? "true" : undefined}
                  onClick={() => onSelect(filmIndex)}
                  className={`cursor-pointer rounded-full transition-all ${
                    filmIndex === index ? "h-2 w-2 bg-white" : "h-1.5 w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2"
            onClick={onNext}
            aria-label="Video siguiente"
          >
            <span className="font-display text-[9px] tracking-[0.12em] uppercase">Siguiente</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
