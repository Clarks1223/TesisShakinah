import { useForm } from "react-hook-form";
import "./Registrar.css";
import { fireStore, auth } from "../../Auth/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import validationRules from "./ValidacionesRegistrar..js";
import { useNavigate } from "react-router-dom";

export const Registrar = () => {
  const navigate = useNavigate();

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

      //para enviar un correo de verificacion
      await sendEmailVerification(infoUsuario.user);

      const docRef = doc(fireStore, `UsuariosLogin/${infoUsuario.user.uid}`);

      setDoc(docRef, {
        Nombre: data.nombre,
        Apellido: data.apellido,
        Correo: data.email,
        Telefono: data.telefono,
        Rol: "usuario",
        Foto: "https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/General%2FIcono-Usuario-Default.png?alt=media&token=5d2e75e3-810f-4229-b636-e68ad269d331",
      });
      navigate("/Login");
      alert(
        "Cuenta creada exitosamente, Verifica la cuenta de correo para confirmar tu cuenta"
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "Este correo ya se encuentra registrado. Por favor, utiliza otro correo electrónico."
        );
      } else {
        alert("Error al registrar usuario");
      }
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
