import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./AgregarServicio.css";
import { validateCosto } from "../../../../utils/formValidator";
import { fireStore, storage } from "../../../../Auth/firebase";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../../Context/AuthContext";

export const AgregarServicio = () => {
  const { itemID, setItemID } = useAuth();
  const [dbValores, setDBValores] = useState({
    Titulo: "",
    Empleado: "",
    Costo: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: dbValores,
  });
  //obtener los empleados para mostrarlos en el label:
  const [personal, setPersonal] = useState([]);
  const fetchData = async () => {
    const collectionEmpleados = collection(fireStore, "Personal");
    const resp = await getDocs(collectionEmpleados);
    //aqui se unen los elementos que vienen de la base con su id
    setPersonal(
      resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  //Para actualizar los datos
  const getItemInformation = async (id) => {
    try {
      console.log("El id a utilizar es++: ", id);
      const refDatosItem = doc(collection(fireStore, "Servicios"), id);
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

  //Para subir la foto
  const cargarFoto = async (foto) => {
    const archivo = foto[0];
    const refArchivo = ref(storage, `Servicios/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };

  const onSubmit = async (data) => {
    try {
      const Titulo = data.Titulo;
      const Empleado = data.Empleado;
      const Costo = data.Costo;
      const urlImgDescargar = await cargarFoto(data.Foto);
      const newServicio = {
        Titulo: Titulo,
        Empleado: Empleado,
        Costo: Costo,
        Foto: urlImgDescargar,
      };
      if (itemID === "") {
        await addDoc(collection(fireStore, "Servicios"), newServicio);
        alert("Nuevo item agregado");
      } else {
        const referenciaCities = doc(
          collection(fireStore, "Servicios"),
          itemID
        );
        await setDoc(referenciaCities, newServicio);
        setItemID("");
        alert("Item modificado exitosamente");
      }
    } catch (error) {
      console.error(error);
      alert("Algo salió mal");
    }
  };

  return (
    <>
      <form className="form-empleado" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Titulo</label>
          {errors.Titulo?.type === "required" && (
            <p className="error">Debe ingresar su nombre</p>
          )}
          {errors.Titulo?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Titulo?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.Titulo?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("Titulo", {
              required: true,
              maxLength: 20,
              minLength: 3,
              pattern: /^[A-Za-z\s]+$/,
            })}
            maxLength={20}
          />
        </div>

        <div>
          <label>Empleado</label>
          {errors.Empleado?.type === "required" && (
            <p className="error">Debe seleccionar un empleado de la lista</p>
          )}
          <select
            className="default-select"
            {...register("Empleado", { required: true })}
          >
            <option value="" disabled hidden>
              Seleccionar empleado
            </option>
            {personal.map((empleado) => (
              <option
                key={empleado.id}
                value={`${empleado.Nombre} ${empleado.Apellido}`}
              >
                {`${empleado.Nombre} ${empleado.Apellido}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Costo</label>
          {errors.Costo?.type === "required" && (
            <p className="error">Debe ingresar el costo del producto</p>
          )}
          {errors.Costo?.type === "maxLength" && (
            <p className="error">Solo se permiten 6 caracteres</p>
          )}
          {errors.Costo?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          {errors.Costo?.type === "validate" && (
            <p className="error">El costo debe estar entre $5.00 y $150.00</p>
          )}
          <input
            type="text"
            {...register("Costo", {
              required: true,
              maxLength: 6,
              pattern: /^\d{1,3}(\.\d{1,2})?$/,
              validate: (value) => validateCosto(value, setValue),
            })}
            maxLength={6}
          />
        </div>
        <div>
          <label>Foto</label>
          {errors.Foto?.type === "required" && (
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

export default AgregarServicio;
