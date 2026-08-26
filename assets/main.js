const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Home: embaralha qual foto de fundo aparece primeiro a cada visita
const heroBgSlides = [...document.querySelectorAll('.hero-bg__slide')];
if (heroBgSlides.length > 1) {
  const cycleSeconds = 180;
  const step = cycleSeconds / heroBgSlides.length;
  const delays = heroBgSlides.map((_, i) => -i * step);
  for (let i = delays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [delays[i], delays[j]] = [delays[j], delays[i]];
  }
  heroBgSlides.forEach((slide, i) => {
    slide.style.animationDelay = `${delays[i]}s`;
  });
}

const toggle = document.querySelector('.nav__toggle');
const navigation = document.querySelector('.nav__links');

const setMenuState = (open) => {
  if (!toggle || !navigation) return;
  navigation.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};

if (toggle && navigation) {
  toggle.addEventListener('click', () => setMenuState(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) setMenuState(false);
  });
}

const filterButtons = [...document.querySelectorAll('.filter-button')];
const materialCards = [...document.querySelectorAll('.material-card')];
const materialCount = document.getElementById('material-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const wasActive = button.classList.contains('active');
    let filter = null;

    filterButtons.forEach((item) => {
      const active = !wasActive && item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
      if (active) filter = item.dataset.filter;
    });

    let visibleCount = 0;
    materialCards.forEach((card) => {
      const visible = filter === null || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (materialCount) materialCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'material · disponível em breve' : 'materiais · disponíveis em breve'}`;
  });
});

const themeTriggers = [...document.querySelectorAll('[data-theme]')];
const themeLayers = [...document.querySelectorAll('.theme-layer')];

themeTriggers.forEach((card) => {
  const toggleTheme = () => {
    const target = document.getElementById(`theme-${card.dataset.theme}`);
    const wasActive = target && target.classList.contains('is-active');
    themeLayers.forEach((layer) => layer.classList.remove('is-active'));
    themeTriggers.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    if (!wasActive && target) {
      target.classList.add('is-active');
      card.setAttribute('aria-pressed', 'true');
    }
  };

  card.addEventListener('click', toggleTheme);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) document.querySelectorAll('video[autoplay]').forEach((video) => video.pause());
const revealElements = [...document.querySelectorAll('.reveal')];

if ('IntersectionObserver' in window && !reduceMotion) {
  revealElements.forEach((element) => element.classList.add('reveal--pending'));
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
}

const internalLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
const sections = internalLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      internalLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${current.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// Matrix rain for IA page
const matrixCanvas = document.querySelector('.theme-layer--matrix canvas');
if (matrixCanvas) {
  const ctx = matrixCanvas.getContext('2d');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  const fontSize = 14;
  const frameInterval = 1000 / 24;
  let columns = 0;
  let drops = [];
  let lastFrame = 0;
  let running = false;
  let frameId = null;

  const resize = () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(1);
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(3, 8, 6, 0.15)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = '#45f28b';
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  const animate = (timestamp) => {
    if (!running) return;
    if (timestamp - lastFrame >= frameInterval) {
      draw();
      lastFrame = timestamp;
    }
    frameId = requestAnimationFrame(animate);
  };

  const startMatrix = () => {
    if (running) return;
    running = true;
    frameId = requestAnimationFrame(animate);
  };

  const stopMatrix = () => {
    running = false;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = null;
  };

  window.addEventListener('resize', resize);
  resize();
  // respeita quem pede menos animação: desenha um quadro estático e não anima
  if (reduceMotion) draw();
  else startMatrix();

  // IA (precisão): ao rolar até os cards, a chuva matrix para e a foto de fundo aparece
  const matrixLayer = document.querySelector('.theme-layer--matrix');
  const precisaoCards = document.querySelector('.material-grid');
  if (matrixLayer && precisaoCards) {
    let cardsReached = null;

    const syncMatrix = () => {
      // os cards "chegaram" quando o topo deles entra nos 80% inferiores da janela
      const reached = precisaoCards.getBoundingClientRect().top < window.innerHeight * 0.8;
      if (reached === cardsReached) return;
      cardsReached = reached;
      matrixLayer.classList.toggle('is-active', !reached);
      if (reached) stopMatrix();
      else if (!reduceMotion) startMatrix();
    };

    window.addEventListener('scroll', syncMatrix, { passive: true });
    window.addEventListener('resize', syncMatrix);
    syncMatrix();
  }
}
