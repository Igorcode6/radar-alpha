"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Logo from "./Logo";

const LINKS = [
  { href: "/", rotulo: "Início" },
  { href: "/analysis", rotulo: "Analisar" },
  { href: "/sobre", rotulo: "Sobre o projeto" },
];

export default function Header() {
  const caminho = usePathname();

  return (
    <header className="border-b border-ouro-linha">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
        <Link href="/" className="flex min-h-[44px] items-center">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap gap-2">
          {LINKS.map((link) => {
            const atual = caminho === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={atual ? "page" : undefined}
                className={`px-4 py-3 text-[13px] tracking-[0.08em] transition ${
                  atual
                    ? "border-b border-ouro text-ouro-claro"
                    : "text-suave hover:text-creme"
                }`}
              >
                {link.rotulo}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
