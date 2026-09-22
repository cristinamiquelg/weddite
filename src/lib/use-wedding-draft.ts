"use client";

import { useEffect, useState } from "react";
import { emptyWeddingData, type WeddingData } from "@/lib/wedding-types";
import { draftStorageKey } from "@/lib/draft-storage";

export function useWeddingDraft(slug: string) {
  const [data, setData] = useState<WeddingData>(emptyWeddingData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount: reading it during
    // render would desync the client from the server-rendered markup.
    try {
      const raw = window.localStorage.getItem(draftStorageKey(slug));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
      setData(raw ? { ...emptyWeddingData, ...JSON.parse(raw) } : emptyWeddingData);
    } catch {
      setData(emptyWeddingData);
    } finally {
      setLoaded(true);
    }
  }, [slug]);

  useEffect(() => {
    // Guarded by `loaded` (state, not a ref) so this effect still sees the
    // pre-hydration `data` as stale on the render that flips `loaded` to
    // true, and skips writing — otherwise it would persist the empty
    // default over whatever the load effect above just read.
    if (!loaded) return;
    try {
      window.localStorage.setItem(draftStorageKey(slug), JSON.stringify(data));
    } catch {
      // storage unavailable (private mode, quota, etc.) — safe to ignore
    }
  }, [slug, data, loaded]);

  return { data, setData, loaded };
}
