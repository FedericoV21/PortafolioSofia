"use client";

import { useEffect, useState } from "react";
import { Aperture } from "@/components/Aperture";

type Phase = "wait" | "open" | "gone";

const MIN_MS = 360;
const MAX_MS = 7000;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteLoader() {
  const [phase, setPhase] = useState<Phase>("wait");
  const [progress, setProgress] = useState({ loaded: 0, total: 0 });

  useEffect(() => {
    const tracked = new Map<HTMLImageElement, boolean>();
    const stops: Array<() => void> = [];
    let fontsReady = false;
    let finished = false;
    const started = performance.now();
    let openTimer = 0;

    const paint = () => {
      let loaded = 0;
      for (const ready of tracked.values()) if (ready) loaded += 1;
      setProgress({ loaded, total: tracked.size });
    };

    const watch = (img: HTMLImageElement) => {
      if (tracked.has(img)) return;
      const box = img.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) return;
      if (box.bottom < 0 || box.top > window.innerHeight) return;

      const mark = () => {
        tracked.set(img, true);
        paint();
      };
      tracked.set(img, img.complete && img.naturalWidth > 0);
      img.addEventListener("load", mark);
      img.addEventListener("error", mark);
      stops.push(() => {
        img.removeEventListener("load", mark);
        img.removeEventListener("error", mark);
      });
    };

    const scan = () => {
      document.querySelectorAll("main img").forEach((node) => {
        watch(node as HTMLImageElement);
      });
      paint();
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(pulse);
      observer.disconnect();
      stops.forEach((stop) => stop());
      document.body.removeAttribute("aria-busy");
      if (reducedMotion()) {
        setPhase("gone");
        return;
      }
      setPhase("open");
      openTimer = window.setTimeout(() => setPhase("gone"), 980);
    };

    document.fonts?.ready.then(() => {
      fontsReady = true;
    });

    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    document.body.setAttribute("aria-busy", "true");
    scan();

    const pulse = window.setInterval(() => {
      scan();
      const elapsed = performance.now() - started;
      const total = tracked.size;
      let loaded = 0;
      for (const ready of tracked.values()) if (ready) loaded += 1;
      const imagesReady = total > 0 ? loaded === total : elapsed > 1200;
      if ((fontsReady && imagesReady && elapsed > MIN_MS) || elapsed > MAX_MS) finish();
    }, 120);

    return () => {
      finished = true;
      window.clearInterval(pulse);
      window.clearTimeout(openTimer);
      observer.disconnect();
      stops.forEach((stop) => stop());
      document.body.removeAttribute("aria-busy");
    };
  }, []);

  if (phase === "gone") return null;

  const { loaded, total } = progress;
  const fraction = total > 0 ? loaded / total : 0;

  return (
    <div
      className={`fixed inset-0 z-[100] ${phase === "wait" ? "" : "pointer-events-none"}`}
      role="status"
      aria-live="polite"
      aria-label="Enfocando el portafolio"
    >
      <div className="iris-veil" data-tone="cream" data-state={phase === "open" ? "open" : "wait"} />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          phase === "open" ? "opacity-0" : "opacity-100"
        }`}
      >
        <Aperture className="h-[5.5rem] w-[5.5rem] text-ink" />
        <p className="font-display mt-7 pl-[0.34em] text-[13px] tracking-[0.34em] text-ink uppercase">
          Enfocando
        </p>
        <div className="mt-4 h-px w-16 overflow-hidden bg-ink/15">
          {total > 0 ? (
            <span
              className="block h-full origin-left bg-coral transition-transform duration-500"
              style={{ transform: `scaleX(${Math.max(fraction, 0.08)})` }}
            />
          ) : (
            <span className="loader-meter-bar block h-full w-2/5 bg-coral" />
          )}
        </div>
        {total > 1 ? (
          <p className="mt-3 text-[10px] tracking-[0.22em] text-ink/50">
            {String(loaded).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
