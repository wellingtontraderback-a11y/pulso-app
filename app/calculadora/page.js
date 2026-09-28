"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getUsuarioAtual } from "@/lib/auth";
import NavTabs from "@/components/NavTabs";

const AJUSTE_POR_OBJETIVO = {
  emagrecimento: -0.18,
  hipertrofia: 0.08,
  massa: 0.15,
};

const NIVEIS_ATIVIDADE = [
  { valor: "1.2", label: "Sedentário" },
  { valor: "1.375", label: "Leve (1–3x/sem)" },
  { valor: "1.55", label: "Moderado (3–5x/sem)" },
  { valor: "1.725", label: "Intenso (6–7x/sem)" },
];

export default function CalculadoraPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [objetivo, setObjetivo] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const [sexo, setSexo] = useState("m");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [atividade, setAtividade] = useState("1.55");

  useEffect(() => {
    async function carregar() {
      const usuario = await getUsuarioAtual();
      if (!usuario) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "objetivo, sexo, idade, peso, altura, nivel_atividade, tmb, tdee, meta_calorica"
        )
        .eq("id", usuario.id)
        .single();

      if (!data?.objetivo) {
        router.push("/onboarding");
        return;
      }

      setObjetivo(data.objetivo);
      if (data.sexo) setSexo(data.sexo);
      if (data.idade) setIdade(String(data.idade));
      if (data.peso) setPeso(String(data.peso));
      if (data.altura) setAltura(String(data.altura));
      if (data.nivel_atividade) setAtividade(String(data.nivel_atividade));
      if (data.tdee) {
        setResultado({ tmb: data.tmb, tdee: data.tdee, meta: data.meta_calorica });
      }

      setCarregando(false);
    }
    carregar();
  }, [router]);

  async function calcular(e) {
    e.preventDefault();
    const idadeN = parseFloat(idade);
    const pesoN = parseFloat(peso);
    const alturaN = parseFloat(altura);
    const atividadeN = parseFloat(atividade);
    if (!idadeN || !pesoN || !alturaN) return;

    // Fórmula de Mifflin-St Jeor
    const tmb =
      sexo === "m"
        ? 10 * pesoN + 6.25 * alturaN - 5 * idadeN + 5
        : 10 * pesoN + 6.25 * alturaN - 5 * idadeN - 161;
    const tdee = tmb * atividadeN;
    const meta = tdee * (1 + (AJUSTE_POR_OBJETIVO[objetivo] || 0));

    setResultado({ tmb, tdee, meta });
    setSalvando(true);

    const usuario = await getUsuarioAtual();
    await supabase
      .from("profiles")
      .update({
        sexo,
        idade: idadeN,
        peso: pesoN,
        altura: alturaN,
        nivel_atividade: atividadeN,
        tmb,
        tdee,
        meta_calorica: meta,
      })
      .eq("id", usuario.id);

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
    <main className="min-h-screen px-6 py-10 max-w-sm mx-auto flex flex-col gap-5">
      <NavTabs />
      <h1 className="font-display text-2xl font-extrabold">Calculadora</h1>

      <form onSubmit={calcular} className="flex flex-col gap-4">
        <Campo label="Sexo biológico">
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm w-full"
          >
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
        </Campo>

        <div className="grid grid-cols-2 gap-3">
          <Campo label="Idade">
            <input
              type="number"
              required
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm w-full"
            />
          </Campo>
          <Campo label="Peso (kg)">
            <input
              type="number"
              required
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm w-full"
            />
          </Campo>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Campo label="Altura (cm)">
            <input
              type="number"
              required
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm w-full"
            />
          </Campo>
          <Campo label="Atividade">
            <select
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
              className="bg-surface2 border border-line rounded-app px-3 py-3 text-sm w-full"
            >
              {NIVEIS_ATIVIDADE.map((n) => (
                <option key={n.valor} value={n.valor}>
                  {n.label}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <button
          type="submit"
          disabled={salvando}
          className="bg-accent text-[#2A1408] font-bold rounded-app py-3 text-sm disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Calcular"}
        </button>
      </form>

      {resultado && (
        <div className="border border-line rounded-app bg-surface p-5">
          <div className="text-center">
            <div className="font-display text-4xl font-extrabold text-accent">
              {Math.round(resultado.tdee)}
            </div>
            <div className="text-muted text-xs mt-1">
              kcal/dia para manter o peso
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Stat valor={Math.round(resultado.tmb)} label="taxa basal (TMB)" />
            <Stat valor={Math.round(resultado.meta)} label="meta p/ seu objetivo" />
          </div>
        </div>
      )}
    </main>
  );
}

function Campo({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

function Stat({ valor, label }) {
  return (
    <div className="flex-1 border border-line rounded-app p-3 text-center">
      <div className="font-display text-lg font-bold">{valor}</div>
      <div className="text-muted text-[11px] mt-0.5">{label}</div>
    </div>
  );
}
