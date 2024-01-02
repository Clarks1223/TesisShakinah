import "./ServiciosItem.css";
export const ServiciosItem = (props) => {
  return (
    <section className="ServiciosOfertados-section">
      <section className="ServiciosOfertados-section-imagen">
        <img src="https://studionativis.com/wp-content/uploads/2020/03/balayage-bogota-1.jpg" />
      </section>
      <section className="ServiciosOfertados-descripcion">
        <p>{props.serviciotitutlo}</p>
        <p>{`${props.precio}$`}</p>
        <a>
          <button>Agendar Cita</button>
        </a>
      </section>
    </section>
  );
};
export default ServiciosItem;
