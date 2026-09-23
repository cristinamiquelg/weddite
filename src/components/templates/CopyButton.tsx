"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

export default function CopyButton({ value, locale }: { value: string; locale?: Locale }) {
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
      className="rounded-full border border-[var(--w-accent)] px-5 py-2 text-sm font-medium text-[var(--w-accent)] transition-colors hover:bg-[var(--w-accent)] hover:text-[var(--w-surface)]"
    >
      {copied ? dict.copyButton.copied : dict.copyButton.copy}
    </button>
  );
}
