"use client";

import { useState } from "react";
import styles from "./ribera.module.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.segIco} aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.segIco} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12z" />
    </svg>
  );
}

// Left/positive segment shows its check only once chosen; the negative
// segment keeps its ⊗ mark at all times — matches the original design.
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
  return (
    <div className={styles.seg}>
      <button
        type="button"
        onClick={() => onChange("si")}
        className={`${styles.segOptFirst} ${value === "si" ? styles.segOptActive : ""}`}
      >
        {value === "si" ? <CheckIcon /> : null}
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={`${styles.segOptLast} ${value === "no" ? styles.segOptActive : ""}`}
      >
        <CrossIcon />
        {noLabel}
      </button>
    </div>
  );
}

function TextField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className={styles.field}>
      <input type={type} placeholder=" " />
      <span className={styles.fieldLabel}>{label}</span>
    </label>
  );
}

function StackField({ label }: { label: string }) {
  return (
    <label className={styles.fieldStack}>
      <input type="text" placeholder=" " />
      <span className={styles.fieldStackLabel}>{label}</span>
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
      <div className={styles.formThanks}>
        <p className={styles.formThanksText}>¡Gracias! Hemos recibido tu confirmación. 🤍</p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className={styles.formLegend}>Tu información</p>

      <div className={styles.formRow}>
        <TextField label="Nombre" />
        <TextField label="Apellidos" />
      </div>
      <div className={styles.formRow}>
        <TextField label="Teléfono" type="tel" />
        <TextField label="E-mail" type="email" />
      </div>

      <Seg value={asiste} onChange={setAsiste} yesLabel="Voy a la boda" noLabel="No voy a la boda" />
      <Seg value={bus} onChange={setBus} yesLabel="Iré en el bus" noLabel="No necesitaré" />

      <StackField label="¿Tienes alguna intolerancia alimenticia o dieta?" />

      <Seg
        value={acompanante}
        onChange={setBringsCompanions}
        yesLabel="Llevo acompañante"
        noLabel="Voy solo/a"
      />

      {acompanante === "si" ? (
        <div className={styles.companionsControl}>
          <label className={styles.companionsControlQ} htmlFor="ribera-companions-count">
            ¿Cuántos acompañantes llevas?
          </label>
          <select
            id="ribera-companions-count"
            value={count}
            onChange={(e) => setCompanionCount(Number(e.target.value))}
            className={styles.select}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {companions.map((c, i) => (
        <div key={c.id} className={styles.companion}>
          <hr className={styles.divider} />
          <div className={styles.companionHead}>
            <p className={styles.formLegend}>Información de acompañante {i + 1}</p>
            <button
              type="button"
              onClick={() => removeCompanion(c.id)}
              aria-label="Quitar acompañante"
              className={styles.companionRemove}
            >
              <CrossIcon />
            </button>
          </div>
          <div className={styles.formRow}>
            <TextField label="Nombre" />
            <TextField label="Apellidos" />
          </div>
          <div className={styles.formRow}>
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
          <StackField label="¿Tiene alguna intolerancia alimenticia o dieta?" />
        </div>
      ))}

      <button type="submit" className={styles.formSubmit}>
        Enviar confirmación
      </button>
    </form>
  );
}
