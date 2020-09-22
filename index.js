var dict = new Object();
// var dict = {}

function getInputs() {
    var test = document.getElementById("principal").value;

    var dict = {
        pv: document.getElementById("principal").value,
        r: document.getElementById("taxaJuros").value,
        n: document.getElementById("periodos").value
    };

    return dict
}

function test() {
    console.log("testestestes");
}

function simpleInterest() {
    tempValues = getInputs();
    document.getElementById("montanteSimples").innerHTML = `O montante é ${Math.round(tempValues.pv * (1 + tempValues.r * tempValues.n))}`;
    console.log(`O montante é ${Math.round(tempValues.pv * (1 + tempValues.r * tempValues.n))}`)
}