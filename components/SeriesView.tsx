"use client";

import Image from "next/image";
import { useState } from "react";
import { ImmersiveViewer } from "@/components/ImmersiveViewer";
import { PhotoGallery } from "@/components/PhotoGallery";
import type { PhotoProject } from "@/lib/site";

export function SeriesView({
  project,
  layout,
}: {
  project: PhotoProject;
  layout: "grid" | "yoga" | "mercado";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hero = project.images[0];
  const thumbs = project.images.slice(1, 3);

  return (
    <>
      <div className="flex flex-col max-xl:landscape:min-h-0 max-xl:landscape:flex-1 max-xl:landscape:flex-row max-xl:landscape:overflow-hidden">
        <div className="px-5 pt-6 pb-4 tablet-portrait:px-[38px] tablet-portrait:pt-12 tablet-portrait:pb-6 max-xl:landscape:flex max-xl:landscape:w-[360px] max-xl:landscape:shrink-0 max-xl:landscape:flex-col max-xl:landscape:px-6 max-xl:landscape:py-6 xl:px-0 xl:pt-0 xl:pb-8">
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] text-ink/55 uppercase tablet:text-[9px] tablet:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              {project.category}
            </p>
            <p className="text-[10px] tracking-[0.18em] text-ink/45 tablet:text-[9px]">
              {project.year}
            </p>
          </div>
          <h1 className="font-display mt-3 text-[clamp(2.6rem,12vw,4.5rem)] leading-[0.88] font-normal tracking-tight text-ink uppercase tablet-portrait:mt-4 tablet-portrait:text-[48px] tablet-portrait:leading-none max-xl:landscape:mt-5 max-xl:landscape:text-[64px] max-xl:landscape:leading-[55px] xl:text-6xl">
            {project.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <div className="mt-4 h-1 w-16 bg-coral tablet:w-[62px]" />
          <p className="mt-5 max-w-xl text-[17px] leading-snug text-ink tablet-portrait:mt-6 tablet-portrait:max-w-none tablet-portrait:text-[18px] tablet-portrait:leading-[24px] max-xl:landscape:text-base max-xl:landscape:leading-[21px]">
            {project.lead}
          </p>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft tablet-portrait:text-xs tablet-portrait:leading-[18px] max-xl:landscape:text-[11px] max-xl:landscape:leading-[16.5px]">
            {project.body}
          </p>
          <dl className="mt-6 flex gap-10">
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-ink/45 uppercase tablet:text-[8px]">
                Lugar
              </dt>
              <dd className="mt-1 text-sm tracking-[0.08em] text-ink uppercase tablet:text-[14px]">
                {project.place}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-ink/45 uppercase tablet:text-[8px]">
                Serie
              </dt>
              <dd className="mt-1 text-sm tracking-[0.08em] text-ink uppercase tablet:text-[14px]">
                {project.seriesRange}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            className="mt-6 flex min-h-12 w-full cursor-pointer items-center justify-between bg-coral px-5 text-[12px] tracking-[0.22em] text-ink uppercase tablet:w-[232px] tablet:text-base tablet:tracking-[0.04em] max-xl:landscape:mt-auto xl:w-[232px]"
          >
            Modo inmersivo
            <ExpandIcon />
          </button>
        </div>

        <div className="max-xl:landscape:hidden xl:hidden">
          {hero ? (
            <button
              type="button"
              className="relative block aspect-[4/3] w-full cursor-pointer bg-ink/5 tablet-portrait:aspect-[21/10]"
              onClick={() => setOpenIndex(0)}
              aria-label={`Abrir ${hero.alt}`}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </button>
          ) : null}
          {thumbs.length > 0 ? (
            <div className="grid grid-cols-2 gap-1.5 tablet-portrait:gap-2">
              {thumbs.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className="relative aspect-[4/3] cursor-pointer bg-ink/5 tablet-portrait:aspect-[342/177]"
                  onClick={() => setOpenIndex(index + 1)}
                  aria-label={`Abrir ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden min-h-0 flex-1 gap-2 py-6 pr-6 max-xl:landscape:flex">
          {hero ? (
            <button
              type="button"
              className="relative min-h-0 min-w-0 flex-1 cursor-pointer overflow-hidden bg-ink/5"
              onClick={() => setOpenIndex(0)}
              aria-label={`Abrir ${hero.alt}`}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </button>
          ) : null}
          {thumbs.length > 0 ? (
            <div className="flex w-[190px] shrink-0 flex-col gap-2">
              {thumbs.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className="relative min-h-0 flex-1 cursor-pointer overflow-hidden bg-ink/5"
                  onClick={() => setOpenIndex(index + 1)}
                  aria-label={`Abrir ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="190px"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 hidden px-6 xl:mt-2 xl:block xl:px-0">
        <PhotoGallery
          images={project.images}
          layout={layout}
          title={project.title}
          category={project.category}
        />
      </div>

      {openIndex !== null ? (
        <ImmersiveViewer
          images={project.images}
          index={openIndex}
          title={project.title}
          category={project.category}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 15v6h-6" />
    </svg>
  );
}
