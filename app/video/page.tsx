import type { Metadata } from "next";
import { Link } from "next-transition-router";
import { VideoGrid } from "@/components/VideoGrid";
import { videoReels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Video",
};

export default function VideoPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-6 tablet-portrait:px-[38px] tablet-portrait:py-11 tablet-landscape:h-full tablet-landscape:min-h-0 tablet-landscape:flex-1 tablet-landscape:overflow-hidden tablet-landscape:px-12 tablet-landscape:py-10 xl:h-full xl:min-h-0 xl:flex-1 xl:overflow-hidden xl:px-10">
        <h1 className="font-display shrink-0 text-[clamp(2.8rem,13vw,4.75rem)] leading-none font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px] xl:text-[6.5rem]">
        Videos
      </h1>
      <Link
        href="/video/creativos"
        className="mt-2 shrink-0 text-[11px] tracking-[0.18em] text-ink/55 uppercase transition-colors duration-200 hover:text-ink"
      >
        Videos creativos
      </Link>
      <div className="mt-5 min-h-0 flex-1 tablet-portrait:mt-8 tablet-landscape:mt-4 xl:mt-3">
        <VideoGrid reels={videoReels} />
      </div>
    </section>
  );
}
