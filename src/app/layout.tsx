import type { Metadata } from "next";
import { Fraunces, Inter, Libre_Baskerville, Oswald, Science_Gothic } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/site/ScrollReveal";
import { SiteLocaleProvider } from "@/lib/site-locale";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Used by the "Ribera" wedding template, independent of the app's own
// Fraunces/Inter identity above.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

// The "Ribera" template's real typeface for uppercase/eyebrow text and the
// countdown labels (Oswald above is its fallback while this loads).
const scienceGothic = Science_Gothic({
  variable: "--font-science-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Weddite — Webs de boda que enamoran",
  description:
    "Elige un diseño de web de boda moderno, personalízalo con vuestra historia y hazlo vuestro en minutos. Sin llamadas, sin correos, todo a golpe de clic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${libreBaskerville.variable} ${oswald.variable} ${scienceGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteLocaleProvider>{children}</SiteLocaleProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
