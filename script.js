function calcularINSS(bruto){
    let inss = 0
    const tetoInss = 8475.55
    const valorParaCalculo = Math.min(bruto, tetoInss)
    //Array com as faixas do INSS (facilita a amanutencao)
    const faixasInss = [
        {teto: 1621.00, aliquota: 0.075},
        {teto: 2902.82, aliquota: 0.090},
        {teto: 4354.27, aliquota: 0.120},
        {teto: Infinity, aliquota: 0.140}
    ]
    let tetoAnterior = 0

    for ( const faixa of faixasInss){
      //  console.log(`${faixa.teto} tem aliquota ${faixa.aliquota}`)
      if (valorParaCalculo > tetoAnterior){
        const baseDaFaixa = Math.min(valorParaCalculo - tetoAnterior, faixa.teto - tetoAnterior)
        inss += baseDaFaixa * faixa.aliquota
        tetoAnterior = faixa.teto
      } else {break}

    }
    return inss

}
alert(calcularINSS(3000.00))