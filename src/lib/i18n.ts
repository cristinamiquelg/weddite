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
    hero: { saveTheDate: string; forTheWeddingOf: string };
    countdownTitle: string;
    giftTitle: string;
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
      optional: string;
      attendingQ: string;
      busQ: string;
      companionQ: string;
      kidsMenu: string;
      contactHint: string;
      errRequired: string;
      errContact: string;
      errEmail: string;
      errSummary: string;
      edit: string;
      summaryAttending: string;
      summaryNotAttending: string;
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
    nav: { cuando: "Cuándo", itinerario: "Itinerario", detalles: "Detalles", regalos: "Regalos", confirm: "Confirmar" },
    hero: { saveTheDate: "Save the Date", forTheWeddingOf: "la boda de" },
    countdownTitle: "¡Se acerca el gran día!",
    giftTitle: "Regalos",
    itinerary: { title: "Itinerario y lugares", comoLlegar: "Cómo llegar" },
    details: {
      title: "Detalles",
      dresscode: { title: "Dress code", cta: "Inspiración" },
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
      attendingYes: "Sí, allí estaré",
      attendingNo: "No podré ir",
      busYes: "Sí, iré en bus",
      busNo: "No lo necesito",
      dietary: "¿Tienes alguna intolerancia alimenticia o dieta?",
      companionYes: "Sí",
      companionNo: "No, voy solo/a",
      howManyCompanions: "¿Cuántas personas vienen contigo?",
      companionInfo: "Acompañante",
      removeCompanion: "Quitar acompañante",
      submit: "Enviar confirmación",
      thanks: "¡Gracias! Hemos recibido tu confirmación. 🤍",
      optional: "opcional",
      attendingQ: "¿Vienes a la boda?",
      busQ: "¿Necesitas autobús?",
      companionQ: "¿Vienes con alguien? (pareja, hijos…)",
      kidsMenu: "Es menor y necesita menú infantil",
      contactHint: "Déjanos al menos un teléfono o un e-mail por si hay cambios.",
      errRequired: "Este campo es obligatorio.",
      errContact: "Indica un teléfono o un e-mail.",
      errEmail: "Revisa el e-mail: parece incompleto.",
      errSummary: "Falta algún dato. Revisa los campos marcados.",
      edit: "Modificar mi respuesta",
      summaryAttending: "Confirmado: {n} persona(s).",
      summaryNotAttending: "Sentimos que no puedas venir. Gracias por avisar.",
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
    nav: { cuando: "When", itinerario: "Itinerary", detalles: "Details", regalos: "Gifts", confirm: "RSVP" },
    hero: { saveTheDate: "Save the Date", forTheWeddingOf: "for the wedding of" },
    countdownTitle: "The big day is getting close!",
    giftTitle: "Gifts",
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
      attendingYes: "Yes, I'll be there",
      attendingNo: "Sorry, I can't",
      busYes: "Yes, I'll take the bus",
      busNo: "I don't need it",
      dietary: "Any food intolerance or diet we should know about?",
      companionYes: "Yes",
      companionNo: "No, just me",
      howManyCompanions: "How many people are coming with you?",
      companionInfo: "Guest",
      removeCompanion: "Remove guest",
      submit: "Send RSVP",
      thanks: "Thank you! We've received your RSVP. 🤍",
      optional: "optional",
      attendingQ: "Are you coming to the wedding?",
      busQ: "Do you need the shuttle bus?",
      companionQ: "Is anyone coming with you? (partner, kids…)",
      kidsMenu: "Child — needs a kids' menu",
      contactHint: "Leave at least a phone or an e-mail in case plans change.",
      errRequired: "This field is required.",
      errContact: "Please add a phone or an e-mail.",
      errEmail: "Check the e-mail — it looks incomplete.",
      errSummary: "Something's missing. Please check the highlighted fields.",
      edit: "Change my answer",
      summaryAttending: "Confirmed: {n} guest(s).",
      summaryNotAttending: "Sorry you can't make it. Thanks for letting us know.",
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
