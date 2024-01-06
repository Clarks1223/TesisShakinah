import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Password-Recovery.css";

const PasswordRecovery = () => {
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  async function handlePasswordResetSubmit(e) {
    e.preventDefault();
    try {
      await resetPassword(emailRef.current.value);
    } catch (error) {
      console.log("este es el error: ", error);
    }
  }

  return (
    <div className="loginContainer">
      <h1 className="titulo-recuperar">Recuperar contraseña</h1>
      <form className="form-reestablecer" onSubmit={handlePasswordResetSubmit}>
        <label className="label-correo" htmlFor="email">
          Correo electronico
        </label>
        <input
          type="email"
          id="email"
          className="correo-input"
          autoFocus
          required
          ref={emailRef}
        />
        <div className="btnContainer">
          <button className="restaurar-booton" type="submit">
            Restaurar contraseña
          </button>
          <p className="go-back">
            <Link to="/Login">
              <span>Regresar</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecovery;
