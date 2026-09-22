"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders nothing — it just wires up IntersectionObserver-driven fade-ins
 * for every `data-reveal` element on the page (see the .reveal rules in
 * globals.css). Mounted once in the root layout so it covers every route,
 * including the wedding template previews.
 *
 * A MutationObserver picks up `data-reveal` nodes added after the initial
 * scan (e.g. cards that reappear after a client-side filter change), not
 * just the ones present on first paint or route change.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    function observeNew(root: ParentNode) {
      const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
      nodes.forEach((el) => io.observe(el));
    }

    observeNew(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-reveal") && !node.classList.contains("is-visible")) {
            io.observe(node);
          }
          observeNew(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
