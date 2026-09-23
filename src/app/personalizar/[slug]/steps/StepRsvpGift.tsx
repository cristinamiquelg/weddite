import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";

export default function StepRsvpGift({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-ink">Confirmación de asistencia</p>
        <div className="mt-3 flex flex-col gap-5">
          <Field label="Fecha límite para confirmar">
            <TextInput
              type="date"
              value={data.rsvpDeadline}
              onChange={(e) => onChange({ rsvpDeadline: e.target.value })}
            />
          </Field>
          <Field label="Nota para invitados">
            <TextArea
              rows={3}
              value={data.rsvpNote}
              onChange={(e) => onChange({ rsvpNote: e.target.value })}
              placeholder="Confirmad antes del... indicando alergias."
            />
          </Field>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">Mesa de regalos</p>
        <div className="mt-3 flex flex-col gap-5">
          <Field label="Mensaje">
            <TextArea
              rows={3}
              value={data.giftMessage}
              onChange={(e) => onChange({ giftMessage: e.target.value })}
              placeholder="Vuestra presencia es el mejor regalo..."
            />
          </Field>
          <Field label="Nombre del titular" hint="Opcional">
            <TextInput
              value={data.giftHolderName}
              onChange={(e) => onChange({ giftHolderName: e.target.value })}
              placeholder="Laura García"
            />
          </Field>
          <Field label="Número de cuenta / Bizum" hint="Opcional">
            <TextInput
              value={data.giftAccount}
              onChange={(e) => onChange({ giftAccount: e.target.value })}
              placeholder="ES00 0000 0000 0000 0000 0000"
            />
          </Field>
        </div>
      </div>

      <Field label="Contacto de los organizadores" hint="Opcional">
        <TextInput
          value={data.organizerContact}
          onChange={(e) => onChange({ organizerContact: e.target.value })}
          placeholder="Cualquier duda, escribidnos a..."
        />
      </Field>
    </div>
  );
}
