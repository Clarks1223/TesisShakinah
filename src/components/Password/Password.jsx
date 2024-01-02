import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "./Password.css";

const Password = () => {
  const { user, updatePassword, signOut } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (data.nuevaContr === data.confirContra) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          data.antiguaContrasenia
        );
        await reauthenticateWithCredential(user, credential);

        await updatePassword(data.nuevaContr);
        alert("Contraseña actualizada exitosamente");
        setError(null);
        await signOut();
      } catch (error) {
        alert("Error al intentar actualizar la contraseña:", error.message);
        setError(
          "Error al validar la contraseña actual. Asegúrate de ingresar la contraseña correcta."
        );
      }
    } else {
      alert("Revisa los datos ingresados e intenta denuevo");
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
            {...register("antiguaContrasenia", {
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
