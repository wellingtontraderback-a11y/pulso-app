"use client";
import { useState, useEffect } from 'react';

export default function PulsoApp() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("hoje");
  const [isPremium, setIsPremium] = useState(false);
  const [form, setForm] = useState({ nome: "", peso: "", altura: "", objetivo: "Perder Peso" });

  useEffect(() => {
    const s = localStorage.getItem("pulso_user");
    if(s) setUser(JSON.parse(s));
    if(localStorage.getItem("pulso_premium")==="true") setIsPremium(true);
    if(window.location.search.includes("pago=true")){ setIsPremium(true); localStorage.setItem("pulso_premium","true"); }
  }, []);

  const salvar = () => {
    if(!form.nome||!form.peso||!form.altura) return alert("Preencha tudo!");
    localStorage.setItem("pulso_user", JSON.stringify(form));
    setUser(form);
  };

  const tmb = user ? Math.round(10*Number(user.peso)+6.25*Number(user.altura)-5*25+5) : 0;
  const link = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00";

  const treinos = { "Perder Peso":["HIIT 20min + 10k passos","Circuito Full Body","Cardio + Abdômen"], "Ganhar Massa":["Peito + Tríceps","Costas + Bíceps","Perna Completa"], "Definir":["Upper + Lower + Core","HIIT + Musculação","Funcional"] };
  const dietas = { "Perder Peso":["Ovo + Aveia","Frango + Arroz + Salada","Whey + Fruta"], "Ganhar Massa":["Ovo + Pão + Amendoim","Carne + Arroz + Feijão","Frango + Batata Doce"], "Definir":["Iogurte + Granola","Peixe + Arroz + Salada","Whey + Aveia"] };

  if(!user) return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'white',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',fontFamily:'sans-serif'}}>
      <div style={{width:'100%',maxWidth:'380px',background:'#141414',border:'1px solid #222',borderRadius:'24px',padding:'32px'}}>
        <h1 style={{fontWeight:900,marginBottom:'8px'}}>● PULSO</h1>
        <h2 style={{fontSize:'32px',fontWeight:800,lineHeight:'1.1'}}>Vamos montar<br/>seu plano.</h2>
        <p style={{color:'#777',margin:'8px 0 24px',fontSize:'14px'}}>Leva 30 segundos.</p>
        <input placeholder="Seu nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} style={inp} />
        <div style={{display:'flex',gap:'10px'}}><input placeholder="Peso kg" type="number" value={form.peso} onChange={e=>setForm({...form,peso:e.target.value})} style={inp}/><input placeholder="Altura cm" type="number" value={form.altura} onChange={e=>setForm({...form,altura:e.target.value})} style={inp}/></div>
        <select value={form.objetivo} onChange={e=>setForm({...form,objetivo:e.target.value})} style={inp}><option>Perder Peso</option><option>Ganhar Massa</option><option>Definir</option></select>
        <button onClick={salvar} style={{width:'100%',background:'#ccff00',color:'black',fontWeight:900,padding:'16px',borderRadius:'12px',border:'none',marginTop:'12px',fontSize:'16px'}}>CRIAR MEU PLANO →</button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'white',paddingBottom:'90px',fontFamily:'sans-serif'}}>
      <div style={{position:'sticky',top:0,background:'#0a0a0a',borderBottom:'1px solid #1a1a1a',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <b>{user.nome.toUpperCase()} • {isPremium?'PREMIUM':'GRÁTIS'}</b>
        {!isPremium && <a href={link} style={{background:'#ccff00',color:'black',padding:'6px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:900,textDecoration:'none'}}>VIRAR PREMIUM</a>}
      </div>

      <div style={{maxWidth:'600px',margin:'0
