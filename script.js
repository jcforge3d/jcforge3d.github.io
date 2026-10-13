const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// When the WhatsApp number is confirmed, replace 57XXXXXXXXXX in index.html.
// Product buttons jump to contact and prepare the request context for easier ordering.
document.querySelectorAll('[data-product]').forEach(link => {
  link.addEventListener('click', () => {
    const product = link.getAttribute('data-product');
    const message = document.querySelector('#contacto > p:not(.eyebrow)');
    if (message && product) {
      message.textContent = `Te interesa: ${product}. Escríbenos para confirmar disponibilidad, medidas, acabado y precio.`;
    }
  });
});
