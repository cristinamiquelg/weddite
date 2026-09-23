export function formatLongDate(iso: string): string {
  if (!iso) return "Fecha por confirmar";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Fecha por confirmar";
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  if (!iso) return "Por confirmar";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Por confirmar";
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
}

export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
