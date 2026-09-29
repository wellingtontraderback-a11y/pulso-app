"use client";
import { useState, useEffect } from "react";
const STRIPE_LINK = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00";

const TREINOS = {
  emagrecimento: [
    { nome: "Agachamento Livre", series: "4x", reps: "15-20", descanso: "45s", video: "https://www.youtube.com/embed/aclHkVaku9U" },
    { nome: "Burpee", series: "3x", reps: "12", descanso: "60s", video: "https://www.youtube.com/embed/TU8QYVW0gDU" },
    { nome: "Corrida Intervalada", series: "5x", reps: "2 min", descanso: "1min", video: "https://www.youtube.com/embed/5iVQ1z7K3Q4" },
  ],
  hipertrofia: [
    { nome: "Supino Reto", series: "4x", reps: "8-12", descanso: "90s", video: "https://www.youtube.com/embed/rT7DgCr-3pg" },
    { nome: "Remada Curvada", series: "4x", reps: "10", descanso: "90s", video: "https://www.youtube.com/embed/vT2GjY_Umpw" },
    { nome: "Leg Press", series: "4x", reps: "12", descanso: "90s", video: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
  ],
  massa: [
    { nome: "Terra", series: "5x", reps: "5", descanso: "120s", video: "https://www.youtube.com/embed/op9kVnSso6Q" },
    { nome: "Desenvolvimento", series: "4x", reps: "8", descanso: "90s", video: "https://www.youtube.com/embed/qEwKCR5JCog" },
  ]
};

export default function Home() {
  const [tab, setTab] = useState("hoje");
  const [dados, setDados] = useState({ idade: "38", peso: "65", altura: "170", objetivo: "emagrecimento", sexo: "feminino" });
  const [pago, setPago] = useState(false);
  const [progresso, setProgresso] = useState([{semana:1, peso:65}]);
  
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("pago")==="true" || localStorage.getItem("pulso_pago")==="true") setPago(true);
    if (localStorage.getItem("pulso_peso")) setProgresso(JSON.parse(localStorage.getItem("pulso_peso")));
  }, []);

  const liberar = () => { setPago(true); localStorage.setItem("pulso_pago","true"); }
  
  // Cálculos
  const peso = parseFloat(dados.peso)||65; const altura = parseFloat(dados.altura)||170; const idade = parseFloat(dados.idade)||30;
  const imc = (peso / ((altura/100)**2)).toFixed(1);
  const tmb = dados.sexo==="feminino" ? 655 + (9.6*peso) + (1.8*altura) - (4.7*idade) : 66 + (13.7*peso) + (5*altura) - (6.8*idade);
  const calorias = dados.objetivo==="emagrecimento" ? tmb-400 : dados.objetivo==="massa" ? tmb+400 : tmb;
  const agua = (peso*35/1000).toFixed(1);

  const treinosAtuais = TREINOS[dados.objetivo] || TREINOS.hipertrofia;

  return (
    <main style={{minHeight:"100vh", background:"#08080a", color:"white", fontFamily:"Inter, sans-serif"}}>
      <header style={{padding:"16px", borderBottom:"1px solid #1f1f23", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#08080a", zIndex:10}}>
        <h1 style={{fontSize:"22px", fontWeight:900}}>🔥 PULSO</h1>
        <div style={{fontSize:"10px", background:"#1a1a1a", padding:"6px 10px", borderRadius:"20px"}}>IA • PRO</div>
      </header>

      <div style={{maxWidth:"1000px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:"20px", padding:"20px"}}>
        {/* COLUNA PRINCIPAL */}
        <div>
          <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
            {["hoje","treino","dieta","calc","progresso"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background: tab===t ? "#22c55e" : "#1e1e22", color:"white", fontWeight:"bold", fontSize:"12px", textTransform:"uppercase"}}>{t}</button>
            ))}
          </div>

          {tab==="hoje" && (
            <div style={{background:"#121214", borderRadius:"16px", padding:"20px"}}>
              <h2 style={{fontSize:"18px", marginBottom:"10px"}}>Rotina Inteligente de Hoje 🤖</h2>
              <div style={{display:"grid", gap:"10px"}}>
                <div style={{background:"#1e1e22", padding:"12px", borderRadius:"12px"}}>✅ <b>06:30</b> - Beber 500ml água + Cardio leve</div>
                <div style={{background:"#1e1e22", padding:"12px", borderRadius:"12px"}}>🍳 <b>07:30</b> - Café: 2 ovos + aveia (320 kcal)</div>
                <div style={{background:"#1e1e22", padding:"12px", borderRadius:"12px"}}>💪 <b>18:00</b> - Treino {dados.objetivo} - 45 min</div>
                <div style={{background:"#1e1e22", padding:"12px", borderRadius:"12px"}}>🌙 <b>21:00</b> - Jantar leve + Registrar peso</div>
              </div>
            </div>
          )}

          {tab==="treino" && (
            <div style={{display:"grid", gap:"12px"}}>
              {treinosAtuais.map((ex,i)=>(
                <div key={i} style={{background:"#121214", borderRadius:"16px", overflow:"hidden"}}>
                  <div style={{padding:"16px"}}>
                    <h3 style={{margin:0}}>{ex.nome}</h3>
                    <p style={{fontSize:"12px", color:"#888"}}>{ex.series} • {ex.reps} • Descanso: {ex.descanso}</p>
                  </div>
                  {pago ? <iframe width="100%" height="200" src={ex.video} frameBorder="0" allowFullScreen></iframe> : <div style={{height:"200px", background:"#1a1a1a", display:"flex", alignItems:"center", justifyContent:"center", filter:"blur(10px)"}}>🔒 Vídeo Premium</div>}
                </div>
              ))}
            </div>
          )}

          {tab==="dieta" && (
            <div style={{background:"#121214", borderRadius:"16px", padding:"20px"}}>
              <h3>Dieta para {dados.objetivo} - {calorias.toFixed(0)} kcal/dia</h3>
              <div style={{filter: pago ? "none" : "blur(8px)"}}>
                <p>☕ Café: Ovos + aveia + banana</p><p>🥪 Lanche: Whey + maçã</p><p>🍛 Almoço: Frango 150g + arroz 100g + salada</p><p>🍌 Pré-treino: Pão + pasta amendoim</p><p>🍽️ Jantar: Omelete + legumes</p>
              </div>
              {!pago && <div style={{textAlign:"center", marginTop:"-80px", position:"relative"}}><a href={STRIPE_LINK} style={{background:"#22c55e", padding:"12px 20px", borderRadius:"10px", color:"white", textDecoration:"none", fontWeight:"bold"}}>Desbloquear Dieta R$29,90</a></div>}
            </div>
          )}

          {tab==="calc" && (
            <div style={{background:"#121214", borderRadius:"16px", padding:"20px", display:"grid", gap:"10px"}}>
              <h3>Calculadora Metabólica</h3>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                <div style={{background:"#1e1e22", padding:"14px", borderRadius:"12px"}}><small>IMC</small><h2>{imc}</h2></div>
                <div style={{background:"#1e1e22", padding:"14px", borderRadius:"12px"}}><small>TMB</small><h2>{tmb.toFixed(0)} kcal</h2></div>
                <div style={{background:"#1e1e22", padding:"14px", borderRadius:"12px"}}><small>Meta Calórica</small><h2>{calorias.toFixed(0)} kcal</h2></div>
                <div style={{background:"#1e1e22", padding:"14px", borderRadius:"12px"}}><small>Água/dia</small><h2>{agua} L</h2></div>
              </div>
            </div>
          )}

          {tab==="progresso" && (
            <div style={{background:"#121214", borderRadius:"16px", padding:"20px"}}>
              <h3>Evolução Semanal</h3>
              <div style={{display:"flex", gap:"10px", marginTop:"15px"}}>
                {progresso.map((p,i)=><div key={i} style={{background:"#1e1e22", padding:"10px", borderRadius:"8px", flex:1, textAlign:"center"}}><small>Sem {p.semana}</small><br/><b>{p.peso}kg</b></div>)}
              </div>
              <button onClick={()=>{ const n=[...progresso, {semana:progresso.length+1, peso:peso}]; setProgresso(n); localStorage.setItem("pulso_peso", JSON.stringify(n));}} style={{marginTop:"15px", width:"100%", padding:"12px", background:"#22c55e", border:"none", borderRadius:"10px", color:"white", fontWeight:"bold"}}>+ Registrar Peso de Hoje</button>
            </div>
          )}
        </div>

        {/* COLUNA LATERAL - CONFIG */}
        <div style={{background:"#121214", borderRadius:"16px", padding:"20px", height:"fit-content"}}>
          <h3 style={{fontSize:"14px", marginBottom:"12px"}}>Seus Dados</h3>
          <input placeholder="Idade" value={dados.idade} onChange={e=>setDados({...dados, idade:e.target.value})} style={inputStyle} />
          <input placeholder="Peso kg" value={dados.peso} onChange={e=>setDados({...dados, peso:e.target.value})} style={inputStyle} />
          <input placeholder="Altura cm" value={dados.altura} onChange={e=>setDados({...dados, altura:e.target.value})} style={inputStyle} />
          <select value={dados.sexo} onChange={e=>setDados({...dados, sexo:e.target.value})} style={inputStyle}><option value="feminino">Feminino</option><option value="masculino">Masculino</option></select>
          <select value={dados.objetivo} onChange={e=>setDados({...dados, objetivo:e.target.value})} style={inputStyle}><option value="emagrecimento">Emagrecimento</option><option value="massa">Ganho de Massa</option><option value="hipertrofia">Hipertrofia</option><option value="definicao">Definição</option></select>
          {!pago ? (
            <>
              <a href={STRIPE_LINK} style={{display:"block", textAlign:"center", background:"#22c55e", padding:"14px", borderRadius:"12px", color:"white", textDecoration:"none", fontWeight:"bold", marginTop:"10px"}}>🔓 LIBERAR APP COMPLETO R$29,90</a>
              <button onClick={liberar} style={{width:"100%", marginTop:"8px", background:"transparent", border:"1px solid #333", padding:"10px", borderRadius:"10px", color:"#888"}}>Já paguei, liberar</button>
            </>
          ) : <div style={{marginTop:"10px", background:"#0f2e1a", color:"#22c55e", padding:"12px", borderRadius:"10px", textAlign:"center", fontWeight:"bold"}}>✅ PREMIUM ATIVO</div>}
        </div>
      </div>
    </main>
  );
}
const inputStyle = {width:"100%", padding:"12px", marginBottom:"8px", borderRadius:"8px", background:"#1e1e22", border:"1px solid #2a2a2e", color:"white"};
