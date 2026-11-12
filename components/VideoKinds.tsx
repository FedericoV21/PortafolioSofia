import { Link } from "next-transition-router";

const kinds = [
  { href: "/video", label: "Trabajos" },
  { href: "/video/creativos", label: "Creativos" },
] as const;

export function VideoKinds({ current }: { current: "/video" | "/video/creativos" }) {
  return (
    <nav aria-label="Tipo de video" className="mt-4 flex flex-wrap gap-2">
      {kinds.map((kind) => {
        const active = kind.href === current;
        return (
          <Link
            key={kind.href}
            href={kind.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 cursor-pointer items-center px-4 text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 ${
              active ? "bg-ink text-cream" : "bg-ink/8 text-ink/70 hover:text-ink"
            }`}
          >
            {kind.label}
          </Link>
        );
      })}
    </nav>
  );
}
