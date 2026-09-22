import { Fragment } from "react";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";
import type { WeddingData } from "@/lib/wedding-types";
import { formatLongDate, mapsUrl } from "@/lib/format";
import Countdown from "../Countdown";
import { BusIcon, DressIcon, HotelIcon, PlaceIcon, SprigIcon } from "./icons";
import RiberaRsvpForm from "./RiberaRsvpForm";
import RiberaCopyButton from "./RiberaCopyButton";

const NAV_LINKS = [
  { href: "#cuando", label: "Cuándo" },
  { href: "#itinerario", label: "Itinerario y lugares" },
  { href: "#detalles", label: "Detalles" },
  { href: "#regalos", label: "Regalos" },
];

const DETAIL_ICONS = { dresscode: DressIcon, bus: BusIcon, hotel: HotelIcon };
const DETAIL_DEFAULTS = {
  dresscode: { title: "Dresscode", ctaLabel: "Inspiración" },
  bus: { title: "Autobuses", ctaLabel: "Cómo llegar" },
  hotel: { title: "Hoteles", ctaLabel: "Más información" },
};

const tokens = {
  "--r-cream": "#efece3",
  "--r-cream-2": "#efebe3",
  "--r-navy": "#0e1453",
  "--r-navy-2": "#2d3588",
  "--r-navy-deep": "#10184f",
  "--r-coral": "#dd3e3e",
} as React.CSSProperties;

const serifStyle: React.CSSProperties = {
  fontFamily: 'var(--font-libre-baskerville), Georgia, "Times New Roman", serif',
};
const gothicStyle: React.CSSProperties = {
  fontFamily: 'var(--font-oswald), "Arial Narrow", sans-serif',
};

function heroDateParts(iso: string) {
  if (!iso) return { day: "—", month: "—", year: "----" };
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "—", month: "—", year: "----" };
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("es-ES", { month: "short" }).replace(".", "").toUpperCase(),
    year: String(d.getFullYear()),
  };
}

export default function RiberaTemplate({ data }: { data: WeddingData }) {
  const names = `${data.partnerA || "Vuestro nombre"} & ${data.partnerB || "Vuestra pareja"}`;
  const initials = `${(data.partnerA || "L")[0]}&${(data.partnerB || "J")[0]}`;
  const { day, month, year } = heroDateParts(data.date);

  return (
    <div
      style={{ ...tokens, ...serifStyle }}
      className="min-h-full bg-[var(--r-cream)] text-[var(--r-navy)]"
    >
      <header className="sticky top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6 bg-[var(--r-cream)] px-7 py-6">
        <nav className="hidden flex-wrap gap-6 text-sm sm:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="justify-self-center text-xl text-[var(--r-coral)]">
          {initials}
        </a>
        <Link
          href="#rsvp"
          className="justify-self-end bg-[var(--r-navy)] px-5 py-2.5 text-sm text-[var(--r-cream)] transition-opacity hover:opacity-90"
        >
          Confirma asistencia
        </Link>
      </header>

      <section
        id="top"
        className="bg-[var(--r-cream)] px-5 py-16 sm:px-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(14,20,83,0.3) 0 1px, transparent 1px 12px)",
        }}
      >
        <div className="fade-in-load mx-auto flex max-w-3xl flex-col items-center gap-10 bg-[var(--r-cream)] px-6 py-16 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="italic text-lg">Save the Date</p>
            <p className="text-xs uppercase tracking-[0.13em]" style={gothicStyle}>
              for the wedding of
            </p>
            <h1 className="text-2xl font-bold uppercase tracking-[0.16em]">{names}</h1>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="text-xs uppercase tracking-[0.13em]" style={gothicStyle}>
              {day} {month}
            </span>
            <SprigIcon className="h-16 w-auto text-[var(--r-coral)]" />
            <span className="text-xs uppercase tracking-[0.13em]" style={gothicStyle}>
              {year}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold uppercase tracking-[0.16em]">
              {data.estateName || "Lugar de la celebración"}
            </p>
            <p className="italic text-lg">{data.estateLocation || "Ubicación por confirmar"}</p>
          </div>
        </div>
      </section>

      <section id="cuando" className="bg-[var(--r-navy)] px-6 py-15 text-[var(--r-cream)]">
        <div
          data-reveal
          className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-10 px-4 sm:px-24"
          style={{ "--w-ink": "var(--r-cream)", "--w-ink-soft": "rgba(239,236,227,0.85)" } as React.CSSProperties}
        >
          <p className="italic text-lg">¡Se acerca el gran día!</p>
          <Countdown date={data.date} showSeconds={false} />
        </div>
      </section>

      <section className="bg-[var(--r-navy)] p-6" id="itinerario">
        <div
          data-reveal
          className="mx-auto flex max-w-[1080px] flex-col items-center gap-13 bg-[var(--r-cream)] px-6 py-15 sm:px-15"
        >
          <h2 className="text-center text-xl uppercase tracking-[0.04em]">Itinerario y lugares</h2>

          <div className="grid w-full gap-x-11 gap-y-15 sm:grid-cols-[minmax(150px,240px)_1fr_1fr]">
            {data.phases.length > 0 ? (
              data.phases.map((phase, pi) => (
                <Fragment key={`phase-${pi}`}>
                  <div className="self-center text-center uppercase sm:col-span-1">
                    <p className="mb-2 font-bold">{phase.name || "Momento"}</p>
                    <p className="text-sm tracking-[0.1em]" style={gothicStyle}>
                      {phase.when || "Fecha y hora"}
                    </p>
                  </div>
                  {phase.places.map((place, li) => (
                    <article
                      key={`place-${pi}-${li}`}
                      className="flex flex-col items-center gap-6 text-center"
                    >
                      <PlaceIcon className="h-24 w-24 text-[var(--r-coral)]" />
                      <h3 className="italic text-lg">{place.name || "Lugar por confirmar"}</h3>
                      <p className="max-w-[300px]">{place.address || "Dirección por confirmar"}</p>
                      <a
                        href={place.address ? mapsUrl(place.address) : "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-[var(--r-navy)] px-5 py-2.5 text-sm transition-colors hover:bg-[var(--r-navy)] hover:text-[var(--r-cream)]"
                      >
                        Cómo llegar
                      </a>
                    </article>
                  ))}
                  {phase.places.length < 2 ? <div aria-hidden="true" /> : null}
                </Fragment>
              ))
            ) : (
              <p className="col-span-full text-center opacity-70">
                Añadid las fases de vuestro gran día: pre-boda, boda y post-boda.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        className="p-6"
        style={{
          backgroundColor: "var(--r-navy)",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(239,236,227,0.1) 0 1px, transparent 1px 12px)",
        }}
        id="detalles"
      >
        <div
          data-reveal
          className="mx-auto flex max-w-[1080px] flex-col items-center gap-13 bg-[var(--r-cream)] px-6 py-15 sm:px-15"
        >
          <h2 className="text-center text-xl uppercase tracking-[0.04em]">Detalles</h2>
          <div className="grid w-full gap-10 sm:grid-cols-3">
            {(data.detailCards.length > 0
              ? data.detailCards
              : [
                  { icon: "dresscode" as const, title: "", ctaLabel: "" },
                  { icon: "bus" as const, title: "", ctaLabel: "" },
                  { icon: "hotel" as const, title: "", ctaLabel: "" },
                ]
            ).map((card, i) => {
              const Icon = DETAIL_ICONS[card.icon];
              const fallback = DETAIL_DEFAULTS[card.icon];
              return (
                <article key={i} className="mx-auto flex max-w-[336px] flex-col items-center gap-8">
                  <Icon className="h-24 w-24 text-[var(--r-coral)]" />
                  <h3 className="italic text-lg">{card.title || fallback.title}</h3>
                  <a
                    href="#"
                    className="-mt-2 border border-[var(--r-navy)] px-5 py-2.5 text-sm transition-colors hover:bg-[var(--r-navy)] hover:text-[var(--r-cream)]"
                  >
                    {card.ctaLabel || fallback.ctaLabel}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="regalos" className="flex justify-center bg-[var(--r-cream)] px-6 py-15">
        <div
          data-reveal
          className="w-full max-w-[700px] border border-[var(--r-coral)] bg-[var(--r-navy-2)] p-3"
        >
          <div className="border border-[var(--r-coral)] bg-[var(--r-cream-2)] p-2">
            <div
              className="flex flex-col items-center gap-8 border border-[var(--r-coral)] px-6 py-12 text-center text-[var(--r-cream)] sm:px-20"
              style={{
                backgroundColor: "var(--r-navy-deep)",
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(239,236,227,0.1) 0 1px, transparent 1px 12px)",
              }}
            >
              <p className="italic">
                {data.giftMessage ||
                  "Vuestra presencia es nuestro mejor regalo, pero si queréis ayudarnos a crear nuestro nuevo hogar, podéis hacerlo por transferencia a"}
              </p>
              {data.giftAccount ? (
                <div className="flex flex-col items-center gap-2">
                  {data.giftHolderName ? <p className="italic">{data.giftHolderName}</p> : null}
                  <p className="tracking-[0.08em]" style={gothicStyle}>
                    {data.giftAccount}
                  </p>
                  <div className="mt-3">
                    <RiberaCopyButton value={data.giftAccount} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        id="rsvp"
        className="p-6"
        style={{
          backgroundColor: "var(--r-navy)",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(239,236,227,0.1) 0 1px, transparent 1px 12px)",
        }}
      >
        <div
          data-reveal
          className="mx-auto flex max-w-[600px] flex-col items-center gap-6 bg-[var(--r-cream)] px-5 py-14 sm:px-16"
        >
          <h2 className="text-center text-xl uppercase tracking-[0.04em]">Confirma tu asistencia</h2>
          <p className="max-w-[540px] text-center text-sm font-bold">
            {data.rsvpNote ||
              "Por favor, confirma tu asistencia lo antes posible. Si venís en pareja o familia, es suficiente con que lo rellenéis uno de vosotros."}
          </p>
          {data.rsvpDeadline ? (
            <p className="text-sm font-bold text-[var(--r-coral)]">
              Antes del {formatLongDate(data.rsvpDeadline)}
            </p>
          ) : null}
          <div className="mt-4 w-full">
            <RiberaRsvpForm />
          </div>
        </div>
      </section>

      <footer className="bg-[var(--r-cream)] px-7 py-7">
        {data.organizerContact ? <p className="text-sm">{data.organizerContact}</p> : null}
        <p className="text-sm">
          Hecho con{" "}
          <Link href="/" className="group inline-flex items-center gap-1 text-[var(--r-coral)]">
            Weddite
            <SparkleIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" />
          </Link>
        </p>
      </footer>
    </div>
  );
}
