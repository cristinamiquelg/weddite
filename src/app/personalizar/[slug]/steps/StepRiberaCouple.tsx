import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const NAME_MAX_LENGTH = 40;

export default function StepRiberaCouple({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dict.stepCouple.yourName}
          required
          requiredLabel={dict.required}
          hint={dict.stepCouple.maxChars(NAME_MAX_LENGTH)}
        >
          <TextInput
            value={data.partnerA}
            onChange={(e) => onChange({ partnerA: e.target.value })}
            placeholder="Cassandra"
            maxLength={NAME_MAX_LENGTH}
          />
        </Field>
        <Field
          label={dict.stepCouple.partnerName}
          required
          requiredLabel={dict.required}
          hint={dict.stepCouple.maxChars(NAME_MAX_LENGTH)}
        >
          <TextInput
            value={data.partnerB}
            onChange={(e) => onChange({ partnerB: e.target.value })}
            placeholder="Jonathan"
            maxLength={NAME_MAX_LENGTH}
          />
        </Field>
      </div>
      <Field label={dict.stepCouple.weddingDate} required requiredLabel={dict.required}>
        <TextInput
          type="date"
          value={data.date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.stepCouple.estateName} hint={dict.stepCouple.estateNameHint}>
          <TextInput
            value={data.estateName}
            onChange={(e) => onChange({ estateName: e.target.value })}
            placeholder="Finca del Faro"
          />
        </Field>
        <Field label={dict.stepCouple.location}>
          <TextInput
            value={data.estateLocation}
            onChange={(e) => onChange({ estateLocation: e.target.value })}
            placeholder="Cadaqués, Girona"
          />
        </Field>
      </div>
      <Field label={dict.stepCouple.hashtag} hint={dict.stepCouple.hashtagHint}>
        <TextInput
          value={data.hashtag}
          onChange={(e) => onChange({ hashtag: e.target.value })}
          placeholder="#CassandraYJonathan"
        />
      </Field>
      <Field label={dict.stepCouple.welcomeMessage}>
        <TextArea
          rows={4}
          value={data.welcomeMessage}
          onChange={(e) => onChange({ welcomeMessage: e.target.value })}
          placeholder={dict.stepCouple.welcomeMessagePlaceholder}
        />
      </Field>
    </div>
  );
}
