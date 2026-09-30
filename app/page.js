"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [tab,setTab]=useState('hoje')
  const [isPremium,setIsPremium]=useState(false)
  const [video,setVideo]=useState(null)
  const [user,setUser]=useState({objetivo:'Hipertrofia'})
  const [form,setForm]=useState({peso:'80'})

  useEffect(()=>{
    if(typeof window!=='undefined' && window.location.search.includes('pago=true')){
      localStorage.setItem('premium','true')
      setIsPremium(true)
    }
    if(localStorage.getItem('premium')==='true') setIsPremium(true)
  },[])

  const LINK_PAGO = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"
  const card2={background:'#fff',borderRadius:'20px',padding:'20px',marginTop:'12px',boxShadow:'0 4px 10px rgba(0,0,0,0.05)'}
  const tabBtn=(a)=>({flex:1,padding:'12px',border:'none',background:a?'#000':'#eee',color:a?'#fff':'#000',borderRadius:'12px',fontWeight:800,cursor:'pointer'})
  const treinos={Hipertrofia:['Peito e Tríceps','Costas e Bíceps'],Emagrecimento:['HIIT Queima Gordura','Cardio Intenso']}
  const dietas={Hipertrofia:'3000 kcal - 150g Proteína',Emagrecimento:'1800 kcal - Déficit'}

  return(
    <div style={{fontFamily:'sans-serif',padding:'16px',paddingBottom:'120px',background:'#f5f5f5',minHeight:'100vh'}}>

      {tab==='hoje' && <>
        <div onClick={()=>setVideo(treinos[user.objetivo][0])} style={{background:'#000',color:'#fff',borderRadius:'20px',padding:'20px',cursor:'pointer'}}>
          <b style={{fontSize:'18px'}}>TREINO DE HOJE</b><br/>
          <small style={{fontSize:'11px',opacity:0.7}}>Clique para ver o vídeo explicativo</small>
          <div style={card2}><b style={{color:'#000'}}>DIETA DE HOJE</b><br/><span style={{color:'#000'}}>{dietas[user.objetivo]}</span></div>
        </div>
        <div style={card2}><b>Plano Alimentar</b><br/>Peso atual: {form.peso}kg</div>
      </>}

      {tab==='treinos' && <div style={card2}><b>TREINOS</b><br/><br/>
        {treinos[user.objetivo].map(t=><div key={t} onClick={()=>setVideo(t)} style={{background:'#000',color:'#fff',padding:'12px',borderRadius:'12px',marginBottom:'8px',cursor:'pointer'}}>{t}</div>)}
        {!isPremium && <small style={{color:'red'}}>Bloqueado no Grátis - Assine Premium</small>}
      </div>}

      {tab==='dieta' && <div style={card2}><b>DIETA COMPLETA</b><br/>{dietas[user.objetivo]}</div>}

      {/* BOTÃO FLUTUANTE PREMIUM - NÃO TAMPA A TELA */}
      {!isPremium && (
        <div style={{position:'fixed',bottom:'85px',left:'16px',right:'16px',zIndex:99}}>
          <div style={{background:'#fff',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'20px',boxShadow:'0 10px 30px rgba(0,0,0,0.2)',border:'2px solid #000'}}>
            <b style={{fontSize:'13px'}}>VIRAR PREMIUM<br/><span style={{color:'#666'}}>R$29,90/mês</span></b>
            <a href={LINK_PAGO} style={{background:'#000',color:'#fff',padding:'12px 18px',borderRadius:'20px',fontSize:'11px',fontWeight:900,textDecoration:'none'}}>VIRAR PREMIUM</a>
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:'16px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'8px',background:'#fff',padding:'10px',borderRadius:'20px',boxShadow:'0 5px 20px rgba(0,0,0,0.2)'}}>
        <button onClick={()=>setTab('hoje')} style={tabBtn(tab==='hoje')}>HOJE</button>
        <button onClick={()=>setTab('treinos')} style={tabBtn(tab==='treinos')}>TREINOS</button>
        <button onClick={()=>setTab('dieta')} style={tabBtn(tab==='dieta')}>DIETA</button>
      </div>

      {video && <div onClick={()=>setVideo(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}><div style={{background:'#fff',padding:'20px',borderRadius:'20px',textAlign:'center'}}>🎥 Vídeo: {video} <br/><br/><small>Clique para fechar</small></div></div>}
    </div>
  );
}
