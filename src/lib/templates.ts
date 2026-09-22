export type Template = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
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
    description:
      "Una plantilla minimalista con aire editorial: tipografía serif elegante, mucho aire en blanco y detalles cálidos. Pensada para parejas que quieren algo bonito de verdad, no una web de boda genérica.",
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
    description:
      "Una plantilla con más personalidad: paleta navy, crema y coral, tipografía serif clásica y detalles ilustrados. Pensada para parejas que quieren una boda con varias fases (pre-boda, boda, post-boda) y un RSVP completo con acompañantes.",
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
