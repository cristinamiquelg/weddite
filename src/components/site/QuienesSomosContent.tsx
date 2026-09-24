"use client";

import Image from "next/image";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function QuienesSomosContent() {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).quienesSomos;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div
        data-reveal
        className="flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-clay">{dict.label}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">
            {dict.h1}
            <SparkleIcon className="ml-2 inline-block h-[0.6em] w-[0.6em] -translate-y-1 text-clay" />
          </h1>
        </div>
        <Image
          src="/quienes-somos/retrato.webp"
          alt="Cristina, founder of Weddite"
          width={220}
          height={220}
          className="h-[180px] w-[180px] shrink-0 object-contain sm:h-[220px] sm:w-[220px]"
          priority
        />
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft" data-reveal style={{ transitionDelay: "80ms" }}>
        <p>{dict.p1}</p>
        <p>{dict.p2}</p>
        <p className="font-display text-2xl italic text-ink">{dict.p3}</p>
      </div>

      <ul className="mt-10 space-y-3" data-reveal style={{ transitionDelay: "140ms" }}>
        {dict.bullets.map((line) => (
          <li key={line} className="flex items-start gap-3 text-lg text-ink">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
            {line}
          </li>
        ))}
      </ul>

      <p
        className="mt-10 text-lg leading-relaxed text-ink-soft"
        data-reveal
        style={{ transitionDelay: "200ms" }}
      >
        {dict.closingPre}{" "}
        <Link
          href="/#contacto"
          className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay"
        >
          {dict.closingLinkText}
        </Link>
        {dict.closingPost}
      </p>
    </div>
  );
}
