import "./AgregarEmpleado.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext";
const AgregarEmpleado = () => {
  const {
    itemID,
    setItemID,
    cargarFotoBase,
    verItem,
    registerUser,
    actualizarDatos,
  } = useAuth();

  const [dbValores, setDBValores] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Telefono: "",
    Cargo: "",
    Contrasenia: "",
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: dbValores,
  });

  const [camposActivos, setCamposACtivos] = useState(false);
  const [idEmpleado, setIDEmpleado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (itemID !== "") {
        try {
          const valores = await verItem("Personal", itemID);
          valores.Contrasenia = "123456A";
          setIDEmpleado(itemID);
          setDBValores(valores);
          // Actualiza el formulario con los valores obtenidos de la base de datos
          Object.keys(valores).forEach((key) => {
            setValue(key, valores[key]);
          });
          setCamposACtivos(!camposActivos);
        } catch (error) {
          console.error("Error al cargar item:", error);
        }
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const urlImgDescargar = await cargarFotoBase(data.Foto, "Empleados");
      data.Foto = urlImgDescargar;
      console.log("Datos en itemID", idEmpleado, "nada");
      if (idEmpleado === "") {
        console.log("Datos para crear usuario: ", idEmpleado);
        registerUser(data, "Personal");
      } else {
        console.log("Actualizar");
        actualizarDatos("Personal", data, idEmpleado);
        setItemID("");
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
            disabled={camposActivos}
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
          {errors.Contrasenia?.type === "required" && (
            <p className="error">La contaseña es obligatoria</p>
          )}
          {errors.Contrasenia?.type === "maxLength" && (
            <p className="error">Solo se permiten 10 caracteres</p>
          )}
          {errors.Contrasenia?.type === "minLength" && (
            <p className="error">
              La contraseña debe tener minimo 6 caracteres
            </p>
          )}
          {errors.Contrasenia?.type === "pattern" && (
            <p className="error">
              La contraseña debe tener almenos un numero y una letra mayuscula
            </p>
          )}
          <input
            type="password"
            {...register("Contrasenia", {
              required: true,
              maxLength: 30,
              minLength: 6,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])/,
            })}
            maxLength={10}
            disabled={camposActivos}
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
