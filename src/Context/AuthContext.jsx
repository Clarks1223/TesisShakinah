import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseApp, fireStore,storage } from "../Auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  }, [user, userId]);

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
      setUserInformation(objetoDatosRecuperados);
    } catch (error) {
      console.log("fallo al traer datos del usuario");
    }
  };

  //Logica para cargar la foto
  const cargarFotoBase = async (foto, direccion) => {
    const archivo = foto[0];
    const refArchivo = ref(storage, `${direccion}/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };

  // Función para iniciar sesión
  const signIn = async (email, password) => {
    try {
      // Realizar inicio de sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      userInformation.Rol === "Administrador"
        ? navigate("/Administrador")
        : navigate("/Usuario");
    } catch (error) {
      navigate("/Login");
      if (error.code === "auth/invalid-credential") {
        alert(
          "Credenciales inválidas. Verifique su correo electrónico y contraseña."
        );
      } else {
        alert("Algo ha salido mal: " + error.message); // Mostrar el mensaje de error
      }
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

  //Funcion para retaurar la contraseña del usuario
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email).then((a) => {
      alert("Se ha enviado la restauracion a su correo electronico");
    });
  }

  //Funcion para crear a un usuario
  const registerUser = async (data, autoCompleteInfo) => {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.contrasenia
      );
      await sendEmailVerification(infoUsuario.user);
      const docRef = doc(fireStore, `UsuariosLogin/${infoUsuario.user.uid}`);
      setDoc(docRef, {
        Nombre: data.nombre,
        Apellido: data.apellido,
        Correo: data.email,
        Telefono: data.telefono,
        Rol: autoCompleteInfo.usuario,
        Foto: autoCompleteInfo.foto,
      });
      navigate("/Login");
      alert(
        "Cuenta creada exitosamente, Verifica la cuenta de correo para confirmar tu cuenta"
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "Este correo ya se encuentra registrado. Por favor, utiliza otro correo electrónico."
        );
      } else {
        alert("Error al registrar usuario");
      }
    }
  };
  //Funcion para mostrar el historial de citas agendadas en la base x usuario
  //para mostrar por empleado, envie el id del empleado en userId
  const historialCitas = async (tabla, campoRef, setGuardar) => {
    try {
      const refCitas = collection(fireStore, tabla);
      const q = userId
        ? query(refCitas, where(campoRef, "==", userId))
        : refCitas;
      getDocs(q).then((resp) => {
        setGuardar(
          resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    } catch (error) {
      alert("Algo salio mal! no se han cargado los datos de la base");
    }
  };
  //Funcion para actualizar los datos de una tabla
  //si quiero cambiar un solo dato, se recomienda enviar solo un campo en lugar de data
  const actualizarDatos = async (tablaReferencia, data, id) => {
    const referenciaUsuarioLogin = doc(fireStore, tablaReferencia, id);
    await updateDoc(referenciaUsuarioLogin, data);
  };
  //Funcion para eliminar citas de la base

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
    registerUser,
    resetPassword,
    historialCitas,
    actualizarDatos,
    cargarFotoBase,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
