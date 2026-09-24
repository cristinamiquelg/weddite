"use client";

import { useId, useRef, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import styles from "./ribera.module.css";

type YesNo = "si" | "no" | null;

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

// Yes/no question rendered as a segmented control. Semantically it's a
// radio group with a visible question, so screen readers announce the
// question and the selected state, and arrow keys move between options.
function YesNoQuestion({
  question,
  value,
  onChange,
  yesLabel,
  noLabel,
  error,
  errorText,
}: {
  question: string;
  value: YesNo;
  onChange: (v: "si" | "no") => void;
  yesLabel: string;
  noLabel: string;
  error?: boolean;
  errorText?: string;
}) {
  const id = useId();
  const options: { v: "si" | "no"; label: string; cls: string }[] = [
    { v: "si", label: yesLabel, cls: styles.segOptFirst },
    { v: "no", label: noLabel, cls: styles.segOptLast },
  ];

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const next = value === "si" ? "no" : "si";
      onChange(next);
      const group = e.currentTarget.parentElement;
      group?.querySelector<HTMLButtonElement>(`[data-v="${next}"]`)?.focus();
    }
  }

  return (
    <div className={styles.question}>
      <p id={`${id}-q`} className={styles.questionLabel}>
        {question}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={`${id}-q`}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${styles.seg} ${error ? styles.segError : ""}`}
        data-invalid={error ? "true" : undefined}
      >
        {options.map((o) => {
          const checked = value === o.v;
          return (
            <button
              key={o.v}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked || (value === null && o.v === "si") ? 0 : -1}
              data-v={o.v}
              onClick={() => onChange(o.v)}
              onKeyDown={onKeyDown}
              className={`${o.cls} ${checked ? styles.segOptActive : ""}`}
            >
              {o.v === "si" ? checked ? <CheckIcon /> : null : <CrossIcon />}
              {o.label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-err`} className={styles.fieldError}>
          {errorText}
        </p>
      ) : null}
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
  optionalText,
  error,
  invalid,
  describedBy,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optionalText?: string;
  error?: string;
  /** Marks the field invalid when the message lives elsewhere (shared error). */
  invalid?: boolean;
  describedBy?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optionalText ? <span className={styles.fieldOptional}> ({optionalText})</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-invalid={error || invalid ? true : undefined}
        aria-describedby={error ? `${id}-err` : describedBy}
        data-invalid={error || invalid ? "true" : undefined}
      />
      {error ? (
        <p id={`${id}-err`} className={styles.fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Companion = { id: number; firstName: string; lastName: string; kid: boolean; bus: YesNo; dietary: string };
type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function RiberaRsvpForm({ locale, showBus = true }: { locale?: Locale; showBus?: boolean }) {
  const dict = getDict(locale).ribera.form;
  const formRef = useRef<HTMLFormElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [asiste, setAsiste] = useState<YesNo>(null);
  const [bus, setBus] = useState<YesNo>(null);
  const [dietary, setDietary] = useState("");
  const [acompanante, setAcompanante] = useState<YesNo>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [nextId, setNextId] = useState(1);
  // Errors are only shown after the first submit attempt, then recomputed
  // live so each message disappears as soon as the guest fixes the field.
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const attending = asiste === "si";

  function newCompanion(id: number): Companion {
    return { id, firstName: "", lastName: "", kid: false, bus: null, dietary: "" };
  }

  function setBringsCompanions(v: "si" | "no") {
    setAcompanante(v);
    if (v === "no") {
      setCompanions([]);
      return;
    }
    if (companions.length === 0) {
      setCompanions([newCompanion(nextId)]);
      setNextId(nextId + 1);
    }
  }

  function setCompanionCount(n: number) {
    if (n <= companions.length) {
      setCompanions(companions.slice(0, n));
      return;
    }
    const extra: Companion[] = [];
    let id = nextId;
    for (let i = companions.length; i < n; i++) extra.push(newCompanion(id++));
    setNextId(id);
    setCompanions([...companions, ...extra]);
  }

  function updateCompanion(id: number, patch: Partial<Companion>) {
    setCompanions((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function removeCompanion(id: number) {
    const next = companions.filter((c) => c.id !== id);
    setCompanions(next);
    if (next.length === 0) setAcompanante("no");
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!firstName.trim()) e.firstName = dict.errRequired;
    if (!lastName.trim()) e.lastName = dict.errRequired;
    if (!phone.trim() && !email.trim()) e.contact = dict.errContact;
    if (email.trim() && !EMAIL_RE.test(email.trim())) e.email = dict.errEmail;
    if (!asiste) e.asiste = dict.errRequired;
    if (attending) {
      companions.forEach((c) => {
        if (!c.firstName.trim()) e[`c${c.id}-firstName`] = dict.errRequired;
      });
    }
    return e;
  }

  const errors: Errors = triedSubmit ? validate() : {};

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setTriedSubmit(true);
    if (Object.keys(e).length > 0) {
      // Move focus to the first invalid control so keyboard and
      // screen-reader users land right where the problem is.
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.focus();
      });
      return;
    }
    // The template has no backend yet: the real site should POST the
    // payload here and only switch to the thanks state on success.
    setSubmitted(true);
  }

  if (submitted) {
    const total = 1 + companions.length;
    return (
      <div className={styles.formThanks} role="status">
        <p className={styles.formThanksText}>{dict.thanks}</p>
        <p className={styles.formThanksSummary}>
          {attending ? dict.summaryAttending.replace("{n}", String(total)) : dict.summaryNotAttending}
        </p>
        <button type="button" className={styles.btnOutline} onClick={() => setSubmitted(false)}>
          {dict.edit}
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      {hasErrors ? (
        <p className={styles.formErrorSummary} role="alert">
          {dict.errSummary}
        </p>
      ) : null}

      <fieldset className={styles.fieldset}>
        <legend className={styles.formLegend}>{dict.legend}</legend>
        <div className={styles.formRow}>
          <TextField
            label={dict.firstName}
            name="firstName"
            value={firstName}
            onChange={setFirstName}
            autoComplete="given-name"
            required
            error={errors.firstName}
          />
          <TextField
            label={dict.lastName}
            name="lastName"
            value={lastName}
            onChange={setLastName}
            autoComplete="family-name"
            required
            error={errors.lastName}
          />
        </div>
        <p id="ribera-contact-hint" className={errors.contact ? styles.fieldError : styles.fieldHint}>
          {errors.contact ?? dict.contactHint}
        </p>
        <div className={styles.formRow}>
          <TextField
            label={dict.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            invalid={Boolean(errors.contact)}
            describedBy="ribera-contact-hint"
          />
          <TextField
            label={dict.email}
            name="email"
            type="email"
            inputMode="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            error={errors.email}
            invalid={Boolean(errors.contact)}
            describedBy="ribera-contact-hint"
          />
        </div>
      </fieldset>

      <YesNoQuestion
        question={dict.attendingQ}
        value={asiste}
        onChange={setAsiste}
        yesLabel={dict.attendingYes}
        noLabel={dict.attendingNo}
        error={Boolean(errors.asiste)}
        errorText={errors.asiste}
      />

      {attending ? (
        <>
          {showBus ? (
            <YesNoQuestion
              question={dict.busQ}
              value={bus}
              onChange={setBus}
              yesLabel={dict.busYes}
              noLabel={dict.busNo}
            />
          ) : null}

          <TextField
            label={dict.dietary}
            name="dietary"
            value={dietary}
            onChange={setDietary}
            optionalText={dict.optional}
          />

          <YesNoQuestion
            question={dict.companionQ}
            value={acompanante}
            onChange={setBringsCompanions}
            yesLabel={dict.companionYes}
            noLabel={dict.companionNo}
          />

          {acompanante === "si" ? (
            <div className={styles.companionsControl}>
              <label className={styles.questionLabel} htmlFor="ribera-companions-count">
                {dict.howManyCompanions}
              </label>
              <select
                id="ribera-companions-count"
                value={companions.length}
                onChange={(e) => setCompanionCount(Number(e.target.value))}
                className={styles.select}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {companions.map((c, i) => (
            <div
              key={c.id}
              role="group"
              aria-labelledby={`ribera-companion-${c.id}`}
              className={styles.companion}
            >
              <hr className={styles.divider} />
              <div className={styles.companionHead}>
                <p id={`ribera-companion-${c.id}`} className={styles.formLegend}>
                  {dict.companionInfo} {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeCompanion(c.id)}
                  aria-label={`${dict.removeCompanion} ${i + 1}`}
                  className={styles.companionRemove}
                >
                  <CrossIcon />
                </button>
              </div>
              <div className={styles.formRow}>
                <TextField
                  label={dict.firstName}
                  name={`companion-${i}-firstName`}
                  value={c.firstName}
                  onChange={(v) => updateCompanion(c.id, { firstName: v })}
                  required
                  error={errors[`c${c.id}-firstName`]}
                />
                <TextField
                  label={dict.lastName}
                  name={`companion-${i}-lastName`}
                  value={c.lastName}
                  onChange={(v) => updateCompanion(c.id, { lastName: v })}
                />
              </div>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={c.kid}
                  onChange={(e) => updateCompanion(c.id, { kid: e.target.checked })}
                />
                <span>{dict.kidsMenu}</span>
              </label>
              {showBus ? (
                <YesNoQuestion
                  question={dict.busQ}
                  value={c.bus}
                  onChange={(v) => updateCompanion(c.id, { bus: v })}
                  yesLabel={dict.busYes}
                  noLabel={dict.busNo}
                />
              ) : null}
              <TextField
                label={dict.dietary}
                name={`companion-${i}-dietary`}
                value={c.dietary}
                onChange={(v) => updateCompanion(c.id, { dietary: v })}
                optionalText={dict.optional}
              />
            </div>
          ))}
        </>
      ) : null}

      <button type="submit" className={styles.formSubmit}>
        {dict.submit}
      </button>
    </form>
  );
}
