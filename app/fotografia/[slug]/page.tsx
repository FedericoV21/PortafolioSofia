import type { Metadata } from "next";
import { Link } from "next-transition-router";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getProject, photoProjects } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return photoProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const layout =
    slug === "espacio-yoga" || slug === "teatro"
      ? "yoga"
      : slug === "mercado-del-norte"
        ? "mercado"
        : "grid";

  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 sm:px-10 lg:py-14">
      <Link
        href="/fotografia"
        className="text-[11px] tracking-[0.22em] text-ink/55 uppercase transition-colors duration-200 hover:text-ink"
      >
        Fotografía
      </Link>
      <h1 className="font-display mt-4 text-4xl leading-[0.9] font-normal tracking-tight text-ink uppercase sm:text-6xl">
        {project.title}
      </h1>
      <div className="mt-10">
        <PhotoGallery images={project.images} layout={layout} />
      </div>
    </section>
  );
}
