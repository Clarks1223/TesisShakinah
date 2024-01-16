import { useForm } from "react-hook-form";
import "./Registrar.css";
import validationRules from "./ValidacionesRegistrar..js";
import { useAuth } from "../../Context/AuthContext.jsx";
export const Registrar = () => {
  const { registerUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const autoCompleteInfo = {
      Usuario: "usuario",
      Foto: "https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/General%2FIcono-Usuario-Default.png?alt=media&token=5d2e75e3-810f-4229-b636-e68ad269d331",
    };
    data.Rol = autoCompleteInfo.Usuario;
    data.Foto = autoCompleteInfo.Foto;
    console.log("datos que se enviaran al sistema", data);
    registerUser(data, "UsuariosLogin");
  };

  return (
    <>
      <header className="registro-container">
        <h1>Registro de usuario</h1>
      </header>
      <form className="formRegistro" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(validationRules).map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {errors[field]?.type === "required" && (
              <p className="alerta">{validationRules[field].required}</p>
            )}
            {errors[field]?.type === "maxLength" && (
              <p className="alerta">
                {validationRules[field].maxLength.message}
              </p>
            )}
            {errors[field]?.type === "minLength" && (
              <p className="alerta">
                {validationRules[field].minLength.message}
              </p>
            )}
            {errors[field]?.type === "pattern" && (
              <p className="alerta">{validationRules[field].pattern.message}</p>
            )}
            <input
              type={field === "Contrasenia" ? "password" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              {...register(field, validationRules[field])}
              maxLength={field === "Telefono" ? 10 : 50}
            />
          </div>
        ))}
        <div className="form-enviar">
          <input type="submit" value="Registrarse" />
        </div>
      </form>
    </>
  );
};

export default Registrar;
