import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "./Password.css";

const Password = () => {
  const { user, updatePassword, signOut } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.nuevaContr === data.confirContra) {
      console.log("las contraseñas coinciden");
      console.log("usuario-mail: ", user.mail);
      console.log("usuario-antig: ", data.antiContrasenia);
      console.log("usuario-nueva: ", data.nuevaContr);
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          data.antiContrasenia
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(data.confirContra);

        alert("Contraseña actualizada exitosamente");
        await signOut();
      } catch (error) {
        // Mostrar el mensaje de error en la interfaz de usuario en lugar de usar alert
        console.error(
          "Error al intentar actualizar la contraseña:",
          error.message
        );
      }
    } else {
      // Mostrar mensaje de error en la interfaz de usuario en lugar de usar alert
      console.error("Las contraseñas no coinciden");
    }
  };

  return (
    <div>
      <section className="titulo">
        <h1>Cambiar contraseña</h1>
      </section>
      <form
        className="form-cambiar-contrasenia"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="antigua">
          <label>Contraseña actual</label>
          {errors.antiContrasenia?.type === "required" && (
            <p className="error-message">
              La contraseña antigua es obligatoria
            </p>
          )}
          <input
            type="password"
            placeholder="Contraseña actual"
            {...register("antiContrasenia", {
              required: true,
              minLength: 6,
            })}
            maxLength={10}
            autoComplete="current-password"
          />
        </div>

        <div className="nuevaContrasenia">
          <label>Nueva contraseña</label>
          {errors.nuevaContr?.type === "required" && (
            <p className="error-message">La contraseña es obligatoria</p>
          )}
          {errors.nuevaContr?.type === "maxLength" && (
            <p className="error-message">Solo se permiten 10 caracteres</p>
          )}
          {errors.nuevaContr?.type === "minLength" && (
            <p className="error-message">
              La contraseña debe tener mínimo 6 caracteres
            </p>
          )}
          {errors.nuevaContr?.type === "pattern" && (
            <p className="error-message">
              La contraseña debe tener al menos un número y una letra mayúscula
            </p>
          )}

          <input
            type="password"
            placeholder="Nueva contraseña"
            {...register("nuevaContr", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])/,
            })}
            maxLength={10}
            autoComplete="new-password"
          />
        </div>
        <div className="ConfirmarContrasenia">
          <label>Confirmar contraseña</label>
          {errors.confirContra?.type === "required" && (
            <p className="error-message">La contraseña es obligatoria</p>
          )}
          {errors.confirContra?.type === "maxLength" && (
            <p className="error-message">Solo se permiten 10 caracteres</p>
          )}
          {errors.confirContra?.type === "minLength" && (
            <p className="error-message">
              La contraseña debe tener mínimo 6 caracteres
            </p>
          )}
          {errors.confirContra?.type === "pattern" && (
            <p className="error-message">
              La contraseña debe tener al menos un número y una letra mayúscula
            </p>
          )}
          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirContra", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])/,
            })}
            maxLength={10}
            autoComplete="new-password"
          />
        </div>
        <div className="enviar-contasenia">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default Password;
