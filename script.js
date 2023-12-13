// Seleccionando los elementos DOM necesarios
const casillaCaptcha = document.querySelector(".captch_box input");
const botonActualizar = document.querySelector(".refresh_button");
const casillaEntradaCaptcha = document.querySelector(".captch_input input");
const mensaje = document.querySelector(".message");
const botonEnviar = document.querySelector(".button");

// Variable para almacenar el captcha generado
let textoCaptcha = null;

// Función para generar el captcha
const generarCaptcha = () => {
  const cadenaAleatoria = Math.random().toString(36).substring(2, 7);
  const arrayCadenaAleatoria = cadenaAleatoria.split("");
  const cadenaModificada = arrayCadenaAleatoria.map((caracter) => (Math.random() > 0.5 ? caracter.toUpperCase() : caracter));
  textoCaptcha = cadenaModificada.join("   ");
  casillaCaptcha.value = textoCaptcha;
  console.log(textoCaptcha);
};

const clickBotonActualizar = () => {
  generarCaptcha();
  casillaEntradaCaptcha.value = "";
  validarEntradaCaptcha();
};

const validarEntradaCaptcha = () => {
  // Alternar la clase de deshabilitar del botón de enviar según el campo de entrada de captcha.
  botonEnviar.classList.toggle("disabled", !casillaEntradaCaptcha.value);

  if (!casillaEntradaCaptcha.value) mensaje.classList.remove("active");
};

// Función para validar el captcha ingresado
const clickBotonEnviar = () => {
  textoCaptcha = textoCaptcha
    .split("")
    .filter((caracter) => caracter !== " ")
    .join("");
  mensaje.classList.add("active");
  // Verificar si el texto del captcha ingresado es correcto o no
  if (casillaEntradaCaptcha.value === textoCaptcha) {
    mensaje.innerText = "El captcha SI ES correcto";
    mensaje.style.color = "#005c13";
  } else {
    mensaje.innerText = "El captcha NO es correcto";
    mensaje.style.color = "#FF2525";
  }
};

// Agregar escuchadores de eventos para el botón de actualizar, la casilla de entrada de captcha y el botón de enviar
botonActualizar.addEventListener("click", clickBotonActualizar);
casillaEntradaCaptcha.addEventListener("keyup", validarEntradaCaptcha);
botonEnviar.addEventListener("click", clickBotonEnviar);

// Generar un captcha cuando la página se carga
generarCaptcha();