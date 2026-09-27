import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-transition-router";
import { photoProjects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fotografía",
};

export default function PhotographyPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-6 sm:px-10 lg:h-full lg:min-h-0 lg:overflow-hidden">
      <h1 className="font-display shrink-0 text-5xl leading-none font-normal tracking-tight text-ink uppercase sm:text-6xl lg:text-7xl">
        Fotografía
      </h1>
      <ul className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {photoProjects.map((project) => (
          <li key={project.slug} className="flex min-h-0 flex-col">
            <Link
              href={`/fotografia/${project.slug}`}
              className="group flex min-h-0 flex-1 flex-col"
            >
              <div className="relative min-h-[16rem] flex-1 overflow-hidden bg-ink/5 lg:min-h-0">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={95}
                />
              </div>
              <span className="mt-3 flex min-h-11 shrink-0 items-center justify-center bg-coral-soft px-3 py-2 text-center text-[11px] tracking-[0.2em] text-ink uppercase transition-colors duration-200 group-hover:bg-coral">
                {project.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
