import type { Metadata } from "next";
import Image from "next/image";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
};

const items = [
  {
    label: "Teléfono",
    value: contact.phone,
    href: `https://wa.me/${contact.whatsapp}`,
  },
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    label: "Instagram",
    value: `@${contact.instagram}`,
    href: `https://instagram.com/${contact.instagram}`,
  },
];

function ContactList({
  valueClassName,
}: {
  valueClassName: string;
}) {
  return (
    <ul className="mt-8 space-y-6 tablet:mt-12 tablet:space-y-6 xl:mt-12 xl:space-y-8">
      {items.map((item) => (
        <li key={item.label}>
          <p className="text-[11px] tracking-[0.22em] text-ink uppercase tablet:text-xl tablet:tracking-normal xl:text-[11px] xl:tracking-[0.22em]">
            {item.label}
          </p>
          <a
            href={item.href}
            className={valueClassName}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {item.value}
          </a>
        </li>
      ))}
    </ul>
  );
}

function QrBlock({ size }: { size: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="border-[3px] border-sage bg-cream p-3 tablet:border tablet:border-ink/25 tablet:p-2.5 xl:border xl:border-ink/25 xl:p-4">
        <Image
          src="/images/qr.png"
          alt="Código QR al Instagram de Sofia Albornoz"
          width={size}
          height={size}
          className="h-auto w-56 tablet-portrait:w-[300px] tablet-landscape:w-[320px] xl:w-64"
        />
      </div>
      <p className="mt-5 max-w-[14rem] text-center font-display text-[12px] tracking-[0.16em] text-ink uppercase tablet:mt-3 tablet:max-w-[20rem] tablet:text-lg tablet:leading-5 xl:mt-5 xl:max-w-[14rem] xl:text-[12px] xl:leading-normal">
        Escaneá para ver más de mi trabajo
      </p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-7 tablet-portrait:px-11 tablet-portrait:pt-12 tablet-landscape:px-[54px] tablet-landscape:pt-[42px] xl:flex-row xl:items-center xl:justify-between xl:gap-12 xl:px-10 xl:py-16">
      <div className="xl:hidden">
        <h1 className="font-display text-[clamp(3rem,12vw,3.75rem)] leading-[0.88] font-normal tracking-tight text-ink uppercase tablet-portrait:text-[78px] tablet-portrait:leading-[75px] tablet-landscape:text-[96px] tablet-landscape:leading-[92px]">
          Contacto
        </h1>
        <div className="mt-8 flex flex-col items-center gap-10 tablet:mt-10 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-8">
          <ContactList valueClassName="mt-1 inline-block font-display text-xl tracking-tight text-ink uppercase transition-opacity duration-200 hover:opacity-70 tablet-portrait:text-[22px] tablet-landscape:text-2xl" />
          <QrBlock size={320} />
        </div>
      </div>
      <div className="hidden xl:block">
        <h1 className="font-display text-[7.5rem] leading-[0.85] font-normal tracking-tight text-ink uppercase">
          Contacto
        </h1>
        <ContactList valueClassName="mt-1 inline-block text-lg tracking-normal text-ink transition-opacity duration-200 hover:opacity-70" />
      </div>
      <div className="hidden xl:mt-0 xl:flex xl:flex-col xl:items-center">
        <QrBlock size={260} />
      </div>
    </section>
  );
}
