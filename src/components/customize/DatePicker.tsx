"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

// A calendar popover styled like the rest of the wizard. The browser's own
// <input type="date"> popup can't be styled at all, so it always looked like
// a foreign widget stuck onto the page.

type ISO = string; // YYYY-MM-DD, always in the visitor's local calendar

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number): ISO => `${y}-${pad(m + 1)}-${pad(d)}`;

export function todayISO(): ISO {
  const n = new Date();
  return toISO(n.getFullYear(), n.getMonth(), n.getDate());
}

function parseISO(iso: ISO): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return { y: Number(match[1]), m: Number(match[2]) - 1, d: Number(match[3]) };
}

function addDays(iso: ISO, days: number): ISO {
  const p = parseISO(iso)!;
  const dt = new Date(p.y, p.m, p.d + days);
  return toISO(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d={dir === "left" ? "M12.5 5 7.5 10l5 5" : "M7.5 5l5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-ink-soft">
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" fill="none" stroke="currentColor" strokeWidth={1.4} />
      <path d="M3 8.5h14M7 3v3M13 3v3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}

export default function DatePicker({
  value,
  onChange,
  min,
  locale,
  placeholder,
  prevMonthLabel,
  nextMonthLabel,
  ariaLabel,
}: {
  value: ISO;
  onChange: (iso: ISO) => void;
  /** Earliest selectable day (inclusive). */
  min?: ISO;
  locale: string;
  placeholder: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverId = useId();
  const today = todayISO();

  const selected = parseISO(value);
  // The month on display and the day that holds keyboard focus.
  const initial = selected ?? parseISO(min && min > today ? min : today)!;
  const [view, setView] = useState({ y: initial.y, m: initial.m });
  const [focusISO, setFocusISO] = useState<ISO>(value || toISO(initial.y, initial.m, initial.d));

  function openPicker() {
    const base = parseISO(value) ?? parseISO(min && min > today ? min : today)!;
    setView({ y: base.y, m: base.m });
    setFocusISO(toISO(base.y, base.m, base.d));
    setOpen(true);
  }

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Move real focus to the focused day when the popover is open.
  useEffect(() => {
    if (!open) return;
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusISO}"]`)?.focus();
  }, [open, focusISO, view]);

  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    // 2024-01-01 is a Monday; the week starts on Monday.
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  }, [locale]);

  const rawMonthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    new Date(view.y, view.m, 1),
  );
  // Spanish months are lowercase ("octubre de 2026"); capitalise just the first letter.
  const monthLabel = rawMonthLabel.charAt(0).toUpperCase() + rawMonthLabel.slice(1);

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const lead = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const out: (ISO | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d++) out.push(toISO(view.y, view.m, d));
    return out;
  }, [view]);

  const minParsed = min ? parseISO(min) : null;
  const canGoPrev = !minParsed || view.y > minParsed.y || (view.y === minParsed.y && view.m > minParsed.m);

  function shiftMonth(delta: number) {
    const dt = new Date(view.y, view.m + delta, 1);
    setView({ y: dt.getFullYear(), m: dt.getMonth() });
    setFocusISO(toISO(dt.getFullYear(), dt.getMonth(), 1));
  }

  function moveFocus(next: ISO) {
    if (min && next < min) return;
    const p = parseISO(next)!;
    setView({ y: p.y, m: p.m });
    setFocusISO(next);
  }

  function onDayKeyDown(e: React.KeyboardEvent, iso: ISO) {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in step) {
      e.preventDefault();
      moveFocus(addDays(iso, step[e.key]));
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  const display = selected
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(selected.y, selected.m, selected.d),
      )
    : null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onClick={() => (open ? close(false) : openPicker())}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-left text-sm outline-none transition-colors focus:border-clay"
      >
        <span className={display ? "text-ink" : "text-ink-soft/70"}>{display ?? placeholder}</span>
        <CalendarIcon />
      </button>

      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-30 mt-2 w-[19rem] max-w-full rounded-2xl border border-line bg-paper-raised p-4 shadow-[0_24px_50px_-24px_rgba(33,29,26,0.35)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-ink" aria-live="polite">
              {monthLabel}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canGoPrev}
                aria-label={prevMonthLabel}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sage-light hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label={nextMonthLabel}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sage-light hover:text-ink"
              >
                <ChevronIcon dir="right" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center" role="grid">
            {weekdays.map((w, i) => (
              <span key={i} className="pb-1 text-[11px] font-medium uppercase tracking-wide text-ink-soft" aria-hidden="true">
                {w}
              </span>
            ))}
            {cells.map((iso, i) => {
              if (!iso) return <span key={`pad-${i}`} />;
              const disabled = Boolean(min && iso < min);
              const isSelected = iso === value;
              const isToday = iso === today;
              const day = Number(iso.slice(8));
              return (
                <button
                  key={iso}
                  type="button"
                  data-day={iso}
                  disabled={disabled}
                  tabIndex={iso === focusISO ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => {
                    onChange(iso);
                    close();
                  }}
                  onKeyDown={(e) => onDayKeyDown(e, iso)}
                  className={[
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-clay/60",
                    disabled
                      ? "cursor-default text-ink-soft/35"
                      : isSelected
                        ? "cursor-pointer bg-ink font-medium text-paper"
                        : "cursor-pointer text-ink hover:bg-sage-light",
                    isToday && !isSelected && !disabled ? "font-semibold text-clay" : "",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
