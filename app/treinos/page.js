"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getUsuarioAtual } from "@/lib/auth";
import NavTabs from "@/components/NavTabs";

const LABEL_OBJETIVO = {
  emagrecimento: "Emagrecimento",
  hipertrofia: "Hipertrofia",
  massa: "Ganho de massa",
};

export default function TreinosPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [objetivo, setObjetivo] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [abertoId, setAbertoId] = useState(null);

  useEffect(() => {
    async function carregar() {
      const usuario = await getUsuarioAtual();
      if (!usuario) {
        router.push("/login");
        return;
      }

      const { data: perfil } = await supabase
        .from("profiles")
        .select("objetivo")
        .eq("id", usuario.id)
        .single();

      if (!perfil?.objetivo) {
        router.push("/onboarding");
        return;
      }
      setObjetivo(perfil.objetivo);

      // Busca os treinos do objetivo e, para cada um, seus exercícios
      const { data: listaTreinos } = await supabase
        .from("treinos")
        .select("id, nome, duracao_min, ordem, exercicios(id, nome, series, repeticoes, descanso_seg, ordem, video_url)")
        .eq("objetivo", perfil.objetivo)
        .order("ordem", { ascending: true });

      const ordenados = (listaTreinos || []).map((t) => ({
        ...t,
        exercicios: [...t.exercicios].sort((a, b) => a.ordem - b.ordem),
      }));

      setTreinos(ordenados);
      setCarregando(false);
    }
    carregar();
  }, [router]);

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Carregando treinos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-sm mx-auto flex flex-col gap-5">
      <NavTabs />
      <div>
        <span className="text-xs font-semibold text-accent">
          {LABEL_OBJETIVO[objetivo]}
        </span>
        <h1 className="font-display text-2xl font-extrabold mt-1">
          Seus treinos
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {treinos.map((t) => {
          const aberto = abertoId === t.id;
          return (
            <div
              key={t.id}
              className="border border-line rounded-app overflow-hidden bg-surface"
            >
              <button
                onClick={() => setAbertoId(aberto ? null : t.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-11 h-11 rounded-app bg-surface2 flex items-center justify-center text-lg flex-shrink-0">
                  🏋️
                </div>
                <div className="flex-1">
                  <strong className="block text-sm">{t.nome}</strong>
                  <span className="text-muted text-xs">
                    {t.exercicios.length} exercícios · {t.duracao_min} min
                  </span>
                </div>
                <span
                  className={`text-muted transition-transform ${
                    aberto ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {aberto && (
                <div className="px-4 pb-4">
                  <div className="h-32 rounded-app bg-surface2 flex flex-col items-center justify-center gap-2 text-muted text-xs mb-2">
                    <span className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-[#2A1408]">
                      ▶
                    </span>
                    Vídeo demonstrativo do treino
                  </div>

                  {t.exercicios.map((ex) => (
                    <div
                      key={ex.id}
                      className="flex justify-between py-2 border-t border-line text-sm"
                    >
                      <span>{ex.nome}</span>
                      <span className="text-muted">
                        {ex.series} × {ex.repeticoes}
                        {ex.descanso_seg ? ` · desc. ${ex.descanso_seg}s` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
