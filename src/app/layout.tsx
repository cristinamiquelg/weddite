import type { Metadata } from "next";
import { Fraunces, Inter, Libre_Baskerville, Oswald } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/site/ScrollReveal";

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

export const metadata: Metadata = {
  title: "Weddite — Webs de boda que enamoran",
  description:
    "Elige una plantilla de web de boda moderna, personalízala con vuestra historia y contrátala en minutos. Sin llamadas, sin correos, todo a golpe de clic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${libreBaskerville.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
