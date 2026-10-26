import { ObjectId } from "mongodb";
import conectarAoBanco from "../../../aula9/src/config/dbcongig.js";

async function getDb() {
    const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
    return conexao.db("imersao-instabytes");
}

export async function getTodosPosts() {
    const db = await getDb();
    return db.collection("posts").find().toArray();
}

export async function criarPost(novoPost) {
    const db = await getDb();
    return db.collection("posts").insertOne(novoPost);
}

// Função para atualizar o post com tratamento correto do ID
export async function atualizarPost(id, novoPost) {
    const db = await getDb();
    
    // Garante que o id é do tipo ObjectId válido sem reconverter duas vezes
    const objID = typeof id === "string" ? new ObjectId(id) : id;

    return db.collection("posts").updateOne(
        { _id: objID },
        { $set: novoPost }
    );
}