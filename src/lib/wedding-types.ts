import type { Locale } from "./i18n";

export type PaletteId = "clay" | "sage" | "midnight";

export type TimelineItem = {
  time: string;
  title: string;
  description?: string;
};

export type WeddingPlace = {
  name: string;
  address: string;
};

export type WeddingPhase = {
  name: string;
  when: string;
  places: WeddingPlace[];
};

export type DetailCardIcon = "dresscode" | "bus" | "hotel";

export type DetailCard = {
  icon: DetailCardIcon;
  title: string;
  /** Short practical text shown on the card itself (1–3 lines). */
  description?: string;
  ctaLabel: string;
  /** Destination for the CTA. The button is hidden when empty. */
  url?: string;
};

export type WeddingData = {
  /** Languages the published site is available in. At least one, in display
   * order — the first is the default a guest sees; if there's more than
   * one, the site shows a language switcher. */
  locales: Locale[];
  partnerA: string;
  partnerB: string;
  date: string; // ISO date, e.g. "2027-06-12"
  hashtag: string;
  welcomeMessage: string;
  storyTitle: string;
  story: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyTime: string;
  celebrationVenue: string;
  celebrationAddress: string;
  celebrationTime: string;
  timeline: TimelineItem[];
  galleryCaptions: string[];
  rsvpDeadline: string;
  rsvpNote: string;
  giftMessage: string;
  giftAccount: string;
  giftHolderName: string;
  dressCode: string;
  organizerContact: string;
  palette: PaletteId;
  // Fields used by the "Ribera" template's itinerary-by-phase layout.
  estateName: string;
  estateLocation: string;
  phases: WeddingPhase[];
  detailCards: DetailCard[];
};

export const emptyWeddingData: WeddingData = {
  locales: ["es"],
  partnerA: "",
  partnerB: "",
  date: "",
  hashtag: "",
  welcomeMessage: "",
  storyTitle: "Nuestra historia",
  story: "",
  ceremonyVenue: "",
  ceremonyAddress: "",
  ceremonyTime: "",
  celebrationVenue: "",
  celebrationAddress: "",
  celebrationTime: "",
  timeline: [],
  galleryCaptions: [],
  rsvpDeadline: "",
  rsvpNote: "",
  giftMessage: "",
  giftAccount: "",
  giftHolderName: "",
  dressCode: "",
  organizerContact: "",
  palette: "clay",
  estateName: "",
  estateLocation: "",
  phases: [],
  detailCards: [],
};

export const demoWeddingData: WeddingData = {
  locales: ["es", "en"],
  partnerA: "Laura",
  partnerB: "Marc",
  date: "2027-06-12",
  hashtag: "#LauraYMarc2027",
  welcomeMessage:
    "Nos casamos y queremos celebrarlo con las personas que más queremos. Aquí tenéis todo lo que necesitáis saber para el gran día.",
  storyTitle: "Nuestra historia",
  story:
    "Nos conocimos una noche de verano en una terraza de Barcelona, discutiendo sobre qué disco era mejor. Ocho años después, seguimos discutiendo de música, pero ya no hay dudas: queremos pasar el resto de nuestra vida juntos.",
  ceremonyVenue: "Ermita de Sant Miquel",
  ceremonyAddress: "Camí de l'Ermita, 3, Begur",
  ceremonyTime: "12:30",
  celebrationVenue: "Masía Can Bassa",
  celebrationAddress: "Carretera de Regencós, km 4, Begur",
  celebrationTime: "14:00",
  timeline: [
    { time: "12:30", title: "Ceremonia", description: "Ermita de Sant Miquel" },
    { time: "14:00", title: "Cóctel de bienvenida", description: "Jardines de Can Bassa" },
    { time: "16:00", title: "Banquete", description: "Carpa principal" },
    { time: "20:00", title: "Fiesta y baile", description: "Hasta que el cuerpo aguante" },
  ],
  galleryCaptions: [
    "Pedida de mano",
    "Primer viaje juntos",
    "Con la familia",
    "Nuestro rincón favorito",
    "El sí quiero de la preboda",
    "Riendo, como siempre",
  ],
  rsvpDeadline: "2027-04-15",
  rsvpNote:
    "Esperamos veros el 12 de junio. Confirmad antes del 15 de abril e indicadnos si tenéis alguna alergia.",
  giftMessage:
    "Vuestra presencia es el mejor regalo. Si aun así queréis tener un detalle con nosotros, nos hará ilusión que colaboréis con nuestra luna de miel.",
  giftAccount: "ES00 0000 0000 0000 0000 0000",
  giftHolderName: "Laura García",
  dressCode: "Elegante de jardín. Evitad el blanco y los tacones muy finos, ¡se celebra sobre césped!",
  organizerContact: "Cualquier duda, escribidnos a laurayMarc@example.com",
  palette: "clay",
  estateName: "",
  estateLocation: "",
  phases: [],
  detailCards: [],
};

export const riberaDemoWeddingData: WeddingData = {
  ...emptyWeddingData,
  locales: ["es", "en"],
  partnerA: "Elena",
  partnerB: "Mateo",
  date: "2027-09-11",
  hashtag: "#ElenaYMateo2027",
  welcomeMessage:
    "Nos casamos y queremos celebrarlo con las personas que más queremos.",
  storyTitle: "Nuestra historia",
  story:
    "Nos conocimos en un viaje a la costa, discutiendo sobre cuál era el mejor mirador. Años después seguimos discutiendo, pero ya sin dudas: queremos pasar la vida juntos.",
  estateName: "Finca del Faro",
  estateLocation: "Cadaqués, Girona",
  phases: [
    {
      name: "La pre-boda",
      when: "Viernes 10, 19:00",
      places: [{ name: "Casa del Pescador", address: "Carrer Nou, 8, Cadaqués" }],
    },
    {
      name: "La boda",
      when: "Sábado 11, 18:00",
      places: [
        { name: "Ermita de Sant Baldiri", address: "Camí de l'Ermita, s/n, Cadaqués" },
        { name: "Finca del Faro", address: "Carretera del Far, km 2, Cadaqués" },
      ],
    },
    {
      name: "La post-boda",
      when: "Domingo 12, 13:00",
      places: [{ name: "Restaurante Es Balandre", address: "Riba Nemesi Llorens, 2, Cadaqués" }],
    },
  ],
  detailCards: [
    {
      icon: "dresscode",
      title: "Dress code",
      description: "Formal de verano. La ermita tiene suelo de piedra: mejor tacón ancho.",
      ctaLabel: "Ver inspiración",
      url: "https://www.pinterest.es/search/pins/?q=boda%20verano%20formal",
    },
    {
      icon: "bus",
      title: "Autobuses",
      description: "Salida a las 17:15 desde la plaza de Cadaqués. Vuelta a partir de la 01:00.",
      ctaLabel: "Ver punto de salida",
      url: "https://www.google.com/maps/search/?api=1&query=Pla%C3%A7a%20Frederic%20Rahola%2C%20Cadaqu%C3%A9s",
    },
    {
      icon: "hotel",
      title: "Hoteles",
      description: "Tenemos precio especial en dos hoteles del pueblo hasta el 1 de julio.",
      ctaLabel: "Ver hoteles",
      url: "https://www.google.com/maps/search/?api=1&query=hoteles%20Cadaqu%C3%A9s",
    },
  ],
  rsvpDeadline: "2027-07-15",
  rsvpNote:
    "Esperamos veros el gran día. Confirmad vuestra asistencia lo antes posible; si venís en pareja o familia, con que lo rellene uno es suficiente.",
  giftMessage:
    "Tu presencia es nuestro mejor regalo, pero si quieres ayudarnos a crear nuestro nuevo hogar, puedes hacerlo por transferencia a",
  giftAccount: "ES00 0000 0000 0000 0000 0000",
  giftHolderName: "Elena Ruiz",
  organizerContact: "Cualquier duda, escribidnos a elenaymateo@example.com",
  palette: "clay",
};

export function getDemoWeddingData(slug: string): WeddingData {
  return slug === "ribera" ? riberaDemoWeddingData : demoWeddingData;
}
