import type { Metadata } from "next";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoKinds } from "@/components/VideoKinds";
import { videoReels, workVideosIntro } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trabajos",
};

export default function VideoPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-6 pb-12 tablet-portrait:px-[38px] tablet-portrait:py-11 tablet-landscape:px-12 tablet-landscape:py-10 xl:px-10">
      <h1 className="font-display shrink-0 text-[clamp(2.8rem,13vw,4.75rem)] leading-none font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px] xl:text-[6.5rem]">
        Trabajos
      </h1>
      <VideoKinds current="/video" />
      <p className="mt-4 max-w-xl shrink-0 text-[15px] leading-relaxed text-ink-soft">
        {workVideosIntro}
      </p>
      <div className="mt-5 min-h-0 flex-1 tablet-portrait:mt-8 tablet-landscape:mt-4 xl:mt-3">
        <VideoGrid reels={videoReels} />
      </div>
    </section>
  );
}
