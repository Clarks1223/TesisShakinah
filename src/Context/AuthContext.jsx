import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseApp, fireStore, storage } from "../Auth/firebase";
import { redirect, useNavigate } from "react-router-dom";
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

  //almacenar la id del item a actualizar
  const [itemID, setItemID] = useState("");

  //Almacenar solo el id del usuario que inicio sesion.
  const [userId, setUserId] = useState("");
  //Almacenar los nombres y apllidos e ids de empleados para mostrarlos siempre que sea necesario
  const [personal, setPersonal] = useState([]);

  //ToDo!! almacenar los datos de la tabla usuariosLogin
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    // Observador de cambios de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
        } else {
          // El usuario ha cerrado sesión
        }
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        // Manejar el error según tus necesidades
      }
      //nombresEmpleados debe estar dento del if para mayor seguridad, esto garantiza que solo se muestren datos
      //cuando este utentificado
      nombresEmpleados();
    });

    // Limpia el observador al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, [auth.currentUser]);
  //Cargar datos del usuario que inicio sesion sin id
  const getDatosUsuario = async (id) => {
    try {
      const refDatosUsuario = doc(collection(fireStore, "UsuariosLogin"), id);
      const objeto = await getDoc(refDatosUsuario);
      const datosUsuario = objeto.exists() ? objeto.data() : null;
      await setUserInformation(datosUsuario);
      redirect(datosUsuario.Rol);
    } catch (error) {
      console.log("fallo al traer datos del usuario: ", error);
    }
  };

  // Función para iniciar sesión
  const signIn = async (email, password, au) => {
    try {
      await signInWithEmailAndPassword(au, email, password).then(
        (usuarioFirebase) => {
          setUserId(usuarioFirebase.user.uid);
          getDatosUsuario(usuarioFirebase.user.uid);
        }
      );
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
  const signOutAndRedirect = async (aut) => {
    try {
      await signOut(aut);
      navigate("/");
      console.log("Ha salido del sistema");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw error;
    }
  };
  const redirect = async (rol) => {
    if (userInformation && rol === "Administrador") {
      console.log("A iniciado sesion como administrador");
      navigate("/Administrador");
    } else if (userInformation && rol === "usuario") {
      console.log("A iniciado sesion como cliente");
      navigate("/Usuario");
    } else {
      console.log("Rredirigiendo a login");
      alert("No se ha encontrado su usuario");
      // Redirige al usuario a la página de inicio de sesión si no tiene permisos o no hay información de usuario
      navigate("/Login");
    }
  };

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

  //Logica para cargar la foto
  const cargarFotoBase = async (foto, direccion) => {
    const archivo = foto[0];
    // Verificar el tamaño de la imagen
    const maxSizeInBytes = 2 * 1024 * 1024; // Tamaño máximo permitido: 2 MB
    if (archivo.size > maxSizeInBytes) {
      console.log("El tamaño de la imagen excede el límite permitido.");
      // Puedes mostrar un mensaje de error al usuario si es necesario
      return null;
    }
    const refArchivo = ref(storage, `${direccion}/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
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
    try {
      return sendPasswordResetEmail(auth, email).then(() => {
        alert("Se ha enviado la restauración a su correo electrónico");
        console.log("Verifique su correo para restablcer su contraseña");
      });
    } catch (error) {
      alert("ocurrio un eror, no ha sido posible cambiar su contraseña");
      throw error;
    }
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
      await sendEmailVerification(infoUsuario.user);
      const docRef = doc(
        fireStore,
        `${tablaReferencia}/${infoUsuario.user.uid}`
      );
      setDoc(docRef, dataSinContrasenia);
      alert("Cuenta creada exitosamente, Verifica tu cuenta de correo");
      navigate("/Login");
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

  //Funcion para enviar el correo
  async function sendCustomEmail(body, email) {
    try {
      const emailContent = {
        to: email,
        message: {
          subject: "Entrega de credenciales de acceso a la app movil",
          text: body,
          html: `<p>${body}</p>`,
        },
      };
      const docRef = collection(fireStore, `EmailEnviado`);
      await addDoc(docRef, emailContent);
    } catch (error) {
      console.log(error);
    }
  }

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
      if (tablaReferencia === "Personal") {
        nombresEmpleados();
        console.log("Se ha actualizado correctamente");
      }
      if (tablaReferencia === "UsuariosLogin") {
        const refDatosUsuario = doc(collection(fireStore, "UsuariosLogin"), id);
        const objeto = await getDoc(refDatosUsuario);
        const datosUsuario = objeto.exists() ? objeto.data() : null;
        setUserInformation(datosUsuario);
      }
      if (tablaReferencia === "Servicios") {
        console.log("Se ha agregado un servicio correctamente");
      }
      alert("Actualizado correctamente");
    } catch (error) {
      alert("Ha ocurrido un problema");
    }
  };
  //Funcion para eliminar elementos de la base
  const eliminar = async (tabla, id) => {
    try {
      await deleteDoc(doc(fireStore, tabla, id));
      if (tabla === "Personal") {
        nombresEmpleados();
        console.log("Empleado eliminado");
      }
      if (tabla === "Servicios") {
        console.log("Servicio eliminado correctamente");
      }
      alert("Se ha eliminado correctamente");
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
      if (tablaReferencia === "Personal") {
        nombresEmpleados();
        console.log("Se a creado un nuevo usuario");
      }
      if (tablaReferencia === "Servicios") {
        console.log("Se a creado un nuevo servicio");
      }
      alert("Agregado correctamente");
    } catch (error) {
      console.log(error);
    }
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
    sendCustomEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
