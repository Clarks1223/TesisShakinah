import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MenuDashboard.css";
import { useAuth } from "../../Context/AuthContext";

export const MenuDashboard = (props) => {
  const { signOut, datosUsuario } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama a datosUsuario para obtener la información del usuario
        await datosUsuario();
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error.message);
      }
    };

    fetchData();
  }, [datosUsuario]);

  const cerrarSesion = async () => {
    await signOut();
  };

  return (
    <section className="AuthDetails">
      <section className="Menu-Admin">
        <section className="Menu-Admin-imagen">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/033/146/non_2x/profile-icon-login-head-icon-vector.jpg"
            alt="Imagen de perfil"
          />
          <section className="Menu-Admin-Perfil">
          </section>
        </section>
        <section className="Menu-Admin-botones">
          <Link to={props.direccion1} className="Menu-Admin-link">
            <button className="Menu-Admin-button">{props.boton1}</button>
          </Link>
          <Link to={props.direccion2} className="Menu-Admin-link">
            <button className="Menu-Admin-button">{props.boton2}</button>
          </Link>
          <Link to={props.direccion3} className="Menu-Admin-link">
            <button className="Menu-Admin-button">{props.boton3}</button>
          </Link>
          <Link to={props.direccion4} className="Menu-Admin-link">
            <button className="Menu-Admin-button">Cambiar contraseña</button>
          </Link>
          <button className="Menu-Admin-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </section>
      </section>
    </section>
  );
};

export default MenuDashboard;
