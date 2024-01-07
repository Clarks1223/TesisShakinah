import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";
import { useState, useEffect } from "react";
import "./CitasAgendadas.css";
import { useAuth } from "../../../Context/AuthContext";
export const VerCitas = () => {
  const [citas, setCitas] = useState([]);
  const { historialCitas } = useAuth();

  useEffect(() => {
    historialCitas("Citas", "IDUsuario", setCitas);
  }, [citas]);

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
              />
            ))}
          </section>
        )}
      </section>
    </>
  );
};

export default VerCitas;
