function CalcularSalario() {
    var salariobruto = parseFloat(document.getElementById("salariobruto").value);
    var dependente = parseFloat(document.getElementById("Dependente").value);
    const valorpordependente = 189.59;
    const limiteIsencao = 2112.00;
  
    console.log("Salário Bruto:", salariobruto); 
    console.log("Dependente:", dependente); 
  
    const faixasINSS = [
        { limiteSuperior: 1320.00, taxa: 0.075 },
        { limiteSuperior: 2571.60, taxa: 0.09 },
        { limiteSuperior: 3856.40, taxa: 0.12 },
        { limiteSuperior: 7507.06, taxa: 0.14 },
        { limiteSuperior: Infinity, taxa: 0.14 }
    ];
  
    const salarioDescontadoInss = calcularINSS(salariobruto, faixasINSS);
  
    console.log("Salário Descontado INSS:", salarioDescontadoInss); 
  
    const faixasImposto = [
        { limiteSuperior: 2826.65, taxa: 0.075 },
        { limiteSuperior: 3751.05, taxa: 0.15 },
        { limiteSuperior: 4664.68, taxa: 0.225 },
        { limiteSuperior: Infinity, taxa: 0.275 }
    ];
  
    const salarioBaseIR = salariobruto - salarioDescontadoInss - (dependente * valorpordependente);
  
    console.log("Salário Base IR:", salarioBaseIR); 
  
    const impostoRenda = calcularImpostoRendaMensal(salarioBaseIR, faixasImposto);
  
    console.log("Imposto de Renda:", impostoRenda); 
  
    var salarioLiquido = salariobruto - salarioDescontadoInss - impostoRenda;
  
    var resultado = document.getElementById("resultado");
    resultado.textContent = `Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`;
}
  

function calcularINSS(salariobruto, faixasINSS) {
  let valorINSS = 0;

  for (const faixa of faixasINSS) {
      if (salariobruto <= faixa.limiteSuperior) {
          valorINSS += salariobruto * faixa.taxa;
          break;
      } else {
          valorINSS += faixa.limiteSuperior * faixa.taxa;
          salariobruto -= faixa.limiteSuperior;
      }
  }

  return valorINSS;
}

function calcularImpostoRendaMensal(salarioBaseIR, faixasImposto) {
  let impostoRenda = 0;

  for (const faixa of faixasImposto) {
      if (salarioBaseIR <= faixa.limiteSuperior) {
          impostoRenda += salarioBaseIR * faixa.taxa;
          break;
      } else {
          impostoRenda += (salarioBaseIR - faixa.limiteSuperior) * faixa.taxa;
          salarioBaseIR -= (salarioBaseIR - faixa.limiteSuperior);
      }
  }

  return impostoRenda;
}

function calcularFerias() {
    var salariobruto = parseFloat(document.getElementById("salariobruto").value);
    var diasferias = parseInt(document.getElementById("diasferias").value);
    
    var valorFerias = salariobruto + (salariobruto / 30) * diasferias;

    document.getElementById("resultadoFerias").textContent = "R$ " + valorFerias.toFixed(2);
}

function CalcularRescisao() {
    var salariobruto = parseFloat(document.getElementById("salariobruto").value);
    var ferias = parseFloat(document.getElementById("ferias").value) || 0;
    var diasTrabalhados = parseInt(document.getElementById("diasTrabalhados").value) || 0;

    const valorDiaTrabalhado = salariobruto / 30; // Considerando um mês de 30 dias
    const valorRescisao = (valorDiaTrabalhado * diasTrabalhados) + ferias;

    var resultadoRescisao = document.getElementById("resultadoRescisao");
    resultadoRescisao.textContent = `Valor da Rescisão: R$ ${valorRescisao.toFixed(2)}`;
}

