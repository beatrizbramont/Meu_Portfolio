import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Express rodando!');
});

app.get('/repos', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.github.com/users/beatrizbramont/repos'
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro ao consultar repositórios no GitHub'
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error('Erro ao buscar repositórios:', err);

    res.status(500).json({
      message: 'Erro ao buscar repositórios'
    });
  }
});

app.get('/languages/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro ao consultar linguagens do repositório'
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Erro ao buscar linguagens:', error);

    res.status(500).json({
      error: 'Erro ao buscar linguagens do repositório.'
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});