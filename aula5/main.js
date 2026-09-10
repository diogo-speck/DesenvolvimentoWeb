let dados = JSON.parse(localStorage.getItem("dados")) || { // substitui o loadData
tipo: null,
dataehora: null,
local: null,
envolvidos: null,
objetos: null,
relato: null,
aceita: false
};

function saveData(elemento, atributo){
dados[atributo] = elemento;

localStorage.setItem("dados", JSON.stringify(dados));

console.log(dados[atributo] + ": " + elemento);
}

/*
function loadData() {
    let dadosSalvos = localStorage.getItem("dados");

    if (dadosSalvos !== null) {
        dados = JSON.parse(dadosSalvos);
    }
    
    console.log("Objeto carregado:", dados);
}
*/

function showData(){
    //let atributos = Object.keys(dados);
    let resultado = document.getElementById("final");

    for (let atributo in dados){ // invés de for (let i=0; i<atributos.length; i++)
        //let atributo = atributos[i];

        // invés de console.log(atributo + ": " + dados[atributo]);
        resultado.innerHTML += atributo + ": " + dados[atributo] + "<br>";
    }
}