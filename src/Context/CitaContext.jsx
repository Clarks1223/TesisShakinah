import React, { createContext, useContext, useState, useEffect } from "react";

// Crea un contexto para la cita
export const CitaContext = createContext();

// Proveedor de contexto para gestionar el estado de la cita
export const CitaProvider = ({ children }) => {
  // Estado para almacenar la información de la cita

  const [cita, setCita] = useState([]);

  const agregarCita = (nuevaCita) => {
    // Copiar el array actual y agregar el nuevo elemento
    setCita((prevCita) => [...prevCita, nuevaCita]);
  };
  const eliminarCita = async (id) => {
    setCita((prevCita) => prevCita.filter((c) => c.id !== id));
  };

  useEffect(() => {
    console.log("Datos de la cita:", cita);
  }, [cita]);

  // Objeto de valor para proporcionar al contexto
  const contextValue = {
    cita,
    agregarCita,
    eliminarCita,
  };

  return (
    <CitaContext.Provider value={contextValue}>{children}</CitaContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de cita
export const useCita = () => {
  return useContext(CitaContext);
};
