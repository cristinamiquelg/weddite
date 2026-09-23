"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Template } from "@/lib/templates";
import type { WeddingData } from "@/lib/wedding-types";
import { useWeddingDraft } from "@/lib/use-wedding-draft";
import StepCouple from "./steps/StepCouple";
import StepStory from "./steps/StepStory";
import StepDay from "./steps/StepDay";
import StepGallery from "./steps/StepGallery";
import StepRsvpGift from "./steps/StepRsvpGift";
import StepStyle from "./steps/StepStyle";
import StepRiberaCouple from "./steps/StepRiberaCouple";
import StepItinerary from "./steps/StepItinerary";
import StepDetails from "./steps/StepDetails";
import StepLanguage from "./steps/StepLanguage";

type StepDef = {
  key: string;
  label: string;
  Component: (props: {
    data: WeddingData;
    onChange: (patch: Partial<WeddingData>) => void;
  }) => React.ReactElement;
};

const auroraSteps: StepDef[] = [
  { key: "couple", label: "Pareja y fecha", Component: StepCouple },
  { key: "story", label: "Vuestra historia", Component: StepStory },
  { key: "day", label: "El gran día", Component: StepDay },
  { key: "gallery", label: "Galería", Component: StepGallery },
  { key: "rsvp", label: "RSVP y regalo", Component: StepRsvpGift },
  { key: "style", label: "Estilo", Component: StepStyle },
  { key: "language", label: "Idioma", Component: StepLanguage },
];

const riberaSteps: StepDef[] = [
  { key: "couple", label: "Pareja y fecha", Component: StepRiberaCouple },
  { key: "story", label: "Vuestra historia", Component: StepStory },
  { key: "itinerary", label: "Itinerario y lugares", Component: StepItinerary },
  { key: "details", label: "Detalles", Component: StepDetails },
  { key: "rsvp", label: "RSVP y regalo", Component: StepRsvpGift },
  { key: "language", label: "Idioma", Component: StepLanguage },
];

function stepsForTemplate(slug: string): StepDef[] {
  return slug === "ribera" ? riberaSteps : auroraSteps;
}

export default function CustomizeClient({ template }: { template: Template }) {
  const { data, setData, loaded } = useWeddingDraft(template.slug);
  const steps = stepsForTemplate(template.slug);
  const [stepIndex, setStepIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "weddite:update", slug: template.slug, data },
      window.location.origin,
    );
  }, [data, template.slug]);

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
            Personalizando · {template.name}
          </span>
        </div>
        <p className="text-xs text-ink-soft">
          {loaded ? "Guardado automáticamente" : "Cargando..."}
        </p>
      </header>

      <div className="flex items-center gap-2 border-b border-line px-6 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
            mobileTab === "form" ? "bg-ink text-paper" : "text-ink-soft"
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
            mobileTab === "preview" ? "bg-ink text-paper" : "text-ink-soft"
          }`}
        >
          Vista previa
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
                  {i + 1}. {s.label}
                </button>
              </li>
            ))}
          </ol>

          <div className="mx-auto w-full max-w-xl flex-1">
            <h1 className="font-display text-2xl">{steps[stepIndex].label}</h1>
            <div className="mt-6">
              <Step data={data} onChange={patch} />
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-xl justify-between">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink disabled:opacity-40"
            >
              Atrás
            </button>
            {isLast ? (
              <Link
                href={`/personalizar/${template.slug}/confirmar`}
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              >
                Revisar y comprar
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              >
                Siguiente
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
            <span className="ml-3 text-xs text-ink-soft">Vista previa en directo</span>
          </div>
          <iframe
            ref={iframeRef}
            src={`/preview/${template.slug}`}
            title="Vista previa en directo de vuestra web de boda"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
