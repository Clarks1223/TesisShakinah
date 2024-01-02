import { Outlet } from "react-router-dom";
import MenuDashboard from "../../../components/MenuDashboard/MenuDashboard";
import "./Administrador.css";

const Administrador = () => {
  return (
    <section className="pantalla-administrador">
      <section className="administrador-menu">
        <MenuDashboard
          boton1="Gestionar personal"
          direccion1="/Administrador/Personal"
          boton2="Informe de citas"
          direccion2="/Administrador/Citas"
          boton3="Gestionar servicios"
          direccion3="/Administrador/Servicios"
          direccion4="/Administrador/Password"
        />
      </section>
      <section className="Administrador-section">
        <Outlet />
      </section>
    </section>
  );
};

export default Administrador;
