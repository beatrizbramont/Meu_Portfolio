import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Express rodando!');
});

app.get('/repos', async (req, res) => {
  res.json([
    {
      name: "ProjetoAPI",
      description: "Teste de deploy atualizado",
      html_url: "https://github.com/beatrizbramont/ProjetoAPI",
      owner: {
        login: "beatrizbramont"
      }
    },
    {
      name: "AtividadeMicros",
      description: "Teste de deploy atualizado",
      html_url: "https://github.com/beatrizbramont/AtividadeMicros",
      owner: {
        login: "beatrizbramont"
      }
    }
  ]);
});

app.get('/languages/:owner/:repo', async (req, res) => {
  res.json({
    JavaScript: 100
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});