"use client";

import { useState } from "react";

export default function RsvpForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--w-line)] bg-[var(--w-surface)] px-6 py-8 text-center">
        <p className="font-display text-xl text-[var(--w-ink)]">
          ¡Gracias por confirmar!
        </p>
        <p className="mt-2 text-sm text-[var(--w-ink-soft)]">
          Hemos anotado vuestra respuesta. Nos vemos en la boda.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-[var(--w-line)] bg-[var(--w-surface)] px-6 py-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-[var(--w-ink-soft)]">
          Nombre y apellidos
          <input
            required
            type="text"
            placeholder="Tu nombre"
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[var(--w-ink-soft)]">
          ¿Asistirás?
          <select
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
            defaultValue="si"
          >
            <option value="si">Sí, allí estaré</option>
            <option value="no">No podré ir</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm text-[var(--w-ink-soft)]">
          Alergias o comentarios
          <textarea
            rows={3}
            placeholder="Cuéntanos si tienes alguna alergia o restricción alimentaria"
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[var(--w-accent)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--w-surface)] transition-opacity hover:opacity-90 sm:w-auto"
      >
        Confirmar asistencia
      </button>
    </form>
  );
}
