import type { Metadata } from "next";
import Image from "next/image";
import { SoftwareMarks } from "@/components/SoftwareMarks";
import { about } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre mí",
};

export default function AboutPage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col tablet:h-full tablet:flex-row tablet:overflow-hidden xl:h-full xl:min-h-0 xl:flex-row xl:overflow-hidden">
      <div className="flex shrink-0 flex-col px-5 pt-7 pb-5 tablet-portrait:w-[364px] tablet-portrait:flex-none tablet-portrait:pr-7 tablet-portrait:pl-11 tablet-portrait:pt-14 tablet-portrait:pb-8 tablet-landscape:flex-1 tablet-landscape:px-12 tablet-landscape:pt-[52px] tablet-landscape:pb-8 xl:min-h-0 xl:flex-1 xl:px-24 xl:py-10">
        <h1 className="font-display text-[clamp(3.2rem,14vw,4.75rem)] leading-[0.88] font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px] xl:text-[6.25rem]">
          Sobre mí
        </h1>
        <div className="mt-5 max-w-xl space-y-2.5 text-[14px] leading-relaxed text-ink-soft tablet:mt-7 tablet:max-w-none tablet:space-y-3 tablet:text-[15px] tablet:leading-[22.8px] xl:mt-6 xl:text-base">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 tablet-landscape:mt-auto tablet-landscape:pt-6 xl:mt-auto xl:pt-6">
          <SoftwareMarks tools={about.tools} />
        </div>
      </div>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-coral/20 tablet-portrait:flex-1 tablet-landscape:w-[38.3%] tablet-landscape:flex-none xl:aspect-auto xl:min-h-0 xl:w-[38%] xl:flex-none">
        <Image
          src="/images/sofia-portrait.jpg"
          alt="Retrato de Sofia Albornoz"
          fill
          className="object-cover object-top"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) and (orientation: portrait) 53vw, 38vw"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
