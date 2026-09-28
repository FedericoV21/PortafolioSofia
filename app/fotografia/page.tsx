import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-transition-router";
import { photoProjects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fotografía",
};

export default function PhotographyPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-6 tablet-portrait:px-[38px] tablet-portrait:py-12 tablet-landscape:h-full tablet-landscape:min-h-0 tablet-landscape:flex-1 tablet-landscape:overflow-hidden tablet-landscape:px-12 tablet-landscape:py-11 xl:h-full xl:min-h-0 xl:flex-1 xl:overflow-hidden xl:px-10">
      <h1 className="font-display shrink-0 text-[clamp(2.6rem,12vw,4.5rem)] leading-none font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px] xl:text-7xl">
        Fotografía
      </h1>
      <ul className="mt-5 grid grid-cols-2 gap-2.5 tablet-portrait:mt-8 tablet-portrait:gap-5 tablet-landscape:mt-6 tablet-landscape:min-h-0 tablet-landscape:flex-1 tablet-landscape:grid-cols-4 tablet-landscape:gap-7 xl:min-h-0 xl:flex-1 xl:grid-cols-4 xl:gap-7">
        {photoProjects.map((project) => (
          <li key={project.slug} className="flex flex-col tablet-landscape:min-h-0 xl:min-h-0">
            <Link
              href={`/fotografia/${project.slug}`}
              className="group flex flex-col tablet-landscape:min-h-0 tablet-landscape:flex-1 xl:min-h-0 xl:flex-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 tablet-portrait:aspect-[336/320] tablet-landscape:aspect-auto tablet-landscape:min-h-0 tablet-landscape:flex-1 xl:aspect-auto xl:min-h-0 xl:flex-1">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                  sizes="(max-width: 767px) 50vw, (max-width: 1279px) and (orientation: portrait) 50vw, 25vw"
                  quality={95}
                />
              </div>
              <span className="mt-0 flex min-h-10 shrink-0 items-center justify-center bg-coral px-2 py-2 text-center text-[9px] tracking-[0.16em] text-ink uppercase tablet:min-h-[54px] tablet:text-[12px] tablet:tracking-[0.16em] tablet-landscape:text-[13px] xl:mt-3 xl:min-h-11 xl:bg-coral-soft xl:px-3 xl:text-[11px] xl:tracking-[0.2em] xl:group-hover:bg-coral">
                {project.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
