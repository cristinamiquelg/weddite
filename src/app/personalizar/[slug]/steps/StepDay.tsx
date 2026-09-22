import type { TimelineItem, WeddingData } from "@/lib/wedding-types";
import { Field, TextInput } from "@/components/customize/fields";

export default function StepDay({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  function updateTimeline(index: number, patch: Partial<TimelineItem>) {
    const next = data.timeline.map((item, i) =>
      i === index ? { ...item, ...patch } : item,
    );
    onChange({ timeline: next });
  }

  function addTimelineItem() {
    onChange({
      timeline: [...data.timeline, { time: "", title: "", description: "" }],
    });
  }

  function removeTimelineItem(index: number) {
    onChange({ timeline: data.timeline.filter((_, i) => i !== index) });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-ink">Ceremonia</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <Field label="Lugar">
            <TextInput
              value={data.ceremonyVenue}
              onChange={(e) => onChange({ ceremonyVenue: e.target.value })}
              placeholder="Ermita de Sant Miquel"
            />
          </Field>
          <Field label="Hora">
            <TextInput
              type="time"
              value={data.ceremonyTime}
              onChange={(e) => onChange({ ceremonyTime: e.target.value })}
            />
          </Field>
          <Field label="Dirección" hint="Se usará para el enlace al mapa">
            <TextInput
              value={data.ceremonyAddress}
              onChange={(e) => onChange({ ceremonyAddress: e.target.value })}
              placeholder="Camí de l'Ermita, 3, Begur"
            />
          </Field>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">Celebración</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <Field label="Lugar">
            <TextInput
              value={data.celebrationVenue}
              onChange={(e) => onChange({ celebrationVenue: e.target.value })}
              placeholder="Masía Can Bassa"
            />
          </Field>
          <Field label="Hora">
            <TextInput
              type="time"
              value={data.celebrationTime}
              onChange={(e) => onChange({ celebrationTime: e.target.value })}
            />
          </Field>
          <Field label="Dirección">
            <TextInput
              value={data.celebrationAddress}
              onChange={(e) => onChange({ celebrationAddress: e.target.value })}
              placeholder="Carretera de Regencós, km 4, Begur"
            />
          </Field>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Itinerario del día</p>
          <button
            type="button"
            onClick={addTimelineItem}
            className="text-sm font-medium text-clay hover:underline"
          >
            + Añadir momento
          </button>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {data.timeline.map((item, i) => (
            <div
              key={i}
              className="grid gap-3 rounded-lg border border-line p-4 sm:grid-cols-[100px_1fr_1fr_auto]"
            >
              <TextInput
                type="time"
                value={item.time}
                onChange={(e) => updateTimeline(i, { time: e.target.value })}
              />
              <TextInput
                value={item.title}
                onChange={(e) => updateTimeline(i, { title: e.target.value })}
                placeholder="Cóctel de bienvenida"
              />
              <TextInput
                value={item.description ?? ""}
                onChange={(e) =>
                  updateTimeline(i, { description: e.target.value })
                }
                placeholder="Detalle (opcional)"
              />
              <button
                type="button"
                onClick={() => removeTimelineItem(i)}
                className="rounded-lg border border-line px-3 text-sm text-ink-soft hover:border-clay hover:text-clay"
              >
                Quitar
              </button>
            </div>
          ))}
          {data.timeline.length === 0 ? (
            <p className="text-sm text-ink-soft">
              Añadid los momentos clave del día: ceremonia, cóctel, banquete,
              fiesta...
            </p>
          ) : null}
        </div>
      </div>

      <Field label="Código de vestimenta" hint="Opcional">
        <TextInput
          value={data.dressCode}
          onChange={(e) => onChange({ dressCode: e.target.value })}
          placeholder="Elegante de jardín, evitad el blanco"
        />
      </Field>
    </div>
  );
}
