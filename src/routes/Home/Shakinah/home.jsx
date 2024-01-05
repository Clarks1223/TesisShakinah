import "./home.css";
import Carrusel from "./carrusel/Carrusel";

const Shakinah = () => {
  return (
    <section className="shakinah-section">
      <h1 className="shakinah-title">Bienvenido a Shakinah Online</h1>
      <div className="section1">
        <p>
          La nueva página web de Shakinah es tu camino para descubrir productos
          exclusivos y experiencias inolvidables. En Shakinah, nos complace
          presentar nuestra nueva página web, diseñada pensando en ti, nuestro
          valioso cliente. En este espacio virtual, te invitamos a sumergirte en
          un mundo de productos exclusivos y servicios personalizados, todo al
          alcance de tus dedos. Conoce nuestros productos, accede a citas
          instantáneas, mira promociones exclusivas y crea tu cuenta.
        </p>
      </div>
      <h1 className="shakinah-subtitle">Conoce nuestras últimas ofertas</h1>
      <div className="section2">
        <div className="carousel">
          <Carrusel />
        </div>
      </div>
    </section>
  );
};

export default Shakinah;
