"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Template } from "@/lib/templates";
import { colorOptions, toolOptions } from "@/lib/templates";

type MenuKey = "color" | "estilo" | "herramientas";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FilterMenu({
  label,
  options,
  selected,
  onToggle,
  isOpen,
  onOpenChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        className="flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-ink"
      >
        {label}
        {selected.length > 0 ? (
          <span className="rounded-full bg-ink px-1.5 py-0.5 text-[10px] text-paper">
            {selected.length}
          </span>
        ) : null}
        <Chevron open={isOpen} />
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-20 mt-3 w-56 rounded-xl border-2 border-ink bg-paper-raised p-2 shadow-[0_20px_40px_-25px_rgba(33,29,26,0.5)]">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink hover:bg-sage-light"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="h-4 w-4 accent-ink"
              />
              {opt}
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function CatalogBrowser({ templates }: { templates: Template[] }) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const barRef = useRef<HTMLDivElement>(null);

  const styleOptions = Array.from(new Set(templates.flatMap((t) => t.tags)));

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const hasFilters = colors.length + styles.length + tools.length > 0 || search.trim() !== "";

  const filtered = templates.filter((tpl) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      tpl.name.toLowerCase().includes(q) ||
      tpl.tagline.toLowerCase().includes(q) ||
      tpl.description.toLowerCase().includes(q);
    const matchesColor = colors.length === 0 || colors.some((c) => tpl.colors.includes(c));
    const matchesStyle = styles.length === 0 || styles.some((s) => tpl.tags.includes(s));
    const matchesTools = tools.length === 0 || tools.some((t) => tpl.tools.includes(t));
    return matchesSearch && matchesColor && matchesStyle && matchesTools;
  });

  return (
    <div>
      <div
        ref={barRef}
        data-reveal
        className="flex flex-col gap-4 rounded-xl bg-[#f4ece0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <button
            type="button"
            onClick={() => {
              setColors([]);
              setStyles([]);
              setTools([]);
              setOpenMenu(null);
            }}
            className={`whitespace-nowrap text-sm font-bold ${
              hasFilters ? "text-ink-soft" : "text-ink"
            }`}
          >
            Todas las plantillas
          </button>
          <FilterMenu
            label="Color"
            options={colorOptions}
            selected={colors}
            onToggle={(v) => toggle(colors, setColors, v)}
            isOpen={openMenu === "color"}
            onOpenChange={(open) => setOpenMenu(open ? "color" : null)}
          />
          <FilterMenu
            label="Estilo"
            options={styleOptions}
            selected={styles}
            onToggle={(v) => toggle(styles, setStyles, v)}
            isOpen={openMenu === "estilo"}
            onOpenChange={(open) => setOpenMenu(open ? "estilo" : null)}
          />
          <FilterMenu
            label="Herramientas"
            options={toolOptions}
            selected={tools}
            onToggle={(v) => toggle(tools, setTools, v)}
            isOpen={openMenu === "herramientas"}
            onOpenChange={(open) => setOpenMenu(open ? "herramientas" : null)}
          />
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar plantilla"
            className="w-full rounded-lg border-2 border-ink bg-paper-raised py-2 pl-4 pr-10 text-sm text-ink outline-none placeholder:text-ink-soft/60"
          />
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-ink-soft">
          Ninguna plantilla coincide con esos filtros todavía. Probad a quitar
          alguno.
        </p>
      ) : (
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tpl, i) => (
            <article
              key={tpl.id}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-shadow hover:shadow-[0_30px_60px_-35px_rgba(33,29,26,0.4)]"
            >
              <Link href={`/plantillas/${tpl.slug}`} className="block">
                <div className="relative h-64 overflow-hidden border-b border-line bg-paper">
                  <iframe
                    src={`/preview/${tpl.slug}`}
                    title={`Preview de la plantilla ${tpl.name}`}
                    tabIndex={-1}
                    className="pointer-events-none absolute left-1/2 top-0 h-[1100px] w-[1400px] origin-top -translate-x-1/2 scale-[0.35] sm:scale-[0.3]"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl">{tpl.name}</h2>
                  <span className="text-sm font-medium text-ink-soft">{tpl.price} €</span>
                </div>
                <p className="mt-1 text-sm text-clay">{tpl.tagline}</p>
                <p className="mt-4 flex-1 text-sm text-ink-soft">{tpl.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sage-light px-3 py-1 text-xs text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/preview/${tpl.slug}`}
                    target="_blank"
                    className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-ink"
                  >
                    Ver preview
                  </Link>
                  <Link
                    href={`/plantillas/${tpl.slug}`}
                    className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
                  >
                    Elegir
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
