document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-contacto');

    const validarNombreContacto = () => {
        const valor = document.getElementById('contacto-nombre').value.trim();
        const errorEl = document.getElementById('error-contacto-nombre');

        if (valor.length === 0 || valor.length > 100) {
            errorEl.textContent = 'El nombre es requerido (máx. 100 caracteres).';
            return false;
        }

        errorEl.textContent = '';
        return true;
    };

    const validarCorreoContacto = () => {
        const valor = document.getElementById('contacto-correo').value.trim();
        const errorEl = document.getElementById('error-contacto-correo');
        const regex = /^[a-zA-Z0-9._-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (!regex.test(valor) || valor.length > 100) {
            errorEl.textContent = 'Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            return false;
        }

        errorEl.textContent = '';
        return true;
    };

    const validarComentario = () => {
        const valor = document.getElementById('contacto-comentario').value.trim();
        const errorEl = document.getElementById('error-contacto-comentario');

        if (valor.length === 0 || valor.length > 500) {
        errorEl.textContent = 'El comentario es requerido (máx. 500 caracteres).';
        return false;
        }

        errorEl.textContent = '';
        return true;
    };

    document.getElementById('contacto-nombre').addEventListener('blur', validarNombreContacto);
    document.getElementById('contacto-correo').addEventListener('blur', validarCorreoContacto);
    document.getElementById('contacto-comentario').addEventListener('blur', validarComentario);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreValido = validarNombreContacto();
        const correoValido = validarCorreoContacto();
        const comentarioValido = validarComentario();

        const valido = nombreValido && correoValido && comentarioValido;

        if (valido) {
        alert('¡Mensaje enviado! (simulado)');
        form.reset();
        }
    });

    });