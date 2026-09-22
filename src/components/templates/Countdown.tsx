"use client";

import { useEffect, useState } from "react";

function getRemaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    isPast: diff <= 0,
  };
}

export default function Countdown({
  date,
  showSeconds = true,
}: {
  date: string;
  showSeconds?: boolean;
}) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    if (!date) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first tick must run immediately, not a second after mount
    setRemaining(getRemaining(date));
    const id = setInterval(() => setRemaining(getRemaining(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (!date || !remaining) return null;
  if (remaining.isPast) {
    return (
      <p className="text-sm tracking-[0.2em] uppercase text-[var(--w-ink-soft)]">
        ¡Ya lo celebramos!
      </p>
    );
  }

  const units: [number, string][] = [
    [remaining.days, "días"],
    [remaining.hours, "horas"],
    [remaining.minutes, "min"],
    ...(showSeconds ? ([[remaining.seconds, "seg"]] as [number, string][]) : []),
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {units.map(([value, label]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-3xl sm:text-4xl tabular-nums text-[var(--w-ink)]">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--w-ink-soft)] mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
