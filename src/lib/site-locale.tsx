"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type SiteLocale = "es" | "en";
const STORAGE_KEY = "weddite:site-locale";

const SiteLocaleContext = createContext<{
  locale: SiteLocale;
  setLocale: (l: SiteLocale) => void;
} | null>(null);

export function SiteLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
        setLocaleState(stored);
      }
    } catch {
      // storage unavailable — stay on the default
    }
  }, []);

  function setLocale(l: SiteLocale) {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // storage unavailable — the choice just won't persist
    }
  }

  return (
    <SiteLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </SiteLocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const ctx = useContext(SiteLocaleContext);
  if (!ctx) throw new Error("useSiteLocale must be used within SiteLocaleProvider");
  return ctx;
}
