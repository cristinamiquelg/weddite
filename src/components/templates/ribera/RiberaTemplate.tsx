import { Fragment } from "react";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";
import type { WeddingData } from "@/lib/wedding-types";
import { formatLongDate, mapsUrl } from "@/lib/format";
import RiberaCountdown from "./RiberaCountdown";
import RiberaRsvpForm from "./RiberaRsvpForm";
import RiberaCopyButton from "./RiberaCopyButton";
import styles from "./ribera.module.css";

const NAV_LINKS = [
  { href: "#cuando", label: "Cuándo" },
  { href: "#itinerario", label: "Itinerario y lugares" },
  { href: "#detalles", label: "Detalles" },
  { href: "#regalos", label: "Regalos" },
];

// Real line-art illustrations from the L&J invitation this template is
// modeled on. Detail cards map 1:1 to their icon; itinerary places don't
// carry an icon of their own in the data model (any couple can add any
// place), so they cycle through the four venue illustrations for variety,
// same as the four distinct places in the original design.
const DETAIL_ILLUSTRATIONS = {
  dresscode: "/ribera/dresscode.svg",
  bus: "/ribera/autobuses.svg",
  hotel: "/ribera/hoteles.svg",
};
const DETAIL_DEFAULTS = {
  dresscode: { title: "Dresscode", ctaLabel: "Inspiración" },
  bus: { title: "Autobuses", ctaLabel: "Cómo llegar" },
  hotel: { title: "Hoteles", ctaLabel: "Más información" },
};
const PLACE_ILLUSTRATIONS = [
  "/ribera/casa-monico.svg",
  "/ribera/catedral.svg",
  "/ribera/cortijo.svg",
  "/ribera/restaurante.svg",
];

const gothicStyle: React.CSSProperties = {
  fontFamily: "var(--font-science-gothic), Oswald, \"Arial Narrow\", sans-serif",
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

  let placeIndex = 0;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#top" className={styles.logo}>
          {initials}
        </a>
        <Link href="#rsvp" className={`${styles.btnSolid} ${styles.navCta}`}>
          Confirma asistencia
        </Link>
      </header>

      <section id="top" className={`${styles.hero} fade-in-load`}>
        <div className={styles.heroPanel}>
          <div className={styles.heroGroup}>
            <p className={styles.scriptText}>Save the Date</p>
            <p className={styles.eyebrow} style={gothicStyle}>
              for the wedding of
            </p>
            <h1 className={styles.heroNames}>{names}</h1>
          </div>

          <div className={styles.heroDate}>
            <span className={styles.eyebrow} style={gothicStyle}>
              {day} {month}
            </span>
            <img src="/ribera/hero-bouquet.svg" alt="" className={styles.heroBouquet} />
            <span className={styles.eyebrow} style={gothicStyle}>
              {year}
            </span>
          </div>

          <div className={styles.heroGroup}>
            <p className={styles.heroNames}>{data.estateName || "Lugar de la celebración"}</p>
            <p className={styles.scriptText}>{data.estateLocation || "Ubicación por confirmar"}</p>
          </div>
        </div>
      </section>

      <section id="cuando" className={styles.countdown}>
        <div data-reveal className={styles.countdownInner}>
          <p className={styles.countdownTitle}>¡Se acerca el gran día!</p>
          <RiberaCountdown date={data.date} />
        </div>
      </section>

      <section className={styles.bandSolid} id="itinerario">
        <div data-reveal className={styles.card}>
          <h2 className={styles.sectionTitle}>Itinerario y lugares</h2>

          <div className={styles.itinerary}>
            {data.phases.length > 0 ? (
              data.phases.map((phase, pi) => (
                <Fragment key={`phase-${pi}`}>
                  <div className={styles.phase}>
                    <p className={styles.phaseName}>{phase.name || "Momento"}</p>
                    <p className={styles.phaseWhen} style={gothicStyle}>
                      {phase.when || "Fecha y hora"}
                    </p>
                  </div>
                  {phase.places.map((place, li) => {
                    const illus = PLACE_ILLUSTRATIONS[placeIndex % PLACE_ILLUSTRATIONS.length];
                    placeIndex += 1;
                    return (
                      <article key={`place-${pi}-${li}`} className={styles.place}>
                        <img
                          src={illus}
                          alt={place.name ? `Ilustración de ${place.name}` : ""}
                          className={styles.placeImg}
                        />
                        <h3 className={styles.placeName}>{place.name || "Lugar por confirmar"}</h3>
                        <p className={styles.placeAddr}>{place.address || "Dirección por confirmar"}</p>
                        <a
                          href={place.address ? mapsUrl(place.address) : "#"}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.btnOutline}
                        >
                          Cómo llegar
                        </a>
                      </article>
                    );
                  })}
                  {phase.places.length < 2 ? (
                    <div className={styles.placeEmpty} aria-hidden="true" />
                  ) : null}
                </Fragment>
              ))
            ) : (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", opacity: 0.7 }}>
                Añadid las fases de vuestro gran día: pre-boda, boda y post-boda.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.bandStriped} id="detalles">
        <div data-reveal className={styles.card}>
          <h2 className={styles.sectionTitle}>Detalles</h2>
          <div className={styles.details}>
            {(data.detailCards.length > 0
              ? data.detailCards
              : [
                  { icon: "dresscode" as const, title: "", ctaLabel: "" },
                  { icon: "bus" as const, title: "", ctaLabel: "" },
                  { icon: "hotel" as const, title: "", ctaLabel: "" },
                ]
            ).map((card, i) => {
              const fallback = DETAIL_DEFAULTS[card.icon];
              return (
                <article key={i} className={styles.detail}>
                  <img
                    src={DETAIL_ILLUSTRATIONS[card.icon]}
                    alt={`Ilustración de ${card.title || fallback.title}`}
                    className={styles.detailImg}
                  />
                  <h3 className={styles.detailName}>{card.title || fallback.title}</h3>
                  <a href="#" className={`${styles.btnOutline} ${styles.detailBtn}`}>
                    {card.ctaLabel || fallback.ctaLabel}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="regalos" className={styles.giftSection}>
        <div data-reveal className={styles.gift}>
          <div className={styles.giftMat}>
            <div className={styles.giftPanel}>
              <p className={styles.leadText}>
                {data.giftMessage ||
                  "Vuestra presencia es nuestro mejor regalo, pero si queréis ayudarnos a crear nuestro nuevo hogar, podéis hacerlo por transferencia a"}
              </p>
              {data.giftAccount ? (
                <div className={styles.giftAccount}>
                  {data.giftHolderName ? <p className={styles.leadText}>{data.giftHolderName}</p> : null}
                  <p className={styles.giftIban} style={gothicStyle}>
                    {data.giftAccount}
                  </p>
                  <RiberaCopyButton value={data.giftAccount} className={styles.copyBtn} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp" className={styles.bandStriped}>
        <div data-reveal className={styles.rsvpCard}>
          <h2 className={styles.sectionTitle}>Confirma tu asistencia</h2>
          <p className={styles.rsvpIntro}>
            {data.rsvpNote ||
              "Por favor, confirma tu asistencia lo antes posible. Si venís en pareja o familia, es suficiente con que lo rellenéis uno de vosotros."}
          </p>
          {data.rsvpDeadline ? (
            <p className={styles.rsvpDeadline}>Antes del {formatLongDate(data.rsvpDeadline)}</p>
          ) : null}
          <RiberaRsvpForm />
        </div>
      </section>

      <footer className={styles.footer}>
        {data.organizerContact ? <p>{data.organizerContact}</p> : null}
        <p>
          Hecho con{" "}
          <Link href="/" className="group inline-flex items-center gap-1" style={{ color: "var(--r-coral)" }}>
            Weddite
            <SparkleIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" />
          </Link>
        </p>
      </footer>
    </div>
  );
}
