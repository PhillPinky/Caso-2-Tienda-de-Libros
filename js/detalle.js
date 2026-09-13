document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = Number(params.get('id'));
  const producto = productos.find((p) => p.id === idProducto);
 
  if (!producto) {
    document.getElementById('detalle-container').innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }
 
  document.getElementById('detalle-nombre').textContent = producto.nombre;
  document.getElementById('detalle-precio').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
  document.getElementById('detalle-imagen').src = producto.imagen;
  document.getElementById('detalle-imagen').alt = producto.nombre;
  document.getElementById('detalle-descripcion').textContent = producto.descripcion;
 
  document.getElementById('btn-anadir-detalle').addEventListener('click', () => {
    const cantidad = Number(document.getElementById('input-cantidad').value) || 1;
    agregarAlCarrito(producto.id, cantidad);
    alert('Producto añadido al carrito');
  });
});
 