import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const NAME_MAX_LENGTH = 40;
const PLACE_MAX_LENGTH = 60;
const HASHTAG_MAX_LENGTH = 30;
const WELCOME_MAX_LENGTH = 160;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function StepRiberaCouple({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;
  const minDate = todayISO();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dict.stepCouple.yourName}
          required
          requiredLabel={dict.required}
          hint={dict.maxChars(NAME_MAX_LENGTH)}
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
          hint={dict.maxChars(NAME_MAX_LENGTH)}
        >
          <TextInput
            value={data.partnerB}
            onChange={(e) => onChange({ partnerB: e.target.value })}
            placeholder="Jonathan"
            maxLength={NAME_MAX_LENGTH}
          />
        </Field>
      </div>
      <Field
        label={dict.stepCouple.weddingDate}
        required
        requiredLabel={dict.required}
        hint={dict.stepCouple.weddingDateHint}
      >
        <TextInput
          type="date"
          value={data.date}
          min={minDate}
          onChange={(e) => {
            const v = e.target.value;
            // Belt and suspenders: the min attribute blocks the native
            // picker, but a typed/pasted value could still slip a past
            // date through in browsers that don't enforce it.
            if (v && v < minDate) return;
            onChange({ date: v });
          }}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dict.stepCouple.estateName}
          hint={`${dict.stepCouple.estateNameHint} — ${dict.maxChars(PLACE_MAX_LENGTH)}`}
        >
          <TextInput
            value={data.estateName}
            onChange={(e) => onChange({ estateName: e.target.value })}
            placeholder="Finca del Faro"
            maxLength={PLACE_MAX_LENGTH}
          />
        </Field>
        <Field label={dict.stepCouple.location} hint={dict.maxChars(PLACE_MAX_LENGTH)}>
          <TextInput
            value={data.estateLocation}
            onChange={(e) => onChange({ estateLocation: e.target.value })}
            placeholder="Cadaqués, Girona"
            maxLength={PLACE_MAX_LENGTH}
          />
        </Field>
      </div>
      <Field
        label={dict.stepCouple.hashtag}
        hint={`${dict.stepCouple.hashtagHint} — ${dict.maxChars(HASHTAG_MAX_LENGTH)}`}
      >
        <TextInput
          value={data.hashtag}
          onChange={(e) => onChange({ hashtag: e.target.value })}
          placeholder="#CassandraYJonathan"
          maxLength={HASHTAG_MAX_LENGTH}
        />
      </Field>
      <Field label={dict.stepCouple.welcomeMessage} hint={dict.maxChars(WELCOME_MAX_LENGTH)}>
        <TextArea
          rows={4}
          value={data.welcomeMessage}
          onChange={(e) => onChange({ welcomeMessage: e.target.value })}
          placeholder={dict.stepCouple.welcomeMessagePlaceholder}
          maxLength={WELCOME_MAX_LENGTH}
        />
      </Field>
    </div>
  );
}
