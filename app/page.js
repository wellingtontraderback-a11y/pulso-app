"use client"
import { useState, useEffect } from "react"

const VERDE = "#ccff00"
const LINK_PAGO = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"

export default function Page(){
  const [tab,setTab]=useState('hoje')
  const [isPremium,setIsPremium]=useState(false)
  const [showPaywall,setShowPaywall]=useState(false)
  const [tempo,setTempo]=useState(15*60)
  const [peso,setPeso]=useState('70')
  const [meta,setMeta]=useState('65')

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    if(params.get('premium')==='true' || params.get('success') || params.get('pago')==='true'){
      localStorage.setItem('pulso_premium','true')
      setIsPremium(true)
    }
    if(localStorage.getItem('pulso_premium')==='true') setIsPremium(true)
    const p = localStorage.getItem('pulso_peso')
    const m = localStorage.getItem('pulso_meta')
    if(p) setPeso(p)
    if(m) setMeta(m)
  },[])

  useEffect(()=>{
    if(!showPaywall) return
    const t = setInterval(()=> setTempo(s=> s>0? s-1 : 0), 1000)
    return ()=> clearInterval(t)
  },[showPaywall])

  const formataTempo = () => {
    const m = Math.floor(tempo/60).toString().padStart(2,'0')
    const s = (tempo%60).toString().padStart(2,'0')
    return `${m}:${s}`
  }

  const tabBtn = (active) => ({
    flex:1, padding:'12px', borderRadius:'12px', border:'none',
    background: active ? VERDE : '#1a1a1a', color: active ? '#000' : '#fff',
    fontWeight:'bold', cursor:'pointer'
  })

  return (
    <div style={{background:'#000', minHeight:'100vh', color:'#fff', padding:'16px', paddingBottom:'130px', fontFamily:'sans-serif'}}>
      
      <div style={{textAlign:'center', border:'1px solid #222', borderRadius:'12px', padding:'8px', marginBottom:'16px'}}>
        <span style={{color:VERDE, fontWeight:'bold', letterSpacing:'2px'}}>WELLINGTON</span> <span style={{opacity:0.5}}> • {isPremium ? 'PREMIUM' : 'GRATIS'}</span>
      </div>

      <div style={{background:'#111', borderRadius:'16px', padding:'16px', marginBottom:'12px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div><div style={{opacity:0.5,fontSize:'11px'}}>TMB</div><b>1.750 kcal</b></div>
          <div><div style={{opacity:0.5,fontSize:'11px'}}>META</div><b>{meta} kg</b></div>
          <div style={{background:isPremium ? VERDE : '#222', color:isPremium ? '#000' : '#fff', padding:'6px 10px', borderRadius:'8px', fontSize:'11px', fontWeight:'bold'}}>{isPremium ? '✅ LIBERADO' : '🔒 BLOQUEADO'}</div>
        </div>
      </div>

      <div style={{background:'#111', borderRadius:'16px', padding:'16px', marginBottom:'12px'}}>
        <b>TREINO DE HOJE</b>
        {isPremium ? (
          <div style={{marginTop:'10px', lineHeight:'1.6'}}>✅ Supino Reto - 4x12<br/>✅ Crucifixo - 3x15<br/>✅ Tríceps Corda - 3x15</div>
        ) : (
          <div style={{position:'relative', marginTop:'10px'}}>
            <div style={{filter:'blur(7px)', opacity:0.5, lineHeight:'1.6'}}>Supino Reto - 4x12<br/>Crucifixo - 3x15<br/>Tríceps Corda - 3x15</div>
            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'#000', border:`1.5px solid ${VERDE}`, padding:'12px 16px', borderRadius:'12px', textAlign:'center', width:'80%'}}>
              <div style={{fontSize:'20px'}}>🔒</div>
              <div style={{fontSize:'12px', fontWeight:'bold', marginTop:'4px'}}>TREINO COMPLETO BLOQUEADO</div>
              <button onClick={()=>setShowPaywall(true)} style={{background:VERDE, border:'none', padding:'8px 12px', borderRadius:'8px', fontWeight:'900', marginTop:'8px', width:'100%'}}>DESBLOQUEAR POR R$29,90</button>
            </div>
          </div>
        )}
      </div>

      <div style={{background:'#111', borderRadius:'16px', padding:'16px'}}>
        <b>DIETA DE HOJE</b>
        <div style={{marginTop:'12px'}}>
          <div style={{background:'#1a1a1a', padding:'10px', borderRadius:'10px'}}>01 - Ovo + Pão - 320kcal</div>
          {!isPremium ? (
            <>
              <div style={{filter:'blur(6px)', marginTop:'8px', background:'#1a1a1a', padding:'10px', borderRadius:'10px', opacity:0.5}}>02 - Frango + Arroz - 580kcal</div>
              <div style={{filter:'blur(6px)', marginTop:'8px', background:'#1a1a1a', padding:'10px', borderRadius:'10px', opacity:0.5}}>03 - Whey + Banana - 200kcal</div>
              <div onClick={()=>setShowPaywall(true)} style={{background:VERDE, color:'#000', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'900', marginTop:'14px', cursor:'pointer'}}>🔒 VER DIETA COMPLETA POR R$29,90</div>
            </>
          ) : (
            <>
              <div style={{marginTop:'8px', background:'#1a1a1a', padding:'10px', borderRadius:'10px'}}>02 - Frango + Arroz - 580kcal</div>
              <div style={{marginTop:'8px', background:'#1a1a1a', padding:'10px', borderRadius:'10px'}}>03 - Whey + Banana - 200kcal</div>
            </>
          )}
        </div>
      </div>

      {!isPremium && (
        <div style={{position:'fixed',bottom:'85px',left:'16px', right:'16px', zIndex:50}}>
          <div style={{background:'#fff',padding:'14px 18px', borderRadius:'16px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}>
            <b style={{fontSize:'13px',color:'#000'}}>🔥 TUDO POR R$29,90</b>
            <button onClick={()=>setShowPaywall(true)} style={{background:VERDE,color:'#000', padding:'10px 16px', borderRadius:'10px', border:'none', fontWeight:'900', cursor:'pointer'}}>VIRAR PREMIUM</button>
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:'16px',left:'50%', transform:'translateX(-50%)', width:'90%', maxWidth:'400px', display:'flex', gap:'8px', background:'#1a1a1a', padding:'8px', borderRadius:'16px', zIndex:50}}>
        <button onClick={()=>setTab('hoje')} style={tabBtn(tab==='hoje')}>Hoje</button>
        <button onClick={()=>setTab('treinos')} style={tabBtn(tab==='treinos')}>Treinos</button>
        <button onClick={()=>setTab('dieta')} style={tabBtn(tab==='dieta')}>Dieta</button>
      </div>

      {showPaywall && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.97)', zIndex:100, padding:'16px', overflowY:'auto'}}>
          <div style={{background:'#111', borderRadius:'24px', border:`2px solid ${VERDE}`, padding:'24px', maxWidth:'400px', margin:'20px auto'}}>
            <div style={{textAlign:'center', color:VERDE, fontWeight:'bold', letterSpacing:'2px'}}>👑 PREMIUM</div>
            <h1 style={{fontSize:'32px', fontWeight:'900', textAlign:'center', margin:'10px 0', lineHeight:1}}>DESBLOQUEIE SEU SHAPE</h1>
            <div style={{background:'#1a1a1a', borderRadius:'16px', padding:'16px', marginTop:'16px', fontSize:'14px'}}>
              <div style={{marginBottom:'12px'}}>✅ Treinos Completos com Vídeo</div>
              <div style={{marginBottom:'12px'}}>✅ Dieta Completa 7 Dias</div>
              <div style={{marginBottom:'12px'}}>✅ Lista de Compras Automática</div>
              <div>✅ Acompanhamento de Peso</div>
            </div>
            <div style={{textAlign:'center', marginTop:'20px'}}>
              <div style={{textDecoration:'line-through', opacity:0.6}}>De R$97</div>
              <div style={{fontSize:'48px', fontWeight:'900', color:VERDE, lineHeight:1}}>por R$29,90</div>
            </div>
            <a href={LINK_PAGO
