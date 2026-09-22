import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg text-ink">Weddite</p>
        <p>Webs de boda modernas, contratadas en minutos.</p>
        <nav className="flex gap-6">
          <Link href="/plantillas" className="hover:text-ink">
            Plantillas
          </Link>
          <Link href="/#como-funciona" className="hover:text-ink">
            Cómo funciona
          </Link>
        </nav>
      </div>
    </footer>
  );
}
