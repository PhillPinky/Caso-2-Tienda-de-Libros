document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productos-container');

  if (!container) return;

  productos.forEach((producto) => {
    const card = document.createElement('div');
    card.classList.add('producto-card');

    card.innerHTML = `
      <a href="detalle-producto.html?id=${producto.id}">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
      </a>
      <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
      <button type="button" class="btn-anadir" data-id="${producto.id}">Añadir al carrito</button>
    `;

    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-anadir')) {
      const id = Number(e.target.dataset.id);
      agregarAlCarrito(id, 1);
      alert('Producto añadido al carrito');
    }
  });
});