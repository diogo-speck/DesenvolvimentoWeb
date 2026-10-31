const API_URL = "http://localhost:3000";

export const getPosts = async () => { try { const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
        throw new Error("Erro ao buscar postagens");
    }

    return await response.json();

} catch (erro) {
    console.error("Erro:", erro);
    throw erro;
}


};

export const upload = async (imagem, descricao) => { try { const form = new FormData();

    form.append("imagem", imagem);
    form.append("descricao", descricao);

    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: form
    });

    if (!response.ok) {
        throw new Error("Erro ao enviar postagem");
    }

    return await response.json();

} catch (erro) {
    console.error("Erro:", erro);
    throw erro;
}


};