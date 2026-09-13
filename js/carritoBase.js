document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('carrito-items');
  const totalEl = document.getElementById('carrito-total');

  const renderizarCarrito = () => {
    const carrito = obtenerCarrito();   
    container.innerHTML = '';

    if (carrito.length === 0) {
      container.innerHTML = '<p>Tu carrito está vacío.</p>';
      totalEl.textContent = '$0';
      return;
    }

    let total = 0;

    carrito.forEach((item) => {
      const producto = productos.find((p) => p.id === item.id);
      if (!producto) return;

      const subtotal = producto.precio * item.cantidad;

      total += subtotal;

      const fila = document.createElement('div');
      fila.classList.add('carrito-item');
      fila.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <span>${producto.nombre}</span>
        <span>$${producto.precio.toLocaleString('es-CL')} x ${item.cantidad}</span>
        <span>$${subtotal.toLocaleString('es-CL')}</span>
        <button type="button" class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      `;

      container.appendChild(fila);
    });

    totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
  };

  
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const idAEliminar = Number(e.target.dataset.id);

      const carritoActual = obtenerCarrito();

      const nuevoCarrito = carritoActual.filter((item) => item.id !== idAEliminar);

      guardarCarrito(nuevoCarrito);

      actualizarContadorCarrito();

      renderizarCarrito();
    }
  });

  renderizarCarrito();
});