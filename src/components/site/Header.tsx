import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 fade-in-load">
        <Link href="/">
          <Logo className="text-xl" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          <Link href="/plantillas" className="transition-colors hover:text-ink">
            Diseños
          </Link>
          <Link href="/#como-funciona" className="transition-colors hover:text-ink">
            Cómo funciona
          </Link>
          <Link href="/quienes-somos" className="transition-colors hover:text-ink">
            Quiénes somos
          </Link>
          <Link href="/#contacto" className="transition-colors hover:text-ink">
            Contacto
          </Link>
        </nav>
        <Link
          href="/plantillas"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Ver diseños
        </Link>
      </div>
    </header>
  );
}
