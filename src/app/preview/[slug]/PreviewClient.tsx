"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WeddingData } from "@/lib/wedding-types";
import { getDemoWeddingData } from "@/lib/wedding-types";
import { draftStorageKey } from "@/lib/draft-storage";
import { renderTemplate, type TemplateSlug } from "@/components/templates/registry";

type PendingScroll = { sectionId: string; align?: "start" | "end" };

export default function PreviewClient({ slug }: { slug: TemplateSlug }) {
  const [data, setData] = useState<WeddingData>(() => getDemoWeddingData());
  // A ref, not state: it's set synchronously right before setData so the
  // effect below can read it once this render commits, without the extra
  // render a second setState would cause.
  const pendingScrollRef = useRef<PendingScroll | null>(null);
  // Marketing previews (catalog cards, "ver preview" links) always show the
  // curated demo — only ?draft=1 (the wizard's own live iframe, "review
  // before buying", "view your site") should reflect a saved draft, so a
  // couple's own in-progress edits never leak into someone else's browsing
  // of the same design.
  const isDraft = useSearchParams().get("draft") === "1";

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

    function onMessage(event: MessageEvent) {
      const msg = event.data;
      if (msg && msg.type === "weddite:update" && msg.slug === slug) {
        setData(msg.data as WeddingData);
        // A field that just added an item (a new itinerary phase, detail
        // card...) needs the DOM to actually contain that item before we
        // can scroll to it — queue it and let the effect below fire once
        // this data update has rendered, instead of scrolling immediately
        // against the still-old DOM.
        if (msg.scrollTo && typeof msg.scrollTo.sectionId === "string") {
          pendingScrollRef.current = msg.scrollTo as PendingScroll;
        }
      }
      if (msg && msg.type === "weddite:scrollTo" && typeof msg.sectionId === "string") {
        document.getElementById(msg.sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: msg.align === "end" ? "end" : "start",
        });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [slug, isDraft]);

  useEffect(() => {
    const pending = pendingScrollRef.current;
    if (!pending) return;
    pendingScrollRef.current = null;
    document.getElementById(pending.sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: pending.align === "end" ? "end" : "start",
    });
  }, [data]);

  return renderTemplate(slug, data);
}
