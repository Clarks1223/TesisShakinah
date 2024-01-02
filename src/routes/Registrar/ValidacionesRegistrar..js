const validationRules = {
    nombre: {
      required: "Debe ingresar su nombre",
      maxLength: { value: 10, message: "Solo se permiten 10 caracteres" },
      minLength: { value: 3, message: "Mínimo 3 caracteres" },
      pattern: { value: /^[A-Za-z]+$/, message: "No se permiten números ni caracteres especiales" },
    },
    apellido: {
      required: "Debe ingresar su apellido",
      maxLength: { value: 10, message: "Solo se permiten 10 caracteres" },
      minLength: { value: 3, message: "Mínimo 3 caracteres" },
      pattern: { value: /^[A-Za-z]+$/, message: "No se permiten números ni caracteres especiales" },
    },
    email: {
      required: "Debe ingresar correo electrónico",
      maxLength: { value: 30, message: "Solo se permiten 30 caracteres" },
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, message: "El formato es incorrecto" },
    },
    telefono: {
      required: "Debe ingresar su número de teléfono",
      maxLength: { value: 10, message: "Solo se permiten 10 caracteres" },
      pattern: { value: /^0\d{9}$/, message: "El formato es incorrecto" },
    },
    contrasenia: {
      required: "La contraseña es obligatoria",
      maxLength: { value: 30, message: "Solo se permiten 30 caracteres" },
      minLength: { value: 6, message: "La contraseña debe tener mínimo 6 caracteres" },
      pattern: { value: /^(?=.*[0-9])(?=.*[A-Z])/, message: "La contraseña debe tener al menos un número y una letra mayúscula" },
    },
  };
  
  export default validationRules;
  