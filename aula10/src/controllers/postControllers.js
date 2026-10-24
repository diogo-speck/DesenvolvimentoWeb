import { getTodosPosts, criarPost, atualizarPost } from "../models/postModels.js";
import fs from "fs";
import path from "path";

export async function listarPosts(req, res) {
    try {
        const posts = await getTodosPosts();
        res.status(200).json(posts);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha ao criar o post" });
    }
}

export async function uploadImagem(req, res) {
    if (!req.file) {
        return res.status(400).json({ "Erro": "Nenhum arquivo enviado. Certifique-se de usar o campo 'imagem'." });
    }

    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // 1. Define o caminho absoluto da pasta onde as imagens devem ser salvas
        const pastaUploads = path.resolve(process.cwd(), "../aula10/uploads");

        // 2. Garante que a pasta existe
        if (!fs.existsSync(pastaUploads)) {
            fs.mkdirSync(pastaUploads, { recursive: true });
        }

        // 3. Salva no banco para obter o ID
        const postCriado = await criarPost(novoPost);

        // 4. Define o caminho absoluto de destino com o ID gerado
        const destinoFinal = path.join(pastaUploads, `${postCriado.insertedId}.png`);

        // 5. Renomeia/Move o arquivo usando o caminho do Multer e o destino absoluto
        fs.renameSync(req.file.path, destinoFinal);

        // 6. Atualiza o banco com o nome do arquivo final
        const postAtualizado = {
            imgUrl: `${postCriado.insertedId}.png`,
            descricao: req.body.descricao || "",
            alt: req.body.alt || ""
        };

        await atualizarPost(postCriado.insertedId, postAtualizado);

        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro detalhado no upload:", erro);
        res.status(500).json({ "Erro": "Falha no upload da imagem", "Detalhe": erro.message });
    }
}