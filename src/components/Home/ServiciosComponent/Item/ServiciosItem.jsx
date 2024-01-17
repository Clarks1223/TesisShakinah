import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCita } from "../../../../Context/CitaContext";
import "./ServiciosItem.css";
import { useAuth } from "../../../../Context/AuthContext";

export const ServiciosItem = (props) => {
  const { agregarCita, cita } = useCita();
  const { user } = useAuth(); // Obtén la información de autenticación
  const navigate = useNavigate();

  const handleAgregarCita = () => {
    if (!user) {
      // Si el usuario no ha iniciado sesión, puedes mostrar un mensaje o redirigir a la página de inicio de sesión
      alert("Debes iniciar sesión para agendar una cita.");
      // Puedes redirigir al usuario a la página de inicio de sesión si lo prefieres
      return navigate("/Login");
    }
    const nuevaCita = {
      id: props.id,
      titulo: props.titulo,
      precio: props.precio,
      foto: props.foto,
      nombreEmpleado: props.nombreEmpleado,
      EmpleadoID: props.EmpleadoID,
    };

    const citaExistente = cita.find((c) => c.id === nuevaCita.id);
    if (!citaExistente) {
      agregarCita(nuevaCita);
    } else {
      console.log("Ya existe una cita con el mismo ID.");
    }
    return navigate("/Usuario/Agendar");
  };

  return (
    <section className="ServiciosOfertados-section">
      <section className="ServiciosOfertados-section-imagen">
        <img src={props.foto} alt={props.titulo} />
      </section>
      <section className="ServiciosOfertados-descripcion">
        <p>{props.titulo}</p>
        <p>{`${props.precio}$`}</p>

        <button className="boton-agregar-cita" onClick={handleAgregarCita}>
          Agendar Cita
        </button>
      </section>
    </section>
  );
};

export default ServiciosItem;
