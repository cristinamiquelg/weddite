import type { Metadata } from "next";
import CatalogContent from "@/components/site/CatalogContent";

export const metadata: Metadata = {
  title: "Diseños de webs de boda — Wedite",
  description:
    "Explora el catálogo de diseños de webs de boda de Wedite, con preview en directo y personalización al instante.",
};

export default function CatalogPage() {
  return <CatalogContent />;
}
