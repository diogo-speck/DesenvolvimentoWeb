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

    let hav_preco = parseFloat(
        produtos.havaianas.preco.replace('R$ ', '')
    );

    let alp_preco = parseFloat(
        produtos.alpargatas.preco.replace('R$ ', '')
    );

    let total = hav_preco + alp_preco;

    document.getElementById('hav_quantidade').innerText =
        produtos.havaianas.quantidade;

    document.getElementById('alp_quantidade').innerText =
        produtos.alpargatas.quantidade;

    document.getElementById('total').innerText =
        `R$ ${total}`;
}

carregarProdutos();