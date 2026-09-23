import type { Metadata } from "next";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";

export const metadata: Metadata = {
  title: "Quiénes somos — Weddite",
  description:
    "La historia detrás de Weddite: por qué existe, qué queremos cambiar y a quién le hacemos las webs de boda.",
};

const promise = [
  "Diseños que nos gustaría enseñar.",
  "Personalización sin esperar a nadie.",
  "Una preview antes de pagar.",
  "Y una web que podéis tener lista en minutos.",
];

export default function QuienesSomosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-clay">Quiénes somos</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">
          Nos casamos. Buscamos una web bonita. No la encontramos.
          <SparkleIcon className="ml-2 inline-block h-[0.6em] w-[0.6em] -translate-y-1 text-clay" />
        </h1>
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft" data-reveal style={{ transitionDelay: "80ms" }}>
        <p>
          Encontramos muchas webs de boda. Algunas tenían corazones. Otras
          tenían tipografías imposibles. Casi todas necesitaban emails,
          llamadas o presupuestos para hacer cualquier cosa.
        </p>
        <p>Y pensamos: esto debería ser bastante más fácil.</p>
        <p className="font-display text-2xl italic text-ink">Así nació Weddite.</p>
      </div>

      <ul className="mt-10 space-y-3" data-reveal style={{ transitionDelay: "140ms" }}>
        {promise.map((line) => (
          <li key={line} className="flex items-start gap-3 text-lg text-ink">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
            {line}
          </li>
        ))}
      </ul>

      <p
        className="mt-10 text-lg leading-relaxed text-ink-soft"
        data-reveal
        style={{ transitionDelay: "200ms" }}
      >
        Hoy Weddite es un proyecto pequeño, hecho a mano, con dos plantillas
        propias —Aurora y Ribera— y la idea de seguir añadiendo más. Si
        tenéis feedback, ideas o simplemente queréis contarnos cómo va la
        boda, nos encanta escuchar: podéis escribirnos desde el{" "}
        <Link
          href="/#contacto"
          className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay"
        >
          formulario de contacto
        </Link>
        .
      </p>
    </div>
  );
}
