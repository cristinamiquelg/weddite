import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";

const NAME_MAX_LENGTH = 40;

export default function StepCouple({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vuestro nombre" required hint={`Máx. ${NAME_MAX_LENGTH} caracteres`}>
          <TextInput
            value={data.partnerA}
            onChange={(e) => onChange({ partnerA: e.target.value })}
            placeholder="Laura"
            maxLength={NAME_MAX_LENGTH}
          />
        </Field>
        <Field label="Nombre de tu pareja" required hint={`Máx. ${NAME_MAX_LENGTH} caracteres`}>
          <TextInput
            value={data.partnerB}
            onChange={(e) => onChange({ partnerB: e.target.value })}
            placeholder="Marc"
            maxLength={NAME_MAX_LENGTH}
          />
        </Field>
      </div>
      <Field label="Fecha de la boda" required>
        <TextInput
          type="date"
          value={data.date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </Field>
      <Field label="Hashtag de la boda" hint="Para redes sociales">
        <TextInput
          value={data.hashtag}
          onChange={(e) => onChange({ hashtag: e.target.value })}
          placeholder="#LauraYMarc2027"
        />
      </Field>
      <Field label="Mensaje de bienvenida">
        <TextArea
          rows={4}
          value={data.welcomeMessage}
          onChange={(e) => onChange({ welcomeMessage: e.target.value })}
          placeholder="Lo primero que leerán vuestros invitados al entrar en la web."
        />
      </Field>
    </div>
  );
}
