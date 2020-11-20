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

// A funcionalidade de fato


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function get_cdi() {
    let url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados?formato=json';
    var prom;
    
    prom = fetch(url)
    .then(res => res.json())
    .then((out) => {
        // a = out;
    // console.log('Checkout this JSON! ', out);
    return out
})
.catch(err => { throw err });
return prom
};

async function cdi(){
    prom = get_cdi();
    let x = await prom.then(result => result);
    
    // pega os últimos doze meses
    x = x.slice(-13, -1);
    console.log(x);
    
    return x
}

function getInputsImob() {
    var dict = {
        valor: Number(document.getElementById("valorImovel").value),
        entrada: Number(document.getElementById("entradaImovel").value),
        n: Number(document.getElementById("nImovel").value),
        i_banco: Number(document.getElementById("bancoJurosImovel").value),
        dorms: Number(document.getElementById("nDormitorios").value),
        ret: Number(document.getElementById("retorno").value)
    };

    console.log(dict["dorms"])
    return dict
}

function limpar() {
    document.getElementById("valorTotal").innerHTML = "";
    document.getElementById("finImovel").innerHTML = "";
    document.getElementById("tempo").innerHTML = "";
    document.getElementById("valorImovel").value = "";
    document.getElementById("entradaImovel").value = "";
    document.getElementById("nImovel").value = "";
    document.getElementById("bancoJurosImovel").value = "";
    document.getElementById("nDormitorios").value = "";
    document.getElementById("retorno").value = "";
}

function finImob(tempo_compra) {
    inpts = getInputsImob();
    let dict = {}

    // coisas q ainda vai mudar
    tx_juros_mensal = inpts["i_banco"] / 12
    alupreco = {
        2: 0.0042,
        3: 0.0037,
        4: 0.0032
    }
    igpm = 0.03
    renda_fixa = inpts["ret"]
    

    dict["aluguel"] = inpts["valor"] * alupreco[inpts["dorms"]];
    dict["banco"] = inpts["valor"] - inpts["valor"] * inpts["entrada"];
    dict["parcela"] = dict["banco"] * (tx_juros_mensal / (1 - Math.pow((1 + tx_juros_mensal), (-inpts["n"]*12))));
    dict["valorTotalFin"] = dict["parcela"] * inpts["n"] * 12;
    dict["finMinusAlug"] = dict["parcela"] - dict["aluguel"];

    dict["roi"] = (dict["finMinusAlug"]*12) * (Math.pow((1 + renda_fixa), (tempo_compra - 1)) - 1) / renda_fixa;

    dict["valorFinalImov"] = inpts["valor"] * Math.pow((1 + igpm), tempo_compra);
    console.log(dict)

    return dict
}


function opt() {
    let larger;
    let temp_dict;
    let temp = finImob(1);
    let initial = temp["roi"] > temp["valorFinalImov"]

    for (i = 1; i < 100; i++) {
        console.log("TEMPO", i)
        temp_dict = finImob(i);
        larger = temp_dict["roi"] > temp_dict["valorFinalImov"]
        console.log(larger)
        if (larger != initial) {
            for (j = i - 1; j < i; j = j + 0.01){
            //  console.log("NEW TEMPO", j)
            //  console.log(larger)
             temp_dict = finImob(j)
             larger = temp_dict["roi"] > temp_dict["valorFinalImov"]
             if (larger != initial){
                //  console.log("TEMPO FINAL", j)
                 diferenca = getInputsImob()["n"] - j;
                 document.getElementById("valorTotal").innerHTML = `O valor total do financiamento será <span class=inline style="color: #B084CC">R$ ${temp_dict["valorFinalImov"].toFixed(2)}</span>`;
                 document.getElementById("finImovel").innerHTML = `Em aproximadamente <span class=inline style="color: #B084CC">${j.toFixed(2)}</span> anos será possível viver no imóvel nele de aluguel por todo esse tempo`;
                 document.getElementById("tempo").innerHTML = `Diferença entre o tempo de financiar e o tempo para comprar à vista, após morar de aluguel e investir no CDI (em anos): <span class=inline style="color: #B084CC">${(getInputsImob()["n"] - j).toFixed(2)}</span>`;
                 // cor antiga: #665687
                 return temp_dict
             }
            }
        } else {
            document.getElementById("valorTotal").innerHTML = "Os valores que você colocou iriam demorar mais de 100 anos para serem financiados"
               }
    }
}


// function opt() {
//     optimjs = window.optimjs
//     optimjs.minimize_Powell()
// }

// x^2 + 10x (min x=-5, y=-25)

// function getJSONP(url, success) {

//     var ud = '_' + +new Date,
//         script = document.createElement('script'),
//         head = document.getElementsByTagName('head')[0] 
//                || document.documentElement;

//     window[ud] = function(data) {
//         head.removeChild(script);
//         success && success(data);
//     };

//     script.src = url.replace('callback=?', 'callback=' + ud);
//     head.appendChild(script);

// }