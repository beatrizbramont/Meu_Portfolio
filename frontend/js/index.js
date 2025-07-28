function profile(){
  fetch('https://api.github.com/users/beatrizbramont/repos')
  .then(response => response.json())
  .then(data => console.log(data));
}

function rodape(){
    const footer = document.querySelector('footer');
const experienceSection = document.getElementById('experience');

window.addEventListener('scroll', () => {
  const experienceBottom = experienceSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  // Se a parte inferior da seção experience já passou da parte inferior da janela
  if (experienceBottom <= windowHeight) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
});
}

rodape();
profile();