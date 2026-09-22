import Link from "next/link";
import { getTemplateBySlug } from "@/lib/templates";

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const template = slug ? getTemplateBySlug(slug) : undefined;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-light">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-sage" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-clay">
        Contratación confirmada
      </p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        ¡Enhorabuena! Vuestra web ya está lista
      </h1>
      <p className="mt-5 max-w-md text-ink-soft">
        Hemos generado vuestra web de boda con la plantilla{" "}
        {template ? <strong className="text-ink">{template.name}</strong> : "elegida"}.
        Podéis seguir editándola cuando queráis y compartirla con vuestros
        invitados.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {slug ? (
          <Link
            href={`/preview/${slug}`}
            target="_blank"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Ver vuestra web
          </Link>
        ) : null}
        {slug ? (
          <Link
            href={`/personalizar/${slug}`}
            className="rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Seguir editando
          </Link>
        ) : null}
      </div>

      <Link href="/plantillas" className="mt-10 text-sm text-ink-soft hover:text-ink">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
