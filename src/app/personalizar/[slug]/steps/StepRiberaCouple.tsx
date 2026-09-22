import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";

export default function StepRiberaCouple({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vuestro nombre">
          <TextInput
            value={data.partnerA}
            onChange={(e) => onChange({ partnerA: e.target.value })}
            placeholder="Cassandra"
          />
        </Field>
        <Field label="Nombre de tu pareja">
          <TextInput
            value={data.partnerB}
            onChange={(e) => onChange({ partnerB: e.target.value })}
            placeholder="Jonathan"
          />
        </Field>
      </div>
      <Field label="Fecha de la boda">
        <TextInput
          type="date"
          value={data.date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Finca / lugar principal" hint="El que aparece en la portada">
          <TextInput
            value={data.estateName}
            onChange={(e) => onChange({ estateName: e.target.value })}
            placeholder="Finca del Faro"
          />
        </Field>
        <Field label="Ubicación">
          <TextInput
            value={data.estateLocation}
            onChange={(e) => onChange({ estateLocation: e.target.value })}
            placeholder="Cadaqués, Girona"
          />
        </Field>
      </div>
      <Field label="Hashtag de la boda" hint="Opcional, para redes sociales">
        <TextInput
          value={data.hashtag}
          onChange={(e) => onChange({ hashtag: e.target.value })}
          placeholder="#CassandraYJonathan"
        />
      </Field>
      <Field label="Mensaje de bienvenida" hint="Opcional">
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
