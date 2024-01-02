import "./AgregarEmpleado.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { auth, fireStore, storage } from "../../../../Auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../../Context/AuthContext";
const AgregarEmpleado = () => {
  const { itemID, setItemID } = useAuth();
  const initialValues = {
    Nombre: "",
    Apellido: "",
    Email: "",
    Celular: "",
    Cargo: "",
    contrasenia: "",
    Foto: "",
  };

  const [datosFormulario, setDatosFormulario] = useState(initialValues);
  const inputChange = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getLinkById = async (id) => {
    try {
      const docRef = doc(collection(fireStore, "Personal"), id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const linkData = { ...docSnapshot.data() };
        setDatosFormulario(linkData);
        console.log("Dato obtenido:", linkData);
      } else {
        console.log("El documento no existe.");
      }
    } catch (error) {
      console.error("Error al obtener el documento:", error);
    }
  };
  useEffect(() => {
    if (itemID === "") {
      setDatosFormulario(initialValues);
    } else {
      getLinkById(itemID);
    }
  }, [itemID]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const cargarFoto = async (foto) => {
    const archivo = foto[0];
    const refArchivo = ref(storage, `Empleados/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };
  const onSubmit = async (data) => {
    try {
      const nombre = data.nombre;
      const apellido = data.apellido;
      const email = data.email;
      const telefono = data.telefono;
      const cargo = data.cargo;
      const contrasenia = data.contrasenia;
      const urlImgDescargar = await cargarFoto(data.foto);
      const newEmpleado = {
        Nombre: nombre,
        Apellido: apellido,
        Email: email,
        Telefono: telefono,
        Cargo: cargo,
        contrasenia: contrasenia,
        Foto: urlImgDescargar,
      };
      if (itemID === "") {
        const infoUsuario = await createUserWithEmailAndPassword(
          auth,
          email,
          contrasenia
        );
        const docRef = doc(fireStore, `Personal/${infoUsuario.user.uid}`);
        setDoc(docRef, { ...newEmpleado });
        setItemID("");
      } else {
        const referenciaCities = doc(collection(fireStore, "Personal"), itemID);
        await setDoc(referenciaCities, newEmpleado);
        setItemID("");
      }
      alert("Completado");
    } catch (error) {
      console.error(error);
      alert("Algo salió mal");
    }
  };
  return (
    <>
      <form className="form-empleado" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          {errors.nombre?.type === "required" && (
            <p className="error">Debe ingresar su nombre</p>
          )}
          {errors.nombre?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.nombre?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.nombre?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("nombre", {
              required: true,
              maxLength: 10,
              minLength: 3,
              pattern: /^[A-Za-z]+$/,
            })}
            maxLength={10}
          />
        </div>
        <div>
          <label>Apellido</label>
          {errors.apellido?.type === "required" && (
            <p className="error">Debe ingresar su apellido</p>
          )}
          {errors.apellido?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.apellido?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.apellido?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("apellido", {
              maxLength: 10,
              minLength: 3,
              pattern: /^[A-Za-z]+$/,
              required: true,
            })}
            maxLength={10}
            
          />
        </div>
        <div>
          <label>Correo</label>
          {errors.email?.type === "required" && (
            <p className="error">Debe ingresar correo electrónico</p>
          )}
          {errors.email?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          <input
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              maxLength: 30,
            })}
            maxLength={30}
            
          />
        </div>
        <div>
          <label>Celular</label>
          {errors.telefono?.type === "required" && (
            <p className="error">Debe ingresar su numero de telefono</p>
          )}
          {errors.telefono?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.telefono?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          <input
            {...register("telefono", {
              required: true,
              pattern: /^0\d{9}$/,
              maxLength: 10,
            })}
            maxLength={10}
            
          />
        </div>
        <div>
          <label>Cargo</label>
          {errors.nombre?.type === "required" && (
            <p className="error">Debe ingresar el cargo</p>
          )}
          {errors.nombre?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.nombre?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.nombre?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("cargo", {
              required: true,
              maxLength: 15,
              minLength: 3,
              pattern: /^[A-Za-z]+$/,
            })}
            maxLength={15}
            
          />
        </div>
        <div>
          <label>Contraseña</label>
          {errors.contrasenia?.type === "required" && (
            <p className="error">La contaseña es obligatoria</p>
          )}
          {errors.contrasenia?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.contrasenia?.type === "minLength" && (
            <p className="error">
              La contraseña debe tener minimo 6 caracteres
            </p>
          )}
          {errors.contrasenia?.type === "pattern" && (
            <p className="error">
              La contraseña debe tener almenos un numero y una letra mayuscula
            </p>
          )}
          <input
            type="password"
            {...register("contrasenia", {
              required: true,
              maxLength: 30,
              minLength: 6,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])/,
            })}
            maxLength={10}
            
          />
        </div>
        <div>
          <label>Foto</label>
          {errors.foto?.type === "required" && (
            <p className="error">La foto es obligatoria</p>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("foto", {
              required: true,
            })}
          />
        </div>
        <div className="boton-submit">
          <input type="submit" value={"Guardar"} />
        </div>
      </form>
    </>
  );
};
export default AgregarEmpleado;
