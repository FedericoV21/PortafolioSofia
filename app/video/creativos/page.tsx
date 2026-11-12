import type { Metadata } from "next";
import { CreativeGrid } from "@/components/CreativeGrid";
import { VideoKinds } from "@/components/VideoKinds";
import { creativeVideos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Creativos",
};

export default function CreativeVideosPage() {
  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-6 pb-12 tablet-portrait:px-10 tablet-portrait:py-12 tablet-landscape:px-12 tablet-landscape:py-10 xl:px-10 xl:py-14">
      <h1 className="font-display text-[clamp(2.8rem,13vw,4.75rem)] leading-none font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px] xl:text-[6.5rem]">
        Creativos
      </h1>
      <VideoKinds current="/video/creativos" />
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft tablet:mt-5 tablet:max-w-[560px] tablet:leading-[21px] tablet-landscape:max-w-[620px] xl:mt-6 xl:max-w-xl xl:text-lg">
        {creativeVideos.intro}
      </p>
      <CreativeGrid pieces={creativeVideos.pieces} />
    </section>
  );
}
