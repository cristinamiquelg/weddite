export type Locale = "es" | "en";

export const locales: { id: Locale; label: string }[] = [
  { id: "es", label: "Español" },
  { id: "en", label: "English" },
];

type Dict = {
  hero: { weAreGettingMarried: string };
  aurora: {
    nav: { historia: string; dia: string; galeria: string; rsvp: string; regalo: string };
    day: { eyebrow: string; ceremony: string; celebration: string; seeOnMap: string; dressCode: string };
    gallery: string;
    rsvp: { eyebrow: string; heading: string; deadlinePrefix: string };
    gift: { eyebrow: string };
    footer: { madeWith: string };
  };
  ribera: {
    nav: { cuando: string; itinerario: string; detalles: string; regalos: string; confirm: string };
    countdownTitle: string;
    itinerary: { title: string; comoLlegar: string };
    details: {
      title: string;
      dresscode: { title: string; cta: string };
      bus: { title: string; cta: string };
      hotel: { title: string; cta: string };
    };
    rsvp: { title: string; deadlinePrefix: string };
    footer: { madeWith: string };
    form: {
      legend: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      attendingYes: string;
      attendingNo: string;
      busYes: string;
      busNo: string;
      dietary: string;
      companionYes: string;
      companionNo: string;
      howManyCompanions: string;
      companionInfo: string;
      removeCompanion: string;
      submit: string;
      thanks: string;
    };
  };
  countdown: { days: string; hours: string; minutes: string; seconds: string; alreadyCelebrated: string };
  rsvpForm: {
    name: string;
    namePlaceholder: string;
    attending: string;
    attendingYes: string;
    attendingNo: string;
    allergies: string;
    allergiesPlaceholder: string;
    submit: string;
    thanksTitle: string;
    thanksBody: string;
  };
  copyButton: { copy: string; copied: string };
  dateFallback: { long: string; short: string };
};

const es: Dict = {
  hero: { weAreGettingMarried: "Nos casamos" },
  aurora: {
    nav: { historia: "Historia", dia: "El día", galeria: "Galería", rsvp: "RSVP", regalo: "Regalo" },
    day: {
      eyebrow: "El gran día",
      ceremony: "Ceremonia",
      celebration: "Celebración",
      seeOnMap: "Ver en el mapa",
      dressCode: "Código de vestimenta",
    },
    gallery: "Galería",
    rsvp: {
      eyebrow: "Confirmación de asistencia",
      heading: "¿Nos acompañáis?",
      deadlinePrefix: "Antes del",
    },
    gift: { eyebrow: "Mesa de regalos" },
    footer: { madeWith: "Hecho con" },
  },
  ribera: {
    nav: { cuando: "Cuándo", itinerario: "Itinerario y lugares", detalles: "Detalles", regalos: "Regalos", confirm: "Confirma asistencia" },
    countdownTitle: "¡Se acerca el gran día!",
    itinerary: { title: "Itinerario y lugares", comoLlegar: "Cómo llegar" },
    details: {
      title: "Detalles",
      dresscode: { title: "Dresscode", cta: "Inspiración" },
      bus: { title: "Autobuses", cta: "Cómo llegar" },
      hotel: { title: "Hoteles", cta: "Más información" },
    },
    rsvp: { title: "¿Nos acompañáis?", deadlinePrefix: "Antes del" },
    footer: { madeWith: "Hecho con" },
    form: {
      legend: "Tu información",
      firstName: "Nombre",
      lastName: "Apellidos",
      phone: "Teléfono",
      email: "E-mail",
      attendingYes: "Voy a la boda",
      attendingNo: "No voy a la boda",
      busYes: "Iré en el bus",
      busNo: "No necesitaré",
      dietary: "¿Tienes alguna intolerancia alimenticia o dieta?",
      companionYes: "Llevo acompañante",
      companionNo: "Voy solo/a",
      howManyCompanions: "¿Cuántos acompañantes llevas?",
      companionInfo: "Información de acompañante",
      removeCompanion: "Quitar acompañante",
      submit: "Enviar confirmación",
      thanks: "¡Gracias! Hemos recibido tu confirmación. 🤍",
    },
  },
  countdown: { days: "días", hours: "horas", minutes: "min", seconds: "seg", alreadyCelebrated: "¡Ya lo celebramos!" },
  rsvpForm: {
    name: "Nombre y apellidos",
    namePlaceholder: "Tu nombre",
    attending: "¿Asistirás?",
    attendingYes: "Sí, allí estaré",
    attendingNo: "No podré ir",
    allergies: "Alergias o comentarios",
    allergiesPlaceholder: "Cuéntanos si tienes alguna alergia o restricción alimentaria",
    submit: "Confirmar asistencia",
    thanksTitle: "¡Gracias por confirmar!",
    thanksBody: "Hemos anotado vuestra respuesta. Nos vemos en la boda.",
  },
  copyButton: { copy: "Copiar número de cuenta", copied: "¡Copiado!" },
  dateFallback: { long: "Fecha por confirmar", short: "Por confirmar" },
};

const en: Dict = {
  hero: { weAreGettingMarried: "We're getting married" },
  aurora: {
    nav: { historia: "Our story", dia: "The day", galeria: "Gallery", rsvp: "RSVP", regalo: "Gift" },
    day: {
      eyebrow: "The big day",
      ceremony: "Ceremony",
      celebration: "Reception",
      seeOnMap: "View on map",
      dressCode: "Dress code",
    },
    gallery: "Gallery",
    rsvp: {
      eyebrow: "RSVP",
      heading: "Will you join us?",
      deadlinePrefix: "Before",
    },
    gift: { eyebrow: "Gift registry" },
    footer: { madeWith: "Made with" },
  },
  ribera: {
    nav: { cuando: "When", itinerario: "Itinerary & venues", detalles: "Details", regalos: "Gifts", confirm: "RSVP now" },
    countdownTitle: "The big day is getting close!",
    itinerary: { title: "Itinerary & venues", comoLlegar: "Get directions" },
    details: {
      title: "Details",
      dresscode: { title: "Dress code", cta: "Inspiration" },
      bus: { title: "Shuttle buses", cta: "Get directions" },
      hotel: { title: "Hotels", cta: "More info" },
    },
    rsvp: { title: "Will you join us?", deadlinePrefix: "Before" },
    footer: { madeWith: "Made with" },
    form: {
      legend: "Your information",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "E-mail",
      attendingYes: "I'll be at the wedding",
      attendingNo: "I can't make it",
      busYes: "I'll take the bus",
      busNo: "I won't need it",
      dietary: "Any food intolerance or diet we should know about?",
      companionYes: "I'm bringing a plus-one",
      companionNo: "I'm coming alone",
      howManyCompanions: "How many guests are you bringing?",
      companionInfo: "Guest info",
      removeCompanion: "Remove guest",
      submit: "Send RSVP",
      thanks: "Thank you! We've received your RSVP. 🤍",
    },
  },
  countdown: { days: "days", hours: "hours", minutes: "min", seconds: "sec", alreadyCelebrated: "We already celebrated!" },
  rsvpForm: {
    name: "Full name",
    namePlaceholder: "Your name",
    attending: "Will you attend?",
    attendingYes: "Yes, I'll be there",
    attendingNo: "I can't make it",
    allergies: "Allergies or comments",
    allergiesPlaceholder: "Let us know about any allergy or dietary restriction",
    submit: "Confirm attendance",
    thanksTitle: "Thanks for confirming!",
    thanksBody: "We've noted your reply. See you at the wedding.",
  },
  copyButton: { copy: "Copy account number", copied: "Copied!" },
  dateFallback: { long: "Date to be confirmed", short: "To be confirmed" },
};

const dicts: Record<Locale, Dict> = { es, en };

export function getDict(locale: Locale | undefined): Dict {
  return dicts[locale ?? "es"];
}

export function dateLocale(locale: Locale | undefined): string {
  return locale === "en" ? "en-GB" : "es-ES";
}
