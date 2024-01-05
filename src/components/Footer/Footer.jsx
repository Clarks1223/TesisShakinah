import RedesSociales from "../Home/RedesSociales/RedesSociales";
import "./Footer.css";

export const Footer = () => {
  return (
    <section className="footer-seccion">
      <section className="footer-direccion">
        <i className="bi bi-house"></i>
        <p>Manuel Valdiviezo Quito 170132, Ecuador</p>
      </section>
      <section className="footer-titulo">
        <h1>Shakinah</h1>
      </section>
      <section className="footer-redes">
        <RedesSociales />
      </section>
    </section>
  );
};

export default Footer;
