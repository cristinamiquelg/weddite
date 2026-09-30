"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Template } from "@/lib/templates";
import type { WeddingData } from "@/lib/wedding-types";
import { useWeddingDraft } from "@/lib/use-wedding-draft";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";
import StepStory from "./steps/StepStory";
import StepRsvpGift from "./steps/StepRsvpGift";
import StepRiberaCouple from "./steps/StepRiberaCouple";
import StepItinerary from "./steps/StepItinerary";
import StepDetails from "./steps/StepDetails";
import StepLanguage from "./steps/StepLanguage";

type StepDef = {
  key: string;
  // The template section this step's fields land in, so the preview can
  // scroll there when the couple opens the step — null for steps (like
  // the language picker) that don't map to one spot on the page.
  sectionId: string | null;
  Component: (props: {
    data: WeddingData;
    onChange: (patch: Partial<WeddingData>) => void;
  }) => React.ReactElement;
};

const steps: StepDef[] = [
  { key: "language", sectionId: null, Component: StepLanguage },
  { key: "couple", sectionId: "top", Component: StepRiberaCouple },
  { key: "story", sectionId: "historia", Component: StepStory },
  { key: "itinerary", sectionId: "itinerario", Component: StepItinerary },
  { key: "details", sectionId: "detalles", Component: StepDetails },
  { key: "rsvp", sectionId: "rsvp", Component: StepRsvpGift },
];

export default function CustomizeClient({ template }: { template: Template }) {
  const { data, setData, loaded } = useWeddingDraft(template.slug);
  const { locale, setLocale } = useSiteLocale();
  const dict = getSiteDict(locale);
  const [stepIndex, setStepIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "weddite:update", slug: template.slug, data },
      window.location.origin,
    );
  }, [data, template.slug]);

  const sectionId = steps[stepIndex].sectionId;

  function scrollToSection(id: string | null) {
    if (!id) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "weddite:scrollTo", sectionId: id },
      window.location.origin,
    );
  }

  // Scroll as soon as the step opens, even before the couple clicks into a field.
  useEffect(() => {
    scrollToSection(sectionId);
  }, [sectionId]);

  function patch(p: Partial<WeddingData>) {
    setData((prev) => ({ ...prev, ...p }));
  }

  const Step = steps[stepIndex].Component;
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-lg">
            Weddite
          </Link>
          <span className="hidden text-sm text-ink-soft sm:inline">
            {dict.wizard.personalizing(template.name)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden text-xs text-ink-soft sm:block">
            {loaded ? dict.wizard.savingAuto : dict.wizard.loading}
          </p>
          <div className="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setLocale("es")}
              aria-pressed={locale === "es"}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "es" ? "bg-ink text-paper" : "text-ink-soft hover:bg-line/60 hover:text-ink"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "en" ? "bg-ink text-paper" : "text-ink-soft hover:bg-line/60 hover:text-ink"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-2 border-b border-line px-6 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
            mobileTab === "form" ? "bg-ink text-paper" : "text-ink-soft"
          }`}
        >
          {dict.wizard.editTab}
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
            mobileTab === "preview" ? "bg-ink text-paper" : "text-ink-soft"
          }`}
        >
          {dict.wizard.previewTab}
        </button>
      </div>

      <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
        <div
          className={`flex-col overflow-y-auto px-6 py-8 lg:flex ${
            mobileTab === "form" ? "flex" : "hidden"
          }`}
        >
          <ol className="mb-8 flex flex-wrap gap-2">
            {steps.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setStepIndex(i)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    i === stepIndex
                      ? "border-clay bg-clay/10 text-clay"
                      : "border-line text-ink-soft hover:border-ink-soft"
                  }`}
                >
                  {i + 1}. {dict.wizard.stepLabels[s.key as keyof typeof dict.wizard.stepLabels]}
                </button>
              </li>
            ))}
          </ol>

          <div className="mx-auto w-full max-w-xl flex-1">
            <h1 className="font-display text-2xl">
              {dict.wizard.stepLabels[steps[stepIndex].key as keyof typeof dict.wizard.stepLabels]}
            </h1>
            {/* onFocus (React delegates it, so it fires for any descendant
                field) re-sends the scroll on every click/tab into a field —
                not just once when the step first opens — since a step like
                "Detalles" can have several cards spread further down. */}
            <div className="mt-6" onFocus={() => scrollToSection(sectionId)}>
              <Step data={data} onChange={patch} />
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-xl flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="w-full rounded-full border border-line px-6 py-3 text-center text-sm font-medium text-ink disabled:opacity-40 sm:w-auto"
            >
              {dict.wizard.back}
            </button>
            {isLast ? (
              <Link
                href={`/personalizar/${template.slug}/confirmar`}
                className="w-full rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:w-auto"
              >
                {dict.wizard.reviewAndBuy}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                className="w-full rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:w-auto"
              >
                {dict.wizard.next}
              </button>
            )}
          </div>
        </div>

        <div
          className={`flex-col border-line bg-paper lg:flex lg:border-l ${
            mobileTab === "preview" ? "flex" : "hidden"
          }`}
        >
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 text-xs text-ink-soft">{dict.wizard.livePreview}</span>
          </div>
          <iframe
            ref={iframeRef}
            src={`/preview/${template.slug}?draft=1`}
            title={dict.wizard.iframeTitle}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
