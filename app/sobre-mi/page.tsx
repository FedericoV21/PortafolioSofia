import type { Metadata } from "next";
import Image from "next/image";
import { SoftwareMarks } from "@/components/SoftwareMarks";
import { about } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre mí",
};

export default function AboutPage() {
  return (
    <section className="flex flex-1 flex-col lg:h-full lg:min-h-0 lg:flex-row lg:overflow-hidden">
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:min-h-0 lg:flex-1 lg:px-16 lg:py-10 xl:px-24">
        <h1 className="font-display text-5xl leading-none font-normal tracking-tight whitespace-nowrap text-ink uppercase sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
          Sobre mí
        </h1>
        <div className="mt-6 max-w-xl space-y-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 lg:mt-auto lg:pt-6">
          <SoftwareMarks tools={about.tools} />
        </div>
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-coral/20 lg:aspect-auto lg:min-h-0 lg:w-[38%]">
        <Image
          src="/images/sofia-portrait.jpg"
          alt="Retrato de Sofia Albornoz"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 38vw"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
