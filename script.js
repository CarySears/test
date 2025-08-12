// Smooth scroll for anchor links
const enableSmoothScroll = () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const isSamePageAnchor = targetId.startsWith('#');
      if (!isSamePageAnchor) return; // allow navigation to other pages
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      if (prefersReduced) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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

const setPreview = (url, label) => {
  if (!heroPreview || !url) return;
  heroPreview.style.backgroundImage = `url("${url}")`;
  if (label) heroPreview.setAttribute('aria-label', label);
};

const initChooser = () => {
  if (!serviceLinks.length || !heroPreview) return;
  // Set default from the active item
  const active = serviceLinks.find(a => a.classList.contains('active')) || serviceLinks[0];
  setPreview(active?.dataset.image, active?.querySelector('.service-name')?.textContent ?? undefined);

  serviceLinks.forEach(link => {
    const show = () => setPreview(link.dataset.image, link.querySelector('.service-name')?.textContent ?? undefined);
    link.addEventListener('mouseenter', show);
    link.addEventListener('focus', show);
  });
};

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Simple analytics hooks (no-op if GA not present)
const track = (eventName, params = {}) => {
  try {
    window.gtag?.('event', eventName, params);
  } catch {}
};

['book-call-hero', 'book-call-sticky', 'contact-submit'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => track('cta_click', { id }));
});

// UTM propagation to Calendly
const propagateUtmToCalendly = () => {
  const calendly = document.querySelector('.calendly-inline-widget');
  if (!calendly) return;
  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) return;
  const base = calendly.getAttribute('data-url') || '';
  if (!base) return;
  const url = new URL(base);
  params.forEach((v, k) => url.searchParams.set(k, v));
  calendly.setAttribute('data-url', url.toString());
};

// Init
enableSmoothScroll();
initChooser();
propagateUtmToCalendly();