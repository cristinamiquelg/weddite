import type { WeddingData } from "@/lib/wedding-types";
import { Field, TextArea, TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

const TITLE_MAX_LENGTH = 50;
const STORY_MAX_LENGTH = 600;

export default function StepStory({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard.stepStory;
  const maxChars = getSiteDict(locale).wizard.maxChars;

  return (
    <div className="flex flex-col gap-5">
      <Field label={dict.sectionTitle} hint={maxChars(TITLE_MAX_LENGTH)}>
        <TextInput
          value={data.storyTitle}
          onChange={(e) => onChange({ storyTitle: e.target.value })}
          placeholder={dict.sectionTitlePlaceholder}
          maxLength={TITLE_MAX_LENGTH}
        />
      </Field>
      <Field label={dict.yourStory} hint={`${dict.yourStoryHint} — ${maxChars(STORY_MAX_LENGTH)}`}>
        <TextArea
          rows={10}
          value={data.story}
          onChange={(e) => onChange({ story: e.target.value })}
          placeholder={dict.yourStoryPlaceholder}
          maxLength={STORY_MAX_LENGTH}
        />
      </Field>
      <Field label={dict.storyImage} hint={dict.storyImageHint}>
        <div className="flex items-center gap-4">
          {data.storyImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.storyImage}
              alt=""
              className="h-16 w-16 rounded-lg object-cover"
            />
          ) : null}
          <label className="cursor-pointer rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink transition-colors hover:border-clay">
            {dict.storyImageChoose}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => onChange({ storyImage: reader.result as string });
                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />
          </label>
          {data.storyImage ? (
            <button
              type="button"
              onClick={() => onChange({ storyImage: undefined })}
              className="text-sm text-ink-soft underline underline-offset-2 hover:text-ink"
            >
              {dict.storyImageRemove}
            </button>
          ) : null}
        </div>
      </Field>
    </div>
  );
}
