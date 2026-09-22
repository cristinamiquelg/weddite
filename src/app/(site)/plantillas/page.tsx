import type { Metadata } from "next";
import { templates } from "@/lib/templates";
import CatalogBrowser from "@/components/site/CatalogBrowser";

export const metadata: Metadata = {
  title: "Plantillas de webs de boda — Weddite",
  description:
    "Explora el catálogo de plantillas de webs de boda de Weddite, con preview en directo y personalización al instante.",
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-xl" data-reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-clay">Catálogo</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">
          Elegid la que más se parezca a vosotros
        </h1>
        <p className="mt-4 text-ink-soft">
          Cada plantilla se puede probar en directo antes de decidir nada.
          Cuando la tengáis clara, la personalizáis y la contratáis sin salir
          del navegador.
        </p>
      </div>

      <div className="mt-10">
        <CatalogBrowser templates={templates} />
      </div>
    </div>
  );
}
