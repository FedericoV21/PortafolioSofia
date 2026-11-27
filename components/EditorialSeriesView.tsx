"use client";

import Image from "next/image";
import { useState } from "react";
import { ImmersiveViewer } from "@/components/ImmersiveViewer";
import type { PhotoProject } from "@/lib/site";

export function EditorialSeriesView({ project }: { project: PhotoProject }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="flex min-h-full flex-none flex-col xl:min-h-0 xl:flex-1 xl:flex-row">
        <div className="flex flex-col px-6 pt-8 pb-9 tablet:px-11 xl:w-[47.55%] xl:shrink-0 xl:justify-center xl:px-[7%] xl:py-5">
          <div className="flex max-w-[666px] items-center justify-between gap-6 text-[10px] tracking-[0.13em] uppercase xl:text-[13px] xl:tracking-[0.17em]">
            <p className="text-ink/55">{project.category}</p>
            <p>{project.year}</p>
          </div>
          <h1 className="font-display mt-6 text-[clamp(3rem,15.9vw,62px)] leading-[1.05] tracking-[-0.015em] uppercase xl:mt-[clamp(0.5rem,2vh,1.75rem)] xl:text-[clamp(3rem,10vh,6.625rem)] xl:leading-[0.98]">
            {project.titleLines.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <div className="mt-6 h-[3px] w-14 bg-coral xl:mt-[clamp(0.5rem,1.5vh,1.25rem)] xl:h-1 xl:w-[84px]" />
          <p className="mt-6 max-w-[650px] text-[17px] leading-[25px] xl:mt-[clamp(0.5rem,2vh,1.75rem)] xl:text-[clamp(1rem,2.2vh,23px)] xl:leading-[1.45]">{project.lead}</p>
          <p className="mt-6 max-w-[630px] text-sm leading-[22px] text-ink-soft xl:mt-[clamp(0.5rem,1.5vh,1.25rem)] xl:text-[clamp(0.75rem,1.6vh,17px)] xl:leading-[1.65]">{project.body}</p>
          <dl className="mt-6 grid max-w-[630px] grid-cols-2 gap-6 uppercase xl:mt-[clamp(0.75rem,2.5vh,2.25rem)]">
            <div><dt className="text-[11px] tracking-[0.18em]">Lugar</dt><dd className="mt-2 text-sm tracking-[0.08em]">{project.place}</dd></div>
            <div><dt className="text-[11px] tracking-[0.18em]">Serie</dt><dd className="mt-2 text-sm tracking-[0.08em]">{project.seriesRange}</dd></div>
          </dl>
          <button type="button" onClick={() => setOpenIndex(0)} className="relative mt-6 flex min-h-[52px] w-full cursor-pointer items-center justify-center bg-coral px-6 text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 xl:mt-[clamp(0.75rem,2.5vh,2.5rem)] xl:min-h-[clamp(42px,5.5vh,58px)] xl:max-w-[300px] xl:text-[13px]">
            Modo inmersivo <span aria-hidden="true" className="absolute right-5 text-xl">↗</span>
          </button>
          <p className="mt-3 text-center text-[9px] tracking-[0.08em] uppercase xl:mt-[clamp(0.5rem,1.5vh,1.5rem)] xl:text-left xl:text-[10px] xl:tracking-[0.15em]">El proyecto, fotograma a fotograma</p>
        </div>
        <div className="min-w-0 flex-1 pb-8 xl:my-[3.5%] xl:border-l xl:border-ink/20 xl:py-8">
          <div className="flex justify-between gap-4 px-6 text-[10px] tracking-[0.12em] uppercase xl:px-[6.5%] xl:text-[12px]">
            <p>Un vistazo a la serie</p><p>{project.seriesRange}</p>
          </div>
          <div className="mt-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:mt-[clamp(2rem,8vh,90px)]" aria-label="Fotografías de la serie" tabIndex={0}>
            <div className="flex w-max gap-3 px-6 xl:gap-[18px] xl:px-[8%]">
              {project.images.map((photo, index) => (
                <button key={photo.src} type="button" onClick={() => setOpenIndex(index)} aria-label={`Abrir ${photo.alt}`} className={`relative h-[310px] shrink-0 cursor-pointer overflow-hidden bg-ink/5 xl:h-[min(45vh,410px)] ${photo.width < photo.height ? "aspect-[246/310]" : "aspect-[438/310]"}`}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 80vw, 600px" className="object-cover" priority={index < 2} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {openIndex !== null && <ImmersiveViewer images={project.images} index={openIndex} title={project.title} category={project.category} onClose={() => setOpenIndex(null)} />}
    </>
  );
}
