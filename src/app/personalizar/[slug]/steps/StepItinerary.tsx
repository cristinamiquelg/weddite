import type { WeddingData, WeddingPhase, WeddingPlace } from "@/lib/wedding-types";
import { TextInput } from "@/components/customize/fields";

export default function StepItinerary({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
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
      <p className="text-sm text-ink-soft">
        Organizad el día en fases (pre-boda, boda, post-boda...) y añadid los
        lugares de cada una.
      </p>
      {data.phases.map((phase, pi) => (
        <div key={pi} className="flex flex-col gap-4 rounded-lg border border-line p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <TextInput
                value={phase.name}
                onChange={(e) => updatePhase(pi, { name: e.target.value })}
                placeholder="La boda"
              />
              <TextInput
                value={phase.when}
                onChange={(e) => updatePhase(pi, { when: e.target.value })}
                placeholder="Sábado 11, 18:00"
              />
            </div>
            <button
              type="button"
              onClick={() => removePhase(pi)}
              className="rounded-lg border border-line px-3 py-2 text-sm text-ink-soft hover:border-clay hover:text-clay"
            >
              Quitar fase
            </button>
          </div>

          <div className="flex flex-col gap-3 pl-4">
            {phase.places.map((place, li) => (
              <div key={li} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <TextInput
                  value={place.name}
                  onChange={(e) => updatePlace(pi, li, { name: e.target.value })}
                  placeholder="Ermita de Sant Baldiri"
                />
                <TextInput
                  value={place.address}
                  onChange={(e) => updatePlace(pi, li, { address: e.target.value })}
                  placeholder="Dirección"
                />
                <button
                  type="button"
                  onClick={() => removePlace(pi, li)}
                  className="rounded-lg border border-line px-3 text-sm text-ink-soft hover:border-clay hover:text-clay"
                >
                  Quitar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlace(pi)}
              className="self-start text-sm font-medium text-clay hover:underline"
            >
              + Añadir lugar
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addPhase}
        className="self-start text-sm font-medium text-clay hover:underline"
      >
        + Añadir fase
      </button>
    </div>
  );
}
