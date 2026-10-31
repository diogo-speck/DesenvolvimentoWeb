import { getTodosPosts, criarPost, atualizarPost } from "../models/postModels.js"; import fs from "fs"; import path from "path";

export async function listarPosts(req, res) { try { const posts = await getTodosPosts(); res.status(200).json(posts); } catch (erro) { console.error(erro.message); res.status(500).json({ Erro: "Falha na requisição" }); } }

export async function postarNovoPost(req, res) { const novoPost = req.body;

try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
} catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha ao criar o post" });
}


}

export async function uploadImagem(req, res) { if (!req.file) { return res.status(400).json({ Erro: "Nenhum arquivo enviado." }); }

const descricao = req.body.descricao;

if (!descricao) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({
        Erro: "A descrição é obrigatória."
    });
}

try {
    const pastaUploads = path.resolve(process.cwd(), "../aula10/uploads");

    if (!fs.existsSync(pastaUploads)) {
        fs.mkdirSync(pastaUploads, { recursive: true });
    }

    const extensao = path.extname(req.file.originalname);

    const novoPost = {
        descricao: descricao,
        imgUrl: "",
        alt: descricao
    };

    const postCriado = await criarPost(novoPost);

    const nomeImagem = `${postCriado.insertedId}${extensao}`;

    const destinoFinal = path.join(pastaUploads, nomeImagem);

    fs.renameSync(req.file.path, destinoFinal);

    const postAtualizado = {
        imgUrl: nomeImagem,
        descricao: descricao,
        alt: descricao
    };

    await atualizarPost(postCriado.insertedId, postAtualizado);

    res.status(201).json({
        mensagem: "Postagem salva com sucesso!",
        postagem: postAtualizado
    });

} catch (erro) {
    console.error("Erro detalhado no upload:", erro);

    res.status(500).json({
        Erro: "Falha no upload da imagem",
        Detalhe: erro.message
    });
}


}