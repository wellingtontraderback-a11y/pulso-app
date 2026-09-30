"use client"
import { useState, useEffect } from "react"
const VERDE = "#ccff00"
const LINK_STRIPE = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"

export default function Page(){
  const [isPremium,setIsPremium]=useState(false)
  useEffect(()=>{
    if(typeof window !== "undefined" && window.location.search.includes("pago=true")){
      setIsPremium(true)
      localStorage.setItem("premium","true")
    }
    if(localStorage.getItem("premium")==="true") setIsPremium(true)
  },[])

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16}}>
      <div style={{textAlign:"center",padding:10,border:"1px solid #222",borderRadius:12}}>
        <span style={{color:VERDE,fontWeight:"bold"}}>TREINO GRATIS</span> • {isPremium ? "PREMIUM LIBERADO" : "GRATIS"}
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16,marginBottom:12,marginTop:16}}>
        <b>TREINO DE HOJE</b>
        <div style={{marginTop:8,position:"relative"}}>
          <div style={isPremium?{}:{filter:"blur(6px)",opacity:0.4}}>
            Supino Reto 4x10 - 60% carga<br/>Agachamento 4x10<br/>Puxada 3x12
          </div>
          {!isPremium && <div onClick={()=>window.open(LINK_STRIPE,"_blank")} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#000",border:"1px solid #ccff00",borderRadius:12,padding:16,textAlign:"center",cursor:"pointer",width:"80%"}}>
            🔒 CLIQUE PARA VER POR DENTRO<br/>
            <button style={{background:VERDE,color:"#000",marginTop:8,padding:"8px 16px",borderRadius:8,fontWeight:"bold",border:"none"}}>DESBLOQUEAR R$29,90</button>
          </div>}
        </div>
      </div>

      <div style={{background:"#111",borderRadius:16,padding:16}}>
        <b>DIETA DE HOJE</b>
        <div style={{marginTop:8}}>01 - Ovo + Pão - 320kcal</div>
        {isPremium ? <div style={{marginTop:8}}>02 - Frango + Arroz - 580kcal</div> : <div style={{marginTop:8,filter:"blur(5px)",opacity:0.4}}>02 - Frango + Arroz - 580kcal</div>}
      </div>

      {!isPremium && <button onClick={()=>window.open(LINK_STRIPE,"_blank")} style={{background:VERDE,color:"#000",width:"100%",padding:16,borderRadius:12,marginTop:16,fontWeight:"bold",border:"none"}}>VIRAR PREMIUM - R$29,90</button>}
    </div>
  )
}
