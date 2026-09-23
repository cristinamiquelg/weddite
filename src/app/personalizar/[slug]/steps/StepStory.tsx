import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";

export default function StepStory({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Título de la sección">
        <TextInput
          value={data.storyTitle}
          onChange={(e) => onChange({ storyTitle: e.target.value })}
          placeholder="Nuestra historia"
        />
      </Field>
      <Field
        label="Vuestra historia"
        hint="Cómo os conocisteis, algún hito importante, por qué os casáis."
      >
        <TextArea
          rows={10}
          value={data.story}
          onChange={(e) => onChange({ story: e.target.value })}
          placeholder="Nos conocimos..."
        />
      </Field>
    </div>
  );
}
