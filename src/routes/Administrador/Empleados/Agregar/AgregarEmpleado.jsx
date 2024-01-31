import "./AgregarEmpleado.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const AgregarEmpleado = ({ pantalla }) => {
  const navigate = useNavigate();
  const {
    itemID,
    setItemID,
    verItem,
    registerUser,
    actualizarDatos,
    subirItemBD,
    sendCustomEmail,
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
      const autoCompleteInfo = {
        Contrasenia: "STemporal01",
        Foto: "https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/General%2FIcono-Usuario-Default.png?alt=media&token=5d2e75e3-810f-4229-b636-e68ad269d331",
        dias_no_laborables: [6],
        enlace:
          "https://drive.google.com/file/d/1LpOtXyiiUO4MLl8eb4PPAZ6YnJQMJhMX/view?usp=sharing",
      };
      if (idEmpleado === "") {
        const datanuevo = { ...data };
        datanuevo.Contrasenia = autoCompleteInfo.Contrasenia;
        datanuevo.Foto = autoCompleteInfo.Foto;
        datanuevo.dias_no_laborables = autoCompleteInfo.dias_no_laborables;
        const body = `Sus datos de acceso son:\nUsuario: ${data.Email}\n, Contaseña: ${autoCompleteInfo.Contrasenia}\n, Enlce de descarga de la app movil: ${autoCompleteInfo.enlace}`;
        const asunto = "Entrega de credenciales de acceso a la aplicacion movil";
        datanuevo.contrasenaCambiada = false;
        await subirItemBD("Personal", datanuevo);
        sendCustomEmail(body, data.Email, asunto);
      } else {
        await actualizarDatos("Personal", data, idEmpleado);
        setItemID("");
      }
      pantalla(true);
      navigate("/Administrador/Personal");
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

        <div className="boton-submit">
          <input type="submit" value={"Guardar"} />
        </div>
      </form>
    </>
  );
};
export default AgregarEmpleado;
