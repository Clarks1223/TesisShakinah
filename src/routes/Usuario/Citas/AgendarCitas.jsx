import ItemCita from "../../../components/AgendarCita/ItemCita";
import { useCita } from "../../../Context/CitaContext";

export const ListarCitas = () => {
  const { cita } = useCita();
  return (
    <>
      <section className="titulo">
        <h1>Agendar citas</h1>
      </section>
      <section className="Persona">
        <section className="lista-empelados">
          {Array.isArray(cita) ? (
            cita.map((citas) => (
              <ItemCita
                key={citas.id}
                nombreEmpleado={citas.nombreEmpleado}
                foto={citas.foto}
                titulo={citas.titulo}
                precio={citas.precio}
                id={citas.id}
              />
            ))
          ) : (
            <p>No hay citas disponibles.</p>
          )}
        </section>
      </section>
    </>
  );
};
export default ListarCitas;
