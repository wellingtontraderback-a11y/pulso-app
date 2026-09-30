"use client"
import { useState, useEffect } from "react"
const LINK="https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"
const VERDE="#ccff00"

export default function Page(){
const [ok,setOk]=useState(false)
const [tempo,setTempo]=useState(900)

useEffect(()=>{
if(window.location.search.includes("pago=true")){
setOk(true)
localStorage.setItem("premium","true")
}
if(localStorage.getItem("premium")==="true"){
setOk(true)
}
const t=setInterval(()=>{
setTempo(s=>s>0?s-1:0)
},1000)
return()=>clearInterval(t)
},[])

const min=String(Math.floor(tempo/60)).padStart(2,"0")
const sec=String(tempo%60).padStart(2,"0")

if(ok){
return(
<div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16}}>
<div style={{textAlign:"center",border:"1px solid #222",borderRadius:12,padding:12}}>
<span style={{color:VERDE,fontWeight:"bold"}}>PULSO</span> • Premium ✅
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:16}}>
<b>TREINOS COMPLETOS COM VÍDEO</b><br/><br/>
Seg: Peito + Triceps<br/>
Supino 4x10 - <a style={{color:VERDE}}>▶️ Video</a><br/>
Ter: Costas + Biceps<br/>
Qua: Perna Completa<br/>
Qui: Ombro + Abdomen
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:12}}>
<b>DIETA COMPLETA 7 DIAS</b><br/>
D1: Ovo + Pão 320kcal<br/>
D2: Frango + Arroz 580kcal<br/>
D3: Whey + Banana 350kcal<br/>
D4: Carne + Batata 620kcal<br/>
D5: Peixe + Legumes 480kcal<br/>
D6: Omelete + Aveia 400kcal<br/>
D7: Livre Controlado
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:12}}>
<b>LISTA DE COMPRAS AUTOMÁTICA</b><br/>
30 ovos, 2kg Frango, Arroz, Whey
</div>
<div style={{background:"#111",borderRadius:16,padding:16,marginTop:12}}>
<b>ACOMPANHAMENTO DE PESO</b><br/>
Peso: 78kg → Meta 75kg
</div>
</div>
)
}

return(
<div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16,display:"flex",justifyContent:"center"}}>
<div style={{width:"100%",maxWidth:380,background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:24,padding:20}}>
<div style={{border:`1px solid ${VERDE}`,color:VERDE,borderRadius:20,padding:"4px 10px",display:"inline-block",fontSize:12,fontWeight:"bold"}}>👑 PREMIUM</div>
<h1 style={{fontSize:34,fontWeight:"900",lineHeight:1,marginTop:12}}>DESBLOQUEIE SEU SHAPE</h1>
<div style={{background:"#111",borderRadius:16,height:150,marginTop:16,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<div style={{fontSize:50}}>🥗🍱</div>
<span style={{position:"absolute",top:20,left:20}}>🔒</span>
<span style={{position:"absolute",top:20,right:30}}>🔒</span>
<span style={{position:"absolute",bottom:20,left:50}}>🔒</span>
<span style={{position:"absolute",bottom:20,right:20}}>🔒</span>
</div>
<div style={{marginTop:20,lineHeight:2}}>
✅ Treinos Completos com Vídeo<br/>
✅ Dieta Completa 7 Dias<br/>
✅ Lista de Compras Automática<br/>
✅ Acompanhamento de Peso
</div>
<div style={{textAlign:"center",marginTop:18}}>
<div style={{color:"#666",textDecoration:"line-through"}}>De R$97</div>
<div style={{color:VERDE,fontSize:38,fontWeight:"900"}}>por R$29,90</div>
</div>
<button onClick={()=>window.location.href=LINK} style={{background:VERDE,color:"#000",width:"100%",padding:18,borderRadius:14,marginTop:16,fontWeight:"900",border:"none",fontSize:16,cursor:"pointer"}}>
LIBERAR MEU ACESSO PREMIUM AGORA
</button>
<div style={{textAlign:"center",marginTop:12,fontSize:12,color:"#888"}}>
🛡️ Garantia 7 dias • Oferta expira em {min}:{sec}
</div>
</div>
</div>
)
}
