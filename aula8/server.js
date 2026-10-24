import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente apontando para a pasta aula9
dotenv.config({ path: "../aula9/.env" });

import conectarAoBanco from "../aula9/src/config/dbcongig.js";
import routes from "../aula10/src/routes/postRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static(path.dirname(fileURLToPath(import.meta.url))));
app.use(express.static("../aula10/uploads"));

routes(app);

let conexao;

async function getPosts() {
  const db = conexao.db("banco");
  const colecao = db.collection("db");
  return colecao.find().toArray();
}

// Rotas /itens
app.get("/itens", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (erro) {
    console.error("Erro ao buscar itens:", erro);
    res.status(500).json({ erro: "Não foi possível buscar os itens." });
  }
});

async function iniciarServidor() {
  try {
    conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

    app.listen(3000, () => {
      console.log("Servidor UniFlix rodando em http://localhost:3000");
    });
  } catch (erro) {
    console.error("Erro ao iniciar o servidor:", erro);
    process.exit(1);
  }
}

iniciarServidor();