let campoNombre = document.getElementById("inputName");
let campoTelefono = document.getElementById("inputPhone");
let campoEmail = document.getElementById("inputEmail4");


campoNombre.onchange = () => {
  if (campoNombre.value === null || campoNombre.value === "" || !(isNaN(campoNombre.value))) {
    campoNombre.style.color="red";
    campoNombre.value="Ingrese un nombre válido";
  } else {
    campoNombre.style.color="black";
  }
}

campoNombre.oninput = () => {
  if (isNaN(campoNombre.value)) {
      campoNombre.style.color="black";
  }else{
      campoNombre.style.color="red";
  }
}

campoEmail.onchange = () => {
  if(campoEmail.value.length < 8) {
    campoEmail.style.color="red";
    campoEmail.value="Ingrese un Email válido";
  } else {
    campoEmail.style.color="black"
  }
}

let numeroTelefono;
campoTelefono.onchange = () => {
  numeroTelefono = campoTelefono.value.toString()
  if(numeroTelefono.length < 8) {
    Swal.fire('Ingrese un número de teléfono válido') 
  }
}

let formularioContacto = document.getElementById("formularioContacto");
formularioContacto.addEventListener("submit", validarFormulario);
function validarFormulario(e) {
  if (campoNombre.value === "Ingrese un nombre válido" || campoEmail.value === "Ingrese un Email válido") {
    e.preventDefault();
        Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique sus datos',
        timer: 2000
      })
} else {
  Swal.fire({
    icon: 'success',
    title: 'Formulario enviado',
    text: 'Nos pondremos en contacto para coordinar el envío',
    timer: 8000
  })
  }
}
