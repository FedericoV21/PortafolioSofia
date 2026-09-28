"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ImmersiveViewerProps = {
  images: { src: string; alt: string }[];
  index: number;
  title: string;
  category?: string;
  onClose: () => void;
};

export function ImmersiveViewer({
  images,
  index,
  title,
  category,
  onClose,
}: ImmersiveViewerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(index);

  const scrollTo = useCallback((nextIndex: number) => {
    const node = scrollerRef.current?.querySelector<HTMLElement>(
      `[data-strip-index="${nextIndex}"]`,
    );
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const currentRef = useRef(index);
  currentRef.current = current;

  const goTo = useCallback(
    (nextIndex: number) => {
      const bounded = (nextIndex + images.length) % images.length;
      scrollTo(bounded);
    },
    [images.length, scrollTo],
  );

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => scrollTo(index));
    return () => {
      document.body.style.overflow = original;
      cancelAnimationFrame(frame);
    };
  }, [index, scrollTo]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const mid = scroller.scrollLeft + scroller.clientWidth / 2;
      const slides = [
        ...scroller.querySelectorAll<HTMLElement>("[data-strip-index]"),
      ];
      let best = 0;
      let bestDist = Infinity;
      for (const slide of slides) {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = Number(slide.dataset.stripIndex);
        }
      }
      setCurrent(best);
    };

    scroller.addEventListener("scroll", update, { passive: true });
    update();
    return () => scroller.removeEventListener("scroll", update);
  }, [images]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goTo(currentRef.current - 1);
      if (event.key === "ArrowRight") goTo(currentRef.current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, onClose]);

  const total = String(images.length).padStart(2, "0");
  const page = String(current + 1).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-[#050505] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Modo inmersivo: ${title}`}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:h-[88px] sm:px-5">
        <div>
          <p className="font-display text-[13px] tracking-[0.04em] uppercase">
            {title}
          </p>
          {category ? (
            <p className="mt-0.5 text-[7px] font-medium tracking-[0.16em] text-white/70 uppercase">
              {category}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar modo inmersivo"
        >
          <span className="font-display text-[10px] tracking-[0.12em] uppercase">
            Cerrar
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, imageIndex) => (
          <figure
            key={image.src}
            data-strip-index={imageIndex}
            className="relative flex h-full w-auto max-w-none shrink-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={2000}
              className="h-full w-auto max-w-none select-none"
              style={{ height: "100%", width: "auto" }}
              sizes="100vh"
              priority={imageIndex === index}
              draggable={false}
            />
          </figure>
        ))}
      </div>

      <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:h-[88px] sm:px-5">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 cursor-pointer"
          onClick={() => goTo(current - 1)}
          aria-label="Foto anterior"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12l7 7" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="font-display text-[9px] tracking-[0.12em] uppercase">
            Anterior
          </span>
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[8px] font-medium tracking-[0.2em]">
            {page} / {total}
          </p>
          <div className="flex items-center gap-1.5">
            {images.map((image, imageIndex) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Ir a foto ${imageIndex + 1}`}
                onClick={() => goTo(imageIndex)}
                className={`rounded-full transition-all ${
                  imageIndex === current
                    ? "h-2 w-2 bg-white"
                    : "h-1.5 w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 cursor-pointer"
          onClick={() => goTo(current + 1)}
          aria-label="Foto siguiente"
        >
          <span className="font-display text-[9px] tracking-[0.12em] uppercase">
            Siguiente
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
