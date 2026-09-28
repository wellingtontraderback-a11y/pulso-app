"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    router.push("/onboarding");
  }

  return (
    <main className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-sm mx-auto gap-5">
      <h1 className="font-display text-2xl font-extrabold">Entrar</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted">E-mail</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted">Senha</span>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm"
          />
        </label>

        {erro && <p className="text-sm text-accent">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-accent text-[#2A1408] font-bold rounded-app py-3 text-sm disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-muted text-sm text-center">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="text-accent font-semibold">
          Criar conta
        </Link>
      </p>
    </main>
  );
}
