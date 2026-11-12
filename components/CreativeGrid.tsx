"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoDialog } from "@/components/VideoDialog";
import type { Film } from "@/lib/site";

export function CreativeGrid({ pieces }: { pieces: Film[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-8 tablet-portrait:mt-8 tablet-portrait:gap-6 tablet-landscape:mt-8 tablet-landscape:grid-cols-2 tablet-landscape:gap-8 xl:mt-12 xl:grid-cols-2 xl:gap-10">
        {pieces.map((piece, index) => (
          <li key={piece.src}>
            <button
              type="button"
              className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-ink tablet-portrait:aspect-[688/270] tablet-landscape:aspect-[448/300] xl:aspect-[16/9]"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ver ${piece.title}`}
            >
              <Image
                src={piece.poster}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1023px) 100vw, 50vw"
                quality={85}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/15 transition-colors duration-200 group-hover:bg-ink/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M3 1.5v9l8-4.5-8-4.5Z" />
                  </svg>
                </span>
              </span>
            </button>
            <p className="flex min-h-10 items-center justify-center bg-coral px-3 py-2 text-center text-[10px] tracking-[0.14em] text-ink uppercase tablet:min-h-[38px] tablet:text-[12px] xl:mt-5 xl:min-h-0 xl:bg-transparent xl:text-sm xl:tracking-[0.08em] xl:normal-case">
              “{piece.title}”
            </p>
          </li>
        ))}
      </ul>
      {openIndex !== null ? (
        <VideoDialog
          films={pieces}
          index={openIndex}
          category="Creativo"
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((current) =>
              current === null ? 0 : (current + pieces.length - 1) % pieces.length,
            )
          }
          onNext={() =>
            setOpenIndex((current) => (current === null ? 0 : (current + 1) % pieces.length))
          }
          onSelect={setOpenIndex}
        />
      ) : null}
    </>
  );
}
