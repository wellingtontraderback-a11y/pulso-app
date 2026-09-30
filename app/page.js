"use client"
import { useState, useEffect } from "react"
const VERDE="#ccff00"
const LINK="https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"
export default function Page(){
const [ok,setOk]=useState(false)
useEffect(()=>{
if(window.location.search.includes("pago=true")){
setOk(true)
localStorage.setItem("premium","true")
}
if(localStorage.getItem("premium")==="true"){
setOk(true)
}
},[])
return(
<div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16}}>
<div style={{textAlign:"center",padding:12,border:"1px solid #222",borderRadius:12}}>
<span style={{color:VERDE,fontWeight:"bold"}}>PULSO</span> • Personal
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:16,position:"relative"}}>
<b>TREINO DE HOJE</b>
<div style={{marginTop:8,filter:ok?"none":"blur(6px)",opacity:ok?1:0.4}}>
Supino 4x10<br/>Agachamento 4x10
</div>
{!ok && <div onClick={()=>{window.location.href=LINK}} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#000",border:"1px solid #ccff00",borderRadius:12,padding:16,textAlign:"center",width:"85%"}}>
🔒 CLIQUE PARA VER<br/>
<div style={{background:VERDE,color:"#000",marginTop:8,padding:8,borderRadius:8,fontWeight:"bold"}}>DESBLOQUEAR R$29,90</div>
</div>}
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:12}}>
<b>DIETA</b><div>01 - Ovo + Pão - 320kcal</div>
</div>
{!ok && <button onClick={()=>{window.location.href=LINK}} style={{background:VERDE,color:"#000",width:"100%",padding:16,borderRadius:12,marginTop:16,fontWeight:"bold",border:"none"}}>VIRAR PREMIUM - R$29,90</button>}
</div>
)}
