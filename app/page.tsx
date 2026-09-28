import Image from "next/image";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col tablet-landscape:h-full tablet-landscape:flex-row tablet-landscape:overflow-hidden xl:h-full xl:flex-row xl:overflow-hidden">
      <div className="flex h-[330px] shrink-0 flex-col px-6 pt-[70px] pb-0 tablet-portrait:h-[535px] tablet-portrait:px-[54px] tablet-portrait:pt-[92px] tablet-landscape:h-auto tablet-landscape:w-[53.7%] tablet-landscape:flex-none tablet-landscape:px-[58px] tablet-landscape:pt-[110px] xl:h-auto xl:w-auto xl:flex-1 xl:justify-center xl:px-20 xl:py-16">
        <h1 className="font-display flex flex-col text-[65px] leading-[57px] font-normal tracking-[-0.015em] text-ink uppercase tablet-portrait:text-[108px] tablet-portrait:leading-[95px] tablet-landscape:text-[112px] tablet-landscape:leading-[99px] xl:gap-6 xl:text-[clamp(6.5rem,10.4vw,11.5rem)] xl:leading-none xl:tracking-tight">
          <span>Sofía</span>
          <span>Albornoz</span>
        </h1>
        <div className="mt-[18px] h-px w-full bg-coral tablet-portrait:mt-10 tablet-landscape:mt-10 xl:mt-8 xl:h-auto xl:w-fit xl:border-t xl:border-coral xl:bg-transparent xl:pt-6">
          <p className="mt-[19px] text-[11px] font-medium tracking-[0.14em] text-ink uppercase tablet-portrait:text-[17px] tablet-landscape:mt-[40px] tablet-landscape:text-base xl:mt-0 xl:whitespace-nowrap xl:text-[11px]">
            {site.role}
          </p>
        </div>
      </div>
      <div className="relative min-h-0 w-full flex-1 bg-black tablet-landscape:w-[46.3%] tablet-landscape:flex-none xl:w-[37%] xl:flex-none">
        <Image
          src="/images/home-hero.jpg"
          alt="Silla blanca vista a través de un umbral oscuro"
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) and (orientation: landscape) 46vw, (max-width: 1279px) 100vw, 37vw"
          quality={95}
          priority
        />
      </div>
    </section>
  );
}
