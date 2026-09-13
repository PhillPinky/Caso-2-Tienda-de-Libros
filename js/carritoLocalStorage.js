const CARRITO_KEY = 'carritoGourmetHub';

const obtenerCarrito = () => {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
};

const guardarCarrito = (carrito) => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
};

const agregarAlCarrito = (idProducto, cantidad = 1) => {
    const carrito = obtenerCarrito();
    const itemExistente = carrito.find((item) => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ id: idProducto, cantidad });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
};

const actualizarContadorCarrito = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contadorEl = document.getElementById('cart-count');
    if (contadorEl) contadorEl.textContent = totalItems;
};


document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);