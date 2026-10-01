"use client";

import { useEffect, useState } from "react";

// Marks a non-production deployment. The layout only renders this when
// VERCEL_ENV is "preview", so it can never appear on wedite.com. It hides
// itself inside iframes (the wizard's live preview) so it doesn't pollute
// what the template looks like.
export default function StagingBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- needs window to know whether we're framed
    setVisible(window.self === window.top);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        data-env-banner="staging"
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[2147483647] h-1 bg-amber-400"
      />
      <div
        data-env-banner="staging"
        role="note"
        className="pointer-events-none fixed bottom-3 left-3 z-[2147483647] rounded-full bg-amber-400 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-md"
      >
        Staging
      </div>
    </>
  );
}
