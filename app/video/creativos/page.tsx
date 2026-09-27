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
    <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 sm:px-10 lg:py-14">
      <Link
        href="/video"
        className="text-[11px] tracking-[0.22em] text-ink/55 uppercase transition-colors duration-200 hover:text-ink"
      >
        Video
      </Link>
      <PageTitle className="mt-4">Videos creativos</PageTitle>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {creativeVideos.intro}
      </p>
      <ul className="mt-12 grid gap-10 md:grid-cols-2">
        {creativeVideos.pieces.map((piece) => (
          <li key={piece.title}>
            <div className="relative aspect-[16/9] overflow-hidden bg-ink">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="mt-5 text-center text-sm tracking-[0.08em] text-ink">
              “{piece.title}”
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
