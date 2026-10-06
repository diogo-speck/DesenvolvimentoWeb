import express from "express";

const app = express();
app.use(express.json());

// Permite servir arquivos estáticos caso você use um index.html
app.use(express.static("."));

// Dados de filmes e séries da UniFlix
const uniflix = [
  {
    id: 1,
    titulo: "Inception",
    tipo: "filme",
    ano: 2010,
    genero: "Ficção Científica",
    imagem: "https://picsum.photos/300/400?random=1",
    resumo: "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos."
  },
  {
    id: 2,
    titulo: "Stranger Things",
    tipo: "serie",
    ano: 2016,
    genero: "Terror",
    imagem: "https://picsum.photos/300/400?random=2",
    resumo: "Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos."
  },
  {
    id: 3,
    titulo: "The Matrix",
    tipo: "filme",
    ano: 1999,
    genero: "Ficção Científica",
    imagem: "https://picsum.photos/300/400?random=3",
    resumo: "Um hacker descobre que a realidade em que vive é uma simulação criada por inteligências artificiais."
  },
  {
    id: 4,
    titulo: "Breaking Bad",
    tipo: "serie",
    ano: 2008,
    genero: "Drama",
    imagem: "https://picsum.photos/300/400?random=4",
    resumo: "Um professor de química do ensino médio diagnosticado com câncer decide fabricar metanfetamina."
  },
  {
    id: 5,
    titulo: "Interstellar",
    tipo: "filme",
    ano: 2014,
    genero: "Ficção Científica",
    imagem: "https://picsum.photos/300/400?random=5",
    resumo: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade."
  },
  {
    id: 6,
    titulo: "Arcane",
    tipo: "serie",
    ano: 2021,
    genero: "Animação",
    imagem: "https://picsum.photos/300/400?random=6",
    resumo: "Em meio ao conflito entre duas cidades-gêmeas, duas irmãs lutam em lados opostos de uma guerra entre tecnologias mágicas e convicções incompatíveis."
  },
  {
    id: 7,
    titulo: "Dark",
    tipo: "serie",
    ano: 2017,
    genero: "Mistério",
    imagem: "https://picsum.photos/300/400?random=7",
    resumo: "O desaparecimento de duas crianças em uma cidade alemã expõe os segredos e as conexões ocultas entre quatro famílias através do tempo."
  },
  {
    id: 8,
    titulo: "Mad Max: Estrada da Fúria",
    tipo: "filme",
    ano: 2015,
    genero: "Ação",
    imagem: "https://picsum.photos/300/400?random=8",
    resumo: "Em um mundo pós-apocalíptico, Max se junta a uma imperatriz rebelde para escapar de um tirano e seu exército através do deserto."
  }
];

// 1. Rota principal - Retorna todos os itens do catálogo
app.get("/itens", (req, res) => {
  res.status(200).json(uniflix);
});

// 2. Rota para buscar um item pelo ID
app.get("/itens/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = uniflix.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ erro: "Item não encontrado." });
  }

  res.status(200).json(item);
});

// 3. Rota para buscar itens por um ANO específico
app.get("/itens/ano/:ano", (req, res) => {
  const ano = Number(req.params.ano);
  const resultado = uniflix.filter((item) => item.ano === ano);

  res.status(200).json(resultado);
});

// 4. Rota para buscar itens dentro de um INTERVALO de anos (:inicio até :fim)
app.get("/itens/intervalo/:inicio/:fim", (req, res) => {
  const { inicio, fim } = req.params;
  const anoInicio = Number(inicio);
  const anoFim = Number(fim);

  const resultado = uniflix.filter(
    (item) => item.ano >= anoInicio && item.ano <= anoFim
  );

  res.status(200).json(resultado);
});

// 5. Rota para buscar itens por GÊNERO
app.get("/itens/genero/:genero", (req, res) => {
  const generoBuscado = req.params.genero.toLowerCase();

  const resultado = uniflix.filter((item) =>
    item.genero.toLowerCase().includes(generoBuscado)
  );

  res.status(200).json(resultado);
});

// Inicialização do Servidor
app.listen(3000, () => {
  console.log("Servidor UniFlix rodando em http://localhost:3000");
});