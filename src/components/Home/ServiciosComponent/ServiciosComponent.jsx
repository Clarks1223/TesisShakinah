import ServiciosItem from "./Item/ServiciosItem";
import "./ServiciosComponents.css";
import { useState, useEffect } from "react";
import { fireStore } from "../../../Auth/firebase";
import { collection, getDocs } from "firebase/firestore";
export const ServiciosComponent = (props) => {
  const [servicios, setServicio] = useState([]);
  const fetchData = async () => {
    const collectionServicios = collection(fireStore, `Servicios`);
    const resp = await getDocs(collectionServicios);
    //aqui se unen los elementos que vienen de la base con su id
    const serviciosFiltrados = resp.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((servicio) => servicio.Empleado === props.nombreEmpleado);
    setServicio(serviciosFiltrados);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="servicios-seccion">
        <section className="servicios-empleado">
          <h1 className="servicios-descripcion-nombre">
            {props.nombreEmpleado}
          </h1>
        </section>
        <section className="servicios-servicios-empleado">
          {servicios.map((servicio) => (
            <ServiciosItem
              key={servicio.id}
              titulo={servicio.Titulo}
              precio={servicio.Costo}
              foto={servicio.Foto}
              nombreEmpleado={props.nombreEmpleado}
              id={servicio.id}
            />
          ))}
        </section>
      </section>
    </>
  );
};
export default ServiciosComponent;
