function salvarEndereco () {
    let endereco = {
        rua:document.getElementById('rua').value,
        cidade:document.getElementById('cidade').value,
        estado:document.getElementById('estado').value,
        cep: document.getElementById('cep').value
    };
    sessionStorage.setItem('endereco',
        JSON.stringify(endereco)
    );
}
const carregarEndereco = function () {
    let rua = sessionStorage.getItem('rua');
    let cidade = sessionStorage.getItem('cidade');
    let estado = sessionStorage.getItem('estado');
    let cep = sessionStorage.getItem('cep');

    let endereco = `Rua ${rua}
    \nCidade ${cidade}
    \nEstado ${estado}
    \nCEP ${cep}`;
    
    console.log(endereco);
}