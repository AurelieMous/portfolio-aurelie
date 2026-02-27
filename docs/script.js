/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ── Burger menu (mobile) ───────────────────────────────────
const burger    = document.getElementById('burger');
const navLinks  = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});


// ── Effet typing hero ──────────────────────────────────────
const phrases = [
  'Développeuse Full-Stack',
  'Conceptrice d\'applications web',
  'Curieuse & passionnée de tech',
  'Bientôt disponible — Juillet 2026',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed');

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = currentPhrase.substring(0, charIndex);

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();


// ── Reveal au scroll ───────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Délai en cascade pour les enfants d'une même section
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── Compteurs animés (stats À propos) ─────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// Déclencher les compteurs quand la section est visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsSection);
}



// ── Lien actif dans la navbar ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => navObserver.observe(section));
