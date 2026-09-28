"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { contact } from "@/lib/site";

type Reel = {
  title: string;
  description: string;
  image: string;
  tone: "coral" | "sage";
};

export function VideoGrid({ reels }: { reels: Reel[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = reels.map((reel) => ({ src: reel.image, alt: reel.title }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 tablet-portrait:gap-5 tablet-landscape:h-full tablet-landscape:min-h-0 tablet-landscape:grid-cols-4 tablet-landscape:gap-6 xl:h-full xl:min-h-0 xl:grid-cols-4 xl:gap-6">
        {reels.map((reel, index) => (
          <li
            key={reel.title}
            className="flex h-full min-h-0 flex-col items-center text-center"
          >
            <button
              type="button"
              className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[1.35rem] bg-ink tablet-portrait:aspect-[336/250] tablet-portrait:rounded-none tablet-portrait:bg-transparent tablet-landscape:aspect-[214/330] tablet-landscape:max-w-none tablet-landscape:rounded-none tablet-landscape:bg-transparent xl:aspect-auto xl:max-w-none xl:min-h-0 xl:flex-1 xl:rounded-none xl:bg-transparent"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ver ${reel.title}`}
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-cover tablet:object-contain xl:object-contain"
                sizes="(max-width: 767px) 50vw, (max-width: 1279px) and (orientation: portrait) 45vw, 22vw"
                quality={95}
              />
              <span className="absolute inset-0 flex items-center justify-center md:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink">
                  <PlayIcon />
                </span>
              </span>
            </button>
            <h2 className="mt-3 shrink-0 px-1 text-[10px] tracking-[0.12em] text-ink uppercase tablet:mt-2 tablet:text-xs tablet:tracking-[0.08em] xl:text-sm xl:tracking-[0.14em]">
              {reel.title}
            </h2>
            <p className="mt-1 line-clamp-2 max-w-[16rem] shrink-0 px-1 text-[11px] leading-snug text-ink-soft tablet:line-clamp-2 tablet:text-[11px] xl:mt-1.5 xl:line-clamp-none xl:text-[13px]">
              {reel.description}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className={`mt-2 inline-flex min-h-8 w-full shrink-0 cursor-pointer items-center justify-center bg-sage px-3 text-[10px] tracking-[0.16em] text-cream uppercase tablet:mt-2 tablet:min-h-[34px] tablet:text-[13px] tablet:tracking-[0.08em] xl:mt-3 xl:w-auto xl:rounded-full xl:px-5 xl:text-[11px] xl:text-ink ${
                reel.tone === "coral" ? "xl:bg-coral-soft" : "xl:bg-sage-soft"
              }`}
            >
              Ver reel
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
              current === null ? 0 : (current + reels.length - 1) % reels.length,
            )
          }
          onNext={() =>
            setOpenIndex((current) =>
              current === null ? 0 : (current + 1) % reels.length,
            )
          }
        />
      ) : null}
      <p className="sr-only">
        Los reels completos se pueden ver en Instagram @{contact.instagram}.
      </p>
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}
