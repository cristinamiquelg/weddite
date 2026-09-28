import type { ContactPerson, WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const MAX_CONTACTS = 2;

export default function StepRsvpGift({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard.stepRsvpGift;

  function updateContact(index: number, patch: Partial<ContactPerson>) {
    onChange({
      organizerContacts: data.organizerContacts.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    });
  }

  function addContact() {
    if (data.organizerContacts.length >= MAX_CONTACTS) return;
    onChange({ organizerContacts: [...data.organizerContacts, { name: "", phone: "", email: "" }] });
  }

  function removeContact(index: number) {
    onChange({ organizerContacts: data.organizerContacts.filter((_, i) => i !== index) });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-ink">{dict.rsvpSectionTitle}</p>
        <div className="mt-3 flex flex-col gap-5">
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

      <div>
        <p className="text-sm font-semibold text-ink">{dict.contactSectionTitle}</p>
        <div className="mt-3 flex flex-col gap-4">
          {data.organizerContacts.map((contact, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-lg border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-ink-soft">
                  {dict.contactPersonLabel(i + 1)}
                </span>
                <button
                  type="button"
                  onClick={() => removeContact(i)}
                  className="text-sm text-ink-soft hover:text-clay"
                >
                  {dict.removeContactPerson}
                </button>
              </div>
              <TextInput
                value={contact.name}
                onChange={(e) => updateContact(i, { name: e.target.value })}
                placeholder={dict.contactNamePlaceholder}
              />
              <div className="flex flex-wrap gap-3">
                <TextInput
                  type="tel"
                  value={contact.phone ?? ""}
                  onChange={(e) => updateContact(i, { phone: e.target.value })}
                  placeholder={dict.contactPhonePlaceholder}
                  className="min-w-[140px] flex-1"
                />
                <TextInput
                  type="email"
                  value={contact.email ?? ""}
                  onChange={(e) => updateContact(i, { email: e.target.value })}
                  placeholder={dict.contactEmailPlaceholder}
                  className="min-w-[140px] flex-1"
                />
              </div>
              <p className="text-xs text-ink-soft">{dict.contactHint}</p>
            </div>
          ))}
          {data.organizerContacts.length < MAX_CONTACTS ? (
            <button
              type="button"
              onClick={addContact}
              className="self-start text-sm font-medium text-clay hover:underline"
            >
              {dict.addContactPerson}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
