import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { fireStore } from "../../Auth/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Password-Recovery.css";

const PasswordRecovery = () => {
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const verificarCorreo = async (correo) => {
    try {
      const collectionRef = collection(fireStore, "UsuariosLogin");
      const q = query(collectionRef, where("Email", "==", correo));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    } catch (error) {
      console.error("Error al verificar correo:", error);
      return true;
    }
  };

  async function handlePasswordResetSubmit(e) {
    e.preventDefault();
    const correoValido = await verificarCorreo(emailRef.current.value);

    if (correoValido) {
      try {
        await resetPassword(emailRef.current.value);
        console.log("Se enviara la restauracion");
      } catch (error) {
        console.log("este es el error: ", error);
      }
    } else {
      alert("No se ha localizado su correo");
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
