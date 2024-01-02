import "./home.css";
export const Shakinah = () => {
  return (
    <section className="shakinah-seccion">
      <h1 className="shakinah-titulo">Bienvenido a Shakinah On-line</h1>
      <section className="shakinah-texto">
        <p>
          La nueva página web de Shakinah: Tu destino para productos exclusivos
          y experiencias inolvidables. En Shakinah, nos complace presentar
          nuestra nueva y mejorada página web, diseñada pensando en ti, nuestro
          valioso cliente. En este espacio virtual, te invitamos a sumergirte en
          un mundo de productos exclusivos y servicios personalizados, todo al
          alcance de tus dedos. Conoce nuestros productos, accede a citas
          instantáneas, mira promociones exclusivas y crea tu cuenta.
        </p>
      </section>
      <h2 className="shakinah-subtitulo">Conoce nuestras ultimas ofertas</h2>

      <div className="carrousel">
        <div className="conteCarrousel">
          <div className="itemCarrousel" id="itemCarrousel-1">
            <div className="itemCarrouselTarjeta">
              <img src="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Promociones%2F1.png?alt=media&token=a3e9d9f5-82e3-4d17-a51b-6a83a8fcf26a" />
            </div>
            <div className="itemCarrouselArrows">
              <a href="#itemCarrousel-3">
                <i className="bi bi-arrow-left-circle"></i>
              </a>
              <a href="#itemCarrousel-2">
                <i className="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>
          <div className="itemCarrousel" id="itemCarrousel-2">
            <div className="itemCarrouselTarjeta">
              <img src="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Promociones%2F2.jpg?alt=media&token=7b144f59-cfe2-4132-9abd-1e1899661f56"></img>
            </div>
            <div className="itemCarrouselArrows">
              <a href="#itemCarrousel-1">
                <i className="bi bi-arrow-left-circle"></i>
              </a>
              <a href="#itemCarrousel-3">
                <i className="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>
          <div className="itemCarrousel" id="itemCarrousel-3">
            <div className="itemCarrouselTarjeta">
              <img src="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Promociones%2F3.jpg?alt=media&token=0f350129-93d6-45f3-802f-dca43de9b925"></img>
            </div>
            <div className="itemCarrouselArrows">
              <a href="#itemCarrousel-2">
                <i className="bi bi-arrow-left-circle"></i>
              </a>
              <a href="#itemCarrousel-1">
                <i className="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="conteCarrouselController">
          <a href="#itemCarrousel-1">•</a>
          <a href="#itemCarrousel-2">•</a>
          <a href="#itemCarrousel-3">•</a>
        </div>
      </div>
    </section>
  );
};
export default Shakinah;
