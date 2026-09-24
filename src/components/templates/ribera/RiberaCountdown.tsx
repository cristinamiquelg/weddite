"use client";

import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import styles from "./ribera.module.css";

function getRemaining(target: string) {
  // "2027-09-11" alone is parsed as UTC midnight; anchor it to local time
  // so the countdown matches the guest's calendar day.
  const at = /^\d{4}-\d{2}-\d{2}$/.test(target) ? `${target}T00:00:00` : target;
  const diff = new Date(at).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    isPast: diff <= 0,
  };
}

// Ribera-specific countdown: same ticking logic as the shared Countdown
// component, but with the exact big-serif-number look of the L&J
// invitation (days/hours/minutes only, no seconds).
export default function RiberaCountdown({ date, locale }: { date: string; locale?: Locale }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);
  const dict = getDict(locale);

  useEffect(() => {
    if (!date) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first tick must run immediately, not a second after mount
    setRemaining(getRemaining(date));
    // Only minutes are shown, so ticking every 15s is plenty and saves
    // re-renders (and battery) on low-end phones.
    const id = setInterval(() => setRemaining(getRemaining(date)), 15000);
    return () => clearInterval(id);
  }, [date]);

  if (!date || !remaining) return null;

  if (remaining.isPast) {
    return <p className={styles.eyebrow}>{dict.countdown.alreadyCelebrated}</p>;
  }

  // Days is the headline number, left unpadded (e.g. "524", not "0524");
  // hours/minutes pad to 2 digits, matching the original invitation.
  const units: [string, string][] = [
    [String(remaining.days), dict.countdown.days],
    [String(remaining.hours).padStart(2, "0"), dict.countdown.hours],
    [String(remaining.minutes).padStart(2, "0"), dict.countdown.minutes],
  ];

  return (
    <div className={styles.countdownUnits} role="timer" aria-live="off">
      {units.map(([value, label]) => (
        <div key={label} className={styles.unit}>
          <span className={styles.unitNum}>{value}</span>
          <span className={styles.unitLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}
