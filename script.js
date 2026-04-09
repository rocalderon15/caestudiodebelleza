/* ══════════════════════════════════════════════════════════
CA ESTUDIO DE BELLEZA — script.js
   ══════════════════════════════════════════════════════════ */

/* ── 1. SCROLL REVEAL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


/* ── 2. MENÚ HAMBURGER (mobile) ─────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute(
      'aria-expanded',
      navLinks.classList.contains('open') ? 'true' : 'false'
    );
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}


/* ── 3. NAVBAR: cambio de estilo al hacer scroll ────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(26, 9, 48, 0.98)'
    : 'rgba(61, 26, 110, 0.96)';
});


/* ── 4. FORMULARIO → WHATSAPP ───────────────────────────── */
const btnReservar  = document.getElementById('btn-reservar');
const formReserva  = document.getElementById('form-reserva');
const formFeedback = document.getElementById('form-feedback');

if (btnReservar) {
  btnReservar.addEventListener('click', () => {
    const nombre   = document.getElementById('nombre').value.trim();
    const servicio = document.getElementById('servicio').value;

    if (!nombre || !servicio) {
      formFeedback.textContent = 'Por favor completá tu nombre y elegí un servicio.';
      formFeedback.style.color = '#c0392b';
      return;
    }

    const fecha    = document.getElementById('fecha').value;
    const horario  = document.getElementById('horario').value;
    const mensaje  = document.getElementById('mensaje').value.trim();
    const telefono = '5493517041461';

    const texto = encodeURIComponent(
      `Hola! Soy ${nombre} y quisiera reservar un turno.\n` +
      `Servicio: ${servicio}\n` +
      `Fecha preferida: ${fecha || 'a confirmar'}\n` +
      `Horario: ${horario || 'a confirmar'}\n` +
      (mensaje ? `Notas: ${mensaje}` : '')
    );

    window.open(`https://wa.me/${telefono}?text=${texto}`, '_blank');
    formReserva.reset();
    formFeedback.textContent = '¡Te redirigimos a WhatsApp! 💜';
    formFeedback.style.color = '#5b2d8e';
    setTimeout(() => (formFeedback.textContent = ''), 5000);
  });
}


/* ── 5. SMOOTH SCROLL (refuerzo para Safari) ────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});