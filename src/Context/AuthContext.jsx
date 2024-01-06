import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseApp, fireStore } from "../Auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

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

  //Almacenar solo el id del usuario que inicio sesion.
  const [userId, setUserId] = useState(null);

  //Almacenar los nombres y apllidos e ids de empleados para mostrarlos siempre que sea necesario
  const [personal, setPersonal] = useState([]);

  //ToDo!! almacenar los datos de la tabla usuariosLogin
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    // Observador de cambios de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // cuando el usuario ha iniciado sesion se cargar todo lo de aqui.
        setUser(authUser);
        setUserId(authUser.uid);
        //para almacenar los datos del usuario que ha iniciado sesion
        getDatosUsuario();
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
      }
      //nombresEmpleados debe estar dento del if para mayor seguridad, esto garantiza que solo se muestren datos
      //cuando este utentificado
      nombresEmpleados();
    });

    // Limpia el observador al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, [user]);

  //Logica de traer los nombres de los empleados una sola vez y reutilizarlos siempre en la aplicacion
  const nombresEmpleados = async () => {
    const collectionEmpleados = collection(fireStore, "Personal");
    const resp = await getDocs(collectionEmpleados);
    //aqui se unen los elementos que vienen de la base con su id
    setPersonal(
      resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  //Cargar datos del usuario que inicio sesion sin id
  const getDatosUsuario = async () => {
    try {
      const refDatosUsuario = doc(
        collection(fireStore, "UsuariosLogin"),
        userId
      );
      const objeto = await getDoc(refDatosUsuario);
      const objetoDatosRecuperados = objeto.exists() ? objeto.data() : {};
      console.log("El objeto recuperado essss: ", objetoDatosRecuperados);
      setUserInformation(objetoDatosRecuperados);
    } catch (error) {
      console.log("Algo salio mal ++");
    }
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
      setUser(null);
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

  //Funcion para actualizar la contraseña del usuario
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email).then((a) => {
      alert("Se ha enviado la restauracion a su correo electronico");
    });
  }

  // Objeto de valor para proporcionar al contexto
  const contextValue = {
    userId,
    userInformation,
    itemID,
    personal,
    setItemID,
    getDatosUsuario,
    signIn,
    signOut: signOutAndRedirect,
    updatePassword: updatePasswordHandler,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
