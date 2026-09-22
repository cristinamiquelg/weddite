"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
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
      className="rounded-full border border-[var(--w-accent)] px-5 py-2 text-sm font-medium text-[var(--w-accent)] transition-colors hover:bg-[var(--w-accent)] hover:text-[var(--w-surface)]"
    >
      {copied ? "¡Copiado!" : "Copiar número de cuenta"}
    </button>
  );
}
