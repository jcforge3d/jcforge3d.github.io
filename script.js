const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

// Route each product inquiry to the home contact area and pass the selected item.
document.querySelectorAll('[data-product]').forEach(link => {
  const product = link.getAttribute('data-product');
  if (product) link.href = `index.html?producto=${encodeURIComponent(product)}#contacto`;
});

// Reflect product context when someone reaches the home contact section.
const params = new URLSearchParams(window.location.search);
const selectedProduct = params.get('producto');
const contactMessage = document.querySelector('#contacto > p:not(.eyebrow)');
if (selectedProduct && contactMessage) {
  contactMessage.textContent = `Te interesa: ${selectedProduct}. Escríbenos para confirmar disponibilidad y precio.`;
}

// Resin category brand filter. It only filters what is visible on resinas.html.
const filterButtons = [...document.querySelectorAll('[data-brand-filter]')];
const resinProducts = [...document.querySelectorAll('.resin-product[data-brands]')];
if (filterButtons.length && resinProducts.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedBrand = button.dataset.brandFilter;
      filterButtons.forEach(other => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      resinProducts.forEach(product => {
        const brands = (product.dataset.brands || '').split(/\s+/);
        product.hidden = selectedBrand !== 'all' && !brands.includes(selectedBrand);
      });
      const titles = {all:'Explora las resinas',elegoo:'Resinas ELEGOO',anycubic:'Resinas ANYCUBIC',sunlu:'Resinas SUNLU'};
      const heading = document.querySelector('#resin-list-title');
      if (heading) heading.textContent = titles[selectedBrand] || titles.all;
    });
  });
}
