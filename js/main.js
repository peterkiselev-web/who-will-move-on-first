/* ============================================
   CYKL-HAUS — Main JavaScript
   ============================================ */

// --- Nav scroll effect ---
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// --- Mobile burger menu ---
const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav__mobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// --- Active nav link ---
const currentPath = window.location.pathname.replace(/\/$/, '');
document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
  const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
  if (linkPath === currentPath || (currentPath === '' && linkPath === '')) {
    link.classList.add('active');
  }
});

// --- Animated counter ---
function animateCount(el, target, duration = 1600) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target, parseInt(e.target.dataset.count));
        countObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));
}

// --- Booking option selector ---
document.querySelectorAll('.booking-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.booking-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});
