document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');
  const btnAgregarReceta = document.getElementById('btn-agregar-receta');
  const recetasContainer = document.getElementById('recetas-container');
  const template = document.getElementById('template-receta');
  const checkNinguna = document.getElementById('restriccion-ninguna');
  const checksRestriccion = document.querySelectorAll('input[name="restriccion"]');

  checksRestriccion.forEach(check => {
    check.addEventListener('change', () => {
      if (check === checkNinguna && check.checked) {
        checksRestriccion.forEach(c => { if (c !== checkNinguna) c.checked = false; });
      } else if (check !== checkNinguna && check.checked) {
        checkNinguna.checked = false;
      }
    });
  });

  btnAgregarReceta.addEventListener('click', () => {
    const clon = template.content.cloneNode(true);
    const bloque = clon.querySelector('.receta-item');

    bloque.querySelector('.btn-quitar-receta').addEventListener('click', () => {
      bloque.remove();
    });

    recetasContainer.appendChild(clon);
  });

  function validarNombre() {
    const valor = document.getElementById('nombre').value.trim();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,70}$/;
    const errorEl = document.getElementById('error-nombre');
    if (!regex.test(valor)) {
      errorEl.textContent = 'Debe tener entre 3 y 70 caracteres, solo letras y espacios.';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  function validarCorreo() {
    const valor = document.getElementById('correo').value.trim();
    const regex = /^[a-zA-Z0-9._-]+@duoc\.cl$/;
    const errorEl = document.getElementById('error-correo');
    if (!regex.test(valor) || valor.length > 60) {
      errorEl.textContent = 'Debe ser un correo institucional válido (@duoc.cl).';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  function validarPassword() {
    const valor = document.getElementById('password').value;
    const tieneLargo = valor.length >= 10;
    const mayus = (valor.match(/[A-Z]/g) || []).length >= 2;
    const minus = /[a-z]/.test(valor);
    const numero = /[0-9]/.test(valor);
    const simbolo = /[!#$%]/.test(valor);
    const errorEl = document.getElementById('error-password');

    if (!(tieneLargo && mayus && minus && numero && simbolo)) {
      errorEl.textContent = 'Mínimo 10 caracteres, 2 mayúsculas, 1 minúscula, 1 número y 1 simbolo (!#$%).';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  function validarConfirmPassword() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('password-confirm').value;
    const errorEl = document.getElementById('error-password-confirm');
    if (pass !== confirm) {
      errorEl.textContent = 'Las contraseñas no coinciden.';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  function validarRestricciones() {
    const algunaMarcada = Array.from(checksRestriccion).some(c => c.checked);
    const errorEl = document.getElementById('error-restriccion');
    if (!algunaMarcada) {
      errorEl.textContent = 'Selecciona al menos una opción (o "Ninguna").';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  function validarRecetas() {
    const bloques = recetasContainer.querySelectorAll('.receta-item');
    const errorEl = document.getElementById('error-recetas');

    if (bloques.length === 0) {
      errorEl.textContent = 'Agrega al menos una receta de interés.';
      return false;
    }

    let todasValidas = true;
    bloques.forEach(bloque => {
      const categoria = bloque.querySelector('select[name="categoria-receta"]').value;
      const nivelMarcado = bloque.querySelector('input[name="nivel-receta"]:checked');
      if (!categoria || !nivelMarcado) todasValidas = false;
    });

    if (!todasValidas) {
      errorEl.textContent = 'Completa categoría y nivel en todas las recetas agregadas.';
      return false;
    }

    errorEl.textContent = '';
    return true;
  }

  document.getElementById('nombre').addEventListener('blur', validarNombre);
  document.getElementById('correo').addEventListener('blur', validarCorreo);
  document.getElementById('password').addEventListener('blur', validarPassword);
  document.getElementById('password-confirm').addEventListener('blur', validarConfirmPassword);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valido =
      validarNombre() &&
      validarCorreo() &&
      validarPassword() &&
      validarConfirmPassword() &&
      validarRestricciones() &&
      validarRecetas();

    if (valido) {
      alert('¡Registro exitoso! (simulado)');
      form.reset();
      recetasContainer.innerHTML = '';
    }
  });
});