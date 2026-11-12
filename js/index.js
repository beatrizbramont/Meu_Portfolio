/**
 * Comportamentos do site: tema, idioma, navegação, scrollspy e animações.
 */
(function () {
  'use strict';

  const root = document.documentElement;
  const STORAGE_THEME = 'bb-theme';
  const STORAGE_LANG = 'bb-lang';

  let currentLang = 'pt';
  let showAllProjects = false;

  /* ====================== Tema ====================== */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#fbfaf8' : '#0b0d10');
  }

  function initTheme() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(STORAGE_THEME, next);
    });
  }

  /* ====================== Idioma ====================== */
  function translate(lang) {
    const dict = window.I18N[lang];
    if (!dict) return;

    currentLang = lang;
    root.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const value = dict[el.getAttribute('data-i18n')];
      if (value) el.textContent = value;
    });

    // rótulos acessíveis dos botões sem texto visível
    const ariaMap = {
      '#theme-toggle': 'aria.theme',
      '#lang-toggle': 'aria.lang',
      '#nav-toggle': 'aria.menu',
      '#to-top': 'aria.top'
    };

    Object.keys(ariaMap).forEach(function (selector) {
      const el = document.querySelector(selector);
      if (el && dict[ariaMap[selector]]) el.setAttribute('aria-label', dict[ariaMap[selector]]);
    });

    const label = document.querySelector('.lang-current');
    if (label) label.textContent = lang.toUpperCase();

    renderProjects();
  }

  function initLang() {
    const toggle = document.querySelector('#lang-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const next = currentLang === 'pt' ? 'en' : 'pt';
      translate(next);
      localStorage.setItem(STORAGE_LANG, next);
    });
  }

  /* ====================== Projetos ====================== */
  function renderProjects() {
    if (!window.Works) return;

    window.Works.renderFeatured(currentLang);
    window.Works.renderGrid(currentLang, showAllProjects);

    updateLoadMoreLabel();
    observeReveals();
  }

  function updateLoadMoreLabel() {
    const button = document.querySelector('#load-more span');
    if (!button) return;

    const key = showAllProjects ? 'projects.less' : 'projects.more';
    button.textContent = window.I18N[currentLang][key];
  }

  function initLoadMore() {
    const button = document.querySelector('#load-more');
    if (!button || !window.Works) return;

    // sem projetos extras, o botão não faz sentido
    if (window.Works.total <= window.Works.initialCount) {
      button.hidden = true;
      return;
    }

    button.addEventListener('click', function () {
      showAllProjects = !showAllProjects;
      window.Works.renderGrid(currentLang, showAllProjects);
      updateLoadMoreLabel();
      observeReveals();

      button.classList.toggle('is-open', showAllProjects);

      if (!showAllProjects) {
        document.querySelector('#projetos').scrollIntoView({ block: 'start' });
      }
    });
  }

  /* ====================== Animação de entrada ====================== */
  let revealObserver = null;

  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
    }

    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ====================== Navegação mobile ====================== */
  function initNav() {
    const toggle = document.querySelector('#nav-toggle');
    const nav = document.querySelector('#nav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }

  /* ====================== Scroll: header, spy e topo ====================== */
  function initScroll() {
    const header = document.querySelector('#site-header');
    const toTop = document.querySelector('#to-top');
    const links = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));

    const sections = links
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    let ticking = false;

    function update() {
      const y = window.scrollY;

      if (header) header.classList.toggle('scrolled', y > 20);
      if (toTop) toTop.classList.toggle('visible', y > 600);

      // seção ativa: a última cujo topo já passou pelo header
      let activeIndex = -1;
      const offset = 140;

      sections.forEach(function (section, index) {
        if (section.getBoundingClientRect().top <= offset) activeIndex = index;
      });

      // no fim da página, destaca sempre a última
      if (window.innerHeight + y >= document.body.offsetHeight - 2) {
        activeIndex = sections.length - 1;
      }

      links.forEach(function (link, index) {
        link.classList.toggle('active', index === activeIndex);
      });

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    update();
  }

  /* ====================== Boot ====================== */
  function init() {
    // idioma: preferência salva > idioma do navegador > português
    const savedLang = localStorage.getItem(STORAGE_LANG);
    const browserLang = (navigator.language || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
    currentLang = savedLang || browserLang;

    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    initTheme();
    initLang();
    initNav();
    initLoadMore();

    translate(currentLang); // já dispara renderProjects()
    initScroll();
  }

  init();
})();
