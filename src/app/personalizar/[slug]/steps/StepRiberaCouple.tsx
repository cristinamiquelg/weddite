import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import DatePicker, { todayISO } from "@/components/customize/DatePicker";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const NAME_MAX_LENGTH = 40;
const PLACE_MAX_LENGTH = 60;
const WELCOME_MAX_LENGTH = 160;

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
      <Field label={dict.stepCouple.weddingDate} required requiredLabel={dict.required} asDiv>
        <DatePicker
          value={data.date}
          min={minDate}
          locale={locale}
          placeholder={dict.stepCouple.datePlaceholder}
          prevMonthLabel={dict.stepCouple.prevMonth}
          nextMonthLabel={dict.stepCouple.nextMonth}
          ariaLabel={dict.stepCouple.weddingDate}
          onChange={(date) => onChange({ date })}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dict.stepCouple.estateName}
          hint={dict.maxChars(PLACE_MAX_LENGTH)}
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
      {/* Shows up in the countdown section, not the hero with the rest of
          this step's fields — flagged so the preview scrolls to where it
          actually renders. */}
      <div data-scroll-section="cuando">
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
    </div>
  );
}
