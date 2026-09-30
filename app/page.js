"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [tab,setTab]=useState('hoje')
  const [isPremium,setIsPremium]=useState(false)
  const [video,setVideo]=useState(null)
  const [user,setUser]=useState({objetivo:'Hipertrofia'})
  const [form,setForm]=useState({peso:'80'})
  const [tmb,setTmb]=useState(2200)

  useEffect(()=>{
    if(typeof window!=='undefined' && window.location.search.includes('pago=true')){
      localStorage.setItem('premium','true')
      setIsPremium(true)
      alert('Pagamento confirmado! Premium liberado!')
    }
    if(localStorage.getItem('premium')==='true') setIsPremium(true)
  },[])

  const card2={background:'#fff',borderRadius:'20px',padding:'20px',marginTop:'10px'}
  const tabBtn=(a)=>({flex:1,padding:'12px',border:'none',background:a?'#000':'#eee',color:a?'#fff':'#000',borderRadius:'12px',fontWeight:800})
  const small={fontSize:'11px',color:'#888'}
  const treinos={Hipertrofia:['Treino A - Peito','Treino B - Costas'],Emagrecimento:['HIIT','Cardio']}
  const dietas={Hipertrofia:'3000 kcal - Alto carb',Emagrecimento:'1800 kcal - Deficit'}

  const LINK_PAGO = "https://buy.stripe.com/00w4gBc693Mo0lrf9B9AA00"

  return(
    <div style={{fontFamily:'sans-serif',padding:'16px',paddingBottom:'90px',background:'#f5f5f5',minHeight:'100vh'}}>
      
      {!isPremium && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',zIndex:999,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'#fff',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'20px',width:'100%',maxWidth:'400px'}}>
          <b>VIRAR PREMIUM - R$29,90/mês</b>
          <a href={LINK_PAGO} style={{background:'#000',color:'#fff',padding:'10px 16px',borderRadius:'20px',fontSize:'11px',fontWeight:900,textDecoration:'none'}}>VIRAR PREMIUM</a>
        </div>
      </div>}

      {tab==='hoje' && <>
        <div onClick={()=>setVideo(treinos[user.objetivo][0])} style={{background:'#000',color:'#fff',borderRadius:'20px',padding:'20px',cursor:'pointer'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{fontWeight:800,marginTop:'6px',fontSize:'18px'}}>TREINO DE HOJE<br/><small style={{fontSize:'11px',marginTop:'8px',display:'block'}}>Clique para ver o video explicativo</small></div>
          </div>
          <div style={card2}><b>DIETA DE HOJE</b>{dietas[user.objetivo]}</div>
        </div>
      </>}

      {tab==='treinos' && <div>{!isPremium && <div style={{background:'#ffe',padding:'20px',borderRadius:'20px'}}>Conteúdo bloqueado. Assine premium.</div>}
        <div style={card2}><b>VIDEOS</b><div onClick={()=>setVideo('Video')} style={{background:'#000',color:'#fff',padding:'10px',borderRadius:'10px',marginTop:'10px',cursor:'pointer'}}>VER VIDEO</div></div>
      </div>}

      {tab==='dieta' && <div style={card2}><b>PLANO ALIMENTAR</b>{dietas[user.objetivo]} - {form.peso}kg</div>}

      <div style={{position:'fixed',bottom:'16px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'8px',background:'#fff',padding:'10px',borderRadius:'20px',boxShadow:'0 5px 20px rgba(0,0,0,0.2)'}}>
        <button onClick={()=>setTab('hoje')} style={tabBtn(tab==='hoje')}>HOJE</button>
        <button onClick={()=>setTab('treinos')} style={tabBtn(tab==='treinos')}>TREINOS</button>
        <button onClick={()=>setTab('dieta')} style={tabBtn(tab==='dieta')}>DIETA</button>
      </div>

      {video && <div onClick={()=>setVideo(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{background:'#fff',padding:'20px',borderRadius:'20px'}}>Video: {video} <br/><small>Clique para fechar</small></div></div>}
    </div>
  );
}
