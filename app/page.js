"use client";
import { useState } from "react";

const STRIPE_LINK = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00";

export default function Home() {
  const [dados, setDados] = useState({ idade: "", peso: "", altura: "", objetivo: "emagrecer" });
  const [resultado, setResultado] = useState(null);
  const [pago, setPago] = useState(false);

  function calcular() {
    if (!dados.idade || !dados.peso || !dados.altura) {
      alert("Preencha tudo!");
      return;
    }
    const peso = parseFloat(dados.peso);
    const altura = parseFloat(dados.altura) / 100;
    const imc = (peso / (altura * altura)).toFixed(1);
    let plano = "";
    if (dados.objetivo === "emagrecer") plano = `☕ Café: 2 ovos + aveia\n🍽️ Almoço: Frango + arroz + salada\n🌙 Jantar: Omelete + legumes\n🔥 Treino: 30min caminhada + agachamento`;
    if (dados.objetivo === "ganhar massa") plano = `☕ Café: 4 ovos + pão integral + banana\n🍽️ Almoço: Carne + arroz + feijão + batata\n🌙 Jantar: Frango + macarrão\n💪 Treino: Musculação 4x semana`;
    if (dados.objetivo === "definir") plano = `☕ Café: Ovos + tapioca\n🍽️ Almoço: Peixe + quinoa + legumes\n🌙 Jantar: Salada + frango grelhado\n⚡ Treino: HIIT 20min`;
    setResultado({ imc, plano });
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold" }}>🔥 PULSO</h1>
        <p style={{ textAlign: "center", color: "#888" }}>Seu personal trainer com IA</p>

        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "16px", marginTop: "20px" }}>
          <input placeholder="Idade" type="number" value={dados.idade} onChange={e => setDados({ ...dados, idade: e.target.value })} style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", background: "#2a2a2a", border: "none", color: "white" }} />
          <input placeholder="Peso (kg) ex: 70" type="number" value={dados.peso} onChange={e => setDados({ ...dados, peso: e.target.value })} style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", background: "#2a2a2a", border: "none", color: "white" }} />
          <input placeholder="Altura (cm) ex: 175" type="number" value={dados.altura} onChange={e => setDados({ ...dados, altura: e.target.value })} style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", background: "#2a2a2a", border: "none", color: "white" }} />
          <select value={dados.objetivo} onChange={e => setDados({ ...dados, objetivo: e.target.value })} style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", background: "#2a2a2a", border: "none", color: "white" }}>
            <option value="emagrecer">Emagrecer</option>
            <option value="ganhar massa">Ganhar Massa</option>
            <option value="definir">Definir / Secar</option>
          </select>
          <button onClick={calcular} style={{ width: "100%", padding: "14px", background: "#22c55e", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>GERAR MEU PLANO</button>
        </div>

        {resultado && (
          <div style={{ marginTop: "20px", background: "#1a1a1a", padding: "20px", borderRadius: "16px", position: "relative", overflow: "hidden" }}>
            <h2>Seu IMC: {resultado.imc}</h2>
            <div style={{ filter: pago ? "none" : "blur(8px)", opacity: pago ? 1 : 0.5, whiteSpace: "pre-line", marginTop: "10px", lineHeight: "1.6" }}>
              {resultado.plano}
            </div>
            {!pago && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", borderRadius: "16px" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>🔒 Desbloqueie seu plano completo</p>
                <a href={STRIPE_LINK} target="_blank" style={{ background: "#22c55e", padding: "14px 24px", borderRadius: "10px", color: "white", textDecoration: "none", fontWeight: "bold" }}>Desbloquear por R$29,90/mês</a>
                <button onClick={() => setPago(true)} style={{ marginTop: "12px", background: "transparent", border: "none", color: "#888", textDecoration: "underline", cursor: "pointer" }}>Já paguei, liberar</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
