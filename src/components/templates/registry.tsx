import type { WeddingData } from "@/lib/wedding-types";
import RiberaTemplate from "./ribera/RiberaTemplate";

const knownSlugs = ["ribera"] as const;
export type TemplateSlug = (typeof knownSlugs)[number];

export function isKnownTemplateSlug(slug: string): slug is TemplateSlug {
  return (knownSlugs as readonly string[]).includes(slug);
}

// Rendered via an explicit switch (rather than a slug -> component lookup
// table) so JSX tags stay static identifiers for React's component-identity
// checks, instead of a value that could change reference across renders.
export function renderTemplate(slug: TemplateSlug, data: WeddingData) {
  switch (slug) {
    case "ribera":
      return <RiberaTemplate data={data} />;
  }
}
