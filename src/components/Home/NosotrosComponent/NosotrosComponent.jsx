import "./NosotrosComponent.css";
export const NosotrosComponents = (props) => {
  return (
    <section className="nosotros-seccion">
      <div className="contenedor-titulo-texto">
        <h2 className="contenedor-titulo">{props.titulo}</h2>
      </div>
      <div className="conetendo-imagen-texto">
        <div className="contenedor-texto">
          <p>{props.texto}</p>
        </div>
        <div className="imagen-nosotros">
          <img src={props.imagen} />
        </div>
      </div>
    </section>
  );
};
export default NosotrosComponents;
