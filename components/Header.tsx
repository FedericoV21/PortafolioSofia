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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 shrink-0 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:justify-end lg:px-10 xl:px-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-sm font-normal tracking-[0.18em] text-ink uppercase lg:hidden"
        >
          Sofia Albornoz
        </Link>
        <nav
          className="hidden w-[min(40rem,58%)] items-center justify-between lg:flex"
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
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 block h-px w-full bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3.5"
              }`}
            />
          </span>
        </button>
      </div>
      <div className="h-px bg-ink/80" />
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-cream px-8 py-10 lg:hidden"
        >
          <nav className="flex flex-col gap-6" aria-label="Móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-display text-3xl font-normal tracking-tight uppercase ${
                  isActive(pathname, item.href) ? "text-nav-active" : "text-ink"
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
