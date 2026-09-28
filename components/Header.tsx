"use client";

import { Link } from "next-transition-router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 shrink-0 bg-cream">
      <div className="mx-auto flex h-[34px] w-full items-center justify-between px-6 tablet:h-12 tablet:px-8 xl:h-16 xl:justify-end xl:px-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 xl:hidden"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral font-display text-[12px] leading-none text-cream">
            S
          </span>
          <span className="font-display text-[12px] leading-none tracking-tight text-ink uppercase">
            Sofía
          </span>
        </Link>
        <nav
          className="hidden w-[min(40rem,58%)] items-center justify-between xl:flex"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-xs font-normal tracking-[0.16em] uppercase transition-colors duration-200 ${
                isActive(pathname, item.href)
                  ? "text-nav-active"
                  : "text-ink hover:text-nav-active"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 translate-x-2 cursor-pointer items-center justify-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
          <span className="relative block h-[14px] w-5">
            <span
              className={`absolute left-0 block h-0.5 w-full rounded-[1px] bg-ink transition-transform duration-200 ${
                open ? "top-[6px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-[6px] left-0 block h-0.5 w-full rounded-[1px] bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-full rounded-[1px] bg-ink transition-transform duration-200 ${
                open ? "top-[6px] -rotate-45" : "top-[12px]"
              }`}
            />
          </span>
        </button>
      </div>
      <div className="hidden h-px bg-ink/80 xl:block" />
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[34px] bottom-0 z-40 overflow-y-auto bg-cream px-6 tablet:top-12 tablet:px-8 xl:hidden"
        >
          <nav className="flex flex-col pt-2" aria-label="Móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-ink/25 py-5 font-display text-[1.65rem] leading-none tracking-tight uppercase ${
                  isActive(pathname, item.href) ? "text-ink" : "text-sage"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
