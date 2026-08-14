import WorkDetailClient from "@/components/WorkDetailClient";
import { getWorkBySlug, works } from "@/data/works";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return {
      title: "Work - JIMILEEART",
    };
  }

  return {
    title: `${work.title.en} - JIMILEEART`,
    description: work.description?.en ?? work.category.en,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailClient work={work} />;
}
