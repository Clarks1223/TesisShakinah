import { useForm } from "react-hook-form";
import { fireStore, auth } from "../../Auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Registrar.css";
import validationRules from "./ValidacionesRegistrar..js";

export const Registrar = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function registrarUsuario(data) {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.contrasenia
      );
      const docRef = doc(fireStore, `UsuariosLogin/${infoUsuario.user.uid}`);
      setDoc(docRef, {
        Nombre: data.nombre,
        Apellido: data.apellido,
        Correo: data.email,
        Telefono: data.telefono,
        Rol: "usuario",
      });
      alert("Cuenta creada exitosamente");
    } catch (error) {
      alert("Error al registrar usuario");
    }
  }
  const onSubmit = (data) => {
    registrarUsuario(data);
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
              type={field === "contrasenia" ? "password" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              {...register(field, validationRules[field])}
              maxLength={field === "telefono" ? 10 : 30}
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
