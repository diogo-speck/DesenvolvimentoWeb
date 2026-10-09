import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";
import conectarAoBanco from "../aula9/src/config/dbcongig.js";

dotenv.config({ path: "./aula9/.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let conexao;

// Busca os documentos no MongoDB
async function getPosts() {
  const db = conexao.db("banco");
  const colecao = db.collection("db");

  return colecao.find().toArray();
}

// 1. Buscar todos os itens
app.get("/itens", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (erro) {
    console.error("Erro ao buscar itens:", erro);
    res.status(500).json({ erro: "Não foi possível buscar os itens." });
  }
});

// 2. Buscar item pelo ID
app.get("/itens/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const posts = await getPosts();

    const item = posts.find((i) => i.id === id);

    if (!item) {
      return res.status(404).json({ erro: "Item não encontrado." });
    }

    res.status(200).json(item);
  } catch (erro) {
    console.error("Erro ao buscar item:", erro);
    res.status(500).json({ erro: "Não foi possível buscar o item." });
  }
});

// 3. Buscar itens por ano
app.get("/itens/ano/:ano", async (req, res) => {
  try {
    const ano = Number(req.params.ano);
    const posts = await getPosts();

    const resultado = posts.filter((item) => item.ano === ano);

    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao buscar por ano:", erro);
    res.status(500).json({ erro: "Não foi possível buscar por ano." });
  }
});

// 4. Buscar itens por intervalo de anos
app.get("/itens/intervalo/:inicio/:fim", async (req, res) => {
  try {
    const anoInicio = Number(req.params.inicio);
    const anoFim = Number(req.params.fim);
    const posts = await getPosts();

    const resultado = posts.filter(
      (item) => item.ano >= anoInicio && item.ano <= anoFim
    );

    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao buscar intervalo:", erro);
    res.status(500).json({ erro: "Não foi possível buscar o intervalo." });
  }
});

// 5. Buscar itens por gênero
app.get("/itens/genero/:genero", async (req, res) => {
  try {
    const generoBuscado = req.params.genero.toLowerCase();
    const posts = await getPosts();

    const resultado = posts.filter((item) =>
      item.genero?.toLowerCase().includes(generoBuscado)
    );

    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao buscar por gênero:", erro);
    res.status(500).json({ erro: "Não foi possível buscar por gênero." });
  }
});

// Inicialização do servidor
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