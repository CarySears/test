// Smooth scroll for anchor links
const enableSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const isSamePageAnchor = targetId.startsWith('#');
      if (!isSamePageAnchor) return; // allow navigation to other pages
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });
};

// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open');
});

// Chooser hero: swap preview image on hover/focus
const serviceLinks = Array.from(document.querySelectorAll('.service-link'));
const heroPreview = document.getElementById('hero-preview');

const setPreview = (url) => {
  if (!heroPreview || !url) return;
  heroPreview.style.backgroundImage = `url("${url}")`;
};

const initChooser = () => {
  if (!serviceLinks.length || !heroPreview) return;
  // Set default from the active item
  const active = serviceLinks.find(a => a.classList.contains('active')) || serviceLinks[0];
  setPreview(active?.dataset.image);

  serviceLinks.forEach(link => {
    const show = () => setPreview(link.dataset.image);
    link.addEventListener('mouseenter', show);
    link.addEventListener('focus', show);
  });
};

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Init
enableSmoothScroll();
initChooser();