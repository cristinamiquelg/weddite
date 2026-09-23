import { dateLocale, getDict, type Locale } from "./i18n";

export function formatLongDate(iso: string, locale?: Locale): string {
  const dict = getDict(locale);
  if (!iso) return dict.dateFallback.long;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dict.dateFallback.long;
  return d.toLocaleDateString(dateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string, locale?: Locale): string {
  const dict = getDict(locale);
  if (!iso) return dict.dateFallback.short;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dict.dateFallback.short;
  return d.toLocaleDateString(dateLocale(locale), {
    day: "numeric",
    month: "long",
  });
}

export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
