import type { DetailCard, DetailCardIcon, WeddingData } from "@/lib/wedding-types";
import { TextInput } from "@/components/customize/fields";

const ICON_LABELS: Record<DetailCardIcon, string> = {
  dresscode: "Dresscode",
  bus: "Autobuses",
  hotel: "Hoteles",
};

export default function StepDetails({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  function updateCard(index: number, patch: Partial<DetailCard>) {
    onChange({
      detailCards: data.detailCards.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    });
  }

  function addCard() {
    onChange({
      detailCards: [...data.detailCards, { icon: "dresscode", title: "", ctaLabel: "" }],
    });
  }

  function removeCard(index: number) {
    onChange({ detailCards: data.detailCards.filter((_, i) => i !== index) });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        Añadid tarjetas informativas para vuestros invitados: dresscode,
        autobuses, hoteles recomendados...
      </p>
      {data.detailCards.map((card, i) => (
        <div key={i} className="flex flex-wrap gap-3 rounded-lg border border-line p-4">
          <select
            value={card.icon}
            onChange={(e) => updateCard(i, { icon: e.target.value as DetailCardIcon })}
            className="min-w-[120px] rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
          >
            {(Object.keys(ICON_LABELS) as DetailCardIcon[]).map((icon) => (
              <option key={icon} value={icon}>
                {ICON_LABELS[icon]}
              </option>
            ))}
          </select>
          <TextInput
            value={card.title}
            onChange={(e) => updateCard(i, { title: e.target.value })}
            placeholder="Dresscode"
            className="min-w-[140px] flex-1"
          />
          <TextInput
            value={card.ctaLabel}
            onChange={(e) => updateCard(i, { ctaLabel: e.target.value })}
            placeholder="Inspiración"
            className="min-w-[140px] flex-1"
          />
          <button
            type="button"
            onClick={() => removeCard(i)}
            className="shrink-0 rounded-lg border border-line px-3 text-sm text-ink-soft hover:border-clay hover:text-clay"
          >
            Quitar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCard}
        className="self-start text-sm font-medium text-clay hover:underline"
      >
        + Añadir tarjeta
      </button>
    </div>
  );
}
