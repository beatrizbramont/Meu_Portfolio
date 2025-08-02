const container = document.getElementById('repos-container');
const loadMoreBtn = document.getElementById('load-more');
const loadingMessage = document.getElementById('loading-message'); // <- nova referência
const allowedRepos = ["ProjetoAPI", "AtividadeMicros", "ReservaMicros", "Spotify-Imersao"];

let allRepos = [];

// Mostrar a mensagem de carregamento
loadingMessage.style.display = 'block';

// Buscar todos os repositórios do back-end
fetch('https://meu-portfolio-bus2.onrender.com/repos')
  .then(response => response.json())
  .then(data => {
    allRepos = data;

    const filteredRepos = data.filter(repo => allowedRepos.includes(repo.name));
    renderRepos(filteredRepos);

    // Ocultar a mensagem após renderizar
    loadingMessage.style.opacity = '0';
    setTimeout(() => loadingMessage.style.display = 'none', 300);
  })
  .catch(error => {
    console.error('Erro ao carregar repositórios:', error);
    container.innerHTML = "<p>Erro ao carregar os repositórios.</p>";

    // Oculta a mensagem mesmo em caso de erro
    loadingMessage.style.opacity = '0';
    setTimeout(() => loadingMessage.style.display = 'none', 300);
  });

// Função para renderizar os repositórios e buscar linguagens em paralelo
function renderRepos(repos) {
  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'repo-card';

    const langId = `lang-${repo.name}`;

    card.innerHTML = `
      <h2>${repo.name}</h2>
      <p>${repo.description || "Sem descrição"}</p>
      <p id="${langId}"><strong>Linguagens:</strong> Carregando...</p>
      <a href="${repo.html_url}" target="_blank" class="repo-button">Ver no GitHub</a>
    `;

    container.appendChild(card);
  });

  const languageFetches = repos.map(repo => {
    return fetch(`https://meu-portfolio-bus2.onrender.com/languages/${repo.owner.login}/${repo.name}`)
      .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
      })
      .then(languages => ({
        name: repo.name,
        languages: Object.keys(languages).join(', ') || "N/A"
      }))
      .catch(error => {
        console.error(`Erro ao carregar linguagens de ${repo.name}:`, error);
        return {
          name: repo.name,
          languages: "Erro ao carregar"
        };
      });
  });

  Promise.all(languageFetches)
    .then(results => {
      results.forEach(result => {
        const langElement = document.getElementById(`lang-${result.name}`);
        if (langElement) {
          langElement.innerHTML = `<strong>Linguagens:</strong> ${result.languages}`;
        }
      });
    });
}

loadMoreBtn.addEventListener('click', () => {
  window.open('https://github.com/beatrizbramont?tab=repositories', '_blank');
});
