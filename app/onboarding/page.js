"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getUsuarioAtual, sair } from "@/lib/auth";

const OBJETIVOS = [
  { id: "emagrecimento", label: "Emagrecimento", sub: "Déficit calórico, foco em cardio + força" },
  { id: "hipertrofia", label: "Hipertrofia", sub: "Volume alto, foco em técnica e progressão" },
  { id: "massa", label: "Ganho de massa", sub: "Superávit calórico, foco em força" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [objetivo, setObjetivo] = useState(null);
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function carregar() {
      const usuario = await getUsuarioAtual();
      if (!usuario) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("nome, objetivo")
        .eq("id", usuario.id)
        .single();

      if (data) {
        setNome(data.nome || "");
        setObjetivo(data.objetivo || null);
      }
      setCarregando(false);
    }
    carregar();
  }, [router]);

  async function escolherObjetivo(id) {
    setObjetivo(id);
    setSalvando(true);
    const usuario = await getUsuarioAtual();
    await supabase.from("profiles").update({ objetivo: id }).eq("id", usuario.id);
    setSalvando(false);
  }

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-sm mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted text-sm">Olá{nome ? `, ${nome}` : ""} 👋</p>
          <h1 className="font-display text-2xl font-extrabold mt-1">
            Qual é seu objetivo?
          </h1>
        </div>
        <button
          onClick={async () => {
            await sair();
            router.push("/login");
          }}
          className="text-muted text-xs underline mt-1"
        >
          Sair
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {OBJETIVOS.map((o) => (
          <button
            key={o.id}
            onClick={() => escolherObjetivo(o.id)}
            className={`text-left rounded-app border p-4 transition ${
              objetivo === o.id
                ? "border-accent bg-surface2"
                : "border-line bg-surface"
            }`}
          >
            <strong className="block text-sm">{o.label}</strong>
            <span className="text-muted text-xs">{o.sub}</span>
          </button>
        ))}
      </div>

      {objetivo && (
        <>
          <p className="text-muted text-xs text-center">
            {salvando ? "Salvando..." : "Objetivo salvo."}
          </p>
          <button
            onClick={() => router.push("/treinos")}
            disabled={salvando}
            className="bg-accent text-[#2A1408] font-bold rounded-app py-3 text-sm disabled:opacity-60"
          >
            Ver meus treinos
          </button>
        </>
      )}
    </main>
  );
}
