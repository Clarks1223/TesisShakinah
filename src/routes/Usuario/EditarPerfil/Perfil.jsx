import "./Perfil.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const EditarPerfil = () => {
  const { userId, userInformation, cargarFotoBase, actualizarDatos } =
    useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({});

  useEffect(() => {
    //carga los valores en el formulario
    Object.keys(userInformation).forEach((key) => {
      setValue(key, userInformation[key]);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      // Cargar la foto y obtener la URL de descarga, enviar la foto y la direccion de la carpeta donde se almacenara
      const urlImgDescargar = await cargarFotoBase(data.Foto, "Empleados");
      data.Foto = urlImgDescargar;
      // Actualizar solo el campo de la foto en el documento
      actualizarDatos("UsuariosLogin", data, userId);
      alert("Su perfil se ha actualizado correctamente");
      navigate("/Usuario");
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
          <input {...register("Correo", {})} maxLength={30} disabled />
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
          {errors.Foto?.type === "required" && (
            <p className="error">La foto es obligatoria</p>
          )}
          <input
            type="file"
            accept="Image/*"
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

export default EditarPerfil;
