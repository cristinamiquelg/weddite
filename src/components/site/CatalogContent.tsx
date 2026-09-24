"use client";

import Link from "next/link";
import { templates } from "@/lib/templates";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function CatalogContent() {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-xl" data-reveal>
        <h1 className="font-display text-4xl sm:text-5xl">{dict.catalog.h1}</h1>
        <p className="mt-4 text-ink-soft">{dict.catalog.sub}</p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl, i) => {
          const tplDict = dict.templates[tpl.slug as "aurora" | "ribera"];
          return (
            <article
              key={tpl.id}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-shadow hover:shadow-[0_30px_60px_-35px_rgba(33,29,26,0.4)]"
            >
              <Link href={`/plantillas/${tpl.slug}`} className="block">
                <div className="relative h-64 overflow-hidden border-b border-line bg-paper">
                  <iframe
                    src={`/preview/${tpl.slug}`}
                    title={`Preview — ${tpl.name}`}
                    tabIndex={-1}
                    className="pointer-events-none absolute left-1/2 top-0 h-[1100px] w-[1400px] origin-top -translate-x-1/2 scale-[0.35] sm:scale-[0.3]"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl">{tpl.name}</h2>
                  <span className="text-sm font-medium text-ink-soft">
                    {tpl.price} €
                  </span>
                </div>
                <p className="mt-1 text-sm text-clay">{tplDict.tagline}</p>
                <p className="mt-4 flex-1 text-sm text-ink-soft">
                  {tplDict.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sage-light px-3 py-1 text-xs text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/preview/${tpl.slug}`}
                    target="_blank"
                    className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-ink"
                  >
                    {dict.catalog.viewPreview}
                  </Link>
                  <Link
                    href={`/plantillas/${tpl.slug}`}
                    className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
                  >
                    {dict.catalog.choose}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
