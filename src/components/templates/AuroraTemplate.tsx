import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";
import type { WeddingData } from "@/lib/wedding-types";
import { formatLongDate, formatShortDate, mapsUrl } from "@/lib/format";
import { paletteCssVars } from "./palette";
import Countdown from "./Countdown";
import RsvpForm from "./RsvpForm";
import CopyButton from "./CopyButton";
import PhotoPlaceholder from "./PhotoPlaceholder";

const NAV_LINKS = [
  { href: "#historia", label: "Historia" },
  { href: "#dia", label: "El día" },
  { href: "#galeria", label: "Galería" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#regalo", label: "Regalo" },
];

export default function AuroraTemplate({ data }: { data: WeddingData }) {
  const names = `${data.partnerA || "Vuestro nombre"} & ${data.partnerB || "Vuestra pareja"}`;

  return (
    <div
      style={paletteCssVars(data.palette)}
      className="min-h-full bg-[var(--w-bg)] text-[var(--w-ink)] font-sans"
    >
      <header className="sticky top-0 z-10 border-b border-[var(--w-line)] bg-[var(--w-bg)]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
          <span className="font-display italic text-base">{names}</span>
          <ul className="hidden gap-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[var(--w-ink-soft)] transition-colors hover:text-[var(--w-accent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="fade-in-load mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]">
          Nos casamos
        </p>
        <h1 className="mt-6 font-display text-5xl leading-tight sm:text-7xl">
          {data.partnerA || "Vuestro nombre"}
          <span className="mx-3 italic text-[var(--w-accent)]">&amp;</span>
          {data.partnerB || "Vuestra pareja"}
        </h1>
        <p className="mt-6 text-lg text-[var(--w-ink-soft)]">
          {formatLongDate(data.date)}
        </p>
        <div className="mt-10">
          <Countdown date={data.date} />
        </div>
        {data.welcomeMessage ? (
          <p className="mt-10 max-w-xl text-balance text-[var(--w-ink-soft)]">
            {data.welcomeMessage}
          </p>
        ) : null}
        {data.hashtag ? (
          <p className="mt-6 font-display italic text-[var(--w-accent)]">
            {data.hashtag}
          </p>
        ) : null}
      </section>

      <section id="historia" className="border-t border-[var(--w-line)]">
        <div
          data-reveal
          className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-2 sm:items-center"
        >
          <PhotoPlaceholder caption={data.galleryCaptions[0]} index={0} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]">
              {data.storyTitle || "Nuestra historia"}
            </p>
            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-[var(--w-ink-soft)]">
              {data.story ||
                "Aquí podréis contar cómo os conocisteis, vuestros hitos como pareja y por qué habéis decidido daros el sí quiero."}
            </p>
          </div>
        </div>
      </section>

      <section id="dia" className="border-t border-[var(--w-line)] bg-[var(--w-surface)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div data-reveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]">
              El gran día
            </p>
            <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl">
              {formatShortDate(data.date)}
            </h2>
          </div>

          <div data-reveal className="mt-14 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--w-line)] bg-[var(--w-bg)] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--w-accent)]">
                Ceremonia · {data.ceremonyTime || "--:--"}
              </p>
              <p className="mt-3 font-display text-2xl">
                {data.ceremonyVenue || "Lugar de la ceremonia"}
              </p>
              <p className="mt-2 text-sm text-[var(--w-ink-soft)]">
                {data.ceremonyAddress || "Dirección por confirmar"}
              </p>
              {data.ceremonyAddress ? (
                <a
                  href={mapsUrl(data.ceremonyAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-medium text-[var(--w-accent)] underline underline-offset-4"
                >
                  Ver en el mapa
                </a>
              ) : null}
            </div>
            <div className="rounded-2xl border border-[var(--w-line)] bg-[var(--w-bg)] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--w-accent)]">
                Celebración · {data.celebrationTime || "--:--"}
              </p>
              <p className="mt-3 font-display text-2xl">
                {data.celebrationVenue || "Lugar de la celebración"}
              </p>
              <p className="mt-2 text-sm text-[var(--w-ink-soft)]">
                {data.celebrationAddress || "Dirección por confirmar"}
              </p>
              {data.celebrationAddress ? (
                <a
                  href={mapsUrl(data.celebrationAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-medium text-[var(--w-accent)] underline underline-offset-4"
                >
                  Ver en el mapa
                </a>
              ) : null}
            </div>
          </div>

          {data.timeline.length > 0 ? (
            <ol
              data-reveal
              className="mx-auto mt-16 max-w-md space-y-6 border-l border-[var(--w-line)] pl-8"
            >
              {data.timeline.map((item, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--w-accent)]" />
                  <p className="text-sm font-medium text-[var(--w-accent)]">{item.time}</p>
                  <p className="font-display text-lg">{item.title}</p>
                  {item.description ? (
                    <p className="text-sm text-[var(--w-ink-soft)]">{item.description}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}

          {data.dressCode ? (
            <div className="mx-auto mt-16 max-w-md text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--w-accent)]">
                Código de vestimenta
              </p>
              <p className="mt-3 text-[var(--w-ink-soft)]">{data.dressCode}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section id="galeria" className="border-t border-[var(--w-line)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p
            data-reveal
            className="text-center text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]"
          >
            Galería
          </p>
          <div data-reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {(data.galleryCaptions.length > 0
              ? data.galleryCaptions
              : ["", "", "", "", "", ""]
            ).map((caption, i) => (
              <PhotoPlaceholder key={i} caption={caption} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="rsvp" className="border-t border-[var(--w-line)] bg-[var(--w-surface)]">
        <div data-reveal className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]">
            Confirmación de asistencia
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">¿Nos acompañáis?</h2>
          <p className="mt-4 text-[var(--w-ink-soft)]">
            {data.rsvpNote ||
              "Confirmad vuestra asistencia lo antes posible para poder organizarlo todo."}
          </p>
          {data.rsvpDeadline ? (
            <p className="mt-1 text-sm font-medium text-[var(--w-accent)]">
              Antes del {formatLongDate(data.rsvpDeadline)}
            </p>
          ) : null}
          <div className="mt-10 text-left">
            <RsvpForm />
          </div>
        </div>
      </section>

      <section id="regalo" className="border-t border-[var(--w-line)]">
        <div data-reveal className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--w-accent)]">
            Mesa de regalos
          </p>
          <p className="mt-6 text-lg text-[var(--w-ink-soft)]">
            {data.giftMessage ||
              "Vuestra presencia es el mejor regalo. Si queréis tener un detalle con nosotros, aquí tenéis nuestros datos."}
          </p>
          {data.giftAccount ? (
            <div className="mt-8 flex flex-col items-center gap-2">
              {data.giftHolderName ? (
                <p className="text-sm text-[var(--w-ink)]">{data.giftHolderName}</p>
              ) : null}
              <p className="font-mono text-sm tracking-widest text-[var(--w-ink)]">
                {data.giftAccount}
              </p>
              <div className="mt-2">
                <CopyButton value={data.giftAccount} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="border-t border-[var(--w-line)] bg-[var(--w-bg)]">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center">
          {data.organizerContact ? (
            <p className="text-sm text-[var(--w-ink-soft)]">{data.organizerContact}</p>
          ) : null}
          <p className="mt-4 font-display italic text-lg">{names}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--w-ink-soft)]">
            Hecho con{" "}
            <Link
              href="/"
              className="group inline-flex items-center gap-1 font-medium text-[var(--w-accent)]"
            >
              Weddite
              <SparkleIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" />
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
