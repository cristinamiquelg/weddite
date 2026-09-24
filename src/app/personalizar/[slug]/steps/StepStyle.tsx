import type { PaletteId, WeddingData } from "@/lib/wedding-types";
import { palettes } from "@/components/templates/palette";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const paletteIds = Object.keys(palettes) as PaletteId[];

export default function StepStyle({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;
  const paletteLabels: Record<PaletteId, string> = dict.paletteLabels;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">{dict.stepStyle.intro}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {paletteIds.map((id) => {
          const p = palettes[id];
          const active = data.palette === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ palette: id })}
              className={`flex flex-col gap-3 rounded-xl border p-4 text-left transition-colors ${
                active ? "border-clay ring-1 ring-clay" : "border-line hover:border-ink-soft"
              }`}
            >
              <div className="flex gap-1.5">
                <span
                  className="h-8 w-8 rounded-full border border-line"
                  style={{ background: p.bg }}
                />
                <span
                  className="h-8 w-8 rounded-full border border-line"
                  style={{ background: p.accent }}
                />
                <span
                  className="h-8 w-8 rounded-full border border-line"
                  style={{ background: p.ink }}
                />
              </div>
              <span className="text-sm font-medium text-ink">{paletteLabels[id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
