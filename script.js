// Smooth scroll for anchor links
const enableSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav on click
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

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Init
enableSmoothScroll();