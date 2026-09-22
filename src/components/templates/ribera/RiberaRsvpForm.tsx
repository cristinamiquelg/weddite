"use client";

import { useState } from "react";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12z" />
    </svg>
  );
}

function Seg({
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  value: "si" | "no" | null;
  onChange: (v: "si" | "no") => void;
  yesLabel: string;
  noLabel: string;
}) {
  const optClass = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-2 whitespace-nowrap border border-[var(--r-navy)] px-4 py-2.5 font-serif text-sm ${
      active ? "bg-[var(--r-navy)] text-[var(--r-cream)]" : "bg-transparent text-[var(--r-navy)]"
    }`;
  return (
    <div className="inline-flex max-w-full self-start">
      <button
        type="button"
        onClick={() => onChange("si")}
        className={`${optClass(value === "si")} rounded-l-full border-r-0`}
      >
        {value === "si" ? <CheckIcon /> : null}
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={`${optClass(value === "no")} rounded-r-full`}
      >
        <CrossIcon />
        {noLabel}
      </button>
    </div>
  );
}

function TextField({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <label className="relative block flex-1">
      <input
        type={type}
        placeholder=" "
        className="w-full rounded border border-[var(--r-navy)] bg-[var(--r-cream)] px-3.5 py-3 font-serif text-sm text-[var(--r-navy)] outline-none focus:border-[var(--r-coral)]"
      />
      <span className="absolute -top-[9px] left-3 bg-[var(--r-cream)] px-1 font-serif text-[10px] text-[var(--r-navy)]">
        {label}
      </span>
    </label>
  );
}

type Companion = { id: number; bus: "si" | "no" | null };

export default function RiberaRsvpForm() {
  const [asiste, setAsiste] = useState<"si" | "no" | null>(null);
  const [bus, setBus] = useState<"si" | "no" | null>(null);
  const [acompanante, setAcompanante] = useState<"si" | "no" | null>(null);
  const [count, setCount] = useState(1);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [nextId, setNextId] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function setBringsCompanions(v: "si" | "no") {
    setAcompanante(v);
    if (v === "no") {
      setCompanions([]);
      return;
    }
    const next: Companion[] = [];
    let id = nextId;
    for (let i = 0; i < count; i++) next.push({ id: id++, bus: null });
    setNextId(id);
    setCompanions(next);
  }

  function setCompanionCount(n: number) {
    setCount(n);
    setCompanions((prev) => {
      if (n <= prev.length) return prev.slice(0, n);
      const extra: Companion[] = [];
      let id = nextId;
      for (let i = prev.length; i < n; i++) extra.push({ id: id++, bus: null });
      setNextId(id);
      return [...prev, ...extra];
    });
  }

  function removeCompanion(id: number) {
    setCompanions((prev) => {
      const next = prev.filter((c) => c.id !== id);
      setCount(Math.max(1, next.length));
      return next;
    });
  }

  if (submitted) {
    return (
      <div className="w-full rounded border border-[var(--r-navy)] bg-[var(--r-cream)] px-6 py-8 text-center">
        <p className="font-serif italic text-[var(--r-navy)]">
          ¡Gracias! Hemos recibido tu confirmación. 🤍
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-9"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="font-serif text-xs font-bold uppercase tracking-[0.06em] text-[var(--r-navy)]">
        Tu información
      </p>
      <div className="-mt-6 flex flex-col gap-4 sm:flex-row">
        <TextField label="Nombre" />
        <TextField label="Apellidos" />
      </div>
      <div className="-mt-6 flex flex-col gap-4 sm:flex-row">
        <TextField label="Teléfono" type="tel" />
        <TextField label="E-mail" type="email" />
      </div>

      <Seg value={asiste} onChange={setAsiste} yesLabel="Voy a la boda" noLabel="No voy a la boda" />
      <Seg value={bus} onChange={setBus} yesLabel="Iré en el bus" noLabel="No necesitaré" />

      <label className="-mt-4 flex flex-col gap-1.5">
        <input
          type="text"
          placeholder=" "
          className="rounded border border-[var(--r-navy)] bg-[var(--r-cream)] px-3.5 py-3 font-serif text-sm text-[var(--r-navy)] outline-none focus:border-[var(--r-coral)]"
        />
        <span className="font-serif text-xs text-[var(--r-navy)]">
          ¿Tienes alguna intolerancia alimenticia o dieta?
        </span>
      </label>

      <Seg
        value={acompanante}
        onChange={setBringsCompanions}
        yesLabel="Llevo acompañante"
        noLabel="Voy solo/a"
      />

      {acompanante === "si" ? (
        <div className="-mt-4 flex flex-col gap-4">
          <label className="font-serif text-sm font-bold text-[var(--r-navy)]">
            ¿Cuántos acompañantes llevas?
            <select
              value={count}
              onChange={(e) => setCompanionCount(Number(e.target.value))}
              className="ml-3 rounded border border-[var(--r-navy)] bg-[var(--r-cream)] px-3.5 py-2.5 font-serif text-sm text-[var(--r-navy)] outline-none focus:border-[var(--r-coral)]"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      {companions.map((c, i) => (
        <div key={c.id} className="flex flex-col gap-7">
          <hr className="border-[var(--r-navy)]" />
          <div className="flex items-center justify-between">
            <p className="font-serif text-xs font-bold uppercase tracking-[0.06em] text-[var(--r-navy)]">
              Información de acompañante {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeCompanion(c.id)}
              aria-label="Quitar acompañante"
              className="text-[var(--r-coral)]"
            >
              <CrossIcon />
            </button>
          </div>
          <div className="-mt-3 flex flex-col gap-4 sm:flex-row">
            <TextField label="Nombre" />
            <TextField label="Apellidos" />
          </div>
          <div className="-mt-3 flex flex-col gap-4 sm:flex-row">
            <TextField label="Teléfono" type="tel" />
            <TextField label="E-mail" type="email" />
          </div>
          <Seg
            value={c.bus}
            onChange={(v) =>
              setCompanions((prev) => prev.map((p) => (p.id === c.id ? { ...p, bus: v } : p)))
            }
            yesLabel="Irá en el bus"
            noLabel="No necesitará"
          />
          <label className="-mt-3 flex flex-col gap-1.5">
            <input
              type="text"
              placeholder=" "
              className="rounded border border-[var(--r-navy)] bg-[var(--r-cream)] px-3.5 py-3 font-serif text-sm text-[var(--r-navy)] outline-none focus:border-[var(--r-coral)]"
            />
            <span className="font-serif text-xs text-[var(--r-navy)]">
              ¿Tiene alguna intolerancia alimenticia o dieta?
            </span>
          </label>
        </div>
      ))}

      <button
        type="submit"
        className="mt-2 self-start bg-[var(--r-navy)] px-6 py-3 font-serif text-sm text-[var(--r-cream)] transition-opacity hover:opacity-90"
      >
        Enviar confirmación
      </button>
    </form>
  );
}
