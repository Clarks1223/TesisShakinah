import { ServiciosComponent } from "../../../components/Home/ServiciosComponent/ServiciosComponent";
import "./servicios.css";
import { useState, useEffect } from "react";
import { fireStore } from "../../../Auth/firebase";
import { collection, getDocs } from "firebase/firestore";

export const Servicios = () => {
  const [personal, setPersonal] = useState([]);

  const fetchData = async () => {
    const collectionEmpleados = collection(fireStore, "Personal");
    const resp = await getDocs(collectionEmpleados);
    //aqui se unen los elementos que vienen de la base con su id
    setPersonal(
      resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section>
        <h1 className="tituloP">Servicios Shakinah</h1>

        {personal.map((empleado) => (
          <ServiciosComponent
            key={empleado.id}
            nombreEmpleado={`${empleado.Nombre} ${empleado.Apellido}`}
          />
        ))}
      </section>
    </>
  );
};
export default Servicios;
