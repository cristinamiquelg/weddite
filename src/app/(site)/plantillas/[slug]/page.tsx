import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateBySlug, templates } from "@/lib/templates";
import TemplateDetailContent from "@/components/site/TemplateDetailContent";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) return {};
  return {
    title: `${tpl.name} — Diseño de web de boda — Weddite`,
    description: tpl.description,
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) notFound();

  return <TemplateDetailContent tpl={tpl} />;
}
