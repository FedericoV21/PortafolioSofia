import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-transition-router";
import { PageTitle } from "@/components/PageTitle";
import { creativeVideos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Videos creativos",
};

export default function CreativeVideosPage() {
  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-6 tablet-portrait:px-10 tablet-portrait:py-12 tablet-landscape:px-12 tablet-landscape:py-10 xl:px-10 xl:py-14">
      <Link
        href="/video"
        className="hidden text-[11px] tracking-[0.22em] text-ink/55 uppercase transition-colors duration-200 hover:text-ink xl:inline"
      >
        Video
      </Link>
      <PageTitle className="mt-0 text-[clamp(2.15rem,9.5vw,3.6rem)] leading-[0.9] tablet:text-[48px] tablet:leading-[46px] xl:mt-4 xl:text-[7.5rem] xl:leading-[0.85]">
        Videos creativos
      </PageTitle>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft tablet:mt-5 tablet:max-w-[560px] tablet:leading-[21px] tablet-landscape:max-w-[620px] xl:mt-6 xl:max-w-xl xl:text-lg">
        {creativeVideos.intro}
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-8 tablet-portrait:mt-8 tablet-portrait:gap-6 tablet-landscape:mt-8 tablet-landscape:grid-cols-2 tablet-landscape:gap-8 xl:mt-12 xl:grid-cols-2 xl:gap-10">
        {creativeVideos.pieces.map((piece) => (
          <li key={piece.title}>
            <div className="relative aspect-[16/10] overflow-hidden bg-ink tablet-portrait:aspect-[688/270] tablet-landscape:aspect-[448/300] xl:aspect-[16/9]">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) and (orientation: portrait) 100vw, 50vw"
              />
            </div>
            <p className="flex min-h-10 items-center justify-center bg-coral px-3 py-2 text-center text-[10px] tracking-[0.14em] text-ink uppercase tablet:min-h-[38px] tablet:text-[12px] xl:mt-5 xl:min-h-0 xl:bg-transparent xl:text-sm xl:tracking-[0.08em] xl:normal-case">
              “{piece.title}”
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
