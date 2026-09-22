import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateBySlug, templates } from "@/lib/templates";

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
    title: `${tpl.name} — Plantilla de web de boda — Weddite`,
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/plantillas" className="text-sm text-ink-soft hover:text-ink">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          data-reveal
          className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-[0_30px_80px_-40px_rgba(33,29,26,0.35)]"
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-paper px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 text-xs text-ink-soft">
              weddite.com/preview/{tpl.slug}
            </span>
          </div>
          <iframe
            src={`/preview/${tpl.slug}`}
            title={`Preview de la plantilla ${tpl.name}`}
            className="h-[720px] w-full"
          />
        </div>

        <div data-reveal style={{ transitionDelay: "120ms" }}>
          <p className="text-xs uppercase tracking-[0.3em] text-clay">
            {tpl.tagline}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{tpl.name}</h1>
          <p className="mt-5 text-ink-soft">{tpl.description}</p>

          <p className="mt-8 font-display text-3xl">{tpl.price} €</p>
          <p className="text-sm text-ink-soft">Pago único, sin cuotas.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/personalizar/${tpl.slug}`}
              className="flex-1 rounded-full bg-ink px-6 py-3.5 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Personalizar y contratar
            </Link>
            <Link
              href={`/preview/${tpl.slug}`}
              target="_blank"
              className="flex-1 rounded-full border border-line px-6 py-3.5 text-center text-sm font-medium transition-colors hover:border-ink"
            >
              Abrir a pantalla completa
            </Link>
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              Qué incluye
            </p>
            <ul className="mt-4 space-y-3">
              {tpl.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
