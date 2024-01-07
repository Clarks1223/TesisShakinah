import React, { useState, useEffect } from "react";
import "./ResumenCita.css";
import { useAuth } from "../../Context/AuthContext";

const ResumenCita = (props) => {
  const { eliminar, actualizarDatos } = useAuth();
  const [cancelar, setCancelar] = useState(props.estado);

  const eliminarCitas = async () => {
    const confirmacion = window.confirm(
      "¿Está seguro de eliminar esta cita? No podrá revertir esta acción."
    );
    if (cancelar === "Activo") {
      if (confirmacion) {
        setCancelar("Cancelado");
        actualizarDatos("Citas", { Estado: "Cancelado" }, props.iditem);
      }
    }
    if (props.estado === "Cancelado" || props.estado === "Finalizado") {
      if (confirmacion) {
        eliminar("Citas", props.iditem);
      }
    }
  };

  useEffect(() => {
    setCancelar(props.estado);
  }, [props.estado]);

  return (
    <section className="contenedor-citas">
      <section className="contenedor-titulo">
        <h2>{props.titulo}</h2>
      </section>
      <section className="contenedor-resumen">
        {Object.entries({
          Fecha: props.fecha,
          Hora: props.hora,
          "Atendido por": props.personal,
          Costo: `$${props.costo}`,
          Estado: cancelar,
        }).map(([key, value]) => (
          <div className="item" key={key}>
            <p>{key}:</p>
            <p>{value}</p>
          </div>
        ))}
      </section>
      <section className="contenedor-botones">
        <button onClick={eliminarCitas}>
          {cancelar === "Activo" ? "Cancelar" : "Eliminar Item"}
        </button>
      </section>
    </section>
  );
};

export default ResumenCita;
