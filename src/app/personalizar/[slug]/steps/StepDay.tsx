import type { TimelineItem, WeddingData } from "@/lib/wedding-types";
import { Field, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function StepDay({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;

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
        <p className="text-sm font-semibold text-ink">{dict.stepDay.ceremony}</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <Field label={dict.stepDay.venue}>
            <TextInput
              value={data.ceremonyVenue}
              onChange={(e) => onChange({ ceremonyVenue: e.target.value })}
              placeholder="Ermita de Sant Miquel"
            />
          </Field>
          <Field label={dict.stepDay.time}>
            <TextInput
              type="time"
              value={data.ceremonyTime}
              onChange={(e) => onChange({ ceremonyTime: e.target.value })}
            />
          </Field>
          <Field label={dict.stepDay.address} hint={dict.stepDay.addressHint}>
            <TextInput
              value={data.ceremonyAddress}
              onChange={(e) => onChange({ ceremonyAddress: e.target.value })}
              placeholder="Camí de l'Ermita, 3, Begur"
            />
          </Field>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">{dict.stepDay.celebration}</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <Field label={dict.stepDay.venue}>
            <TextInput
              value={data.celebrationVenue}
              onChange={(e) => onChange({ celebrationVenue: e.target.value })}
              placeholder="Masía Can Bassa"
            />
          </Field>
          <Field label={dict.stepDay.time}>
            <TextInput
              type="time"
              value={data.celebrationTime}
              onChange={(e) => onChange({ celebrationTime: e.target.value })}
            />
          </Field>
          <Field label={dict.stepDay.address}>
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
          <p className="text-sm font-semibold text-ink">{dict.stepDay.dayItinerary}</p>
          <button
            type="button"
            onClick={addTimelineItem}
            className="text-sm font-medium text-clay hover:underline"
          >
            {dict.stepDay.addMoment}
          </button>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {data.timeline.map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap gap-3 rounded-lg border border-line p-4"
            >
              <TextInput
                type="time"
                value={item.time}
                onChange={(e) => updateTimeline(i, { time: e.target.value })}
                className="w-[110px] shrink-0"
              />
              <TextInput
                value={item.title}
                onChange={(e) => updateTimeline(i, { title: e.target.value })}
                placeholder={dict.stepDay.momentTitlePlaceholder}
                className="min-w-[140px] flex-1"
              />
              <TextInput
                value={item.description ?? ""}
                onChange={(e) =>
                  updateTimeline(i, { description: e.target.value })
                }
                placeholder={dict.stepDay.detailPlaceholder}
                className="min-w-[140px] flex-1"
              />
              <button
                type="button"
                onClick={() => removeTimelineItem(i)}
                className="shrink-0 rounded-lg border border-line px-3 text-sm text-ink-soft hover:border-clay hover:text-clay"
              >
                {dict.remove}
              </button>
            </div>
          ))}
          {data.timeline.length === 0 ? (
            <p className="text-sm text-ink-soft">{dict.stepDay.emptyTimeline}</p>
          ) : null}
        </div>
      </div>

      <Field label={dict.stepDay.dressCode} hint={dict.stepDay.dressCodeHint}>
        <TextInput
          value={data.dressCode}
          onChange={(e) => onChange({ dressCode: e.target.value })}
          placeholder={dict.stepDay.dressCodePlaceholder}
        />
      </Field>
    </div>
  );
}
