import type { PaletteId } from "@/lib/wedding-types";

export type PaletteTokens = {
  label: string;
  bg: string;
  surface: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accentSoft: string;
  line: string;
};

export const palettes: Record<PaletteId, PaletteTokens> = {
  clay: {
    label: "Terracota",
    bg: "#faf6f1",
    surface: "#ffffff",
    ink: "#241f1a",
    inkSoft: "#5c5148",
    accent: "#b5583a",
    accentSoft: "#f1e0d6",
    line: "#e6ddd2",
  },
  sage: {
    label: "Verde salvia",
    bg: "#f6f7f1",
    surface: "#ffffff",
    ink: "#20261c",
    inkSoft: "#4d5646",
    accent: "#5f6b4f",
    accentSoft: "#e4e9db",
    line: "#dde3d2",
  },
  midnight: {
    label: "Azul medianoche",
    bg: "#11151f",
    surface: "#171c29",
    ink: "#f3f1ea",
    inkSoft: "#b9bdcc",
    accent: "#c9a86a",
    accentSoft: "#242b3d",
    line: "#2b3145",
  },
};

export function paletteCssVars(id: PaletteId): React.CSSProperties {
  const p = palettes[id];
  return {
    "--w-bg": p.bg,
    "--w-surface": p.surface,
    "--w-ink": p.ink,
    "--w-ink-soft": p.inkSoft,
    "--w-accent": p.accent,
    "--w-accent-soft": p.accentSoft,
    "--w-line": p.line,
  } as React.CSSProperties;
}
