import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <span className="text-xs font-semibold tracking-wide text-accent">
        FASE 1 · BASE DO APP
      </span>

      <h1 className="font-display text-4xl font-extrabold tracking-tight max-w-sm">
        Pulso<span className="text-accent">.</span>
      </h1>

      <p className="text-muted max-w-xs text-sm leading-relaxed">
        Treinos personalizados, dieta gerada por IA e acompanhamento de
        evolução — em um único lugar.
      </p>

      <Link
        href="/cadastro"
        className="bg-accent text-[#2A1408] font-bold rounded-app px-6 py-3 text-sm"
      >
        Criar conta
      </Link>

      <Link href="/login" className="text-muted text-xs underline">
        Já tenho conta
      </Link>

      <p className="text-muted text-xs max-w-xs">
        Cadastro, login e escolha de objetivo já funcionam de verdade. A
        biblioteca de treinos entra no próximo arquivo.
      </p>
    </main>
  );
}
