import React, { createContext, useContext, useState, useEffect } from "react";
import { fireStore } from "../Auth/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// Crea un contexto para la cita
export const CitaContext = createContext();

// Proveedor de contexto para gestionar el estado de la cita
export const CitaProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  // Estado para almacenar la información de la cita
  const [cita, setCita] = useState([]);

  const agregarCita = (nuevaCita) => {
    // Copiar el array actual y agregar el nuevo elemento
    setCita((prevCita) => [...prevCita, nuevaCita]);
  };
  const eliminarCita = async (id) => {
    setCita((prevCita) => prevCita.filter((c) => c.id !== id));
  };
  //agendar agregar cita a la base

  const agendarCitaBase = async (data, idcita) => {
    try {
      await addDoc(collection(fireStore, `Citas`), data);
      alert("Su cita se ha agendado correctamente");
      eliminarCita(idcita);
      navigate("/Usuario/VerCitas");
    } catch (error) {
      alert("Ocurrio un problema");
    }
  };

  useEffect(() => {
    console.log("Datos de la cita:", cita);
  }, [cita]);

  // Objeto de valor para proporcionar al contexto
  const contextValue = {
    cita,
    agregarCita,
    eliminarCita,
    agendarCitaBase,
  };

  return (
    <CitaContext.Provider value={contextValue}>{children}</CitaContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de cita
export const useCita = () => {
  return useContext(CitaContext);
};
