const container = document.querySelector('#works-container');

const projects = [
  {
    name: "Sistema de Restaurante (TableTrack)",
    description: "Sistema completo de gerenciamento de mesas, reservas e comandas para restaurantes, com controle de disponibilidade em tempo real.",
    tech: "Python • Flask • SQLAlchemy • MySQL • API REST",
    features: [
      "Controle de mesas nos estados livre, reservada e ocupada",
      "Sistema de reservas com validação de horários futuros",
      "Distribuição de mesas para grupos maiores que 8 pessoas",
      "Integração entre serviços através de APIs REST",
      "Atualização automática do status das mesas conforme reservas"
    ],
    note: "Deploy em nuvem planejado como melhoria futura, com possibilidade de utilização de serviços como AWS para hospedagem da aplicação, banco de dados e infraestrutura escalável.",
    github: "https://github.com/beatrizbramont/SistemaRestaurante.git",
    demo: "#"
  },
  {
    name: "2ManyTareas",
    description: "Aplicação web de gerenciamento de tarefas com organização de atividades, acompanhamento de progresso e visualização em calendário.",
    tech: "Next.js • React • JavaScript • Tailwind CSS • API REST",
    features: [
      "Criação e gerenciamento de tarefas",
      "Controle de status: A fazer, Em andamento, Aguardando e Concluído",
      "Interface baseada em componentes reutilizáveis",
      "Integração com API para manipulação de dados"
    ],
    github: "https://github.com/beatrizbramont/FullStackProject.git",
    demo: "#"
  },
  {
    name: "Meu Portfólio",
    description: "Portfólio profissional desenvolvido para apresentar minha trajetória, habilidades técnicas e projetos desenvolvidos na área de tecnologia.",
    tech: "HTML • CSS • JavaScript • GitHub Pages",
    features: [
      "Layout responsivo para diferentes dispositivos",
      "Animações e efeitos de navegação com JavaScript",
      "Integração com API do GitHub",
      "Renderização dinâmica de projetos"
    ],
    github: "https://github.com/beatrizbramont/Meu_Portfolio",
    demo: "https://beatrizbramont.github.io/Meu_Portfolio/"
  }
];

function renderProjects() {
  container.innerHTML = "";

  projects.forEach(project => {
    const div = document.createElement("div");
    div.classList.add("repo-card");

    div.innerHTML = `
      <h3>${project.name}</h3>

      <p>${project.description}</p>

      <p class="tech">${project.tech}</p>

      <ul>
        ${project.features.map(f => `<li>${f}</li>`).join("")}
        ${project.note ? `
          <p class="project-note">
            💡 ${project.note}
          </p>
        ` : ""}
      </ul>

      <div class="buttons">
        <a href="${project.github}" target="_blank">
          Código
        </a>

        ${project.demo !== "#" ? `
          <a href="${project.demo}" target="_blank">
            Ver projeto
          </a>
        ` : ""}
      </div>
    `;

    container.appendChild(div);
  });
}

renderProjects();