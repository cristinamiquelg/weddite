import type { WeddingData } from "@/lib/wedding-types";
import { TextInput } from "@/components/customize/fields";
import { useSiteLocale } from "@/lib/site-locale";
import { getSiteDict } from "@/lib/site-dict";

export default function StepGallery({
  data,
  onChange,
}: {
  data: WeddingData;
  onChange: (patch: Partial<WeddingData>) => void;
}) {
  const { locale } = useSiteLocale();
  const dict = getSiteDict(locale).wizard;

  function updateCaption(index: number, value: string) {
    const next = data.galleryCaptions.map((c, i) => (i === index ? value : c));
    onChange({ galleryCaptions: next });
  }

  function addPhoto() {
    onChange({ galleryCaptions: [...data.galleryCaptions, ""] });
  }

  function removePhoto(index: number) {
    onChange({
      galleryCaptions: data.galleryCaptions.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">{dict.stepGallery.intro}</p>
      <div className="flex flex-col gap-3">
        {data.galleryCaptions.map((caption, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-xs text-ink-soft">
              {i + 1}
            </span>
            <TextInput
              value={caption}
              onChange={(e) => updateCaption(i, e.target.value)}
              placeholder={dict.stepGallery.captionPlaceholder}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removePhoto(i)}
              className="rounded-lg border border-line px-3 py-2 text-sm text-ink-soft hover:border-clay hover:text-clay"
            >
              {dict.remove}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addPhoto}
        className="self-start text-sm font-medium text-clay hover:underline"
      >
        {dict.stepGallery.addPhoto}
      </button>
    </div>
  );
}
