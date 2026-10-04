import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-5">
        <nav className="hidden items-center gap-6 label-eyebrow sm:flex">
          <Link href="/" className="transition hover:text-ink dark:hover:text-cream">
            Início
          </Link>
          <Link href="/analysis" className="transition hover:text-ink dark:hover:text-cream">
            Analisar ações
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
