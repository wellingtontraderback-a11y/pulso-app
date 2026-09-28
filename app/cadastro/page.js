"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    // 1. Cria o usuário no sistema de autenticação do Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(traduzErro(error.message));
      setCarregando(false);
      return;
    }

    // 2. Cria a linha de perfil correspondente (objetivo fica vazio por enquanto)
    if (data.user) {
      const { error: erroPerfil } = await supabase
        .from("profiles")
        .insert({ id: data.user.id, nome });

      if (erroPerfil) {
        setErro(
          "Conta criada, mas houve um problema ao salvar o perfil: " +
            erroPerfil.message
        );
        setCarregando(false);
        return;
      }
    }

    router.push("/onboarding");
  }

  return (
    <main className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-sm mx-auto gap-5">
      <h1 className="font-display text-2xl font-extrabold">Criar conta</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Campo label="Nome" value={nome} onChange={setNome} type="text" />
        <Campo label="E-mail" value={email} onChange={setEmail} type="email" />
        <Campo
          label="Senha"
          value={senha}
          onChange={setSenha}
          type="password"
          minLength={6}
        />

        {erro && <p className="text-sm text-accent">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-accent text-[#2A1408] font-bold rounded-app py-3 text-sm disabled:opacity-60"
        >
          {carregando ? "Criando..." : "Criar conta"}
        </button>
      </form>

      <p className="text-muted text-sm text-center">
        Já tem conta?{" "}
        <Link href="/login" className="text-accent font-semibold">
          Entrar
        </Link>
      </p>
    </main>
  );
}

function Campo({ label, value, onChange, type, minLength }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm"
      />
    </label>
  );
}

function traduzErro(msg) {
  if (msg.includes("already registered")) return "Esse e-mail já tem uma conta.";
  if (msg.includes("Password")) return "A senha precisa ter pelo menos 6 caracteres.";
  return msg;
}
