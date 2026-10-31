import { upload } from "./fetchApi.js";

const addFormEvent = () => {

    const form = document.getElementById("form-post");
    if(form){
        form.addEventListener("submit", async (e) =>{
            e.preventDefault()
            
            const descricao = document.getElementById(
                "descricao"
            ).value;
            const imagem = document.getElementById(
                "imagem"
            ).files[0];
            
            if(!imagem || !descricao){
                alert("preencha todos os campos!");
                return;
            }
            try{
                const response = await upload(imagem,descricao);
                alert("Postagem salva com sucesso!");
                return response;
            }catch(error){
                console.error("Erro ao enviar a postagem");
                alert("Falha ao postar");
            }
        });
    }
}

document.addEventListener(
    "DOMContentLoaded", addFormEvent
);