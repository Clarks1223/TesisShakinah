import "./ResumenCita.css"
export const ResumenCita = (props) => {
  return (
    <section className="contenedor-citas">
      <section className="contendor-titulo">
        <h2>{props.titulo}</h2>
      </section>
      <section className="contenedor-resumen">
        <div className="item">
          <p>Fecha:</p>
          <p>{props.fecha}</p>
        </div>
        <div className="item">
          <p>Hora:</p>
          <p>{props.hora}</p>
        </div>
        <div className="item">
          <p>Atendido por:</p>
          <p>{props.personal}</p>
        </div>
        <div className="item">
          <p>Costo</p>
          <p>{`$`}{props.costo}{`$`}</p>
        </div>
        <div className="item">
          <p>Estado</p>
          <p>{props.estado}</p>
        </div>
      </section>
      <section className="contenedor-botones">
        <button>Cancelar cita</button>
      </section>
    </section>
  );
};

export default ResumenCita;