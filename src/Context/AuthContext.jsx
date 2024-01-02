import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseApp, fireStore } from "../Auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
} from "firebase/auth";
import { collection } from "firebase/firestore";

const auth = getAuth(fireBaseApp);

// Crea un contexto para el estado de autenticación
export const AuthContext = createContext();

// Proveedor de contexto para gestionar el estado de autenticación
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Usar useNavigate para redirigir
  
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  //almacenar la id del item a actualizar
  const [itemID, setItemID] = useState("");

  //Almacenar el id de autenticacion del usuario
  const [userId, setUserId] = useState(null);

  //ToDo!! almacenar los datos de la tabla usuariosLogin

  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    // Observador de cambios de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // El usuario ha iniciado sesión
        setUser(authUser);
        setUserId(authUser.uid);
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
      }
    });

    // Limpia el observador al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, []);

  //Cargar datos del usuario que inicio sesion
  const datosUsuario = async () => {
    //try {
    //const collectionRef = collection(fireStore, "/UsuariosLogin");
    //} catch (error) {
    //      console.error("Error al obtener datos del usuario:", error.message);
    //  }
  };

  // Función para iniciar sesión
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      throw error;
    }
  };

  //Funcion para cambiar cerrar sesion y redirigir al usuario
  const signOutAndRedirect = async () => {
    try {
      await signOut(auth);
      // Redirigir al usuario a la página de login después de cerrar sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw error;
    }
  };

  //Funcion para Actualizar la contraseña
  const updatePasswordHandler = async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      console.log("Contraseña actualizada exitosamente");
    } catch (error) {
      console.error(
        "Error al intentar actualizar la contraseña:",
        error.message
      );
      throw error;
    }
  };

  // Objeto de valor para proporcionar al contexto
  const contextValue = {
    user,
    userId,
    userInformation,
    itemID,
    setItemID,
    datosUsuario,
    signIn,
    signOut: signOutAndRedirect,
    updatePassword: updatePasswordHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
