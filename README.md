# Weddite

Un site para que futuros novios elijan una web de boda moderna de un catálogo,
la vean en preview en directo, la personalicen con su información y la
contraten, todo a golpe de clic, sin llamadas ni correos intermedios.

Este repositorio es el **prototipo funcional en frontend**: catálogo,
preview en directo, personalización en vivo y un flujo de contratación
simulado (sin pagos ni backend reales todavía).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Sin backend: el borrador de cada boda se guarda en `localStorage` del
  navegador

## Cómo funciona el prototipo

- `/` — landing con la propuesta de valor.
- `/plantillas` — catálogo de plantillas (una plantilla, "Aurora", en esta
  primera versión).
- `/plantillas/[slug]` — ficha de la plantilla con preview en directo.
- `/personalizar/[slug]` — formulario multi-paso con vista previa en directo
  en pantalla partida (se sincroniza con un `<iframe>` vía `postMessage`).
- `/personalizar/[slug]/confirmar` — resumen y contratación simulada
  ("modo demo", sin cobro real).
- `/preview/[slug]` — renderiza la plantilla a pantalla completa, ya sea con
  datos de ejemplo o con el borrador guardado.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run lint      # eslint
npm run build     # build de producción
```
