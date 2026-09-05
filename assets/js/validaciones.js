
function obtenerUsuarios() {
  const datos = localStorage.getItem("usuarios");
  return datos ? JSON.parse(datos) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault(); // evita que la página se recargue

  
    document.querySelectorAll(".error-mensaje").forEach(span => span.textContent = "");

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;
    const confirmarContrasenia = document.getElementById("confirmarContrasenia").value;
    const telefono = document.getElementById("telefono").value.trim();
    const generosSeleccionados = document.querySelectorAll('input[name="generos[]"]:checked');

    let esValido = true;
    const usuarios = obtenerUsuarios();

    
    const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{1,100}$/;
    if (!regexNombre.test(nombre)) {
      document.getElementById("errorNombre").textContent = "El nombre solo debe contener letras y espacios (máx. 100 caracteres).";
      esValido = false;
    }


    const regexCorreo = /^[^\s@]+@duoc\.cl$/;
    if (!regexCorreo.test(correo)) {
      document.getElementById("errorCorreo").textContent = "El correo debe tener formato válido y terminar en @duoc.cl.";
      esValido = false;
    } else if (correo.length > 60) {
      document.getElementById("errorCorreo").textContent = "El correo no puede superar los 60 caracteres.";
      esValido = false;
    } else if (usuarios.some(u => u.correo === correo)) {
      document.getElementById("errorCorreo").textContent = "Este correo ya está registrado.";
      esValido = false;
    }

    const regexContrasenia = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.,_-]).{10,}$/;
    if (!regexContrasenia.test(contrasenia)) {
      document.getElementById("errorContrasenia").textContent = "Debe tener 10+ caracteres, mayúscula, minúscula, número y carácter especial.";
      esValido = false;
    }

   
    if (contrasenia !== confirmarContrasenia) {
      document.getElementById("errorConfirmarContrasenia").textContent = "Las contraseñas no coinciden.";
      esValido = false;
    }

    if (telefono !== "" && !/^[0-9+\s-]{7,15}$/.test(telefono)) {
      document.getElementById("errorTelefono").textContent = "Ingresa un teléfono válido.";
      esValido = false;
    }

    if (generosSeleccionados.length === 0) {
      document.getElementById("errorGeneros").textContent = "Selecciona al menos un género.";
      esValido = false;
    }

    if (esValido) {
      usuarios.push({ nombre, correo, contrasenia, telefono });
      guardarUsuarios(usuarios);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "index.html";
    }
  });
}


const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorContrasenia").textContent = "";

    const correo = document.getElementById("correo").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;

    const usuarios = obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(u => u.correo === correo);

    if (!usuarioEncontrado) {
      document.getElementById("errorCorreo").textContent = "No existe una cuenta con ese correo.";
    } else if (usuarioEncontrado.contrasenia !== contrasenia) {
      document.getElementById("errorContrasenia").textContent = "Contraseña incorrecta.";
    } else {
      window.location.href = "home.html";
    }
  });
}
