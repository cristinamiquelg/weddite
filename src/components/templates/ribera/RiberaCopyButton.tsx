"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

export default function RiberaCopyButton({
  value,
  className = "border border-[var(--r-coral)] px-5 py-2.5 text-sm text-[var(--r-cream)] transition-colors hover:bg-[var(--r-coral)]",
  locale,
}: {
  value: string;
  className?: string;
  locale?: Locale;
}) {
  const [copied, setCopied] = useState(false);
  const dict = getDict(locale);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          // clipboard unavailable; ignore
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className={className}
    >
      {copied ? dict.copyButton.copied : dict.copyButton.copy}
    </button>
  );
}
