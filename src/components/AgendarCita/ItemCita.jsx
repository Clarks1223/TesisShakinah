import "./ItemCita.css"

export const ItemCita = (props) => {
  return (
    <section className="contendor-agendar-cita">
      <div className="agendar-cita-imagen">
        <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-999148130-6553e6d45a7b8.jpg" />
      </div>

      <div className="agendar-cita-detalle">
        <h2>{props.titulo}</h2>
        <h2>
          {props.precio}
          {"$"}
        </h2>
      </div>

      <form className="agendar-cita-datos">
        <label>Fecha</label>
        <input type="date"></input>
        <label>Hora</label>
        <input type="time"></input>
      </form>

      <button className="agendar-cita-boton">Agendar</button>
    </section>
  );
};
export default ItemCita;