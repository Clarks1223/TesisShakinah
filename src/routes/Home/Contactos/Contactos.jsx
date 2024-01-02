import RedesSociales from "../../../components/Home/RedesSociales/RedesSociales";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Contactos.css";
export const Contacto = () => {
  return (
    <section className="conctactos-section">
      <h1 className="contactos-titulo">Contactos Shakinah</h1>
      <section className="contactos-redes">
        <h3>Redes Sociales</h3>
        <RedesSociales />
      </section>
      <section className="contactos-horarios">
        <section>
          <h3>Horarios de atencion</h3>
          <p>Lunes a Sabado</p>
          <p>8:00 am - 18:00 pm</p>
        </section>
        <section>
          <h3>Telefonos</h3>
          <p>(02) 2279362</p>
          <p>+593 995953899</p>
        </section>
        <section>
          <h3>Direccion</h3>
          <p>Manuel Valdiviezo, Quito 170132, Ecuador</p>
        </section>
      </section>
      <section className="contactos-mapa">
        <h3>Ubicacion</h3>
        <MapContainer
          center={{ lat: "-0.1479142", lng: "-78.4995553" }}
          zoom={16}
          className="mapa"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat: "-0.1483705", lng: "-78.4996049" }}>
            <Popup>Aqui estamos!</Popup>
          </Marker>
        </MapContainer>
      </section>
      <section className="contactos-formulario"></section>
    </section>
  );
};
export default Contacto;
