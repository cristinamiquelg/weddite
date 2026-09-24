import type { WeddingData, WeddingPhase, WeddingPlace } from "@/lib/wedding-types";
import { TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function StepItinerary({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;

  function updatePhase(index: number, patch: Partial<WeddingPhase>) {
    onChange({
      phases: data.phases.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    });
  }

  function addPhase() {
    onChange({
      phases: [...data.phases, { name: "", when: "", places: [{ name: "", address: "" }] }],
    });
  }

  function removePhase(index: number) {
    onChange({ phases: data.phases.filter((_, i) => i !== index) });
  }

  function updatePlace(phaseIndex: number, placeIndex: number, patch: Partial<WeddingPlace>) {
    updatePhase(phaseIndex, {
      places: data.phases[phaseIndex].places.map((p, i) =>
        i === placeIndex ? { ...p, ...patch } : p,
      ),
    });
  }

  function addPlace(phaseIndex: number) {
    updatePhase(phaseIndex, {
      places: [...data.phases[phaseIndex].places, { name: "", address: "" }],
    });
  }

  function removePlace(phaseIndex: number, placeIndex: number) {
    updatePhase(phaseIndex, {
      places: data.phases[phaseIndex].places.filter((_, i) => i !== placeIndex),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-ink-soft">{dict.stepItinerary.intro}</p>
      {data.phases.map((phase, pi) => (
        <div key={pi} className="flex flex-col gap-4 rounded-lg border border-line p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <TextInput
                value={phase.name}
                onChange={(e) => updatePhase(pi, { name: e.target.value })}
                placeholder={dict.stepItinerary.phaseNamePlaceholder}
              />
              <TextInput
                value={phase.when}
                onChange={(e) => updatePhase(pi, { when: e.target.value })}
                placeholder={dict.stepItinerary.phaseWhenPlaceholder}
              />
            </div>
            <button
              type="button"
              onClick={() => removePhase(pi)}
              className="rounded-lg border border-line px-3 py-2 text-sm text-ink-soft hover:border-clay hover:text-clay"
            >
              {dict.stepItinerary.removePhase}
            </button>
          </div>

          <div className="flex flex-col gap-3 pl-4">
            {phase.places.map((place, li) => (
              <div key={li} className="flex flex-wrap gap-3">
                <TextInput
                  value={place.name}
                  onChange={(e) => updatePlace(pi, li, { name: e.target.value })}
                  placeholder={dict.stepItinerary.placeNamePlaceholder}
                  className="min-w-[140px] flex-1"
                />
                <TextInput
                  value={place.address}
                  onChange={(e) => updatePlace(pi, li, { address: e.target.value })}
                  placeholder={dict.stepItinerary.placeAddressPlaceholder}
                  className="min-w-[140px] flex-1"
                />
                <button
                  type="button"
                  onClick={() => removePlace(pi, li)}
                  className="shrink-0 rounded-lg border border-line px-3 text-sm text-ink-soft hover:border-clay hover:text-clay"
                >
                  {dict.remove}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlace(pi)}
              className="self-start text-sm font-medium text-clay hover:underline"
            >
              {dict.stepItinerary.addPlace}
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addPhase}
        className="self-start text-sm font-medium text-clay hover:underline"
      >
        {dict.stepItinerary.addPhase}
      </button>
    </div>
  );
}
