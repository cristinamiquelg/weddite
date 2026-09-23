"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Shot = {
  src: string;
  template: string;
  slug: string;
  label: string;
};

// Real screenshots of the templates Weddite actually ships today (Aurora,
// Ribera) — no invented sites. As the catalog grows, add more shots here
// and they'll flow into the columns automatically.
const shots: Shot[] = [
  { src: "/hero/aurora-hero.jpg", template: "Aurora", slug: "aurora", label: "Portada" },
  { src: "/hero/aurora-historia.jpg", template: "Aurora", slug: "aurora", label: "Historia" },
  { src: "/hero/aurora-dia.jpg", template: "Aurora", slug: "aurora", label: "El día" },
  { src: "/hero/ribera-hero.jpg", template: "Ribera", slug: "ribera", label: "Portada" },
  { src: "/hero/ribera-itinerario.jpg", template: "Ribera", slug: "ribera", label: "Itinerario" },
  { src: "/hero/ribera-detalles.jpg", template: "Ribera", slug: "ribera", label: "Detalles" },
];

// Each column gets its own order (so neighbouring columns never show the
// same shot at the same height) and its own parallax speed + direction —
// that's what makes the columns visibly drift apart as you scroll instead
// of moving in lockstep.
const columns: { order: number[]; speed: number }[] = [
  { order: [0, 3, 1, 4], speed: 0.55 },
  { order: [4, 1, 5, 2], speed: -0.75 },
  { order: [2, 5, 0, 3], speed: 0.9 },
  { order: [5, 2, 4, 1], speed: -0.5 },
  { order: [1, 4, 3, 0], speed: 0.7 },
];

function Card({ shot }: { shot: Shot }) {
  return (
    <Link
      href={`/preview/${shot.slug}`}
      target="_blank"
      className="group/card relative block h-40 w-full shrink-0 overflow-hidden rounded-xl border border-black/5 shadow-[0_16px_30px_-20px_rgba(33,29,26,0.4)] sm:h-52"
    >
      <Image
        src={shot.src}
        alt={`Plantilla ${shot.template} — ${shot.label}`}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 45vw"
        className="object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/90">
        {shot.template}
        <span className="opacity-70">{shot.label}</span>
      </span>
    </Link>
  );
}

export default function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;

    function update() {
      raf = 0;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      // 0 when the section's top is at the viewport's bottom edge,
      // 1 when its bottom has reached the viewport's top edge — i.e. real
      // scroll progress of this section through the viewport, not a timer.
      const progress = Math.min(
        1,
        Math.max(0, (viewportH - rect.top) / (viewportH + rect.height)),
      );
      const shift = (progress - 0.5) * 110; // px of total travel per column at speed 1

      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        const speed = columns[i]?.speed ?? 1;
        col.style.transform = `translate3d(0, ${shift * speed}px, 0)`;
      });
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] overflow-hidden sm:h-[520px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="grid h-full grid-flow-col auto-cols-fr gap-4 px-4 sm:gap-5 sm:px-0">
        {columns.map((col, ci) => {
          const visibility =
            ci === 2 ? "hidden sm:flex" : ci >= 3 ? "hidden lg:flex" : "flex";
          return (
            <div
              key={ci}
              ref={(el) => {
                columnRefs.current[ci] = el;
              }}
              className={`${visibility} -mt-10 flex-col gap-4 will-change-transform sm:gap-5`}
            >
              {col.order.map((shotIndex, i) => (
                <Card key={i} shot={shots[shotIndex]} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
