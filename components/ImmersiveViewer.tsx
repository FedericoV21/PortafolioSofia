"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Aperture } from "@/components/Aperture";

type ImmersiveViewerProps = {
  images: { src: string; alt: string; width: number; height: number }[];
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
  const [readySrc, setReadySrc] = useState<ReadonlySet<string>>(() => new Set());
  const [veil, setVeil] = useState<"wait" | "open" | "gone">("gone");
  const [introDone, setIntroDone] = useState(false);
  const [centeredReady, setCenteredReady] = useState(false);
  const [showLens, setShowLens] = useState(false);

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
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const started = performance.now();
    let openTimer = 0;
    let phase: "idle" | "wait" | "open" | "done" = "idle";

    const sync = () => {
      const box = scroller.getBoundingClientRect();
      const found = new Set<string>();
      let visible = 0;
      let pending = false;
      let centerLoaded = false;

      for (const figure of scroller.querySelectorAll<HTMLElement>("[data-strip-index]")) {
        const imageIndex = Number(figure.dataset.stripIndex);
        const src = images[imageIndex]?.src;
        const img = figure.querySelector("img");
        if (!src || !img) continue;
        const loaded = img.complete && img.naturalWidth > 0;
        if (loaded) found.add(src);
        const rect = figure.getBoundingClientRect();
        const onScreen =
          rect.width > 12 && rect.right > box.left + 12 && rect.left < box.right - 12;
        if (onScreen) {
          visible += 1;
          if (!loaded) pending = true;
        }
        if (imageIndex === currentRef.current) centerLoaded = loaded;
      }

      setReadySrc((prev) => {
        if (prev.size === found.size && [...found].every((src) => prev.has(src))) return prev;
        return found;
      });
      setCenteredReady(centerLoaded);

      const elapsed = performance.now() - started;
      if (phase === "idle" && visible > 0 && !pending) {
        phase = "done";
        setIntroDone(true);
      } else if (phase === "idle" && visible > 0 && pending && elapsed > 220) {
        phase = "wait";
        setVeil("wait");
      } else if (phase === "wait" && (!pending || elapsed > 8000)) {
        phase = "open";
        setVeil("open");
        openTimer = window.setTimeout(() => {
          phase = "done";
          setVeil("gone");
          setIntroDone(true);
        }, 980);
      }
    };

    sync();
    const pulse = window.setInterval(sync, 120);
    scroller.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.clearInterval(pulse);
      window.clearTimeout(openTimer);
      scroller.removeEventListener("scroll", sync);
    };
  }, [images]);

  useEffect(() => {
    if (!introDone || centeredReady) {
      setShowLens(false);
      return;
    }
    const timer = window.setTimeout(() => setShowLens(true), 220);
    return () => window.clearTimeout(timer);
  }, [centeredReady, introDone]);

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

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollerRef}
          className="flex h-full overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                width={image.width}
                height={image.height}
                className={`h-full w-auto max-w-none select-none transition-opacity duration-700 ease-out ${
                  veil !== "gone" || readySrc.has(image.src) ? "opacity-100" : "opacity-0"
                }`}
                style={{ height: "100%", width: "auto" }}
                sizes="100vw"
                quality={90}
                priority={Math.abs(imageIndex - index) <= 1}
                draggable={false}
                onLoad={() => {
                  setReadySrc((prev) => {
                    if (prev.has(image.src)) return prev;
                    const next = new Set(prev);
                    next.add(image.src);
                    return next;
                  });
                  if (imageIndex === currentRef.current) setCenteredReady(true);
                }}
              />
            </figure>
          ))}
        </div>
        {veil !== "gone" ? (
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden={veil === "open"}>
            <div
              className="iris-veil"
              data-tone="ink"
              data-state={veil === "open" ? "open" : "wait"}
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                veil === "open" ? "opacity-0" : "opacity-100"
              }`}
              role="status"
              aria-live="polite"
              aria-label="Enfocando la serie"
            >
              <Aperture className="h-16 w-16 text-cream" />
              <p className="font-display mt-5 pl-[0.34em] text-[12px] tracking-[0.34em] text-cream uppercase">
                Enfocando
              </p>
            </div>
          </div>
        ) : null}
        {showLens ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <Aperture className="h-14 w-14 text-cream" />
            <span className="sr-only">Enfocando la fotografía</span>
          </div>
        ) : null}
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
