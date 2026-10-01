import type { Metadata } from "next";
import ComingSoonContent from "./ComingSoonContent";

const title = "Wedite — Muy pronto";
const description =
  "Estamos terminando Wedite: webs de boda con diseño propio, que se personalizan en minutos y enamoran desde el primer vistazo.";

export const metadata: Metadata = {
  title,
  description,
  // Overriding openGraph here drops the file-based image from the root, so it
  // is listed explicitly (the ?v bumps WhatsApp/Slack's cached preview).
  openGraph: {
    title,
    description,
    siteName: "Wedite",
    type: "website",
    locale: "es_ES",
    images: [{ url: "/opengraph-image.png?v=2", width: 1200, height: 630, alt: "Wedite" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png?v=2"] },
};

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
