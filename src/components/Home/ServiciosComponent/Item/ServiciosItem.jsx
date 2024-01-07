import "./ServiciosItem.css";
import { useCita } from "../../../../Context/CitaContext";
import { Link } from "react-router-dom";
export const ServiciosItem = (props) => {
  const { agregarCita, cita } = useCita();

  const handleAgregarCita = () => {
    const nuevaCita = {
      id: props.id,
      titulo: props.titulo,
      precio: props.precio,
      foto: props.foto,
      nombreEmpleado: props.nombreEmpleado,
      EmpleadoID: props.EmpleadoID,
    };
    // Verificar si ya existe una cita con el mismo ID
    const citaExistente = cita.find((c) => c.id === nuevaCita.id);
    if (!citaExistente) {
      agregarCita(nuevaCita);
    } else {
      console.log("Ya existe una cita con el mismo ID.");
    }
  };

  return (
    <section className="ServiciosOfertados-section">
      <section className="ServiciosOfertados-section-imagen">
        <img src={props.foto} />
      </section>
      <section className="ServiciosOfertados-descripcion">
        <p>{props.titulo}</p>
        <p>{`${props.precio}$`}</p>
        <Link to="/Usuario/Agendar">
          <button className="boton-agregar-cita" onClick={handleAgregarCita}>
            Agendar Cita
          </button>
        </Link>
      </section>
    </section>
  );
};
export default ServiciosItem;
