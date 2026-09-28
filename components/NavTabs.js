"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { href: "/treinos", label: "Treinos" },
  { href: "/calculadora", label: "Calculadora" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 mb-1">
      {ITENS.map((item) => {
        const ativo = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs font-semibold rounded-app px-3 py-1.5 border ${
              ativo
                ? "bg-accent text-[#2A1408] border-accent"
                : "text-muted border-line"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
