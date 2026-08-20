// Filtro de projetos
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const target = btn.dataset.filter;

    projects.forEach((project) => {
      if (target === 'todos' || project.dataset.cat.includes(target)) {
        project.hidden = false;
      } else {
        project.hidden = true;
      }
    });
  });
});

// Sincroniza o pontinho ativo (e o link do menu) com a seção visível na tela
const scroller = document.getElementById('scroller');
const sections = document.querySelectorAll('.panel');
const dots = document.querySelectorAll('.dotnav__dot');
const navLinks = document.querySelectorAll('.nav__links a');

const setActive = (id) => {
  dots.forEach((dot) => {
    dot.classList.toggle('is-active', dot.getAttribute('href') === `#${id}`);
  });
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

if (scroller && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setActive(entry.target.id);
        }
      });
    },
    { root: scroller, threshold: [0.6] }
  );
  sections.forEach((section) => observer.observe(section));
}

// Menu mobile simples
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'fixed';
    links.style.top = '70px';
    links.style.right = '24px';
    links.style.background = '#0a0a0a';
    links.style.border = '1px solid rgba(243,241,236,0.14)';
    links.style.padding = '20px 28px';
    links.style.gap = '18px';
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      links.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}