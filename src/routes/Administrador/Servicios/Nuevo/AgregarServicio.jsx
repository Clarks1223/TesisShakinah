import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./AgregarServicio.css";
import { validateCosto } from "../../../../utils/formValidator";
import { fireStore, storage } from "../../../../Auth/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AgregarServicio = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  //obtener los empleados:
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

  const cargarFoto = async (foto) => {
    const archivo = foto[0];
    const refArchivo = ref(storage, `Servicios/${archivo.name}`);
    await uploadBytes(refArchivo, archivo);
    const urlImgDescargar = await getDownloadURL(refArchivo);
    return urlImgDescargar;
  };

  const onSubmit = async (data) => {
    try {
      const titulo = data.titulo;
      const empleado = data.empleado;
      const costo = data.costo;
      const urlImgDescargar = await cargarFoto(data.foto);
      const newServicio = {
        Titulo: titulo,
        Empleado: empleado,
        Costo: costo,
        Foto: urlImgDescargar,
      };

      await addDoc(collection(fireStore, "Servicios"), newServicio);
      alert("Nuevo item agregado");
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
          {errors.titulo?.type === "required" && (
            <p className="error">Debe ingresar su nombre</p>
          )}
          {errors.titulo?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.titulo?.type === "minLength" && (
            <p className="error">Minimo 3 caracteres</p>
          )}
          {errors.titulo?.type === "pattern" && (
            <p className="error">
              No se permiten numeros ni caracteres especiales
            </p>
          )}
          <input
            {...register("titulo", {
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
          {errors.empleado?.type === "required" && (
            <p className="error">Debe seleccionar un empleado de la lista</p>
          )}
          <select
            className="default-select"
            {...register("empleado", { required: true })}
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
          {errors.costo?.type === "required" && (
            <p className="error">Debe ingresar el costo del producto</p>
          )}
          {errors.costo?.type === "maxLength" && (
            <p className="error">Solo se permiten 6 caracteres</p>
          )}
          {errors.costo?.type === "pattern" && (
            <p className="error">El formato es incorrecto</p>
          )}
          {errors.costo?.type === "validate" && (
            <p className="error">El costo debe estar entre $5.00 y $150.00</p>
          )}
          <input
            type="text"
            {...register("costo", {
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

export default AgregarServicio;
