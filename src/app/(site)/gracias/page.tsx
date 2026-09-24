import { getTemplateBySlug } from "@/lib/templates";
import GraciasContent from "@/components/site/GraciasContent";

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const template = slug ? getTemplateBySlug(slug) : undefined;

  return <GraciasContent slug={slug} template={template} />;
}
