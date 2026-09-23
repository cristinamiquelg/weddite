import { notFound } from "next/navigation";
import { getTemplateBySlug } from "@/lib/templates";
import CustomizeClient from "./CustomizeClient";

export default async function CustomizePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  return <CustomizeClient template={template} />;
}
