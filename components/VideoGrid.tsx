"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoDialog } from "@/components/VideoDialog";
import type { Film } from "@/lib/site";

export function VideoGrid({ reels }: { reels: Film[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet-portrait:gap-5 tablet-landscape:grid-cols-3 tablet-landscape:gap-6 xl:grid-cols-3 xl:gap-8">
        {reels.map((reel, index) => (
          <li key={reel.src} className="flex h-full min-h-0 flex-col items-center text-center">
            <button
              type="button"
              className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[1.35rem] bg-ink tablet-portrait:rounded-none tablet-landscape:rounded-none"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ver ${reel.title}`}
            >
              <Image
                src={reel.poster}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 767px) 46vw, 30vw"
                quality={85}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors duration-200 group-hover:bg-ink/25">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink">
                  <PlayIcon />
                </span>
              </span>
            </button>
            <h2 className="mt-3 shrink-0 px-1 text-[10px] tracking-[0.12em] text-ink uppercase tablet:mt-2 tablet:text-xs tablet:tracking-[0.08em] xl:text-sm xl:tracking-[0.14em]">
              {reel.title}
            </h2>
            {reel.description ? (
              <p className="mt-1 line-clamp-2 max-w-[16rem] shrink-0 px-2 text-[11px] leading-snug text-ink-soft xl:mt-1.5 xl:text-[13px]">
                {reel.description}
              </p>
            ) : null}
            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-6 text-[11px] tracking-[0.14em] uppercase ${
                  reel.tone === "coral" ? "bg-coral-soft text-ink" : "bg-sage-soft text-ink"
                }`}
              >
                Ver video
              </button>
            </div>
          </li>
        ))}
      </ul>
      {openIndex !== null ? (
        <VideoDialog
          films={reels}
          index={openIndex}
          category="Trabajo"
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((current) =>
              current === null ? 0 : (current + reels.length - 1) % reels.length,
            )
          }
          onNext={() =>
            setOpenIndex((current) => (current === null ? 0 : (current + 1) % reels.length))
          }
          onSelect={setOpenIndex}
        />
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}
