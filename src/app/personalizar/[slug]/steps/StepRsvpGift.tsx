import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function StepRsvpGift({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard.stepRsvpGift;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-ink">{dict.rsvpSectionTitle}</p>
        <div className="mt-3 flex flex-col gap-5">
          <Field label={dict.deadline}>
            <TextInput
              type="date"
              value={data.rsvpDeadline}
              onChange={(e) => onChange({ rsvpDeadline: e.target.value })}
            />
          </Field>
          <Field label={dict.noteForGuests}>
            <TextArea
              rows={3}
              value={data.rsvpNote}
              onChange={(e) => onChange({ rsvpNote: e.target.value })}
              placeholder={dict.notePlaceholder}
            />
          </Field>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">{dict.giftTableTitle}</p>
        <div className="mt-3 flex flex-col gap-5">
          <Field label={dict.message}>
            <TextArea
              rows={3}
              value={data.giftMessage}
              onChange={(e) => onChange({ giftMessage: e.target.value })}
              placeholder={dict.messagePlaceholder}
            />
          </Field>
          <Field label={dict.accountHolder}>
            <TextInput
              value={data.giftHolderName}
              onChange={(e) => onChange({ giftHolderName: e.target.value })}
              placeholder="Laura García"
            />
          </Field>
          <Field label={dict.accountNumber}>
            <TextInput
              value={data.giftAccount}
              onChange={(e) => onChange({ giftAccount: e.target.value })}
              placeholder="ES00 0000 0000 0000 0000 0000"
            />
          </Field>
        </div>
      </div>

      <Field label={dict.organizerContact}>
        <TextInput
          value={data.organizerContact}
          onChange={(e) => onChange({ organizerContact: e.target.value })}
          placeholder={dict.organizerContactPlaceholder}
        />
      </Field>
    </div>
  );
}
