import ServiciosItem from "./Item/ServiciosItem";
import "./ServiciosComponents.css"

export const ServiciosComponent = (props) => {
  return (
    <>
      <section className="servicios-seccion">
        <section className="servicios-empleado">
          <section className="servicios-img">
            <img src="https://www.socialwibox.es/wp-content/uploads/bfi_thumb/female-hairdresser-applying-hair-straightener-for-long-hair-of-s-33cmrfxsr81tuuvt7upwm6qcxquehbvzvjytsep51n9kusvr6.jpg"></img>
          </section>
          <section className="servicios-descripcion">
            <p className="servicios-descripcion-nombre">
              {props.nombreEmpleado}
            </p>
            <p className="servicios-descripcio-texto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              dolores similique, eveniet sequi architecto inventore facere aut.
              Quae pariatur sit magnam, quam nesciunt reiciendis quibusdam
              aspernatur dicta placeat amet sunt. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quo fugiat ex iure nemo! Voluptatum
              cupiditate possimus quas deserunt magni velit, illo accusantium
              provident harum voluptates magnam tempora dolorem incidunt facere.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore,
              provident rerum? Sequi magni totam quibusdam non ab nisi modi odio
              nulla vitae error reiciendis, itaque ducimus, facere, natus atque
              debitis.
            </p>
          </section>
        </section>
        <h3 className="titulo-servicios">Servicios</h3>
        <section className="servicios-servicios-empleado">
          <ServiciosItem serviciotitutlo="Limpieza facial" precio="30" />
          <ServiciosItem serviciotitutlo="Manicura" precio="7" />
          <ServiciosItem serviciotitutlo="Pedicura" precio="10" />
          <ServiciosItem serviciotitutlo="Depilacion facial" precio="15" />
        </section>
      </section>
    </>
  );
};
export default ServiciosComponent;
