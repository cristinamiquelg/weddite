import type { Metadata } from "next";
import PrivacidadContent from "@/components/site/PrivacidadContent";

export const metadata: Metadata = {
  title: "Política de privacidad — Weddite",
  description: "Qué datos trata Weddite, para qué los usa y cómo podéis ejercer vuestros derechos.",
};

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
