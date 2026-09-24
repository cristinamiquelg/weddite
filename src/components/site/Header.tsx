"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function Header() {
  const { locale, setLocale } = useSiteLocale();
  const dict = getSiteDict(locale);

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 fade-in-load">
        <Link href="/">
          <Logo className="text-xl" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          <Link href="/plantillas" className="transition-colors hover:text-ink">
            {dict.nav.designs}
          </Link>
          <Link href="/#como-funciona" className="transition-colors hover:text-ink">
            {dict.nav.howItWorks}
          </Link>
          <Link href="/quienes-somos" className="transition-colors hover:text-ink">
            {dict.nav.whoWeAre}
          </Link>
          <Link href="/#contacto" className="transition-colors hover:text-ink">
            {dict.nav.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setLocale("es")}
              aria-pressed={locale === "es"}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "es" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "en" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              EN
            </button>
          </div>
          <Link
            href="/plantillas"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            {dict.nav.viewDesigns}
          </Link>
        </div>
      </div>
    </header>
  );
}
