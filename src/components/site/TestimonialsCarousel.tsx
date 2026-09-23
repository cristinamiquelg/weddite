"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  names: string;
  detail: string;
};

// Invented reviews — Weddite doesn't have real customers yet.
const testimonials: Testimonial[] = [
  {
    quote:
      "Montamos la web en una tarde, literalmente entre risas. Nuestros invitados no paraban de preguntarnos qué agencia nos la había hecho.",
    names: "Marta & Iker",
    detail: "Se casaron en Sitges, diseño Aurora",
  },
  {
    quote:
      "Veníamos de mirar diseños horribles durante semanas. En cuanto vimos la preview en directo de Ribera supimos que era la nuestra.",
    names: "Alicia & Pau",
    detail: "Se casaron en Cadaqués, diseño Ribera",
  },
  {
    quote:
      "Lo mejor fue no depender de nadie: cambiábamos el itinerario a las 11 de la noche y lo veíamos actualizado al momento.",
    names: "Nora & Bruno",
    detail: "Se casaron en Ronda, diseño Aurora",
  },
  {
    quote:
      "El RSVP con acompañantes nos ahorró un Excel entero. Se lo hemos recomendado a mi hermana para su boda del año que viene.",
    names: "Julia & Adrián",
    detail: "Se casaron en Comillas, diseño Ribera",
  },
  {
    quote:
      "Pagamos, personalizamos y publicamos en menos de una hora. Ni una llamada, ni un PDF de presupuesto.",
    names: "Carla & Dani",
    detail: "Se casaron en Olite, diseño Aurora",
  },
  {
    quote:
      "Buscábamos algo que no pareciera sacado de un cumpleaños de los 2000. Por fin una web de boda con buen gusto de verdad.",
    names: "Irene & Pol",
    detail: "Se casaron en Peñíscola, diseño Ribera",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      />
    </svg>
  );
}

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  const current = testimonials[index];

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-4 sm:gap-8">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Reseña anterior"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="min-h-[220px] flex-1 text-center">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto h-8 w-8 text-clay"
            fill="currentColor"
          >
            <path d="M9.5 7C6.5 8.2 5 10.4 5 13.2c0 2.4 1.7 4.3 4 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.5 1.6-2.9 3.4-3.6L9.5 7Zm9 0c-3 1.2-4.5 3.4-4.5 6.2 0 2.4 1.7 4.3 4 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.5 1.6-2.9 3.4-3.6L18.5 7Z" />
          </svg>
          <p className="mt-4 text-balance font-display text-xl leading-relaxed sm:text-2xl">
            {current.quote}
          </p>
          <p className="mt-6 text-sm font-medium text-ink">{current.names}</p>
          <p className="text-sm text-ink-soft">{current.detail}</p>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente reseña"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.names}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir a la reseña de ${t.names}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-clay" : "w-2 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
