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
      <ul className="grid min-h-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:gap-6">
        {reels.map((reel, index) => (
          <li
            key={reel.title}
            className="flex h-full min-h-0 flex-col items-center text-center"
          >
            <button
              type="button"
              className="relative aspect-[309/490] w-full max-w-[220px] cursor-pointer lg:max-w-none lg:min-h-0 lg:flex-1 lg:aspect-auto"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ver ${reel.title}`}
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 22vw"
                quality={95}
              />
            </button>
            <h2 className="mt-3 shrink-0 text-sm tracking-[0.14em] text-ink uppercase">
              {reel.title}
            </h2>
            <p className="mt-1.5 max-w-[16rem] shrink-0 text-[13px] leading-snug text-ink-soft">
              {reel.description}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className={`mt-3 inline-flex min-h-8 shrink-0 cursor-pointer items-center rounded-full px-5 text-[11px] tracking-[0.16em] uppercase transition-opacity duration-200 hover:opacity-80 ${
                reel.tone === "coral" ? "bg-coral-soft" : "bg-sage-soft"
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
