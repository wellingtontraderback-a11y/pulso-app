"use client";
import { useState, useEffect } from 'react';

const TREINOS = {
  "Perder Peso": ["HIIT 20min + 10k passos", "Circuito Full Body - 4x15", "Cardio + Abdômen", "Treino EMOM 25min"],
  "Ganhar Massa": ["Peito + Tríceps - Pesado", "Costas + Bíceps", "Perna Completa", "Ombro + Abdômen"],
  "Definir": ["Upper + Lower + Core", "HIIT + Musculação", "Funcional + Corrida", "Treino 3x Falha"]
};

const DIETAS = {
  "Perder Peso": { kcal: "-500 da TMB", prot: "2g por kg", refeicoes: ["Ovo + Aveia", "Frango + Arroz + Salada", "Whey + Fruta", "Omelete + Legumes"] },
  "Ganhar Massa": { kcal: "+400 da TMB", prot: "2.2g por kg", refeicoes: ["Ovo + Pão + Pasta de amendoim", "Carne + Arroz + Feijão", "Hiper + Banana", "Frango + Batata Doce"] },
  "Definir": { kcal: "Manter TMB", prot: "2.1g por kg", refeicoes: ["Iogurte + Granola", "Peixe + Arroz + Salada", "Whey + Aveia", "Atum + Torrada"] }
};

export default function PulsoApp() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("hoje");
  const [isPremium, setIsPremium] = useState(false);
  const [form, setForm] = useState({ nome: "", peso: "", altura: "", objetivo: "Perder Peso" });

  useEffect(() => {
    const saved = localStorage.getItem("pulso_user");
    if (saved) setUser(JSON.parse(saved));
    if (window.location.search.includes("pago=true")) {
      setIsPremium(true);
      localStorage.setItem("pulso_premium", "true");
    }
    if (localStorage.getItem("pulso_premium") === "true") setIsPremium(true);
  }, []);

  const salvar = () => {
    if (!form.nome ||!form.peso ||!form.altura) return alert("Preencha tudo!");
    localStorage.setItem("pulso_user", JSON.stringify(form));
    setUser(form);
  };

  const tmb = user? Math.round(10 * Number(user.peso) + 6.25 * Number(user.altura) - 5 * 25 + 5) : 0;
  const linkStripe = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00";

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#141414] border border-[#222] rounded-[24px] p-8">
          <div className="flex items-center gap-2 mb-8"><div className="w-8 h-8 bg-[#ccff00] rounded-full"></div><h1 className="text-2xl font-black">PULSO</h1></div>
          <h2 className="text-3xl font-bold leading-tight mb-2">Vamos montar<br/>seu plano.</h2>
          <p className="text-zinc-500 mb-8 text-sm">Leva 30 segundos.</p>
          <div className="space-y-4">
            <input placeholder="Seu nome" className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-4 outline-none focus:border-[#ccff00]" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Peso kg" type="number" className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-4 outline-none" value={form.peso} onChange={e=>setForm({...form, peso:e.target.value})} />
              <input placeholder="Altura cm" type="number" className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-4 outline-none" value={form.altura} onChange={e=>setForm({...form, altura:e.target.value})} />
            </div>
            <select className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-4 outline-none" value={form.objetivo} onChange={e=>setForm({...form, objetivo:e.target.value})}><option>Perder Peso</option><option>Ganhar Massa</option><option>Definir</option></select>
            <button onClick={salvar} className="w-full bg-[#ccff00] text-black font-black py-4 rounded-xl text-lg mt-2">CRIAR MEU PLANO →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center text-black font-black text-sm">P</div><div><p className="font-bold text-sm leading-none">{user.nome.toUpperCase()}</p><p className="text-[11px] text-zinc-500">{user.objetivo} • {isPremium? "PREMIUM" : "GRÁTIS"}</p></div></div>
        {!isPremium && <a href={linkStripe} className="bg-[#ccff00] text-black text-[11px] font-black px-4 py-2 rounded-full">VIRAR PREMIUM</a>}
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-4"><p className="text-[10px] text-zinc-500 uppercase">TMB</p><p className="text-xl font-black text-[#ccff00]">{tmb}</p><p className="text-[10px] text-zinc-500">kcal/dia</p></div>
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-4"><p className="text-[10px] text-zinc-500 uppercase">Meta</p><p className="text-sm font-bold leading-tight">{DIETAS[user.objetivo].kcal}</p><p className="text-[10px] text-zinc-500">{DIETAS[user.objetivo].prot}</p></div>
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-4"><p className="text-[10px] text-zinc-500 uppercase">Plano</p><p className="text-sm font-bold">{user.objetivo}</p><p className="text-[10px] text-zinc-500">{user.peso}kg / {user.altura}cm</p></div>
        </div>

        {tab === "hoje" && (
          <div className="space-y-4">
            <div className="bg-[#ccff00] text-black rounded-[20px] p-6"><h3 className="font-black text-lg">TREINO DE HOJE</h3><p className="font-bold mt-1">{TREINOS[user.objetivo][0]}</p><p className="text-xs mt-2 opacity-70">Vídeos completos na aba TREINOS (Premium)</p></div>
            <div className="bg-[#141414] border border-[#222] rounded-[20px] p-6"><h3 className="font-bold mb-3">DIETA DE HOJE</h3>{DIETAS[user.objetivo].refeicoes.map((r,i)=><div key={i} className="flex justify-between py-2 border-b border-[#1f1f1f] last:border-0 text-sm"><span>{r}</span><span className="text-zinc-500 text-xs">Refeição {i+1}</span></div>)}</div>
          </div>
        )}

        {tab === "treinos" && (
          <div className="space-y-3">
            {!isPremium && <div className="bg-[#1a1a1a] border border-dashed border-[#333] rounded-2xl p-6 text-center"><p className="text-sm font-bold">🔒 TREINOS BLOQUEADOS</p><p className="text-xs text-zinc-500 mt-1 mb-4">Assine por R$29,90/mês para ver os vídeos</p><a href={linkStripe} className="inline-block bg-[#ccff00] text-black font-black px-6 py-3 rounded-xl text-sm">LIBERAR POR R$29,90</a><button onClick={()=>{setIsPremium(true); localStorage.setItem("pulso_premium","true")}} className="block mx-auto mt-3 text-[11px] text-zinc-500 underline">Já paguei, liberar</button></div>}
            {TREINOS[user.objetivo].map((t,i)=><div key={i} className={`bg-[#141414] border border-[#222] rounded-2xl p-5 flex justify-between items-center ${!isPremium? 'blur-[6px] pointer-events-none' : ''}`}><div><p className="text-[10px] text-zinc-500">DIA {i+1}</p><p className="font-bold text-sm">{t}</p></div><div className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center">▶</div></div>)}
          </div>
        )}

        {tab === "dieta" && (
          <div className="bg-[#141414] border border-[#222] rounded-[20px] p-6">
            <h3 className="font-black text-lg mb-4">PLANO ALIMENTAR</h3>
            <div className="grid gap-3">{DIETAS[user.objetivo].refeicoes.map((r,i)=><div key={i} className="bg-[#1e1e1e] rounded-xl p-4 flex justify-between"><span className="text-sm">{r}</span><span className="text-xs text-[#ccff00]">✓</span></div>)}</div>
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-xl"><p className="text-xs text-zinc-400">Sua meta calórica: <span className="text-white font-bold">{DIETAS[user.objetivo].kcal}</span> • Proteína: <span className="text-white font-bold">{DIETAS[user.objetivo].prot}</span></p></div>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#141414] border border-[#2a2a2a] rounded-full p-1.5 flex justify-between shadow-2xl">
        <button onClick={()=>setTab("hoje")} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${tab==="hoje"? "bg-white text-black" : "text-zinc-500"}`}>HOJE</button>
        <button onClick={()=>setTab("treinos")} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${tab==="treinos"? "bg-white text-black" : "text-zinc-500"}`}>TREINOS</button>
        <button onClick={()=>setTab("dieta")} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${tab==="dieta"? "bg-white text-black" : "text-zinc-500"}`}>DIETA</button>
      </div>
    </div>
  );
}
