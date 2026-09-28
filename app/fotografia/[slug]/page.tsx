import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesView } from "@/components/SeriesView";
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
    <section className="flex w-full flex-col max-xl:landscape:min-h-0 max-xl:landscape:flex-1 max-xl:landscape:overflow-hidden xl:mx-auto xl:max-w-7xl xl:px-10 xl:py-14">
      <SeriesView project={project} layout={layout} />
    </section>
  );
}
