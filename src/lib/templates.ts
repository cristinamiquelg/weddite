export type Template = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  /** One short line for catalog cards — sells the feeling, not the feature list. */
  summary: string;
  /** Longer, feeling-first copy for the template's own detail page. */
  description: string;
  price: number;
  tags: string[];
  colors: string[];
  tools: string[];
  features: string[];
};


export const templates: Template[] = [
  {
    id: "tpl-aurora",
    slug: "aurora",
    name: "Aurora",
    tagline: "Editorial, cálida y atemporal",
    summary: "Diseño editorial, cálido y sin adornos de más: bonito hoy y dentro de diez años.",
    description:
      "Para una boda que no necesita adornos para tener personalidad: tipografía elegante, mucho aire y una estética que seguirá gustándoos cuando hayan pasado las fotos de la boda.",
    price: 39,
    tags: ["Minimalista", "Editorial", "Atemporal"],
    colors: ["Terracota", "Verde salvia", "Azul medianoche"],
    tools: ["RSVP", "Itinerario", "Galería", "Regalo"],
    features: [
      "Cuenta atrás en directo",
      "Itinerario del día con horarios",
      "Galería de fotos personalizable",
      "Confirmación de asistencia (RSVP) integrada",
      "Sección de lista de regalos / bizum",
      "3 paletas de color a elegir",
      "100% adaptada a móvil",
    ],
  },
  {
    id: "tpl-ribera",
    slug: "ribera",
    name: "Ribera",
    tagline: "Elegante, náutica y con carácter",
    summary: "Elegante, náutica y con carácter, para bodas que no empiezan el día de la boda.",
    description:
      "Para bodas con varias fases: preboda, ceremonia, celebración y postboda, todo en una misma web, con paleta navy y coral y detalles ilustrados que le dan carácter.",
    price: 45,
    tags: ["Elegante", "Con carácter", "Multi-evento"],
    colors: ["Navy", "Coral"],
    tools: ["RSVP", "Itinerario", "Regalo"],
    features: [
      "Cuenta atrás en directo",
      "Itinerario por fases (pre-boda, boda, post-boda) con varios lugares",
      "Tarjetas de detalles (dresscode, autobuses, hoteles)",
      "RSVP con acompañantes ilimitados",
      "Sección de regalo con marco ilustrado",
      "100% adaptada a móvil",
    ],
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}
