import MenuDashboard from "../../../components/MenuDashboard/MenuDashboard";
import "../../Administrador/Dashboard/Administrador.css";
import { Outlet } from "react-router-dom";

export const Usuario = () => {
  return (
    <section className="pantalla-administrador">
      <section className="administrador-menu">
        <MenuDashboard
          boton1="Agendar cita"
          direccion1="/Usuario/Agendar"
          boton2="Ver citas agendadas"
          direccion2="/Usuario/VerCitas"
          boton3="Editar perfil"
          direccion3="/Usuario/Perfil"
          direccion4="/Usuario/Password"
        />
      </section>
      <section className="administrador-section">
        <Outlet />
      </section>
    </section>
  );
};
export default Usuario;
