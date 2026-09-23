"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/lib/wedding-types";
import { getDemoWeddingData } from "@/lib/wedding-types";
import { draftStorageKey } from "@/lib/draft-storage";
import { renderTemplate, type TemplateSlug } from "@/components/templates/registry";

export default function PreviewClient({ slug }: { slug: TemplateSlug }) {
  const [data, setData] = useState<WeddingData>(() => getDemoWeddingData(slug));

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftStorageKey(slug));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
      if (raw) setData(JSON.parse(raw));
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
  }, [slug]);

  return renderTemplate(slug, data);
}
