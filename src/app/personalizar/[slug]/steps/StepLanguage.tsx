import type { WeddingData } from "@/lib/wedding-types";
import { locales } from "@/lib/i18n";

export default function StepLanguage({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        Elegid el idioma en el que se mostrarán los textos fijos de la web
        (menú, botones, formulario de RSVP...). Lo que escribáis vosotros
        (historia, mensajes...) se mostrará tal cual lo escribáis.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {locales.map((l) => {
          const active = data.locale === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onChange({ locale: l.id })}
              className={`flex flex-col gap-1 rounded-xl border p-4 text-left transition-colors ${
                active ? "border-clay ring-1 ring-clay" : "border-line hover:border-ink-soft"
              }`}
            >
              <span className="text-sm font-medium text-ink">{l.label}</span>
              <span className="text-xs text-ink-soft">
                {l.id === "es" ? "Menú, RSVP y botones en español" : "Menu, RSVP and buttons in English"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
