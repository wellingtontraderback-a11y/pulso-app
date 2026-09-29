"use client";
import { useState, useEffect } from 'react';

export default function PulsoApp() {
  const inp = {width:'100%',background:'#1e1e1e',border:'1px solid #2a2a2a',borderRadius:'12px',padding:'14px',color:'white',outline:'none',marginBottom:'10px',boxSizing:'border-box'};
  const card = {background:'#141414',border:'1px solid #222',borderRadius:'16px',padding:'14px'};
  const card2 = {background:'#141414',border:'1px solid #222',borderRadius:'20px',padding:'20px'};
  const small = {color:'#666',fontSize:'10px',textTransform:'uppercase'};
  const tabBtn = (active) => ({flex:1,padding:'12px',borderRadius:'999px',border:'none',fontWeight:800,fontSize:'12px',background:active?'white':'transparent',color:active?'black':'#777'});

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

  const tmb = user? Math.round(10*Number(user.peso)+6.25*Number(user.altura)-5*25+5) : 0;
  const link = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00";
  const treinos = { "Perder Peso":["HIIT 20min + 10k passos","Circuito Full Body","Cardio + Abdomen"], "Ganhar Massa":["Peito + Triceps","Costas + Biceps","Perna Completa"], "Definir":["Upper + Lower + Core","HIIT + Musculacao","Funcional"] };
  const dietas = { "Perder Peso":["Ovo + Aveia","Frango + Arroz + Salada","Whey + Fruta"], "Ganhar Massa":["Ovo + Pao + Amendoim","Carne + Arroz + Feijao","Frango + Batata Doce"], "Definir":["Iogurte + Granola","Peixe + Arroz + Salada","Whey + Aveia"] };

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
        <b>{user.nome.toUpperCase()} • {isPremium?'PREMIUM':'GRATIS'}</b>
        {!isPremium && <a href={link} style={{background:'#ccff00',color:'black',padding:'6px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:900,textDecoration:'none'}}>VIRAR PREMIUM</a>}
      </div>
      <div style={{maxWidth:'600px',margin:'0 auto',padding:'16px',display:'flex',flexDirection:'column',gap:'12px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
          <div style={card}><small style={small}>TMB</small><div style={{color:'#ccff00',fontSize:'20px',fontWeight:900}}>{tmb}</div><small style={small}>kcal/dia</small></div>
          <div style={card}><small style={small}>META</small><div style={{fontWeight:700,fontSize:'13px'}}>{user.objetivo}</div><small style={small}>{form.peso}kg</small></div>
          <div style={card}><small style={small}>STATUS</small><div style={{fontWeight:700,fontSize:'13px'}}>{isPremium?'LIBERADO':'BLOQUEADO'}</div></div>
        </div>
        {tab==='hoje' && <><div style={{background:'#ccff00',color:'black',borderRadius:'20px',padding:'20px'}}><b>TREINO DE HOJE</b><div style={{fontWeight:800,marginTop:'6px'}}>{treinos[user.objetivo][0]}</div></div><div style={card2}><b>DIETA DE HOJE</b>{dietas[user.objetivo].map((d,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #222',fontSize:'14px'}}><span>{d}</span><span style={{color:'#666'}}>0{i+1}</span></div>)}</div></>}
        {tab==='treinos' && <div>{!isPremium && <div style={{background:'#1a1a1a',border:'1px dashed #333',borderRadius:'16px',padding:'20px',textAlign:'center',marginBottom:'12px'}}><b>🔒 TREINOS BLOQUEADOS</b><p style={{fontSize:'12px',color:'#777',margin:'6px 0 14px'}}>Assine por R$29,90</p><a href={link} style={{background:'#ccff00',color:'black',padding:'12px 20px',borderRadius:'10px',fontWeight:900,textDecoration:'none',fontSize:'13px'}}>LIBERAR POR R$29,90</a><br/><button onClick={()=>{setIsPremium(true);localStorage.setItem("pulso_premium","true")}} style={{background:'none',border:'none',color:'#666',fontSize:'11px',marginTop:'10px',textDecoration:'underline'}}>Ja paguei</button></div>}{treinos[user.objetivo].map((t,i)=><div key={i} style={{...card2,filter:!isPremium?'blur(5px)':''}}><small style={small}>DIA {i+1}</small><div style={{fontWeight:700}}>{t}</div></div>)}</div>}
        {tab==='dieta' && <div style={card2}><b>PLANO ALIMENTAR</b>{dietas[user.objetivo].map((d,i)=><div key={i} style={{background:'#1e1e1e',borderRadius:'10px',padding:'12px',marginTop:'10px',fontSize:'14px'}}>{d}</div>)}</div>}
      </div>
      <div style={{position:'fixed',bottom:'16px',left:'50%',transform:'translateX(-50%)',width:'92%',maxWidth:'380px',background:'#1a1a1a',border:'1px solid #333',borderRadius:'999px',padding:'6px',display:'flex'}}>
        <button onClick={()=>setTab('hoje')} style={tabBtn(tab==='hoje')}>HOJE</button><button onClick={()=>setTab('treinos')} style={tabBtn(tab==='treinos')}>TREINOS</button><button onClick={()=>setTab('dieta')} style={tabBtn(tab==='dieta')}>DIETA</button>
      </div>
    </div>
  );
}
