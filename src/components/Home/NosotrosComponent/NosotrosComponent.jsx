import "./NosotrosComponent.css"
export const NosotrosComponents = (props) => {
    return (
      <>
        <section className="nosotros-seccion" >
          <div className="contenedor-titulo-texto">
            <h2 className="contenedor-titulo">{props.titulo}</h2>
            <p className="contenedor-texto">{props.texto}</p>
          </div>
          <img
            src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-person_90382.png"
            className="imagen-nosotros"
          />
        </section>
      </>
    );
  };
  export default NosotrosComponents;
  