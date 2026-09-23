import type { Metadata } from "next";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";

export const metadata: Metadata = {
  title: "Quiénes somos — Weddite",
  description:
    "La historia detrás de Weddite: por qué existe, qué queremos cambiar y a quién le hacemos las webs de boda.",
};

export default function QuienesSomosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-clay">Quiénes somos</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">
          Nos casamos, buscamos una web bonita y no la encontramos
          <SparkleIcon className="ml-2 inline-block h-[0.6em] w-[0.6em] -translate-y-1 text-clay" />
        </h1>
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft" data-reveal style={{ transitionDelay: "80ms" }}>
        <p>
          Weddite nació de una frustración muy concreta: preparar una boda ya
          implica mil decisiones, y la web de la boda —el sitio al que van a
          entrar todos tus invitados— solía ser la más decepcionante de
          todas. O plantillas genéricas de hace quince años, o presupuestos a
          medida que tardaban días en llegar por correo.
        </p>
        <p>
          Así que decidimos hacerlo de otra forma: un catálogo de plantillas
          diseñadas con el mismo cuidado que el resto de la boda, con preview
          en directo antes de pagar un euro, y personalización al instante,
          sin intermediarios ni llamadas.
        </p>
        <p>
          Hoy Weddite es un proyecto pequeño, hecho a mano, con dos
          plantillas propias —Aurora y Ribera— y la idea de seguir añadiendo
          más. Si tenéis feedback, ideas o simplemente queréis contarnos
          cómo va la boda, nos encanta escuchar: podéis escribirnos desde el{" "}
          <Link href="/#contacto" className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay">
            formulario de contacto
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
