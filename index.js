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

function get_selic() {
    let url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados?formato=json';
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

function working_with_selic(){
    prom = get_selic()
    prom.then(function(result){
        // you work the results here
        console.log(result.slice(-2)[0])
    })
}

function test() {
    const solver = window.solver

    model = {
    "optimize": "capacity",
    "opType": "max",
    "constraints": {
        "plane": {"max": 44},
        "person": {"max": 512},
        "cost": {"max": 300000}
    },
    "variables": {
        "brit": {
            "capacity": 20000,
            "plane": 1,
            "person": 8,
            "cost": 5000
        },
        "yank": {
            "capacity": 30000,
            "plane": 1,
            "person": 16,
            "cost": 9000
        }
    },
    };

    results = solver.Solve(model);
    console.log(results);
}
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