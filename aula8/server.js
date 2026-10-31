import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conectarAoBanco from "../aula9/src/config/dbcongig.js";
import routes from "../aula10/src/routes/postRoutes.js";

dotenv.config({ path: "../aula9/.env" });

const corsOptions = {
    origin: "*",
    methods: ["POST", "PUT", "DELETE", "GET"],
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.dirname(fileURLToPath(import.meta.url))));
app.use(express.static("../aula10/uploads"));
routes(app);

let conexao;

async function iniciarServidor() {
    try {
        conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });

    } catch (erro) {
        console.error("Erro ao iniciar o servidor:", erro);
        process.exit(1);
    }
}

iniciarServidor();