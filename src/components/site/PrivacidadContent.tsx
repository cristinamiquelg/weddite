"use client";

import { useSiteLocale } from "@/lib/site-locale";

const mailLink = (
  <a
    href="mailto:crismiquelg@gmail.com"
    className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay"
  >
    crismiquelg@gmail.com
  </a>
);

const content = {
  es: {
    eyebrow: "Legal",
    title: "Política de privacidad",
    updated: "Última actualización: septiembre de 2026.",
    sections: [
      {
        heading: "Quién trata vuestros datos",
        body: (
          <p>
            Weddite es un proyecto en fase de prototipo. Los datos que se
            recogen a través de esta web los trata directamente su
            responsable, contactable en {mailLink}.
          </p>
        ),
      },
      {
        heading: "La personalización de vuestra web de boda",
        body: (
          <p>
            Cuando personalizáis un diseño (nombres, fecha, itinerario,
            textos, etc.), esos datos se guardan únicamente en el navegador
            de vuestro dispositivo (localStorage), para que podáis retomar
            el proceso donde lo dejasteis. No se envían a ningún servidor ni
            base de datos: si borráis los datos del navegador o cambiáis de
            dispositivo, se pierden.
          </p>
        ),
      },
      {
        heading: "La compra",
        body: (
          <p>
            Weddite es todavía un prototipo: el proceso de pago que veis en
            el checkout es una simulación y no se realiza ningún cargo real
            ni se procesan datos de tarjeta reales, se use o no el botón de
            &ldquo;tarjeta de prueba&rdquo;.
          </p>
        ),
      },
      {
        heading: "El formulario de contacto",
        body: (
          <p>
            Si nos escribís a través del formulario de contacto, el nombre,
            el correo electrónico y el mensaje que indiquéis se envían por
            email a {mailLink} con el único fin de poder responderos. No
            usamos esos datos para nada más ni los compartimos con
            terceros.
          </p>
        ),
      },
      {
        heading: "Cookies y analítica",
        body: (
          <p>
            Esta web no utiliza cookies de seguimiento ni herramientas de
            analítica de terceros. El único almacenamiento local que
            usamos es el localStorage descrito arriba, necesario para que
            funcione la personalización.
          </p>
        ),
      },
      {
        heading: "Vuestros derechos",
        body: (
          <p>
            Podéis pedir en cualquier momento que eliminemos cualquier dato
            que nos hayáis enviado por email escribiendo a {mailLink}. Para
            borrar los datos de personalización guardados en vuestro
            navegador basta con borrar los datos de este sitio desde los
            ajustes del navegador.
          </p>
        ),
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Privacy policy",
    updated: "Last updated: September 2026.",
    sections: [
      {
        heading: "Who processes your data",
        body: (
          <p>
            Weddite is a project in prototype stage. The data collected
            through this website is processed directly by its owner,
            reachable at {mailLink}.
          </p>
        ),
      },
      {
        heading: "Personalizing your wedding website",
        body: (
          <p>
            When you personalize a design (names, date, itinerary, text,
            etc.), that data is stored only in your device&apos;s browser
            (localStorage), so you can pick up where you left off. It is
            never sent to any server or database: if you clear your browser
            data or switch devices, it is lost.
          </p>
        ),
      },
      {
        heading: "The purchase",
        body: (
          <p>
            Weddite is still a prototype: the payment process you see at
            checkout is a simulation, and no real charge is made and no
            real card data is processed, whether or not you use the
            &ldquo;fill in with a test card&rdquo; button.
          </p>
        ),
      },
      {
        heading: "The contact form",
        body: (
          <p>
            If you write to us through the contact form, the name, email
            and message you provide are sent by email to {mailLink} for the
            sole purpose of being able to reply to you. We don&apos;t use
            that data for anything else, nor do we share it with third
            parties.
          </p>
        ),
      },
      {
        heading: "Cookies and analytics",
        body: (
          <p>
            This website does not use tracking cookies or third-party
            analytics tools. The only local storage we use is the
            localStorage described above, needed for the personalization
            to work.
          </p>
        ),
      },
      {
        heading: "Your rights",
        body: (
          <p>
            You can ask at any time that we delete any data you have sent
            us by email by writing to {mailLink}. To delete the
            personalization data stored in your browser, simply clear this
            site&apos;s data from your browser settings.
          </p>
        ),
      },
    ],
  },
};

export default function PrivacidadContent() {
  const { locale } = useSiteLocale();
  const dict = content[locale];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-clay">{dict.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{dict.title}</h1>
        <p className="mt-4 text-ink-soft">{dict.updated}</p>
      </div>

      <div className="mt-12 space-y-10">
        {dict.sections.map((s, i) => (
          <div key={s.heading} data-reveal style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}>
            <h2 className="font-display text-2xl">{s.heading}</h2>
            <div className="mt-3 leading-relaxed text-ink-soft">{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
