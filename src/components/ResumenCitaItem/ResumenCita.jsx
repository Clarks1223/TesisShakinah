import React, { useState } from "react";
import "./ResumenCita.css";

const ResumenCita = (props) => {
  const [estadolocal, setEstadoLocal] = useState(props.estado);
  //props.usuario === "usuario"?"Cancelar":"Finalizar"
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
          Estado: estadolocal,
        }).map(([key, value]) => (
          <div className="item" key={key}>
            <p>{key}:</p>
            <p>{value}</p>
          </div>
        ))}
      </section>
      <section className="contenedor-botones">
        <button
          onClick={async () => {
            await props.onDelete(estadolocal, props.iditem, setEstadoLocal);
          }}
          disabled={estadolocal !== "Activo" && props.usuario === "usuario"}
        >
          {estadolocal === "Activo"
            ? props.usuario === "usuario"
              ? "Cancelar"
              : "Finalizar"
            : "Eliminar Item"}
        </button>
      </section>
    </section>
  );
};

export default ResumenCita;
