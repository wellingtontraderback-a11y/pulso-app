export function calcularDieta(peso, altura, objetivo) {
  const alturaM = altura / 100
  const imc = peso / (alturaM * alturaM)
  let calorias = peso * 33

  if (objetivo === 'emagrecer') calorias -= 500
  if (objetivo === 'ganhar') calorias += 400

  return {
    imc: imc.toFixed(1),
    calorias: Math.round(calorias),
    proteina: Math.round(peso * 2.2),
    refeicoes: objetivo === 'emagrecer' 
      ? ["Café: Ovos + aveia", "Almoço: Frango + arroz integral + salada", "Lanche: Whey + banana", "Jantar: Peixe + legumes"]
      : ["Café: Ovos + pão integral + pasta amendoim", "Almoço: Carne + arroz + feijão", "Lanche: Hipercalórico", "Jantar: Frango + batata doce + salada"]
  }
}
