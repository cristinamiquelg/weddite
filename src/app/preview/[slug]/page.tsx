import { notFound } from "next/navigation";
import { isKnownTemplateSlug } from "@/components/templates/registry";
import PreviewClient from "./PreviewClient";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isKnownTemplateSlug(slug)) notFound();

  return <PreviewClient slug={slug} />;
}
