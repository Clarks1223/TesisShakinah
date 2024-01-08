import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseApp, fireStore, storage } from "../Auth/firebase";
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
  deleteDoc,
  addDoc,
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
  let contador = 0;
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
    console.log(
      "cuatas veces se ejecuta el codigo que trae los empleados: ",
      (contador = contador + 1)
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
      console.log("fallo al traer datos del usuario: ", error);
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
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setUserId(auth.currentUser.uid);
        console.log(
          "Datos almacenados de usuarioInformacion:",
          userInformation
        );
        userInformation.Rol === "Administrador"
          ? navigate("/Administrador")
          : navigate("/Usuario");
      }
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
      setUserId(null);
      setUserInformation(null);
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
  const registerUser = async (data, tablaReferencia) => {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        data.Email,
        data.Contrasenia
      );
      const { Contrasenia, ...dataSinContrasenia } = data;
      if (tablaReferencia === "UsuariosLogin") {
        await sendEmailVerification(infoUsuario.user);
      } else {
        console.log("Nuevo empleado agregado con exito");
      }
      const docRef = doc(
        fireStore,
        `${tablaReferencia}/${infoUsuario.user.uid}`
      );
      setDoc(docRef, dataSinContrasenia);
      navigate("/Login");
      alert("Cuenta creada exitosamente, Verifica tu cuenta de correo");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "Este correo ya se encuentra registrado. Por favor, utiliza otro correo electrónico."
        );
      } else {
        alert("Error al registrar usuario: ", error);
      }
    }
  };

  //Funcion para mostrar el historial de citas agendadas en la base x usuario
  //para mostrar por empleado, envie el id del empleado en userId
  const historialCitas = async (tabla, campoRef, setGuardar, id) => {
    try {
      const refCitas = collection(fireStore, tabla);
      const q = id ? query(refCitas, where(campoRef, "==", id)) : refCitas;
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
    try {
      const referencia = doc(fireStore, tablaReferencia, id);
      await updateDoc(referencia, data);
      alert("Item Actualizado correctamente");
    } catch (error) {
      alert("Ha ocurrido un problema");
    }
  };
  //Funcion para eliminar elementos de la base
  const eliminar = async (tabla, id) => {
    try {
      await deleteDoc(doc(fireStore, tabla, id));
      alert("Se ha eliminado el item correctamente");
    } catch (error) {
      alert("A ocurrido un problema");
    }
  };
  //Mostar todos los items de cualquier unido con su id
  const verItems = async (tablaReferencia, guardar) => {
    const itemsRef = collection(fireStore, tablaReferencia);
    const resp = await getDocs(itemsRef);
    guardar(
      resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  //Mostar solo un items de cualquier tabla unido con su id
  const verItem = async (tablaReferencia, id) => {
    try {
      const referenciaItem = doc(collection(fireStore, tablaReferencia), id);
      const item = await getDoc(referenciaItem);
      const objeto = item.exists() ? item.data() : {};
      return objeto;
    } catch (error) {
      console.error("Error al obtener el item:", error);
    }
  };

  //Subir datos a una tabla
  const subirItemBD = async (tablaReferencia, data) => {
    try {
      await addDoc(collection(fireStore, tablaReferencia), data);
      alert("Nuevo item agregado");
    } catch (error) {}
  };

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
    verItem,
    verItems,
    subirItemBD,
    actualizarDatos,
    eliminar,
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
