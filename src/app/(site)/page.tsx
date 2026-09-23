import Link from "next/link";
import { templates } from "@/lib/templates";
import HeroGrid from "@/components/site/HeroGrid";
import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";
import ContactForm from "@/components/site/ContactForm";
import SparkleIcon from "@/components/site/SparkleIcon";

const steps = [
  {
    n: "01",
    title: "Elegís vuestra plantilla",
    body: "Navegad el catálogo, mirad la preview en directo tal cual la verán vuestros invitados y quedaos con la que más os enamore.",
  },
  {
    n: "02",
    title: "La personalizáis al momento",
    body: "Nombres, fecha, ubicación, vuestra historia, itinerario, fotos, RSVP y regalo. Vais viendo los cambios en vivo mientras escribís.",
  },
  {
    n: "03",
    title: "La contratáis con un clic",
    body: "Sin llamadas, sin presupuestos por correo, sin esperas. Confirmáis y vuestra web queda lista para compartir con quien queráis.",
  },
];

const painPoints = [
  "Plantillas con typefaces de los 2000 y gifs de corazones",
  "Formularios interminables por email para pedir un simple cambio",
  "Presupuestos a medida que tardan días en llegar",
  "Webs que se rompen en el móvil, donde las va a ver todo el mundo",
];

const promises = [
  "Diseño editorial, cuidado hasta el último detalle",
  "Preview en directo antes de pagar un euro",
  "Todo el proceso en minutos, sin intermediarios",
  "100% responsive, pensada para leerse desde el grupo de WhatsApp",
];

export default function HomePage() {
  const featured = templates[0];

  return (
    <>
      <section
        className="fade-in-load mx-auto max-w-5xl px-6 pb-20 pt-20 text-center sm:pt-28"
        style={{ animationDelay: "80ms" }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-clay">
          Webs de boda, sin lo cutre
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-tight sm:text-6xl">
          La web de vuestra boda, bonita de verdad
          <SparkleIcon className="ml-2 inline-block h-[0.6em] w-[0.6em] -translate-y-1 text-clay" />
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-soft">
          Elegid una plantilla moderna, personalizadla con vuestra historia y
          contratadla en minutos. Todo a golpe de clic: sin llamadas, sin
          correos interminables.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/plantillas"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Explorar plantillas
          </Link>
          <Link
            href={`/preview/${featured.slug}`}
            target="_blank"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Ver un ejemplo en directo
          </Link>
        </div>
      </section>

      <section className="pb-24" data-reveal style={{ transitionDelay: "100ms" }}>
        <HeroGrid />
      </section>

      <section className="border-t border-line bg-paper-raised">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">
              El problema
            </p>
            <h2 className="mt-4 font-display text-3xl">
              Las webs de boda suelen ser cutres
            </h2>
            <ul className="mt-6 space-y-4">
              {painPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ transitionDelay: "120ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-clay">
              Weddite
            </p>
            <h2 className="mt-4 font-display text-3xl">
              Nosotros lo hacemos de otra forma
            </h2>
            <ul className="mt-6 space-y-4">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-5xl px-6 py-24">
        <div data-reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-clay">
            Cómo funciona
          </p>
          <h2 className="mx-auto mt-4 max-w-md text-center font-display text-3xl sm:text-4xl">
            De la idea a vuestra web publicada, en un ratito
          </h2>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.n} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-display text-4xl text-clay">{step.n}</span>
              <h3 className="mt-4 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-raised">
        <div className="px-6 py-24" data-reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-clay">
            Parejas reales
          </p>
          <h2 className="mx-auto mt-4 max-w-md text-center font-display text-3xl sm:text-4xl">
            Lo que dicen las parejas que ya se casaron
          </h2>
          <div className="mt-16">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink">
        <div
          data-reveal
          className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center text-paper"
        >
          <h2 className="max-w-lg text-balance font-display text-3xl sm:text-4xl">
            Vuestra boda merece una web tan bonita como el día
          </h2>
          <Link
            href="/plantillas"
            className="rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Explorar plantillas
          </Link>
        </div>
      </section>

      <section id="contacto" className="border-t border-line">
        <div className="mx-auto max-w-2xl px-6 py-24">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-clay">Contacto</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              ¿Tenéis alguna pregunta?
            </h2>
            <p className="mt-4 text-ink-soft">
              Escribidnos y os respondemos en cuanto podamos.
            </p>
          </div>
          <div data-reveal style={{ transitionDelay: "100ms" }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
