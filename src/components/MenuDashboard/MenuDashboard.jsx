import { Link } from "react-router-dom";
import "./MenuDashboard.css";
import { useAuth } from "../../Context/AuthContext";

export const MenuDashboard = (props) => {
  const { signOut, userInformation } = useAuth();
  const cerrarSesion = async () => {
    await signOut();
  };

  return (
    <section className="AuthDetails">
      <section className="Menu-Admin">
        <section className="Menu-Admin-imagen">
          <img
            src={userInformation.Foto}
            alt="Imagen de perfil"
            className="imagen-usuario"
          />
        </section>

        <section className="Menu-Admin-Perfil">
          <h3>{`${userInformation.Nombre} ${userInformation.Apellido}`}</h3>
          <h3>{userInformation.Correo}</h3>
          <h3>{userInformation.Telefono}</h3>
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
