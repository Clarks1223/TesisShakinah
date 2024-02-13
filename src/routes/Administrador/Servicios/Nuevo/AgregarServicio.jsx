import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./AgregarServicio.css";
import { validateCosto } from "../../../../utils/formValidator";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ActualizarServicio = ({ pantalla }) => {
  const navigate = useNavigate();
  const {
    itemID,
    setItemID,
    personal,
    cargarFotoBase,
    verItem,
    actualizarDatos,
    subirItemBD,
  } = useAuth();
  const [dbValores, setDBValores] = useState({
    Titulo: "",
    Empleado: "",
    Costo: "",
    Foto: "",
  });
  const [idServicio, setIdServicio] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: dbValores,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (itemID !== "") {
        try {
          const valores = await verItem("Servicios", itemID);
          setIdServicio(itemID);
          setDBValores(valores);
          // Actualiza el formulario con los valores obtenidos de la base de datos
          Object.keys(valores).forEach((key) => {
            setValue(key, valores[key]);
          });
        } catch (error) {
          console.error("Error al cargar item:", error);
        }
      }
    };

    fetchData();
  }, []);
  const onSubmit = async (data) => {
    try {
      const { Titulo, Empleado, Costo, Foto } = data;
      const [IdEmpleado, nombreApellido] = Empleado.split("|");
      let newServicio;
      if (typeof data.Foto == "string") {
        console.log("No se ha selecionado un foto para actualizar");
        newServicio = {
          Titulo,
          Empleado: nombreApellido,
          IDEmpleado: IdEmpleado,
          Costo,
        };
      } else {
        console.log("Si se ha seleccionado una foto");
        const urlImgDescargar = await cargarFotoBase(Foto, "Servicios");
        if (urlImgDescargar === null) {
          alert(
            "La imagen excede el límite permitido de 2MB. Por favor seleccione otro archivo."
          );
          return;
        }
        newServicio = {
          Titulo,
          Empleado: nombreApellido,
          IDEmpleado: IdEmpleado,
          Costo,
          Foto: urlImgDescargar,
        };
      }
      if (idServicio === "") {
        subirItemBD("Servicios", newServicio);
      } else {
        actualizarDatos("Servicios", newServicio, idServicio);
        setItemID("");
      }
      navigate("/Administrador/Servicios");
      pantalla(true);
    } catch (error) {
      alert("Algo salió mal");
      console.log(error);
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
                value={`${empleado.id}|${empleado.Nombre} ${empleado.Apellido}`}
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
          {console.log("la foto es obligatoria: ", idServicio ? false : true)}
          <input
            type="file"
            accept="image/*"
            {...register("Foto", {
              required: idServicio ? false : true,
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

export default ActualizarServicio;
