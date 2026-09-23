"use client";

import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import styles from "./ribera.module.css";

function getRemaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
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
    const id = setInterval(() => setRemaining(getRemaining(date)), 1000);
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
    <div className={styles.countdownUnits}>
      {units.map(([value, label]) => (
        <div key={label} className={styles.unit}>
          <span className={styles.unitNum}>{value}</span>
          <span className={styles.unitLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}
