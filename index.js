var dict = new Object();
// var dict = {}

function getInputs() {
    var test = document.getElementById("principal").value;

    var dict = {
        pv: Number(document.getElementById("principal").value),
        r: Number(document.getElementById("taxaJuros").value),
        n: Number(document.getElementById("periodos").value)
    };

    return dict
}

function putHtml(id, ) {
    return
}

function simpleInterest() {
    tempValues = getInputs();
    document.getElementById("montanteSimples").innerHTML = `O montante a juros simples é ${(tempValues.pv * (1 + tempValues.r * tempValues.n)).toFixed(2)}`;
}

function compoundInterest() {
    tempValues = getInputs();
    document.getElementById("montanteComposto").innerHTML = `O montante a juros compostos é ${(tempValues.pv * Math.pow((1 + tempValues.r), tempValues.n)).toFixed(2)}`;
}

function continuousInterest() {
    tempValues = getInputs();
    document.getElementById("montanteContinuo").innerHTML = `O montante a juros contínuos é ${(tempValues.pv * Math.exp(tempValues.r * tempValues.n)).toFixed(2)}`;
}

function getInputsSeries() {
    var test = document.getElementById("principal").value;

    var dict = {
        R: Number(document.getElementById("deposito").value),
        i: Number(document.getElementById("taxaJurosSeries").value),
        n: Number(document.getElementById("periodosSeries").value)
    };

    return dict
}

function regularSeries() {
    tempValues = getInputsSeries();
    console.log(tempValues)
    calc = tempValues.R*((Math.pow(1 + tempValues.i, tempValues.n) - 1) / tempValues.i)
    document.getElementById("serieUniformePostecipada").innerHTML = `O montante a partir da série uniforme postecipada é ${calc.toFixed(2)}`;
}