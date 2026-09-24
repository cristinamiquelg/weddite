"use client";

import Link from "next/link";
import { templates } from "@/lib/templates";
import HeroGrid from "@/components/site/HeroGrid";
import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";
import ContactForm from "@/components/site/ContactForm";
import SparkleIcon from "@/components/site/SparkleIcon";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const ctaScatter: { top: string; left: string; size: string; opacity: number; rotate: string }[] = [
  { top: "12%", left: "8%", size: "2rem", opacity: 0.45, rotate: "-10deg" },
  { top: "72%", left: "12%", size: "1.3rem", opacity: 0.3, rotate: "18deg" },
  { top: "20%", left: "90%", size: "1.6rem", opacity: 0.35, rotate: "6deg" },
  { top: "78%", left: "88%", size: "2.6rem", opacity: 0.4, rotate: "-8deg" },
  { top: "50%", left: "4%", size: "1.1rem", opacity: 0.25, rotate: "12deg" },
  { top: "45%", left: "95%", size: "1.4rem", opacity: 0.3, rotate: "-15deg" },
];

export default function HomePage() {
  const featured = templates[0];
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale);
  const { home } = dict;

  return (
    <>
      <section
        className="fade-in-load mx-auto max-w-5xl px-6 pb-20 pt-20 text-center sm:pt-28"
        style={{ animationDelay: "80ms" }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-clay">{home.eyebrow}</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-none sm:text-6xl">
          {home.h1}
          <SparkleIcon className="ml-2 inline-block h-[0.6em] w-[0.6em] -translate-y-1 text-clay" />
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-soft">
          {home.subhead}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-4">
          <Link
            href="/plantillas"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            {home.ctaExplore}
          </Link>
          <Link
            href={`/preview/${featured.slug}`}
            target="_blank"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            {home.ctaExample}
          </Link>
        </div>
      </section>

      <section className="pb-24" data-reveal style={{ transitionDelay: "100ms" }}>
        <HeroGrid />
      </section>

      <section className="border-t border-line bg-paper-raised">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">
              {home.problemLabel}
            </p>
            <h2 className="mt-4 font-display text-3xl">{home.problemHeading}</h2>
            <ul className="mt-6 space-y-4">
              {home.painPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ transitionDelay: "120ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-clay">
              {home.wedditeLabel}
            </p>
            <h2 className="mt-4 font-display text-3xl">
              {home.promisesHeadingPre} <em className="italic">{home.promisesHeadingItalic}</em>
            </h2>
            <ul className="mt-6 space-y-5">
              {home.promises.map((p) => (
                <li key={p.title} className="flex items-start gap-3 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>
                    <span className="font-medium text-ink">{p.title}</span>
                    <span className="block text-sm text-ink-soft">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-5xl px-6 py-24">
        <div data-reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-clay">
            {home.howItWorksLabel}
          </p>
          <h2 className="mx-auto mt-4 max-w-md text-center font-display text-3xl sm:text-4xl">
            {home.howItWorksHeading}
          </h2>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {home.steps.map((step, i) => (
            <div key={step.title} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-display text-4xl text-clay">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-raised">
        <div className="px-6 py-24" data-reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-clay">
            {home.testimonialsLabel}
          </p>
          <h2 className="mx-auto mt-4 max-w-md text-center font-display text-3xl sm:text-4xl">
            {home.testimonialsHeading}
          </h2>
          <div className="mt-16">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-ink">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {ctaScatter.map((s, i) => (
            <SparkleIcon
              key={i}
              className="absolute text-clay"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                transform: `rotate(${s.rotate})`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
        </div>
        <div
          data-reveal
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-28 text-center text-paper sm:py-32"
        >
          <h2 className="text-balance font-display text-4xl leading-[1.1] sm:text-6xl">
            {home.ctaFinalPre} <em className="italic text-clay">{home.ctaFinalItalic}</em>{" "}
            {home.ctaFinalPost}
          </h2>
          <Link
            href="/plantillas"
            className="rounded-full bg-paper px-9 py-4 text-base font-medium text-ink transition-opacity hover:opacity-90"
          >
            {home.ctaFinalButton}
          </Link>
        </div>
      </section>

      <section id="contacto" className="border-t border-line">
        <div className="mx-auto max-w-2xl px-6 py-24">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-clay">{home.contactLabel}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              {home.contactHeading}
            </h2>
            <p className="mt-4 text-ink-soft">{home.contactSub}</p>
          </div>
          <div data-reveal style={{ transitionDelay: "100ms" }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
