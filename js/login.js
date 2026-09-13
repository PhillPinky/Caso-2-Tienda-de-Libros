document.addEventListener('DOMContentLoaded', () => {


    const form = document.getElementById('form-login');

    const validarCorreoLogin = () => {
        const valor = document.getElementById('login-correo').value.trim();
        const regex = /^[a-zA-Z0-9._-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const errorEl = document.getElementById('error-login-correo');

        if (!regex.test(valor) || valor.length > 100) {
        errorEl.textContent = 'Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        return false;
        }
        errorEl.textContent = '';
        return true;
    };

    const validarPasswordLogin = () => {
        const valor = document.getElementById('login-password').value;
        const errorEl = document.getElementById('error-login-password');

        if (valor.length < 4 || valor.length > 10) {
        errorEl.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
        return false;
        }
        errorEl.textContent = '';
        return true;
    };

    document.getElementById('login-correo').addEventListener('blur', validarCorreoLogin);
    document.getElementById('login-password').addEventListener('blur', validarPasswordLogin);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const correoValido = validarCorreoLogin();
        const passwordValido = validarPasswordLogin();

        if (correoValido && passwordValido) {
        alert('Inicio de sesión exitoso (simulado)');
        window.location.href = 'index.html';
        }
    });



});