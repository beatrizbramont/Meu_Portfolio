import { api } from './config';

const container = document.getElementById('repos-container');
const loadMoreBtn = document.getElementById('load-more');
const allowedRepos = ["ProjetoAPI", "AtividadeMicros", "ReservaMicros", "Spotify-Imersao"];

let allRepos = []; // salva todos para o "ver mais"

fetch('https://api.github.com/users/beatrizbramont/repos', {
  headers: {
    Authorization: `token ${api}`
  }
})

  .then(response => response.json())
  .then(data => {
    // Verifica se o retorno é mesmo um array (protege contra erros da API)
    if (!Array.isArray(data)) {
      throw new Error(`Erro inesperado da API: ${JSON.stringify(data)}`);
    }

    allRepos = data;

    const filteredRepos = data.filter(repo => allowedRepos.includes(repo.name));
    renderRepos(filteredRepos);
  })
  .catch(error => {
    console.error('Erro ao carregar repositórios:', error);
    container.innerHTML = "<p>Erro ao carregar os repositórios. Tente novamente mais tarde.</p>";
  });

// Função para renderizar os repositórios na tela
function renderRepos(repos) {
  repos.forEach(repo => {
    fetch(repo.languages_url, {
      headers: {
        Authorization: `token ${api}`
                }
      })
      .then(langResponse => langResponse.json())
      .then(languages => {
        const languagesList = Object.keys(languages).join(', ') || "N/A";

        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <h2>${repo.name}</h2>
          <p>${repo.description || "Sem descrição"}</p>
          <p><strong>Linguagens:</strong> ${languagesList}</p>
          <a href="${repo.html_url}" target="_blank" class="repo-button">Ver no GitHub</a>
        `;
        container.appendChild(card);
      })
      .catch(error => console.error(`Erro ao carregar linguagens do repositório ${repo.name}:`, error));
  });
}

// Evento do botão "Ver mais"
loadMoreBtn.addEventListener('click', () => {
  const remainingRepos = allRepos.filter(repo => !allowedRepos.includes(repo.name));
  renderRepos(remainingRepos);
  loadMoreBtn.style.display = 'none';
});
