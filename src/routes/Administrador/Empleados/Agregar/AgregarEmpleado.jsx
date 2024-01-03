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

  const [dbValores, setDBValores] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Telefono: "",
    Cargo: "",
    Password: "",
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: dbValores,
  });

  const getItemInformation = async (id) => {
    try {
      console.log("El id a utilizar es++: ", id);
      const refDatosItem = doc(collection(fireStore, "Personal"), id);
      const objeto = await getDoc(refDatosItem);
      const objetoDatosRecuperados = objeto.exists() ? objeto.data() : {};
      console.log("El objeto recuperado es: ", objetoDatosRecuperados);

      // Set values dynamically using setValue
      Object.keys(objetoDatosRecuperados).forEach((key) => {
        setValue(key, objetoDatosRecuperados[key]);
      });

      setDBValores(objetoDatosRecuperados);

      console.log("datos en el estado:", dbValores);
    } catch (error) {
      console.log("Error al traer los datos");
    }
  };

  useEffect(() => {
    if (itemID === "") {
    } else {
      getItemInformation(itemID);
    }
  }, [itemID, setValue]);

  const cargarFoto = async (Foto) => {
    const archivo = Foto[0];
    const refArchivo = ref(storage, `Empleados/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };

  const onSubmit = async (data) => {
    try {
      const Nombre = data.Nombre;
      const Apellido = data.Apellido;
      const Email = data.Email;
      const Telefono = data.Telefono;
      const Cargo = data.Cargo;
      const Password = data.Password;
      const urlImgDescargar = await cargarFoto(data.Foto);
      const newEmpleado = {
        Nombre: Nombre,
        Apellido: Apellido,
        Email: Email,
        Telefono: Telefono,
        Cargo: Cargo,
        Password: Password,
        Foto: urlImgDescargar,
      };
      if (itemID === "") {
        console.log("va a registrar");
        const infoUsuario = await createUserWithEmailAndPassword(
          auth,
          Email,
          Password
        );
        const docRef = doc(fireStore, `Personal/${infoUsuario.user.uid}`);
        setDoc(docRef, { ...newEmpleado });
      } else {
        console.log("va a modificar");
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
              pattern: /^[A-Za-z]+$/,
              required: true,
            })}
            maxLength={10}
          />
        </div>
        <div>
          <label>Correo</label>
          {errors.Email?.type === "required" && (
            <p className="error">Debe ingresar correo electrónico</p>
          )}
          {errors.Email?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Email?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          <input
            {...register("Email", {
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
          <label>Cargo</label>
          {errors.Cargo?.type === "required" && (
            <p className="error">Debe ingresar el cargo</p>
          )}
          {errors.Cargo?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Cargo?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.Cargo?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("Cargo", {
              required: true,
              maxLength: 15,
              minLength: 3,
              pattern: /^[A-Za-z\s]+$/,
            })}
            maxLength={15}
          />
        </div>
        <div>
          <label>Contraseña</label>
          {errors.Password?.type === "required" && (
            <p className="error">La contaseña es obligatoria</p>
          )}
          {errors.Password?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Password?.type === "minLength" && (
            <p className="error">
              La contraseña debe tener minimo 6 caracteres
            </p>
          )}
          {errors.Password?.type === "pattern" && (
            <p className="error">
              La contraseña debe tener almenos un numero y una letra mayuscula
            </p>
          )}
          <input
            type="password"
            {...register("Password", {
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
            {...register("Foto", {
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
