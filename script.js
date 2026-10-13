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
document.querySelectorAll('.product-cta[data-product]').forEach(link => {
  const product = link.getAttribute('data-product');
  if (product) link.href = `index.html?producto=${encodeURIComponent(product)}#contacto`;
  // Include selected volume and color when the specific ELEGOO resin card has options.
  link.addEventListener('click', () => {
    const card = link.closest('.resin-product');
    if (!card) return;
    const volume = card.querySelector('[data-product-volume]')?.value;
    const color = card.querySelector('[data-product-color]')?.value;
    if (!volume && !color) return;
    const details = [product, volume ? `presentación ${volume}` : '', color ? `color ${color}` : '']
      .filter(Boolean).join(' — ');
    link.href = `index.html?producto=${encodeURIComponent(details)}#contacto`;
  });
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
      const titles = {all:'Las 9 referencias seleccionadas',elegoo:'Resinas ELEGOO',sunlu:'Resinas SUNLU',sirayatech:'Resinas Siraya Tech',phrozen:'Resinas Phrozen'};
      const heading = document.querySelector('#resin-list-title');
      if (heading) heading.textContent = titles[selectedBrand] || titles.all;
    });
  });
}

// Galerías genéricas de las nuevas referencias vinculadas a Amazon.
document.querySelectorAll('.amazon-resin-featured').forEach((card) => {
  const main = card.querySelector('.amazon-resin-main-image');
  const fallback = card.querySelector('.resin-image-fallback');
  const thumbs = [...card.querySelectorAll('.amazon-gallery-thumb')];
  if (!main || !thumbs.length) return;
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('img');
      const src = img?.currentSrc || img?.src;
      if (!src) return;
      main.src = src;
      main.alt = img?.alt || card.dataset.title || 'Imagen de resina';
      main.hidden = false;
      if (fallback) fallback.hidden = true;
      thumbs.forEach((item) => item.classList.toggle('is-active', item === thumb));
    });
  });
  main.addEventListener('load', () => {
    main.hidden = false;
    if (fallback) fallback.hidden = true;
  });
  main.addEventListener('error', () => {
    main.hidden = true;
    if (fallback) fallback.hidden = false;
  });
  if (main.complete && main.naturalWidth > 0 && fallback) fallback.hidden = true;
});
