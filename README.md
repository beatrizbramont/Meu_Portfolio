# Portfólio — Beatriz Bramont

Portfólio pessoal com minha trajetória, stack e projetos de desenvolvimento.

**No ar:** https://beatrizbramont.github.io/Meu_Portfolio/

---

## Sobre o projeto

Site estático, sem framework e sem build — HTML, CSS e JavaScript puro, publicado
direto no GitHub Pages. A ideia foi manter o código legível e o carregamento leve,
já que o próprio site é um dos projetos do portfólio.

## Funcionalidades

- **Tema claro e escuro** — respeita a preferência do sistema e guarda a escolha no `localStorage`
- **Bilíngue (PT/EN)** — o português é o texto do próprio HTML; `js/i18n.js` guarda só a tradução em inglês
- **Projetos renderizados via JavaScript** — um destaque com métricas e um grid expansível
- **Navegação com scrollspy** — o link da seção atual é marcado conforme a rolagem
- **Animações de entrada** com `IntersectionObserver`, desativadas quando o sistema pede movimento reduzido
- **Responsivo** — layout em grid com menu em drawer no mobile
- **SEO e compartilhamento** — meta description, tags Open Graph e favicon

## Estrutura

```
Meu_Portfolio/
├── index.html           # estrutura e conteúdo
├── assets/
│   └── cv-beatriz-bramont.pdf
├── css/
│   ├── style.css        # tokens de design, layout e componentes globais
│   └── works.css        # timeline e cards de projeto
└── js/
    ├── i18n.js          # tradução em inglês
    ├── works.js         # dados e renderização dos projetos
    └── index.js         # tema, idioma, navegação e scroll
```

## Como mudar um texto

**Em português:** edite direto no `index.html`. Os elementos com `data-i18n`
usam o texto do HTML como original.

**Em inglês:** edite a chave correspondente em `js/i18n.js`, dentro de `en`.
A chave é o valor do `data-i18n` do elemento.

```html
<!-- index.html -->
<h2 data-i18n="about.title">Sobre mim</h2>
```

```js
// js/i18n.js
en: { 'about.title': 'About me' }
```

## Rodando localmente

Por ser estático, basta servir a pasta:

```bash
git clone https://github.com/beatrizbramont/Meu_Portfolio.git
cd Meu_Portfolio
python -m http.server 5500
```

Depois abra `http://localhost:5500`. A extensão Live Server do VS Code também funciona.

> Abrir o `index.html` direto pelo `file://` funciona, mas servir por HTTP evita
> diferenças de comportamento em caminhos relativos.

## Como adicionar um projeto

Edite `js/works.js` e acrescente um objeto ao array `PROJECTS`, com as versões
`pt` e `en` do texto:

```js
{
  year: '2026',
  github: 'https://github.com/beatrizbramont/NomeDoRepo',
  demo: null,                       // ou a URL do projeto no ar
  tech: ['Python', 'Flask'],
  pt: { name: '...', desc: '...', features: ['...'] },
  en: { name: '...', desc: '...', features: ['...'] }
}
```

Os três primeiros aparecem direto; o resto fica atrás do botão "Ver mais".

## Tecnologias

HTML5 · CSS3 (custom properties, grid, flexbox) · JavaScript (ES6+) · GitHub Pages
