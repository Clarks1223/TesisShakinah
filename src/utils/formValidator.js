const validateCosto = async (value, setValue) => {
  console.log("Valor recibido:", value);

  // Verificar si value es una cadena
  if (typeof value !== "string") {
    return false;
  }
  const costo = parseFloat(value.replace(",", "."));
  if (isNaN(costo) || costo < 5 || costo >= 151) {
    return false;
  }

  // Limitar a dos decimales
  await setValue("costo", parseFloat(costo.toFixed(2)));

  return true;
};

export { validateCosto };
