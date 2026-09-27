import type { Metadata } from "next";
import { VideoGrid } from "@/components/VideoGrid";
import { videoReels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Video",
};

export default function VideoPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:h-full lg:min-h-0 lg:flex-1 lg:overflow-hidden">
      <h1 className="font-display shrink-0 text-5xl leading-none font-normal tracking-tight text-ink uppercase sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
        Videos
      </h1>
      <div className="mt-5 lg:mt-3 lg:min-h-0 lg:flex-1">
        <VideoGrid reels={videoReels} />
      </div>
    </section>
  );
}
