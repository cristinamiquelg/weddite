import { notFound } from "next/navigation";
import { getTemplateBySlug } from "@/lib/templates";
import ConfirmClient from "./ConfirmClient";

export default async function ConfirmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  return <ConfirmClient template={template} />;
}
