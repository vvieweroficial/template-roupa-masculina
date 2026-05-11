// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section .container > *, .card, .about__image, .about__text')
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Form submit
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  if (!name || !email) {
    msg.textContent = 'Por favor, preencha nome e e-mail.';
    msg.style.color = '#e57373';
    return;
  }
  msg.style.color = '';
  msg.textContent = `Obrigado, ${name.split(' ')[0]}. Entraremos em contato em até 24h.`;
  form.reset();
});

// Smooth anchor offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});
