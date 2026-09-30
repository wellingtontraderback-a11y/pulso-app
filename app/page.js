"use client"
import { useState, useEffect } from "react"

const VERDE = "#ccff00"
const LINK_PAGO = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"

export default function Page(){
  const [isPremium,setIsPremium]=useState(false)
  const [showPaywall,setShowPaywall]=useState(false)
  const [tempo,setTempo]=useState(900)

  useEffect(()=>{
    if(typeof window==="undefined") return
    const p = new URLSearchParams(window.location.search)
    if(p.get("pago")==="true" || p.get("premium")==="true"){
      localStorage.setItem("pulso_premium","true")
      setIsPremium(true)
    }
    if(localStorage.getItem("pulso_premium")==="true") setIsPremium(true)
  },[])

  useEffect(()=>{
    if(!showPaywall) return
    const id=setInterval(()=>setTempo(t=>t>0?t-1:0),1000)
    return ()=>clearInterval(id)
  },[showPaywall])

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16,paddingBottom:120}}>
      <div style={{textAlign:"center",padding:10,border:"1px solid #222",borderRadius:12,marginBottom:16}}>
        <span style={{color:VERDE,fontWeight:"bold"}}>WELLINGTON</span> • {isPremium?"PREMIUM":"GRATIS"}
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16,marginBottom:12}}>
        <b>TREINO DE HOJE</b>
        <div style={{marginTop:8,position:"relative"}}>
          <div style={isPremium?{}:{filter:"blur(6px)",opacity:0.4}}>Supino Reto 4x12<br/>Crucifixo 3x15<br/>Triceps 3x15</div>
          {!isPremium && <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#000",border:`1px solid ${VERDE}`,padding:10,borderRadius:10,width:"85%",textAlign:"center"}}>🔒 TREINO BLOQUEADO<br/><button onClick={()=>setShowPaywall(true)} style={{marginTop:8,background:VERDE,border:"none",padding:"8px 12px",borderRadius:8,fontWeight:900,width:"100%"}}>DESBLOQUEAR R$29,90</button></div>}
        </div>
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16}}>
        <b>DIETA DE HOJE</b>
        <div style={{marginTop:8}}>01 - Ovo + Pão - 320kcal</div>
        {isPremium? <><div style={{marginTop:8}}>02 - Frango + Arroz - 580kcal</div><div style={{marginTop:8}}>03 - Whey + Banana - 200kcal</div></> : <div onClick={()=>setShowPaywall(true)} style={{marginTop:12,background:VERDE,color:"#000",padding:12,borderRadius:10,textAlign:"center",fontWeight:900}}>🔒 VER DIETA COMPLETA R$29,90</div>}
      </div>

      {!isPremium && (
        <div style={{position:"fixed",bottom:85,left:16,right:16}}>
          <div style={{background:"#fff",padding:14,borderRadius:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <b style={{color:"#000",fontSize:13}}>🔥 TUDO POR R$29,90</b>
            <button onClick={()=>setShowPaywall(true)} style={{background:VERDE,border:"none",padding:"10px 14px",borderRadius:10,fontWeight:900}}>VIRAR PREMIUM</button>
          </div>
        </div>
      )}

      {showPaywall && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:99,padding:16,overflowY:"auto"}}>
          <div style={{background:"#111",borderRadius:24,border:`2px solid ${VERDE}`,padding:24,maxWidth:400,margin:"20px auto"}}>
            <div style={{textAlign:"center",color:VERDE,fontWeight:"bold"}}>👑 PREMIUM</div>
            <h1 style={{textAlign:"center",fontSize:32,fontWeight:900,marginTop:10}}>DESBLOQUEIE SEU SHAPE</h1>
            <div style={{background:"#1a1a1a",borderRadius:12,padding:16,marginTop:16,fontSize:14}}>
              <div>✅ Treinos Completos com Vídeo</div><div style={{marginTop:8}}>✅ Dieta Completa 7 Dias</div><div style={{marginTop:8}}>✅ Lista de Compras</div>
            </div>
            <div style={{textAlign:"center",marginTop:16}}><div style={{textDecoration:"line-through",opacity:0.6}}>De R$97</div><div style={{fontSize:44,fontWeight:900,color:VERDE}}>por R$29,90</div></div>
            <a href={LINK_PAGO} style={{display:"block",background:VERDE,color:"#000",textAlign:"center",padding:16,borderRadius:12,fontWeight:900,textDecoration:"none",marginTop:16}}>LIBERAR ACESSO PREMIUM AGORA</a>
            <div style={{textAlign:"center",fontSize:12,opacity:0.6,marginTop:8}}>Expira em {Math.floor(tempo/60)}:{String(tempo%60).padStart(2,"0")} • Garantia 7 dias</div>
            <button onClick={()=>setShowPaywall(false)} style={{width:"100%",background:"transparent",border:"none",color:"#fff",opacity:0.5,marginTop:12}}>Continuar no grátis</button>
          </div>
        </div>
      )}
    </div>
  )
}
