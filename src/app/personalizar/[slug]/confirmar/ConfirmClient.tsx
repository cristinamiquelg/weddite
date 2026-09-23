"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Template } from "@/lib/templates";
import { useWeddingDraft } from "@/lib/use-wedding-draft";
import { formatLongDate } from "@/lib/format";

const TEST_CARD = {
  name: "Laura García",
  number: "4242 4242 4242 4242",
  expiry: "12/29",
  cvc: "123",
};

export default function ConfirmClient({ template }: { template: Template }) {
  const { data, loaded } = useWeddingDraft(template.slug);
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const router = useRouter();

  const names =
    data.partnerA || data.partnerB
      ? `${data.partnerA || "..."} & ${data.partnerB || "..."}`
      : "Vuestra boda";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(`weddite:purchased:${template.slug}`, "1");
      } catch {
        // storage unavailable — the confirmation still proceeds
      }
      router.push(`/gracias?slug=${template.slug}`);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href={`/personalizar/${template.slug}`}
        className="text-sm text-ink-soft hover:text-ink"
      >
        ← Seguir editando
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-clay">
            Resumen
          </p>
          <h1 className="mt-3 font-display text-4xl">{names}</h1>
          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">Plantilla</dt>
              <dd className="font-medium">{template.name}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">Fecha de la boda</dt>
              <dd className="font-medium">
                {loaded ? formatLongDate(data.date) : "..."}
              </dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">Lugar de celebración</dt>
              <dd className="font-medium">
                {data.celebrationVenue || "Por confirmar"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-sage-light px-5 py-4">
            <span className="text-sm text-ink">Total, pago único</span>
            <span className="font-display text-2xl">{template.price} €</span>
          </div>

          <Link
            href={`/preview/${template.slug}`}
            target="_blank"
            className="mt-6 inline-block text-sm font-medium text-clay underline underline-offset-4"
          >
            Revisar la vista previa antes de comprar
          </Link>
        </div>

        <div>
          <div className="rounded-2xl border border-line bg-paper-raised p-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Datos de pago</p>
              <span className="rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-ink-soft">
                Modo demo · sin cobro real
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCard(TEST_CARD)}
              className="mb-6 self-start text-sm font-medium text-clay underline underline-offset-4"
            >
              Rellenar con tarjeta de prueba
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-ink">Nombre en la tarjeta</span>
                <input
                  required
                  type="text"
                  placeholder="Laura García"
                  value={card.name}
                  onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-clay"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-ink">Número de tarjeta</span>
                <input
                  required
                  inputMode="numeric"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={card.number}
                  onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-clay"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-ink">Caducidad</span>
                  <input
                    required
                    type="text"
                    placeholder="MM/AA"
                    value={card.expiry}
                    onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                    className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-clay"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-ink">CVC</span>
                  <input
                    required
                    inputMode="numeric"
                    type="text"
                    placeholder="123"
                    value={card.cvc}
                    onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))}
                    className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-clay"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submitting
                  ? "Confirmando..."
                  : `Confirmar compra · ${template.price} €`}
              </button>
              <p className="text-center text-xs text-ink-soft">
                Al confirmar aceptáis los términos del servicio. Sin llamadas,
                sin papeleo: vuestra web queda lista al instante.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
