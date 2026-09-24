"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import SparkleIcon from "@/components/site/SparkleIcon";
import type { WeddingData, WeddingPlace } from "@/lib/wedding-types";
import { formatLongDate, mapsUrl } from "@/lib/format";
import { getDict, locales as localeOptions } from "@/lib/i18n";
import RiberaCountdown from "./RiberaCountdown";
import RiberaRsvpForm from "./RiberaRsvpForm";
import RiberaCopyButton from "./RiberaCopyButton";
import styles from "./ribera.module.css";

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
const PLACE_ILLUSTRATIONS = [
  "/ribera/casa-monico.svg",
  "/ribera/catedral.svg",
  "/ribera/cortijo.svg",
  "/ribera/restaurante.svg",
];

// Font families now resolve through the CSS tokens in ribera.module.css
// (--r-serif / --r-gothic point at the next/font variables), so no inline
// font styles are needed here.

type VisiblePlace = WeddingPlace & { illus: string };
type VisiblePhase = { name: string; when: string; places: VisiblePlace[]; placeholderCount: number };

// Assigns each visible place a venue illustration by its position across
// the whole itinerary (not reset per phase), matching the variety of the
// four distinct places in the original design. Computed once, outside any
// JSX-embedded callback, so no mutable counter is captured by render.
function buildVisiblePhases(phases: WeddingData["phases"]): VisiblePhase[] {
  let cursor = 0;
  return phases.map((phase) => {
    const places = phase.places
      .filter((place) => place.name || place.address)
      .map((place) => {
        const illus = PLACE_ILLUSTRATIONS[cursor % PLACE_ILLUSTRATIONS.length];
        cursor += 1;
        return { ...place, illus };
      });
    return { name: phase.name, when: phase.when, places, placeholderCount: phase.places.length };
  });
}

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
  const [locale, setLocale] = useState(data.locales[0] ?? "es");
  const dict = getDict(locale);
  const showLocaleSwitcher = data.locales.length > 1;
  const names = `${data.partnerA || "Vuestro nombre"} & ${data.partnerB || "Vuestra pareja"}`;
  const initials = `${(data.partnerA || "L")[0]}&${(data.partnerB || "J")[0]}`;
  const { day, month, year } = heroDateParts(data.date);

  const hasEstate = Boolean(data.estateName || data.estateLocation);
  const hasItinerary = data.phases.length > 0;
  const hasDetails = data.detailCards.length > 0;
  const hasGift = Boolean(data.giftMessage || data.giftAccount);
  const hasBus = data.detailCards.some((c) => c.icon === "bus");

  const NAV_LINKS = [
    { href: "#cuando", label: dict.ribera.nav.cuando },
    hasItinerary ? { href: "#itinerario", label: dict.ribera.nav.itinerario } : null,
    hasDetails ? { href: "#detalles", label: dict.ribera.nav.detalles } : null,
    hasGift ? { href: "#regalos", label: dict.ribera.nav.regalos } : null,
  ].filter((l): l is { href: string; label: string } => l !== null);

  const DETAIL_DEFAULTS = {
    dresscode: dict.ribera.details.dresscode,
    bus: dict.ribera.details.bus,
    hotel: dict.ribera.details.hotel,
  };

  const visiblePhases = hasItinerary ? buildVisiblePhases(data.phases) : [];

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label={locale === "en" ? "Sections" : "Secciones"}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          {showLocaleSwitcher ? (
            <span className={styles.localeSwitch}>
              {data.locales.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLocale(id)}
                  className={`${styles.localeBtn} ${locale === id ? styles.localeBtnActive : ""}`}
                >
                  {localeOptions.find((l) => l.id === id)?.id ?? id}
                </button>
              ))}
            </span>
          ) : null}
        </nav>
        <a href="#top" className={styles.logo} aria-label={names}>
          {initials}
        </a>
        <a href="#rsvp" className={`${styles.btnSolid} ${styles.navCta}`}>
          {dict.ribera.nav.confirm}
        </a>
      </header>

      <section id="top" className={`${styles.hero} fade-in-load`}>
        <div className={styles.heroPanel}>
          <div className={styles.heroGroup}>
            <p className={styles.scriptText}>{dict.ribera.hero.saveTheDate}</p>
            <p className={styles.eyebrow}>{dict.ribera.hero.forTheWeddingOf}</p>
            <h1 className={styles.heroNames}>{names}</h1>
          </div>

          <p className={styles.heroDate}>
            <span className="sr-only">{formatLongDate(data.date, locale)}</span>
            <span className={styles.heroDatePart} aria-hidden="true">
              {day} {month}
            </span>
            <img
              src="/ribera/hero-bouquet.svg"
              alt=""
              width={84}
              height={84}
              fetchPriority="high"
              className={styles.heroBouquet}
            />
            <span className={styles.heroDatePart} aria-hidden="true">
              {year}
            </span>
          </p>

          {hasEstate ? (
            <div className={styles.heroGroup}>
              {data.estateName ? <p className={styles.heroPlace}>{data.estateName}</p> : null}
              {data.estateLocation ? (
                <p className={styles.scriptText}>{data.estateLocation}</p>
              ) : null}
            </div>
          ) : null}
          <a href="#rsvp" className={`${styles.btnSolid} ${styles.heroCta}`}>
            {dict.rsvpForm.submit}
            {data.rsvpDeadline ? (
              <span className={styles.heroCtaSub}>
                {dict.ribera.rsvp.deadlinePrefix.toLowerCase()} {formatLongDate(data.rsvpDeadline, locale)}
              </span>
            ) : null}
          </a>
        </div>
      </section>

      <section id="cuando" className={styles.countdown} aria-labelledby="ribera-cuando-title">
        <div data-reveal className={styles.countdownInner}>
          <div>
            <h2 id="ribera-cuando-title" className={styles.countdownTitle}>
              {dict.ribera.countdownTitle}
            </h2>
            {data.date ? (
              <p className={styles.countdownDate}>
                {formatLongDate(data.date, locale)}
                {data.estateLocation ? ` · ${data.estateLocation}` : ""}
              </p>
            ) : null}
          </div>
          <RiberaCountdown date={data.date} locale={locale} />
        </div>
      </section>

      {hasItinerary ? (
        <section className={styles.bandSolid} id="itinerario">
          <div data-reveal className={styles.card}>
            <h2 className={styles.sectionTitle}>{dict.ribera.itinerary.title}</h2>

            <div className={styles.itinerary}>
              {visiblePhases.map((phase, pi) => (
                <Fragment key={`phase-${pi}`}>
                  {phase.name || phase.when ? (
                    <div className={styles.phase}>
                      {phase.name ? <p className={styles.phaseName}>{phase.name}</p> : null}
                      {phase.when ? (
                        <p className={styles.phaseWhen}>
                          {phase.when}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {phase.places.map((place, li) => (
                    <article key={`place-${pi}-${li}`} className={styles.place}>
                      <img
                        src={place.illus}
                        alt=""
                        width={190}
                        height={190}
                        loading="lazy"
                        decoding="async"
                        className={styles.placeImg}
                      />
                      {place.name ? <h3 className={styles.placeName}>{place.name}</h3> : null}
                      {place.address ? (
                        <p className={styles.placeAddr}>{place.address}</p>
                      ) : null}
                      {place.address ? (
                        <a
                          href={mapsUrl(place.address)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.btnOutline}
                        >
                          {dict.ribera.itinerary.comoLlegar}
                          {place.name ? <span className="sr-only"> — {place.name}</span> : null}
                        </a>
                      ) : null}
                    </article>
                  ))}
                  {phase.placeholderCount < 2 ? (
                    <div className={styles.placeEmpty} aria-hidden="true" />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hasDetails ? (
        <section className={styles.bandStriped} id="detalles">
          <div data-reveal className={styles.card}>
            <h2 className={styles.sectionTitle}>{dict.ribera.details.title}</h2>
            <div className={styles.details}>
              {data.detailCards.map((card, i) => {
                const fallback = DETAIL_DEFAULTS[card.icon];
                return (
                  <article key={i} className={styles.detail}>
                    <img
                      src={DETAIL_ILLUSTRATIONS[card.icon]}
                      alt=""
                      width={150}
                      height={150}
                      loading="lazy"
                      decoding="async"
                      className={styles.detailImg}
                    />
                    <h3 className={styles.detailName}>{card.title || fallback.title}</h3>
                    {card.description ? <p className={styles.detailText}>{card.description}</p> : null}
                    {card.url ? (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.btnOutline} ${styles.detailBtn}`}
                      >
                        {card.ctaLabel || fallback.cta}
                        <span className="sr-only"> — {card.title || fallback.title}</span>
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {hasGift ? (
        <section id="regalos" className={styles.giftSection} aria-labelledby="ribera-gift-title">
          <h2 id="ribera-gift-title" className="sr-only">
            {dict.ribera.giftTitle}
          </h2>
          <div data-reveal className={styles.gift}>
            <div className={styles.giftMat}>
              <div className={styles.giftPanel}>
                {data.giftMessage ? (
                  <p className={styles.leadText}>{data.giftMessage}</p>
                ) : null}
                {data.giftAccount ? (
                  <div className={styles.giftAccount}>
                    {data.giftHolderName ? <p className={styles.leadText}>{data.giftHolderName}</p> : null}
                    <p className={styles.giftIban}>
                      {data.giftAccount}
                    </p>
                    <RiberaCopyButton value={data.giftAccount} className={styles.copyBtn} locale={locale} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="rsvp" className={styles.bandStriped}>
        <div data-reveal className={styles.rsvpCard}>
          <h2 className={styles.sectionTitle}>{dict.ribera.rsvp.title}</h2>
          {data.rsvpNote ? <p className={styles.rsvpIntro}>{data.rsvpNote}</p> : null}
          {data.rsvpDeadline ? (
            <p className={styles.rsvpDeadline}>
              {dict.ribera.rsvp.deadlinePrefix} {formatLongDate(data.rsvpDeadline, locale)}
            </p>
          ) : null}
          <RiberaRsvpForm locale={locale} showBus={hasBus} />
        </div>
      </section>

      <footer className={styles.footer}>
        {data.organizerContact ? <p>{data.organizerContact}</p> : null}
        <p>
          {dict.ribera.footer.madeWith}{" "}
          <Link href="/" className="group inline-flex items-center gap-1" style={{ color: "var(--r-coral-text)" }}>
            Weddite
            <SparkleIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" />
          </Link>
        </p>
      </footer>
    </div>
  );
}
