import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Express rodando!');
});

app.get('/repos', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/beatrizbramont/repos', {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar repositórios', erro: err });
  }
});

app.get('/languages/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar linguagens do repositório.' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});