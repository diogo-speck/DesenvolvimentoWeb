const consultarCEP = function () {

   let cep = document.getElementById("cep").value.replace(/\D/g, '');
   if (cep.length !== 8) {
      alert("CEP inválido!");
      return;
   }

   var url = "https://viacep.com.br/ws/" + cep + "/json/"; // ${}

   fetch(url)
      .then(response => response.json())
      .then(data => {

         const cep = data.cep;
         const uf = data.uf;
         const localidade = data.localidade;
         const bairro = data.bairro;
         const logradouro = data.logradouro;

         const resultado = `CEP: ${cep} <br>
    UF: ${uf} <br>
    Cidade: ${localidade} <br>
    Bairro: ${bairro} <br>
    Logradouro: ${logradouro}
    `;

         document.getElementById("resultado").innerHTML = resultado;
      })
      .catch(error => alert(error));
}