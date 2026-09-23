type Persona = {
  names: string;
  place: string;
  bg: string;
  ink: string;
  accent: string;
};

// Invented "sites" that stand in for a full catalog wall while Weddite only
// ships two real templates — pure decoration, not linked to any real page.
const personas: Persona[] = [
  { names: "Marta & Iker", place: "Sitges, Barcelona", bg: "#f1e0d6", ink: "#241f1a", accent: "#b5583a" },
  { names: "Alicia & Pau", place: "Cadaqués, Girona", bg: "#0e1453", ink: "#efece3", accent: "#dd3e3e" },
  { names: "Nora & Bruno", place: "Ronda, Málaga", bg: "#eef0e7", ink: "#20261c", accent: "#5f6b4f" },
  { names: "Elena & Hugo", place: "Formentera", bg: "#f7e7e6", ink: "#3a2020", accent: "#c17a7a" },
  { names: "Sofía & Marc", place: "Vic, Barcelona", bg: "#11151f", ink: "#f3f1ea", accent: "#c9a86a" },
  { names: "Carla & Dani", place: "Olite, Navarra", bg: "#efe7d8", ink: "#2b2a20", accent: "#7a7a4a" },
  { names: "Julia & Adrián", place: "Comillas, Cantabria", bg: "#e3ebf0", ink: "#1c2b33", accent: "#4a7a95" },
  { names: "Irene & Pol", place: "Peñíscola, Castellón", bg: "#f4ece1", ink: "#3a1620", accent: "#7a2436" },
  { names: "Vera & Nico", place: "Almagro, Ciudad Real", bg: "#22201f", ink: "#f2e9df", accent: "#e0a87a" },
  { names: "Clara & Martí", place: "Begur, Girona", bg: "#efe9f5", ink: "#2c2333", accent: "#7a5fa0" },
];

const columns: { order: number[]; duration: string; direction: "up" | "down" }[] = [
  { order: [0, 1, 2, 3, 4, 5], duration: "46s", direction: "up" },
  { order: [6, 7, 8, 9, 0, 1], duration: "58s", direction: "down" },
  { order: [3, 4, 5, 6, 7, 8], duration: "40s", direction: "up" },
  { order: [9, 0, 2, 4, 6, 8], duration: "52s", direction: "down" },
  { order: [1, 3, 5, 7, 9, 0], duration: "44s", direction: "up" },
];

function Card({ persona }: { persona: Persona }) {
  return (
    <div
      className="flex h-40 w-full flex-col justify-center gap-2 rounded-xl border border-black/5 px-6 py-5 shadow-[0_16px_30px_-20px_rgba(33,29,26,0.4)]"
      style={{ background: persona.bg, color: persona.ink }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.25em] opacity-80"
        style={{ color: persona.accent }}
      >
        Nos casamos
      </p>
      <p className="font-display text-xl italic leading-tight">{persona.names}</p>
      <p className="text-xs opacity-70">{persona.place}</p>
    </div>
  );
}

export default function HeroGrid() {
  return (
    <div
      className="relative h-[420px] overflow-hidden sm:h-[520px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="grid h-full grid-flow-col auto-cols-fr gap-4 px-4 sm:gap-5 sm:px-0">
        {columns.map((col, ci) => {
          const cards = [...col.order, ...col.order];
          const visibility =
            ci === 2 ? "hidden sm:flex" : ci >= 3 ? "hidden lg:flex" : "flex";
          return (
            <div
              key={ci}
              className={`marquee-col ${visibility} flex-col gap-4 sm:gap-5`}
              style={{
                animation: `${col.direction === "up" ? "marquee-up" : "marquee-down"} ${col.duration} linear infinite`,
              }}
            >
              {cards.map((personaIndex, i) => (
                <Card key={i} persona={personas[personaIndex]} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
