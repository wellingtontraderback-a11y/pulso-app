"use client"
import { useState, useEffect } from "react"
const VERDE = "#ccff00"
const LINK_STRIPE = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"

export default function Page(){
  const [isPremium,setIsPremium]=useState(false)
  useEffect(()=>{
    if(window.location.search.includes("pago=true")){
      setIsPremium(true)
      localStorage.setItem("premium","true")
    }
    if(localStorage.getItem("premium")==="true") setIsPremium(true)
  },[])

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16}}>
      <div style={{textAlign:"center",padding:12,border:"1px solid #222",borderRadius:12}}>
        <span style={{color:VERDE,fontWeight:"bold"}}>PULSO</span> • Seu treino personalizado
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16,marginTop:16,position:"relative"}}>
        <b>TREINO DE HOJE</b>
        <div style={{marginTop:8,filter:isPremium?"none":"blur(6px)",opacity:isPremium?1:0.4}}>
          Supino Reto 4x10 - 60% carga<br/>Agachamento 4x10<br/>Puxada 3x12
        </div>
        {!isPremium && <div onClick={()=>window.location.href=LINK_STRIPE} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#000",border:`1px solid ${VERDE}`,borderRadius:12,padding:16,textAlign:"center",cursor:"pointer",width:"80%"}}>
          🔒 CLIQUE PARA VER POR DENTRO<br/>
          <div style={{background:VERDE,color:"#000",marginTop:8,padding:8,borderRadius:8,fontWeight:"bold"}}>DESBLOQUEAR R$29,90</div>
        </div>}
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16,marginTop:12}}>
        <b>DIETA DE HOJE</b>
        <div>01 - Ovo + Pão - 320kcal</div>
        <div style={{filter:isPremium?"none":"blur(6px)",opacity:isPremium?1:0.4,marginTop:8}}>02 - Frango + Arroz - 580kcal</div>
      </div>

      {!isPremium && <button onClick={()=>window.location.href=LINK_STRIPE} style={{background:VERDE,color:"#000",width:"100%",padding:16,borderRadius:12,marginTop:16,fontWeight:"bold",border:"none"}}>VIRAR PREMIUM - R$29,90</button>}
    </div>
  )
}
