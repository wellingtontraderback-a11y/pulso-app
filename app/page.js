"use client"
import { useState } from 'react'
import { treinos } from '@/lib/treinos'
import { calcularDieta } from '@/lib/dieta'

export default function Home() {
  const [ver, setVer] = useState(false)
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [objetivo, setObjetivo] = useState('ganhar')
  const [resultado, setResultado] = useState(null)

  const gerar = () => {
    if(!peso || !altura) return alert('Preencha peso e altura')
    setResultado(calcularDieta(Number(peso), Number(altura), objetivo))
  }

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',padding:'20px',fontFamily:'Arial'}}>
      <div style={{maxWidth:'400px',margin:'0 auto'}}>
        <h1>PULSO<span style={{color:'#00ff88'}}>.</span></h1>
        <p style={{color:'#888'}}>Treinos + dieta por IA</p>

        <div style={{marginTop:'20px',background:'#1a1a1a',padding:'20px',borderRadius:'16px'}}>
          <h3>Calculadora de Dieta IA 🤖</h3>
          <input placeholder="Peso kg" value={peso} onChange={e=>setPeso(e.target.value)} style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',background:'#222',border:'1px solid #333',color:'white'}}/>
          <input placeholder="Altura cm" value={altura} onChange={e=>setAltura(e.target.value)} style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',background:'#222',border:'1px solid #333',color:'white'}}/>
          <select value={objetivo} onChange={e=>setObjetivo(e.target.value)} style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',background:'#222',color:'white'}}>
            <option value="ganhar">Ganhar massa</option>
            <option value="emagrecer">Emagrecer</option>
          </select>
          <button onClick={gerar} style={{width:'100%',background:'#00ff88',color:'black',border:'none',padding:'14px',borderRadius:'12px',fontWeight:'bold',marginTop:'12px'}}>Gerar minha dieta</button>
          {resultado && (
            <div style={{marginTop:'15px',background:'#222',padding:'12px',borderRadius:'10px'}}>
              <p>🔥 Calorias: {resultado.calorias}</p>
              <p>💪 Proteína: {resultado.proteina}g</p>
              <p>📊 IMC: {resultado.imc}</p>
              <ul>{resultado.refeicoes.map((r,i)=><li key={i}>{r}</li>)}</ul>
            </div>
          )}
        </div>

        <div style={{marginTop:'20px',background:'#1a1a1a',padding:'20px',borderRadius:'16px'}}>
          <button onClick={()=>setVer(!ver)} style={{width:'100%',background:'white',color:'black',border:'none',padding:'14px',borderRadius:'12px',fontWeight:'bold'}}>
            {ver ? 'Esconder' : 'Ver treinos 🔥'}
          </button>
        </div>

        {ver && treinos.map(t=>(
          <div key={t.id} style={{background:'#1a1a1a',padding:'16px',borderRadius:'12px',marginTop:'12px',borderLeft:'4px solid #00ff88'}}>
            <strong>{t.nome}</strong>
            <ul>{t.exercicios.map((e,i)=><li key={i}>{e}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}
