import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — Weddite",
  description: "Qué datos trata Weddite, para qué los usa y cómo podéis ejercer vuestros derechos.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Quién trata vuestros datos",
    body: (
      <p>
        Weddite es un proyecto en fase de prototipo. Los datos que se
        recogen a través de esta web los trata directamente su responsable,
        contactable en{" "}
        <a href="mailto:crismiquelg@gmail.com" className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay">
          crismiquelg@gmail.com
        </a>
        .
      </p>
    ),
  },
  {
    heading: "La personalización de vuestra web de boda",
    body: (
      <p>
        Cuando personalizáis un diseño (nombres, fecha, itinerario,
        textos, etc.), esos datos se guardan únicamente en el navegador de
        vuestro dispositivo (localStorage), para que podáis retomar el
        proceso donde lo dejasteis. No se envían a ningún servidor ni base
        de datos: si borráis los datos del navegador o cambiáis de
        dispositivo, se pierden.
      </p>
    ),
  },
  {
    heading: "La compra",
    body: (
      <p>
        Weddite es todavía un prototipo: el proceso de pago que veis en el
        checkout es una simulación y no se realiza ningún cargo real ni se
        procesan datos de tarjeta reales, se use o no el botón de
        &ldquo;tarjeta de prueba&rdquo;.
      </p>
    ),
  },
  {
    heading: "El formulario de contacto",
    body: (
      <p>
        Si nos escribís a través del formulario de contacto, el nombre, el
        correo electrónico y el mensaje que indiquéis se envían por email a{" "}
        <a href="mailto:crismiquelg@gmail.com" className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay">
          crismiquelg@gmail.com
        </a>{" "}
        con el único fin de poder responderos. No usamos esos datos para
        nada más ni los compartimos con terceros.
      </p>
    ),
  },
  {
    heading: "Cookies y analítica",
    body: (
      <p>
        Esta web no utiliza cookies de seguimiento ni herramientas de
        analítica de terceros. El único almacenamiento local que usamos es
        el localStorage descrito arriba, necesario para que funcione la
        personalización.
      </p>
    ),
  },
  {
    heading: "Vuestros derechos",
    body: (
      <p>
        Podéis pedir en cualquier momento que eliminemos cualquier dato que
        nos hayáis enviado por email escribiendo a{" "}
        <a href="mailto:crismiquelg@gmail.com" className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay">
          crismiquelg@gmail.com
        </a>
        . Para borrar los datos de personalización guardados en vuestro
        navegador basta con borrar los datos de este sitio desde los ajustes
        del navegador.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-clay">Legal</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Política de privacidad</h1>
        <p className="mt-4 text-ink-soft">Última actualización: septiembre de 2026.</p>
      </div>

      <div className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <div key={s.heading} data-reveal style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}>
            <h2 className="font-display text-2xl">{s.heading}</h2>
            <div className="mt-3 leading-relaxed text-ink-soft">{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
