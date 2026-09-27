import { Link } from "next-transition-router";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
      <h1 className="font-display text-5xl font-normal tracking-tight text-ink uppercase">
        Página no encontrada
      </h1>
      <p className="mt-4 text-ink-soft">Esa ruta no existe en el portafolio.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 w-fit items-center bg-coral-soft px-5 text-[11px] tracking-[0.18em] uppercase"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
