import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isKnownTemplateSlug } from "@/components/templates/registry";
import RsvpClient from "./RsvpClient";

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isKnownTemplateSlug(slug)) notFound();

  return (
    <Suspense>
      <RsvpClient slug={slug} />
    </Suspense>
  );
}
