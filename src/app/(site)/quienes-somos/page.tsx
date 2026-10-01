import type { Metadata } from "next";
import QuienesSomosContent from "@/components/site/QuienesSomosContent";

export const metadata: Metadata = {
  title: "Quiénes somos — Wedite",
  description:
    "La historia detrás de Wedite: por qué existe, qué queremos cambiar y a quién le hacemos las webs de boda.",
};

export default function QuienesSomosPage() {
  return <QuienesSomosContent />;
}
