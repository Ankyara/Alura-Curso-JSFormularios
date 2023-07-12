// esta función "valida" recibe el input (desde app.js) --> va a verificar el tipo de input a traves de "dataset"
//esta función se manda a llamar cada vez que el usuario sale del "input" que estaba rellenando --> blur

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    

    //el "if" se utiliza para verificar si el validity es true/válido o es false/inválido
    console.log(input.parentElement)
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid"); // si es true el validity --> saca la clase
      input.parentElement.querySelector(".input-message-error").innerHTML = "";  
    
    } else {
      input.parentElement.classList.add("input-container--invalid"); //si es false el validity --> agrega esta clase
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input); //si hay un error en el llenado de los datos => mostrar funcion (mensaje de error)
    }
  }
  
 

  /* -------------------------------------------------------------------------- */
  /*                       Mensajes de Error - Validación                       */
  /* -------------------------------------------------------------------------- */
  
  // $0.validity (consola) => ValidityState => valueMissing / typeMismatch / patternMismatch / customError
  //Array errores
  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  
  
  //Objeto
  const mensajesDeError = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacío",
      patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    estado: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
    },
  };
  
 /* ------------------------ Función Mensaje de error ------------------------ */
  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
  


/* -------------------------------------------------------------------------- */
/*            Validar nacimiento --> verificar si es mayor de edad            */
/* -------------------------------------------------------------------------- */
//clase 02 - Fecha de nacimiento
/*
const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});

--> esta parte no es "buena práctica" --> ver "mejorando el código -> app.js"
*/


const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }

  // input.setCustomValidity('Mensaje customizado de error') --> customizar mensajes de error desde JS

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date (
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}

