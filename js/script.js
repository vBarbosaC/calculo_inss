/**
 * Calcula o valo do desconto do INSS de maneira 
 * progresiva
 * 
 * @param {number} bruto - valor bruto so salário
 * @returns {number} o valor de desconto de inss
 */
function calcularINSS(bruto) {
  let inss = 0
  const tetoInss = 8475.55
  const valorParaCalculo = Math.min(bruto, tetoInss)
  //Array com aas faixas dop INSS (facilita a manutenção)
  const faixasInss = [
    { teto: 1621.00, aliquota: 0.075 },
    { teto: 2902.82, aliquota: 0.090 },
    { teto: 4354.27, aliquota: 0.120 },
    { teto: Infinity, aliquota: 0.140 }
  ]
  let tetoAnterior = 0
  for (const faixa of faixasInss) {
    if (valorParaCalculo > tetoAnterior) {
      //Calcula qual parte do salário encaixa nesta faixa específica
      const baseDaFaixa = Math.min(valorParaCalculo - tetoAnterior, faixa.teto - tetoAnterior)
      inss += baseDaFaixa * faixa.aliquota
      tetoAnterior = faixa.teto
    } else {
      break //já calculou tudo
    }
    //console.log(${faixa.teto} tem alíquota ${faixa.aliquota})
  }
  return inss
}
function calcularSalarioPrincipal(event) {
  event.preventDefault() // evita recarregamento
  const bruto = parseFloat(document.getElementById('salarioBruto').value)
  if (isNaN(bruto) || bruto <= 0) {
    Swal.fire({
      icon: 'warning', //error, info, question, sucess
      title: 'Valor inválido!',
      text: 'Informe um valor válido para o salário'
    })
  }

  //Calculando o INSS
  const inss = calcularINSS(bruto)
  //motrando na UI o valor calculado
  document.getElementById('descInss').value = inss.toLocaleString('pt-br', { style: 'currency', currency: "BRL" })

  Swal.fire({
    icon: 'success', //error, info, question, sucess
    title: 'Calculo efetuado com sucesso',
    showConfirmButton: false,
    timer: 1500
  })

}
