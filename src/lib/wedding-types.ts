export type PaletteId = "clay" | "sage" | "midnight";

export type TimelineItem = {
  time: string;
  title: string;
  description?: string;
};

export type WeddingData = {
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
  dressCode: string;
  organizerContact: string;
  palette: PaletteId;
};

export const emptyWeddingData: WeddingData = {
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
  dressCode: "",
  organizerContact: "",
  palette: "clay",
};

export const demoWeddingData: WeddingData = {
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
  rsvpNote: "Confirmad antes del 15 de abril indicando alergias o restricciones alimentarias.",
  giftMessage:
    "Vuestra presencia es el mejor regalo. Si aun así queréis tener un detalle con nosotros, nos hará ilusión que colaboréis con nuestra luna de miel.",
  giftAccount: "ES00 0000 0000 0000 0000 0000",
  dressCode: "Elegante de jardín. Evitad el blanco y los tacones muy finos, ¡se celebra sobre césped!",
  organizerContact: "Cualquier duda, escribidnos a laurayMarc@example.com",
  palette: "clay",
};
