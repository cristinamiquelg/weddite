import type { SiteLocale } from "./site-locale";

type SiteDict = {
  nav: { designs: string; howItWorks: string; whoWeAre: string; contact: string; viewDesigns: string };
  footer: {
    tagline: string;
    product: string;
    weddite: string;
    designs: string;
    howItWorks: string;
    contact: string;
    whoWeAre: string;
    privacy: string;
    rights: (year: number) => string;
  };
  home: {
    eyebrow: string;
    h1: string;
    subhead: string;
    ctaExplore: string;
    ctaExploreSub: string;
    ctaExample: string;
    problemLabel: string;
    problemHeading: string;
    painPoints: string[];
    wedditeLabel: string;
    promisesHeadingPre: string;
    promisesHeadingItalic: string;
    promises: { title: string; body: string }[];
    howItWorksLabel: string;
    howItWorksHeading: string;
    steps: { title: string; body: string }[];
    testimonialsLabel: string;
    testimonialsHeading: string;
    ctaFinalPre: string;
    ctaFinalItalic: string;
    ctaFinalPost: string;
    ctaFinalButton: string;
    contactLabel: string;
    contactHeading: string;
    contactSub: string;
  };
  catalog: { metaTitle: string; metaDescription: string; h1: string; sub: string; viewPreview: string; choose: string };
  product: {
    back: string;
    includes: string;
    makeItYours: string;
    openFullscreen: string;
    payOnce: string;
  };
  templates: Record<
    "aurora" | "ribera",
    { tagline: string; summary: string; description: string; features: string[] }
  >;
  quienesSomos: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    h1: string;
    p1: string;
    p2: string;
    p3: string;
    bullets: string[];
    closingPre: string;
    closingLinkText: string;
    closingPost: string;
  };
  gracias: {
    badge: string;
    h1: string;
    bodyPre: string;
    templateFallback: string;
    bodyPost: string;
    viewSite: string;
    keepEditing: string;
    backToCatalog: string;
  };
  contact: {
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
  };
  checkout: {
    backEdit: string;
    summary: string;
    yourWeddingFallback: string;
    design: string;
    weddingDate: string;
    venue: string;
    venueTBD: string;
    totalOnce: string;
    reviewBeforeBuy: string;
    paymentData: string;
    demoMode: string;
    fillTestCard: string;
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    confirming: string;
    confirmBuy: (price: number) => string;
    disclaimer: string;
  };
  wizard: {
    savingAuto: string;
    loading: string;
    editTab: string;
    previewTab: string;
    livePreview: string;
    iframeTitle: string;
    personalizing: (name: string) => string;
    back: string;
    next: string;
    reviewAndBuy: string;
    stepLabels: {
      language: string;
      couple: string;
      story: string;
      day: string;
      gallery: string;
      rsvp: string;
      style: string;
      itinerary: string;
      details: string;
    };
    required: string;
    remove: string;
    paletteLabels: { clay: string; sage: string; midnight: string };
    stepLanguage: { intro: string; included: string; summary: (langs: string) => string };
    stepCouple: {
      yourName: string;
      partnerName: string;
      maxChars: (n: number) => string;
      weddingDate: string;
      hashtag: string;
      hashtagHint: string;
      welcomeMessage: string;
      welcomeMessagePlaceholder: string;
      estateName: string;
      estateNameHint: string;
      location: string;
    };
    stepStory: {
      sectionTitle: string;
      sectionTitlePlaceholder: string;
      yourStory: string;
      yourStoryHint: string;
      yourStoryPlaceholder: string;
    };
    stepDay: {
      ceremony: string;
      celebration: string;
      venue: string;
      time: string;
      address: string;
      addressHint: string;
      dayItinerary: string;
      addMoment: string;
      momentTitlePlaceholder: string;
      detailPlaceholder: string;
      emptyTimeline: string;
      dressCode: string;
      dressCodeHint: string;
      dressCodePlaceholder: string;
    };
    stepGallery: { intro: string; captionPlaceholder: string; addPhoto: string };
    stepRsvpGift: {
      rsvpSectionTitle: string;
      deadline: string;
      noteForGuests: string;
      notePlaceholder: string;
      giftTableTitle: string;
      message: string;
      messagePlaceholder: string;
      accountHolder: string;
      accountNumber: string;
      organizerContact: string;
      organizerContactPlaceholder: string;
    };
    stepStyle: { intro: string };
    stepItinerary: {
      intro: string;
      phaseNamePlaceholder: string;
      phaseWhenPlaceholder: string;
      removePhase: string;
      placeNamePlaceholder: string;
      placeAddressPlaceholder: string;
      addPlace: string;
      addPhase: string;
    };
    stepDetails: {
      intro: string;
      iconLabels: { dresscode: string; bus: string; hotel: string };
      titlePlaceholder: string;
      ctaPlaceholder: string;
      addCard: string;
    };
  };
};

const es: SiteDict = {
  nav: { designs: "Diseños", howItWorks: "Cómo funciona", whoWeAre: "Quiénes somos", contact: "Contacto", viewDesigns: "Ver diseños" },
  footer: {
    tagline: "Webs de boda modernas, listas en minutos. Sin llamadas, sin presupuestos por correo: todo a golpe de clic.",
    product: "Producto",
    weddite: "Weddite",
    designs: "Diseños",
    howItWorks: "Cómo funciona",
    contact: "Contacto",
    whoWeAre: "Quiénes somos",
    privacy: "Política de privacidad",
    rights: (year) => `© ${year} Weddite. Todos los derechos reservados.`,
  },
  home: {
    eyebrow: "Webs para historias que merecen ser contadas",
    h1: "Una web tan bonita como vuestra boda",
    subhead: "Elegid vuestro diseño, personalizadlo con vuestra historia y compartidlo con vuestros invitados. Sin llamadas, sin presupuestos y sin esperas.",
    ctaExplore: "Explorar diseños",
    ctaExploreSub: "Ver diseños y precios",
    ctaExample: "Ver un ejemplo en directo",
    problemLabel: "El problema",
    problemHeading: "Una boda se cuida hasta el último detalle. Su web también debería.",
    painPoints: [
      "Diseños que parecen sacados de otra década.",
      "Cambios que requieren tres emails y una llamada.",
      "Presupuestos que llegan cuando ya te has olvidado de ellos.",
      "Webs pensadas para ordenador cuando tus invitados están en WhatsApp.",
    ],
    wedditeLabel: "Weddite",
    promisesHeadingPre: "Weddite crea las webs que",
    promisesHeadingItalic: "deberían de ser.",
    promises: [
      { title: "Diseño cuidado", body: "Diseños editoriales, sin clichés de boda." },
      { title: "La veis antes de comprarla", body: "Probad la web en directo antes de pagar." },
      { title: "La tenéis en minutos", body: "Sin llamadas, presupuestos ni intermediarios." },
      { title: "Pensada para móvil", body: "Porque vuestros invitados probablemente la abrirán desde WhatsApp." },
    ],
    howItWorksLabel: "Cómo funciona",
    howItWorksHeading: "De cero a web de boda en tres pasos",
    steps: [
      { title: "Elegid vuestro diseño", body: "Mirad los diseños, abrid la preview y elegid vuestro favorito. Sin registros, llamadas ni compromiso." },
      { title: "Hacedla vuestra", body: "Añadid vuestros nombres, historia, fotos, horarios, ubicaciones, RSVP y todo lo que necesitan vuestros invitados." },
      { title: "Publicadla", body: "Cuando esté lista, la compráis y podéis compartirla con vuestros invitados. Así de fácil." },
    ],
    testimonialsLabel: "Parejas reales",
    testimonialsHeading: "Lo que dicen las parejas que ya se casaron",
    ctaFinalPre: "Vuestra boda merece",
    ctaFinalItalic: "algo mejor",
    ctaFinalPost: "que un diseño genérico",
    ctaFinalButton: "Explorar diseños",
    contactLabel: "Contacto",
    contactHeading: "¿Tenéis alguna pregunta?",
    contactSub: "Escribidnos y os respondemos en cuanto podamos.",
  },
  catalog: {
    metaTitle: "Diseños de webs de boda — Weddite",
    metaDescription: "Explora el catálogo de diseños de webs de boda de Weddite, con preview en directo y personalización al instante.",
    h1: "Elegid vuestro estilo",
    sub: "Cada diseño se puede probar en directo antes de decidir nada. Cuando lo tengáis claro, lo personalizáis y lo hacéis vuestro sin salir del navegador.",
    viewPreview: "Ver preview",
    choose: "Elegir",
  },
  product: {
    back: "← Volver al catálogo",
    includes: "Todo lo que necesitáis",
    makeItYours: "Hacerla vuestra",
    openFullscreen: "Abrir a pantalla completa",
    payOnce: "Pago único, sin cuotas.",
  },
  templates: {
    aurora: {
      tagline: "Editorial, cálida y atemporal",
      summary: "Diseño editorial, cálido y sin adornos de más: bonito hoy y dentro de diez años.",
      description: "Para una boda que no necesita adornos para tener personalidad: tipografía elegante, mucho aire y una estética que seguirá gustándoos cuando hayan pasado las fotos de la boda.",
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
    ribera: {
      tagline: "Elegante, náutica y con carácter",
      summary: "Elegante, náutica y con carácter, para bodas que no empiezan el día de la boda.",
      description: "Para bodas con varias fases: preboda, ceremonia, celebración y postboda, todo en una misma web, con paleta navy y coral y detalles ilustrados que le dan carácter.",
      features: [
        "Cuenta atrás en directo",
        "Itinerario por fases (pre-boda, boda, post-boda) con varios lugares",
        "Tarjetas de detalles (dresscode, autobuses, hoteles)",
        "RSVP con acompañantes ilimitados",
        "Sección de regalo con marco ilustrado",
        "100% adaptada a móvil",
      ],
    },
  },
  quienesSomos: {
    metaTitle: "Quiénes somos — Weddite",
    metaDescription: "La historia detrás de Weddite: por qué existe, qué queremos cambiar y a quién le hacemos las webs de boda.",
    label: "Quiénes somos",
    h1: "Nos casamos. Buscamos una web bonita. No la encontramos.",
    p1: "Encontramos muchas webs de boda. Algunas tenían corazones. Otras tenían tipografías imposibles. Casi todas necesitaban emails, llamadas o presupuestos para hacer cualquier cosa.",
    p2: "Y pensamos: esto debería ser bastante más fácil.",
    p3: "Así nació Weddite.",
    bullets: [
      "Diseños que nos gustaría enseñar.",
      "Personalización sin esperar a nadie.",
      "Una preview antes de pagar.",
      "Y una web que podéis tener lista en minutos.",
    ],
    closingPre: "Hoy Weddite es un proyecto pequeño, hecho a mano, con dos diseños propios —Aurora y Ribera— y la idea de seguir añadiendo más. Si tenéis feedback, ideas o simplemente queréis contarnos cómo va la boda, nos encanta escuchar: podéis escribirnos desde el",
    closingLinkText: "formulario de contacto",
    closingPost: ".",
  },
  gracias: {
    badge: "Compra confirmada",
    h1: "¡Enhorabuena! Vuestra web ya está lista",
    bodyPre: "Hemos generado vuestra web de boda con el diseño",
    templateFallback: "elegido",
    bodyPost: "Podéis seguir editándola cuando queráis y compartirla con vuestros invitados.",
    viewSite: "Ver vuestra web",
    keepEditing: "Seguir editando",
    backToCatalog: "← Volver al catálogo",
  },
  contact: {
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    namePlaceholder: "Laura y Marc",
    emailPlaceholder: "vosotros@email.com",
    messagePlaceholder: "Contadnos qué necesitáis",
    submit: "Enviar mensaje",
    submitting: "Enviando…",
  },
  checkout: {
    backEdit: "← Seguir editando",
    summary: "Resumen",
    yourWeddingFallback: "Vuestra boda",
    design: "Diseño",
    weddingDate: "Fecha de la boda",
    venue: "Lugar de celebración",
    venueTBD: "Por confirmar",
    totalOnce: "Total, pago único",
    reviewBeforeBuy: "Revisar la vista previa antes de comprar",
    paymentData: "Datos de pago",
    demoMode: "Modo demo · sin cobro real",
    fillTestCard: "Rellenar con tarjeta de prueba",
    cardName: "Nombre en la tarjeta",
    cardNumber: "Número de tarjeta",
    expiry: "Caducidad",
    cvc: "CVC",
    confirming: "Confirmando...",
    confirmBuy: (price) => `Confirmar compra · ${price} €`,
    disclaimer: "Al confirmar aceptáis los términos del servicio. Sin llamadas, sin papeleo: vuestra web queda lista al instante.",
  },
  wizard: {
    savingAuto: "Guardado automáticamente",
    loading: "Cargando...",
    editTab: "Editar",
    previewTab: "Vista previa",
    livePreview: "Vista previa en directo",
    iframeTitle: "Vista previa en directo de vuestra web de boda",
    personalizing: (name) => `Personalizando · ${name}`,
    back: "Atrás",
    next: "Siguiente",
    reviewAndBuy: "Revisar y comprar",
    stepLabels: {
      language: "Idioma",
      couple: "Pareja y fecha",
      story: "Vuestra historia",
      day: "El gran día",
      gallery: "Galería",
      rsvp: "RSVP y regalo",
      style: "Estilo",
      itinerary: "Itinerario y lugares",
      details: "Detalles",
    },
    required: "Obligatorio",
    remove: "Quitar",
    paletteLabels: { clay: "Terracota", sage: "Verde salvia", midnight: "Azul medianoche" },
    stepLanguage: {
      intro: "Elegid en qué idiomas estará disponible vuestra web. Podéis elegir más de uno: si la boda es bilingüe, vuestros invitados podrán cambiar de idioma con un selector en la propia web. Esto afecta a los textos fijos (menú, botones, RSVP...); lo que escribáis vosotros (historia, mensajes...) se mostrará tal cual lo escribáis.",
      included: "Incluido",
      summary: (langs) => `Vuestra web mostrará un selector de idioma para que cada invitado elija entre: ${langs}.`,
    },
    stepCouple: {
      yourName: "Vuestro nombre",
      partnerName: "Nombre de tu pareja",
      maxChars: (n) => `Máx. ${n} caracteres`,
      weddingDate: "Fecha de la boda",
      hashtag: "Hashtag de la boda",
      hashtagHint: "Para redes sociales",
      welcomeMessage: "Mensaje de bienvenida",
      welcomeMessagePlaceholder: "Lo primero que leerán vuestros invitados al entrar en la web.",
      estateName: "Finca / lugar principal",
      estateNameHint: "El que aparece en la portada",
      location: "Ubicación",
    },
    stepStory: {
      sectionTitle: "Título de la sección",
      sectionTitlePlaceholder: "Nuestra historia",
      yourStory: "Vuestra historia",
      yourStoryHint: "Cómo os conocisteis, algún hito importante, por qué os casáis.",
      yourStoryPlaceholder: "Nos conocimos...",
    },
    stepDay: {
      ceremony: "Ceremonia",
      celebration: "Celebración",
      venue: "Lugar",
      time: "Hora",
      address: "Dirección",
      addressHint: "Se usará para el enlace al mapa",
      dayItinerary: "Itinerario del día",
      addMoment: "+ Añadir momento",
      momentTitlePlaceholder: "Cóctel de bienvenida",
      detailPlaceholder: "Detalle (opcional)",
      emptyTimeline: "Añadid los momentos clave del día: ceremonia, cóctel, banquete, fiesta...",
      dressCode: "Código de vestimenta",
      dressCodeHint: "Opcional",
      dressCodePlaceholder: "Elegante de jardín, evitad el blanco",
    },
    stepGallery: {
      intro: "En esta primera versión las fotos se muestran como marcadores de posición: añadid un pie de foto para cada una. La subida de imágenes reales llegará cuando compréis el diseño.",
      captionPlaceholder: "Pedida de mano",
      addPhoto: "+ Añadir foto",
    },
    stepRsvpGift: {
      rsvpSectionTitle: "Confirmación de asistencia",
      deadline: "Fecha límite para confirmar",
      noteForGuests: "Nota para invitados",
      notePlaceholder: "Confirmad antes del... indicando alergias.",
      giftTableTitle: "Mesa de regalos",
      message: "Mensaje",
      messagePlaceholder: "Vuestra presencia es el mejor regalo...",
      accountHolder: "Nombre del titular",
      accountNumber: "Número de cuenta / Bizum",
      organizerContact: "Contacto de los organizadores",
      organizerContactPlaceholder: "Cualquier duda, escribidnos a...",
    },
    stepStyle: { intro: "Elegid la paleta de color que mejor pegue con vuestra boda." },
    stepItinerary: {
      intro: "Organizad el día en fases (pre-boda, boda, post-boda...) y añadid los lugares de cada una.",
      phaseNamePlaceholder: "La boda",
      phaseWhenPlaceholder: "Sábado 11, 18:00",
      removePhase: "Quitar fase",
      placeNamePlaceholder: "Ermita de Sant Baldiri",
      placeAddressPlaceholder: "Dirección",
      addPlace: "+ Añadir lugar",
      addPhase: "+ Añadir fase",
    },
    stepDetails: {
      intro: "Añadid tarjetas informativas para vuestros invitados: dresscode, autobuses, hoteles recomendados...",
      iconLabels: { dresscode: "Dresscode", bus: "Autobuses", hotel: "Hoteles" },
      titlePlaceholder: "Dresscode",
      ctaPlaceholder: "Inspiración",
      addCard: "+ Añadir tarjeta",
    },
  },
};

const en: SiteDict = {
  nav: { designs: "Designs", howItWorks: "How it works", whoWeAre: "About us", contact: "Contact", viewDesigns: "View designs" },
  footer: {
    tagline: "Modern wedding websites, ready in minutes. No calls, no email quotes: everything a click away.",
    product: "Product",
    weddite: "Weddite",
    designs: "Designs",
    howItWorks: "How it works",
    contact: "Contact",
    whoWeAre: "About us",
    privacy: "Privacy policy",
    rights: (year) => `© ${year} Weddite. All rights reserved.`,
  },
  home: {
    eyebrow: "Websites for stories worth telling",
    h1: "A website as beautiful as your wedding",
    subhead: "Choose your design, personalize it with your story and share it with your guests. No calls, no quotes, no waiting.",
    ctaExplore: "Explore designs",
    ctaExploreSub: "See designs and prices",
    ctaExample: "See a live example",
    problemLabel: "The problem",
    problemHeading: "A wedding gets cared for down to the last detail. Its website should too.",
    painPoints: [
      "Designs that look like they're from another decade.",
      "Changes that take three emails and a phone call.",
      "Quotes that arrive after you've already forgotten about them.",
      "Websites built for desktop when your guests are on WhatsApp.",
    ],
    wedditeLabel: "Weddite",
    promisesHeadingPre: "Weddite builds the websites weddings",
    promisesHeadingItalic: "deserve.",
    promises: [
      { title: "Considered design", body: "Editorial designs, no wedding clichés." },
      { title: "See it before you buy it", body: "Try the site live before paying." },
      { title: "Ready in minutes", body: "No calls, no quotes, no middlemen." },
      { title: "Built for mobile", body: "Because your guests will most likely open it from a WhatsApp group." },
    ],
    howItWorksLabel: "How it works",
    howItWorksHeading: "From zero to wedding website in three steps",
    steps: [
      { title: "Choose your design", body: "Browse the designs, open the preview and pick your favorite. No sign-ups, calls or commitment." },
      { title: "Make it yours", body: "Add your names, story, photos, schedule, venues, RSVP and everything your guests need." },
      { title: "Publish it", body: "Once it's ready, you buy it and can share it with your guests. That easy." },
    ],
    testimonialsLabel: "Real couples",
    testimonialsHeading: "What couples who already got married say",
    ctaFinalPre: "Your wedding deserves",
    ctaFinalItalic: "something better",
    ctaFinalPost: "than a generic template",
    ctaFinalButton: "Explore designs",
    contactLabel: "Contact",
    contactHeading: "Got a question?",
    contactSub: "Write to us and we'll get back to you as soon as we can.",
  },
  catalog: {
    metaTitle: "Wedding website designs — Weddite",
    metaDescription: "Explore Weddite's catalog of wedding website designs, with a live preview and instant personalization.",
    h1: "Choose your style",
    sub: "Every design can be tried live before deciding anything. Once you're sure, you personalize it and make it yours without leaving the browser.",
    viewPreview: "View preview",
    choose: "Choose",
  },
  product: {
    back: "← Back to the catalog",
    includes: "Everything you need",
    makeItYours: "Make it yours",
    openFullscreen: "Open fullscreen",
    payOnce: "One-time payment, no subscriptions.",
  },
  templates: {
    aurora: {
      tagline: "Editorial, warm and timeless",
      summary: "Editorial, warm design with no unnecessary flourishes: beautiful today and in ten years.",
      description: "For a wedding that doesn't need decoration to have personality: elegant typography, plenty of breathing room, and a look you'll still love once the wedding photos have faded.",
      features: [
        "Live countdown",
        "Day itinerary with schedule",
        "Customizable photo gallery",
        "Built-in RSVP",
        "Gift list / bank transfer section",
        "3 color palettes to choose from",
        "100% mobile-friendly",
      ],
    },
    ribera: {
      tagline: "Elegant, nautical and full of character",
      summary: "Elegant, nautical and full of character, for weddings that don't start on the wedding day.",
      description: "For weddings with several phases: pre-wedding, ceremony, reception and after-party, all in one site, with a navy-and-coral palette and illustrated details that give it character.",
      features: [
        "Live countdown",
        "Itinerary by phase (pre-wedding, wedding, after-party) with several venues",
        "Detail cards (dress code, buses, hotels)",
        "RSVP with unlimited plus-ones",
        "Gift section with an illustrated frame",
        "100% mobile-friendly",
      ],
    },
  },
  quienesSomos: {
    metaTitle: "About us — Weddite",
    metaDescription: "The story behind Weddite: why it exists, what we want to change, and who we build wedding websites for.",
    label: "About us",
    h1: "We got engaged. We looked for a beautiful website. We didn't find one.",
    p1: "We found plenty of wedding websites. Some had hearts on them. Others had impossible typefaces. Almost all of them needed emails, phone calls or quotes to do anything at all.",
    p2: "So we thought: this should be a lot easier.",
    p3: "That's how Weddite was born.",
    bullets: [
      "Designs we'd actually want to show off.",
      "Personalization without waiting on anyone.",
      "A preview before you pay.",
      "And a website you can have ready in minutes.",
    ],
    closingPre: "Today Weddite is a small, handmade project, with two designs of our own —Aurora and Ribera— and the plan to keep adding more. If you have feedback, ideas, or just want to tell us how the wedding planning is going, we'd love to hear from you: write to us from the",
    closingLinkText: "contact form",
    closingPost: ".",
  },
  gracias: {
    badge: "Purchase confirmed",
    h1: "Congratulations! Your website is ready",
    bodyPre: "We've generated your wedding website with the",
    templateFallback: "chosen",
    bodyPost: "design. You can keep editing it whenever you like and share it with your guests.",
    viewSite: "View your website",
    keepEditing: "Keep editing",
    backToCatalog: "← Back to the catalog",
  },
  contact: {
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Laura and Marc",
    emailPlaceholder: "you@email.com",
    messagePlaceholder: "Tell us what you need",
    submit: "Send message",
    submitting: "Sending…",
  },
  checkout: {
    backEdit: "← Keep editing",
    summary: "Summary",
    yourWeddingFallback: "Your wedding",
    design: "Design",
    weddingDate: "Wedding date",
    venue: "Reception venue",
    venueTBD: "To be confirmed",
    totalOnce: "Total, one-time payment",
    reviewBeforeBuy: "Review the preview before buying",
    paymentData: "Payment details",
    demoMode: "Demo mode · no real charge",
    fillTestCard: "Fill in with a test card",
    cardName: "Name on card",
    cardNumber: "Card number",
    expiry: "Expiry",
    cvc: "CVC",
    confirming: "Confirming...",
    confirmBuy: (price) => `Confirm purchase · €${price}`,
    disclaimer: "By confirming you accept the terms of service. No calls, no paperwork: your website is ready instantly.",
  },
  wizard: {
    savingAuto: "Saved automatically",
    loading: "Loading...",
    editTab: "Edit",
    previewTab: "Preview",
    livePreview: "Live preview",
    iframeTitle: "Live preview of your wedding website",
    personalizing: (name) => `Personalizing · ${name}`,
    back: "Back",
    next: "Next",
    reviewAndBuy: "Review and buy",
    stepLabels: {
      language: "Language",
      couple: "Couple and date",
      story: "Your story",
      day: "The big day",
      gallery: "Gallery",
      rsvp: "RSVP and gift",
      style: "Style",
      itinerary: "Itinerary and venues",
      details: "Details",
    },
    required: "Required",
    remove: "Remove",
    paletteLabels: { clay: "Terracotta", sage: "Sage green", midnight: "Midnight blue" },
    stepLanguage: {
      intro: "Choose which languages your website will be available in. You can pick more than one: if the wedding is bilingual, your guests will be able to switch language with a selector on the site itself. This affects the fixed text (menu, buttons, RSVP...); whatever you write yourselves (story, messages...) will show up exactly as you wrote it.",
      included: "Included",
      summary: (langs) => `Your website will show a language selector so each guest can choose between: ${langs}.`,
    },
    stepCouple: {
      yourName: "Your name",
      partnerName: "Your partner's name",
      maxChars: (n) => `Max. ${n} characters`,
      weddingDate: "Wedding date",
      hashtag: "Wedding hashtag",
      hashtagHint: "For social media",
      welcomeMessage: "Welcome message",
      welcomeMessagePlaceholder: "The first thing your guests will read when they open the site.",
      estateName: "Venue / main location",
      estateNameHint: "The one shown on the homepage",
      location: "Location",
    },
    stepStory: {
      sectionTitle: "Section title",
      sectionTitlePlaceholder: "Our story",
      yourStory: "Your story",
      yourStoryHint: "How you met, a key milestone, why you're getting married.",
      yourStoryPlaceholder: "We met...",
    },
    stepDay: {
      ceremony: "Ceremony",
      celebration: "Reception",
      venue: "Venue",
      time: "Time",
      address: "Address",
      addressHint: "Used for the map link",
      dayItinerary: "Day itinerary",
      addMoment: "+ Add a moment",
      momentTitlePlaceholder: "Welcome cocktail",
      detailPlaceholder: "Detail (optional)",
      emptyTimeline: "Add the key moments of the day: ceremony, cocktail, dinner, party...",
      dressCode: "Dress code",
      dressCodeHint: "Optional",
      dressCodePlaceholder: "Garden elegant, avoid white",
    },
    stepGallery: {
      intro: "In this first version, photos are shown as placeholders: add a caption for each one. Uploading real photos will be available once you buy the design.",
      captionPlaceholder: "The proposal",
      addPhoto: "+ Add photo",
    },
    stepRsvpGift: {
      rsvpSectionTitle: "RSVP",
      deadline: "RSVP deadline",
      noteForGuests: "Note for guests",
      notePlaceholder: "Please confirm by... and let us know about any allergies.",
      giftTableTitle: "Gift registry",
      message: "Message",
      messagePlaceholder: "Your presence is the best gift...",
      accountHolder: "Account holder name",
      accountNumber: "Account number / bank transfer",
      organizerContact: "Organizers' contact",
      organizerContactPlaceholder: "Any questions, write to us at...",
    },
    stepStyle: { intro: "Choose the color palette that best fits your wedding." },
    stepItinerary: {
      intro: "Organize the day into phases (pre-wedding, wedding, after-party...) and add the venues for each one.",
      phaseNamePlaceholder: "The wedding",
      phaseWhenPlaceholder: "Saturday 11th, 6:00pm",
      removePhase: "Remove phase",
      placeNamePlaceholder: "St. Baldiri's Chapel",
      placeAddressPlaceholder: "Address",
      addPlace: "+ Add venue",
      addPhase: "+ Add phase",
    },
    stepDetails: {
      intro: "Add info cards for your guests: dress code, buses, recommended hotels...",
      iconLabels: { dresscode: "Dress code", bus: "Buses", hotel: "Hotels" },
      titlePlaceholder: "Dress code",
      ctaPlaceholder: "Inspiration",
      addCard: "+ Add card",
    },
  },
};

const dicts: Record<SiteLocale, SiteDict> = { es, en };

export function getSiteDict(locale: SiteLocale): SiteDict {
  return dicts[locale];
}
