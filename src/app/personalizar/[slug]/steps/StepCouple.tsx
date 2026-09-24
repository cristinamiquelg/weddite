import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const NAME_MAX_LENGTH = 40;

export default function StepCouple({
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
            placeholder="Laura"
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
            placeholder="Marc"
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
      <Field label={dict.stepCouple.hashtag} hint={dict.stepCouple.hashtagHint}>
        <TextInput
          value={data.hashtag}
          onChange={(e) => onChange({ hashtag: e.target.value })}
          placeholder="#LauraYMarc2027"
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
