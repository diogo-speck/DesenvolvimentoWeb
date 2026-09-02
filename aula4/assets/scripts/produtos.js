const precos = {
    hav: 50.00,
    alp: 75.00
};

const atualizarPreco = function (produto) {
   
    let quantidade = parseInt(
     document.getElementById(produto + "_quantidade").value
    );

    let precoTotal = quantidade * precos[produto];

    document.getElementById(produto + "_preco").innerText =
       `R$ ${precoTotal}`;

}

const salvarProdutos = function () {
    const produtos = {        
        havaianas: {
            quantidade: document.getElementById("hav_quantidade").value,
            preco: document.getElementById("hav_preco").innerText
        },
        alpargatas:{
            quantidade: document.getElementById("alp_quantidade").value,
            preco: document.getElementById("alp_preco").innerText
        }
    }
    sessionStorage.setItem("produtos",
        JSON.stringify(produtos)
    );
}