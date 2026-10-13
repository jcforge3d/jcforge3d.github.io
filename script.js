const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

// Product inquiries route back to the home contact area with the selected item.
document.querySelectorAll('[data-product]').forEach(link => {
  const product = link.getAttribute('data-product');
  if (product) link.href = `index.html?producto=${encodeURIComponent(product)}#contacto`;
});

// Show the selected item when a visitor arrives from the shop catalog.
const params = new URLSearchParams(window.location.search);
const selectedProduct = params.get('producto');
const contactMessage = document.querySelector('#contacto > p:not(.eyebrow)');
if (selectedProduct && contactMessage) {
  contactMessage.textContent = `Te interesa: ${selectedProduct}. Escríbenos para confirmar disponibilidad y precio.`;
}
