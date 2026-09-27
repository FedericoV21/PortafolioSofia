import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
};

const items = [
  {
    label: "Teléfono",
    value: contact.phoneDisplay,
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

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-16">
      <div>
        <PageTitle>Contacto</PageTitle>
        <ul className="mt-12 space-y-8">
          {items.map((item) => (
            <li key={item.label}>
              <p className="text-[11px] tracking-[0.22em] text-ink/55 uppercase">
                {item.label}
              </p>
              <a
                href={item.href}
                className="mt-1 inline-block text-lg text-ink transition-opacity duration-200 hover:opacity-70"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <div className="border border-ink/25 bg-cream p-4">
          <Image
            src="/images/qr.png"
            alt="Código QR al Instagram de Sofia Albornoz"
            width={260}
            height={260}
            className="h-auto w-56 sm:w-64"
          />
        </div>
        <p className="mt-5 max-w-[12rem] text-center text-[11px] tracking-[0.18em] text-ink/60 uppercase">
          Escaneá para ver más de mi trabajo
        </p>
      </div>
    </section>
  );
}
