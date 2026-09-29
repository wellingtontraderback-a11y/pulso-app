"use client"
import { useState } from 'react'
import { treinos } from '@/lib/treinos'
export default function Home() {
  const [ver, setVer] = useState(false)
  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',padding:'20px',fontFamily:'Arial'}}>
      <div style={{maxWidth:'400px',margin:'0 auto'}}>
        <h1>PULSO<span style={{color:'#00ff88'}}>.</span></h1>
        <p style={{color:'#888'}}>Treinos personalizados, dieta por IA</p>
        <div style={{marginTop:'30px',background:'#1a1a1a',padding:'20px',borderRadius:'16px'}}>
          <button onClick={()=>setVer(!ver)} style={{width:'100%',background:'#00ff88',color:'black',border:'none',padding:'15px',borderRadius:'12px',fontWeight:'bold'}}>
            {ver ? 'Esconder' : 'Ver treinos 🔥'}
          </button>
        </div>
        {ver && treinos.map(t=>(
          <div key={t.id} style={{background:'#1a1a1a',padding:'16px',borderRadius:'12px',marginTop:'12px',borderLeft:'4px solid #00ff88'}}>
            <strong>{t.nome}</strong><p style={{fontSize:'12px',color:'#888'}}>{t.duracao} - {t.nivel}</p>
            <ul style={{fontSize:'14px',color:'#ccc'}}>{t.exercicios.map((e,i)=><li key={i}>{e}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}
