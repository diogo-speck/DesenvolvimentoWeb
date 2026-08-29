const carregarEndereco = function () {
    let endereco = JSON.parse(
        sessionStorage.getItem('endereco')
    );
    document.getElementById('rua').innerText = endereco.rua;
    document.getElementById('cidade').innerText = endereco.cidade;
    document.getElementById('estado').innerText = endereco.estado;
    document.getElementById('cep').innerText = endereco.cep;
}

carregarEndereco();

const carregarProdutos = function () {

    let produtos = JSON.parse(
        sessionStorage.getItem('produtos')
    );

    document.getElementById('hav_quantidade').innerText = produtos.havaianas;
    document.getElementById('alp_quantidade').innerText = produtos.alpargatas;
    document.getElementById('total').innerText = produtos.total;
}

carregarProdutos();