function profile() {
  fetch('https://meu-portfolio-bus2.onrender.com/repos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Repositórios do GitHub:", data);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

function rodape() {
  const footer = document.querySelector('footer');
  const experienceSection = document.getElementById('experience');

  if (!footer || !experienceSection) {
    console.error('Footer ou seção experience não encontrados!');
    return;
  }

  function checkFooter() {
    const experienceBottom = experienceSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    const threshold = 80;

    if (experienceBottom <= windowHeight + threshold) {
      footer.style.display = 'block';
    } else {
      footer.style.display = 'none';
    }
  }

  window.addEventListener('scroll', checkFooter);
  window.addEventListener('load', checkFooter);

  checkFooter();
}

function color() {
  document.addEventListener("DOMContentLoaded", () => {
    const worksSection = document.querySelector("#works");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("works-active");
          } else {
            document.body.classList.remove("works-active");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (worksSection) {
      observer.observe(worksSection);
    }
  });
}

function nameProject() {
  const titulo = document.getElementById("titulo-projetos");
  let allowShowTitle = true;

  document.querySelector('a[href="#works"]').addEventListener("click", function (e) {
    e.preventDefault();
    allowShowTitle = false;
    titulo.classList.remove("visible");

    document.querySelector("#works").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      allowShowTitle = true;
    }, 1500);
  });

  window.addEventListener("scroll", function () {
    const posicaoTitulo = titulo.getBoundingClientRect().top;
    const alturaJanela = window.innerHeight;

    if (allowShowTitle && posicaoTitulo < alturaJanela - 100) {
      titulo.classList.add("visible");
    }
  });
}

function scroll() {
  const titulo = document.getElementById("titulo-projetos");
  let allowShowTitle = true;

  document.querySelector('a[href="#works"]').addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector("#works");
    allowShowTitle = false;
    titulo.classList.remove("visible");

    const y = section.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    setTimeout(() => {
      allowShowTitle = true;
    }, 1500);
  });
}

function scrollSobre() {
  const titulo = document.getElementById("titulo-sobre");
  let allowShowTitle = true;

  document.querySelector('a[href="#sobre"]').addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector("#sobre");
    allowShowTitle = false;
    titulo.classList.remove("visible");

    const y = section.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    setTimeout(() => {
      allowShowTitle = true;
    }, 1500);
  });

  window.addEventListener("scroll", function () {
    const posicaoTitulo = titulo.getBoundingClientRect().top;
    const alturaJanela = window.innerHeight;

    if (allowShowTitle && posicaoTitulo < alturaJanela - 100) {
      titulo.classList.add("visible");
    }
  });
}

// Inicialização de funções
nameProject();
color();
rodape();
profile();
scrollSobre();
