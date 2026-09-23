"use client";

import { useState } from "react";

export default function RiberaCopyButton({
  value,
  className = "border border-[var(--r-coral)] px-5 py-2.5 text-sm text-[var(--r-cream)] transition-colors hover:bg-[var(--r-coral)]",
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

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
      {copied ? "¡Copiado!" : "Copiar número de cuenta"}
    </button>
  );
}
