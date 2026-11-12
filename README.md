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
- **Bilíngue (PT/EN)** — todos os textos vêm de um dicionário em `js/i18n.js`, trocados sem recarregar a página
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
    ├── i18n.js          # dicionário PT/EN
    ├── works.js         # dados e renderização dos projetos
    └── index.js         # tema, idioma, navegação e scroll
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
