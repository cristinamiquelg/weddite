"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WeddingData } from "@/lib/wedding-types";
import { getDemoWeddingData } from "@/lib/wedding-types";
import { draftStorageKey } from "@/lib/draft-storage";
import { renderTemplate, type TemplateSlug } from "@/components/templates/registry";

export default function PreviewClient({ slug }: { slug: TemplateSlug }) {
  const [data, setData] = useState<WeddingData>(() => getDemoWeddingData());
  // Marketing previews (catalog cards, "ver preview" links) always show the
  // curated demo — only ?draft=1 (the wizard's own live iframe, "review
  // before buying", "view your site") should reflect a saved draft, so a
  // couple's own in-progress edits never leak into someone else's browsing
  // of the same design.
  const params = useSearchParams();
  const isDraft = params.get("draft") === "1";

  useEffect(() => {
    if (!isDraft) return;

    try {
      const raw = window.sessionStorage.getItem(draftStorageKey(slug));
      // Merge onto the template's own defaults, not just the raw parsed
      // draft: an older draft saved before a field existed (e.g. `locales`)
      // would otherwise leave that field `undefined` and crash the template.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage after mount
      if (raw) setData({ ...getDemoWeddingData(), ...JSON.parse(raw) });
    } catch {
      // ignore malformed/unavailable storage
    }

    // One shared debounce for every scroll request, whatever kind of
    // message it came from: a burst of these close together (e.g. a
    // keystroke's data update immediately followed by another) each
    // restart the previous smooth-scroll animation before it can finish,
    // so the page visibly stalls partway instead of ever reaching the
    // target. Only the settled, final request — after a short pause —
    // actually scrolls.
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    function scheduleScroll(id: string) {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }

    function onMessage(event: MessageEvent) {
      const msg = event.data;
      if (msg && msg.type === "wedite:update" && msg.slug === slug) {
        setData(msg.data as WeddingData);
        if (typeof msg.scrollTo === "string") scheduleScroll(msg.scrollTo);
      }
      if (msg && msg.type === "wedite:scrollTo" && typeof msg.sectionId === "string") {
        scheduleScroll(msg.sectionId);
      }
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [slug, isDraft]);

  return renderTemplate(slug, data, {
    rsvpHref: `/preview/${slug}/rsvp${isDraft ? "?draft=1" : ""}`,
    initialLocale: params.get("lang") ?? undefined,
  });
}
