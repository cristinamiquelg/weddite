import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function StepStory({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard.stepStory;

  return (
    <div className="flex flex-col gap-5">
      <Field label={dict.sectionTitle}>
        <TextInput
          value={data.storyTitle}
          onChange={(e) => onChange({ storyTitle: e.target.value })}
          placeholder={dict.sectionTitlePlaceholder}
        />
      </Field>
      <Field label={dict.yourStory} hint={dict.yourStoryHint}>
        <TextArea
          rows={10}
          value={data.story}
          onChange={(e) => onChange({ story: e.target.value })}
          placeholder={dict.yourStoryPlaceholder}
        />
      </Field>
    </div>
  );
}
