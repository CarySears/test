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

// Gallery filtering
const filters = document.querySelectorAll('.filter-btn');
const grid = document.getElementById('grid');
const gridItems = Array.from(document.querySelectorAll('.grid-item'));

const applyFilter = (category) => {
  gridItems.forEach(item => {
    const categories = (item.getAttribute('data-categories') || '').split(',').map(s => s.trim());
    const isMatch = category === 'all' || categories.includes(category);
    item.style.display = isMatch ? '' : 'none';
  });
};

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter || 'all');
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;

const visibleItems = () => gridItems.filter(it => it.style.display !== 'none');

const openLightbox = (index) => {
  const items = visibleItems();
  if (!items.length) return;
  currentIndex = Math.max(0, Math.min(index, items.length - 1));
  const item = items[currentIndex];
  const img = item.querySelector('img');
  lightboxImg.src = img?.src || '';
  lightboxImg.alt = img?.alt || '';
  lightboxCaption.textContent = item.querySelector('figcaption')?.textContent || '';
  lightbox?.classList.add('show');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox?.classList.remove('show');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const stepLightbox = (delta) => {
  const items = visibleItems();
  if (!items.length) return;
  currentIndex = (currentIndex + delta + items.length) % items.length;
  const item = items[currentIndex];
  const img = item.querySelector('img');
  lightboxImg.src = img?.src || '';
  lightboxImg.alt = img?.alt || '';
  lightboxCaption.textContent = item.querySelector('figcaption')?.textContent || '';
};

// Open lightbox on grid item click
if (grid) {
  grid.addEventListener('click', (e) => {
    const figure = e.target.closest('.grid-item');
    if (!figure) return;
    const index = visibleItems().indexOf(figure);
    openLightbox(index);
  });
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
lightboxNext?.addEventListener('click', () => stepLightbox(1));

window.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Init
enableSmoothScroll();
applyFilter('all');