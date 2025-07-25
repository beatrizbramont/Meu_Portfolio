function profile(){
  fetch('https://api.github.com/users/beatrizbramont/repos')
  .then(response => response.json())
  .then(data => console.log(data));
}
