"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

export default function RsvpForm({ locale }: { locale?: Locale }) {
  const [sent, setSent] = useState(false);
  const dict = getDict(locale);

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--w-line)] bg-[var(--w-surface)] px-6 py-8 text-center">
        <p className="font-display text-xl text-[var(--w-ink)]">{dict.rsvpForm.thanksTitle}</p>
        <p className="mt-2 text-sm text-[var(--w-ink-soft)]">{dict.rsvpForm.thanksBody}</p>
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
          {dict.rsvpForm.name}
          <input
            required
            type="text"
            placeholder={dict.rsvpForm.namePlaceholder}
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[var(--w-ink-soft)]">
          {dict.rsvpForm.attending}
          <select
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
            defaultValue="si"
          >
            <option value="si">{dict.rsvpForm.attendingYes}</option>
            <option value="no">{dict.rsvpForm.attendingNo}</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm text-[var(--w-ink-soft)]">
          {dict.rsvpForm.allergies}
          <textarea
            rows={3}
            placeholder={dict.rsvpForm.allergiesPlaceholder}
            className="rounded-lg border border-[var(--w-line)] bg-transparent px-3 py-2 text-[var(--w-ink)] outline-none focus:border-[var(--w-accent)]"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[var(--w-accent)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--w-surface)] transition-opacity hover:opacity-90 sm:w-auto"
      >
        {dict.rsvpForm.submit}
      </button>
    </form>
  );
}
