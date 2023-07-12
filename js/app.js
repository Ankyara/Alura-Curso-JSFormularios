import { valida } from "./validaciones.js";

/* --------------------------- "mejorando el código" -------------------------- */
// para seleccionar todos los elementos del tipo "input"
const inputs = document.querySelectorAll("input"); 



// a cada uno de esos "input" seleccionados, les va a agrega rel addEventListener
inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});

//blur --> fuera de foco