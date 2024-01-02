import "./Perfil.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { fireStore, storage } from "../../../Auth/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const EditarPerfil = () => {
  const { userId } = useAuth();
  const [objetoDatos, setObjetosDatos] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Telefono: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, // Added setValue from react-hook-form to set values dynamically
  } = useForm({
    defaultValues: objetoDatos,
  });

  // Pasos para actualizar la informacion del usuario

  // 2. Obtener la informacion del usuario en base al id
  const getUserInformation = async (id) => {
    try {
      console.log("El id a utilizar es: ", id);
      const refDatosUsuario = doc(collection(fireStore, "UsuariosLogin"), id);
      const objeto = await getDoc(refDatosUsuario);
      const objetoDatosRecuperados = objeto.exists() ? objeto.data() : {};
      console.log("El objeto recuperado es: ", objetoDatosRecuperados);

      // Set values dynamically using setValue
      Object.keys(objetoDatosRecuperados).forEach((key) => {
        setValue(key, objetoDatosRecuperados[key]);
      });

      setObjetosDatos(objetoDatosRecuperados);
      console.log("datos en el estado:", objetoDatos);
    } catch (error) {
      console.log("Error al traer los datos");
    }
  };

  useEffect(() => {
    getUserInformation(userId);
  }, [userId, setValue]); // Add setValue as a dependency to useEffect

  //Logica para cargar la foto
  const cargarFoto = async (foto) => {
    const archivo = foto[0];
    const refArchivo = ref(storage, `Empleados/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };

  const onSubmit = async (data) => {
    try {
      const Nombre = data.Nombre;
      const Apellido = data.Apellido;
      const Correo = data.Correo;
      const Telefono = data.Telefono;

      // Cargar la foto y obtener la URL de descarga
      const urlImgDescargar = await cargarFoto(data.foto);

      // Actualizar solo el campo de la foto en el documento
      const referenciaUsuarioLogin = doc(fireStore, "UsuariosLogin", userId);
      await updateDoc(referenciaUsuarioLogin, {
        Nombre: Nombre,
        Apellido: Apellido,
        Correo: Correo,
        Telefono: Telefono,
        Foto: urlImgDescargar,
      });
      

      alert("Su perfil se ha actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Algo salió mal");
    }
  };
  return (
    <>
      <section className="titulo">
        <h1>Editar Perfil de Usuario</h1>
      </section>
      <form className="form-empleado" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          {errors.Nombre?.type === "required" && (
            <p className="error">Debe ingresar su nombre</p>
          )}
          {errors.Nombre?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Nombre?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.Nombre?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("Nombre", {
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
          {errors.Apellido?.type === "required" && (
            <p className="error">Debe ingresar su apellido</p>
          )}
          {errors.Apellido?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Apellido?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.Apellido?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("Apellido", {
              maxLength: 10,
              minLength: 3,
              pattern: /^[A-Za-zñÑ]+$/,
              required: true,
            })}
            maxLength={10}
          />
        </div>
        <div>
          <label>Correo</label>
          {errors.Correo?.type === "required" && (
            <p className="error">Debe ingresar correo electrónico</p>
          )}
          {errors.Correo?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Correo?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          <input
            {...register("Correo", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              maxLength: 30,
            })}
            maxLength={30}
          />
        </div>
        <div>
          <label>Celular</label>
          {errors.Telefono?.type === "required" && (
            <p className="error">Debe ingresar su numero de telefono</p>
          )}
          {errors.Telefono?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Telefono?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          <input
            {...register("Telefono", {
              required: true,
              pattern: /^0\d{9}$/,
              maxLength: 10,
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
            accept="Image/*"
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

export default EditarPerfil;
