import Image from "next/image";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col lg:h-full lg:flex-row lg:overflow-hidden">
      <div className="flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
        <div>
          <h1 className="font-display flex flex-col gap-3 text-6xl leading-none font-normal tracking-tight text-ink uppercase sm:gap-4 sm:text-8xl lg:gap-6 lg:text-[clamp(6.5rem,10.4vw,11.5rem)]">
            <span>Sofia</span>
            <span>Albornoz</span>
          </h1>
          <div className="mt-8 w-fit border-t border-coral pt-6">
            <p className="text-[13px] tracking-[0.22em] text-ink/70 uppercase sm:whitespace-nowrap">
              {site.role}
            </p>
          </div>
        </div>
      </div>
      <div className="relative min-h-[58vh] w-full bg-black lg:min-h-0 lg:w-[37%]">
        <Image
          src="/images/home-hero.jpg"
          alt="Silla blanca vista a través de un umbral oscuro"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 37vw"
          quality={95}
          priority
        />
      </div>
    </section>
  );
}
