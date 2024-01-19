import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";
import { useState, useEffect } from "react";
import "./CitasAgendadas.css";
import { useAuth } from "../../../Context/AuthContext";
export const VerCitas = () => {
  const [citas, setCitas] = useState([]);
  const { historialCitas, userId, actualizarDatos } = useAuth();
  useEffect(() => {
    historialCitas("Citas", "IDUsuario", setCitas, userId);
  }, []);

  const eliminarCitas = async (estado, iditem, setEstadoLocal) => {
    const confirmacion = window.confirm(
      "¿Está seguro de cancelar esta cita? No podrá revertir esta acción."
    );
    console.log("los datos que llegan: ", estado, " y ", iditem);
    console.log("el estado de confirmacion: ", confirmacion);
    if (confirmacion) {
      if (estado === "Activo") {
        console.log("voy a actualizar");
        setEstadoLocal("Cancelado");
        await actualizarDatos("Citas", { Estado: "Cancelado" }, iditem);
      }
    }
  };

  return (
    <>
      <section className="titulo">
        <h1>Ver Citas</h1>
      </section>
      <section className="Persona">
        {citas.length === 0 ? (
          <p>No hay citas disponibles, Revisa nuestra seccion de servicios.</p>
        ) : (
          <section className="lista-empelados">
            {citas.map((cita) => (
              <ResumenCitaItem
                key={cita.id}
                titulo={cita.Titulo}
                fecha={cita.Fecha}
                hora={cita.Hora}
                personal={cita.Empleado}
                costo={cita.Precio}
                estado={cita.Estado}
                iditem={cita.id}
                onDelete={eliminarCitas}
                usuario="usuario"
              />
            ))}
          </section>
        )}
      </section>
    </>
  );
};

export default VerCitas;
