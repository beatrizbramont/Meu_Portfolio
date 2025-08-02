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


// function color() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const worksSection = document.querySelector("#works");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             document.body.classList.add("works-active");
//           } else {
//             document.body.classList.remove("works-active");
//           }
//         });
//       },
//       {
//         threshold: 0.5,
//       }
//     );

//     if (worksSection) {
//       observer.observe(worksSection);
//     }
//   });
// }

// function colorSobre() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const sobreSection = document.querySelector("#sobre");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             document.body.classList.add("sobre-active");
//           } else {
//             document.body.classList.remove("sobre-active");
//           }
//         });
//       },
//       {
//         threshold: 0.5,
//       }
//     );

//     if (sobreSection) {
//       observer.observe(sobreSection);
//     }
//   });
// }

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

// function scrollSobre() {
//   const titulo = document.getElementById("titulo-sobre");
//   let allowShowTitle = true;

//   document.querySelector('a[href="#sobre"]').addEventListener("click", function (e) {
//     e.preventDefault();
//     const section = document.querySelector("#sobre");
//     allowShowTitle = false;
//     titulo.classList.remove("visible");

//     const y = section.getBoundingClientRect().top + window.pageYOffset - 80;

//     window.scrollTo({
//       top: y,
//       behavior: 'smooth'
//     });

//     setTimeout(() => {
//       allowShowTitle = true;
//     }, 1500);
//   });

//   window.addEventListener("scroll", function () {
//     const posicaoTitulo = titulo.getBoundingClientRect().top;
//     const alturaJanela = window.innerHeight;

//     if (allowShowTitle && posicaoTitulo < alturaJanela - 100) {
//       titulo.classList.add("visible");
//     }
//   });
// }

function footer() {
  document.addEventListener("DOMContentLoaded", () => {
    const contatoSection = document.getElementById("contato");
    const footer = contatoSection?.querySelector("footer");
    const linkContato = document.getElementById("link-contato");

    if (!contatoSection || !footer) return;

    function showFooter() {
      footer.classList.add("visible");
    }

    // Mostrar ao scrollar até a section (funciona mesmo se nunca clicou no menu)
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showFooter();
            observer.unobserve(entry.target); // Para evitar múltiplas ativações
          }
        });
      },
      {
        threshold: 0.5, // quando 50% da seção estiver visível
      }
    );

    observer.observe(contatoSection);

    // Mostrar ao clicar no menu
    if (linkContato) {
      linkContato.addEventListener("click", (e) => {
        e.preventDefault();
        contatoSection.scrollIntoView({ behavior: "smooth" });
        // Sem timeout agora — o observer cuida de mostrar o footer
      });
    }
  });
}

// Inicialização de funções
// colorSobre();
footer();
nameProject();
// color();
profile();
// scrollSobre();
