"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WeddingData } from "@/lib/wedding-types";
import { getDemoWeddingData } from "@/lib/wedding-types";
import { draftStorageKey } from "@/lib/draft-storage";
import { renderTemplate, type TemplateSlug } from "@/components/templates/registry";

export default function PreviewClient({ slug }: { slug: TemplateSlug }) {
  const [data, setData] = useState<WeddingData>(() => getDemoWeddingData(slug));
  // Marketing previews (catalog cards, "ver preview" links) always show the
  // curated demo — only ?draft=1 (the wizard's own live iframe, "review
  // before buying", "view your site") should reflect a saved draft, so a
  // couple's own in-progress edits never leak into someone else's browsing
  // of the same design.
  const isDraft = useSearchParams().get("draft") === "1";

  useEffect(() => {
    if (!isDraft) return;

    try {
      const raw = window.localStorage.getItem(draftStorageKey(slug));
      // Merge onto the template's own defaults, not just the raw parsed
      // draft: an older draft saved before a field existed (e.g. `locales`)
      // would otherwise leave that field `undefined` and crash the template.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
      if (raw) setData({ ...getDemoWeddingData(slug), ...JSON.parse(raw) });
    } catch {
      // ignore malformed/unavailable storage
    }

    function onMessage(event: MessageEvent) {
      const msg = event.data;
      if (msg && msg.type === "weddite:update" && msg.slug === slug) {
        setData(msg.data as WeddingData);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [slug, isDraft]);

  return renderTemplate(slug, data);
}
